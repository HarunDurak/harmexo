import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { COLORS, LIGHT_COLORS, getTheme } from '../theme';
import { useAppTheme } from '../context/ThemeContext';
import { getLevelById } from '../data/levels';
import {
  checkWord,
  checkBonusWord,
  shuffleLetters,
  canFormWord,
  getHint,
  calcStars,
  calcShardReward,
} from '../utils/gameLogic';
import { Storage } from '../utils/storage';
import Header from '../components/Header';
import LetterWheel from '../components/LetterWheel';
import CrosswordGrid from '../components/CrosswordGrid';

const { width: SW, height: SH } = Dimensions.get('window');
const HINT_COST = 50;

export default function GameScreen({ route, navigation }) {
  const { levelId = 1 } = route.params || {};
  const { isDark, toggle: toggleTheme } = useAppTheme();
  const { colors: C, realmThemes } = getTheme(isDark);

  const [level, setLevel] = useState(null);
  const [letters, setLetters] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [foundBonus, setFoundBonus] = useState([]);
  const [wordStatus, setWordStatus] = useState('idle'); // idle|typing|correct|wrong|bonus|already
  const [shake, setShake] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [shards, setShards] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [bonusFlash, setBonusFlash] = useState(false);

  // Animasyonlar
  const overlayAnim = useRef(new Animated.Value(0)).current;
  const statusTimeout = useRef(null);

  // Load level
  useEffect(() => {
    const lv = getLevelById(levelId);
    if (!lv) {
      navigation.goBack();
      return;
    }
    setLevel(lv);
    setLetters(shuffleLetters(lv.letters));
    setSelectedIndices([]);
    setFoundWords([]);
    setFoundBonus([]);
    setWordStatus('idle');
    setHintsUsed(0);
    setIsComplete(false);

    Storage.getShards().then(setShards);
  }, [levelId]);

  const theme = level ? realmThemes[level.realm] : realmThemes.frost;
  const currentWord = selectedIndices.map(i => letters[i]).join('');

  // Set status with auto-reset
  const setStatus = (s, delay = 1200) => {
    setWordStatus(s);
    if (statusTimeout.current) clearTimeout(statusTimeout.current);
    statusTimeout.current = setTimeout(() => setWordStatus('idle'), delay);
  };

  // Handle letter press (tek tıklama)
  const handleLetterPress = useCallback((idx) => {
    setSelectedIndices(prev => {
      if (prev[prev.length - 1] === idx) return prev.slice(0, -1);
      if (prev.includes(idx)) return prev;
      return [...prev, idx];
    });
    setWordStatus('typing');
    Haptics.selectionAsync?.();
  }, []);

  // triggerWrong — processWord'den önce tanımlanmalı
  const triggerWrong = useCallback(() => {
    setStatus('wrong', 800);
    setShake(true);
    setTimeout(() => setShake(false), 500);
    setSelectedIndices([]);
  }, []);

  // Sürükleme başladığında seçimi sıfırla
  const handleDragStart = useCallback(() => {
    setSelectedIndices([]);
    setWordStatus('idle');
  }, []);

  // Ortak kelime doğrulama (hem GİR butonu hem drag release için)
  const processWord = useCallback((word, foundWordsSnap, foundBonusSnap) => {
    if (!level || word.length < 2) return;

    if (!canFormWord(word, level.letters)) {
      triggerWrong();
      return;
    }

    const result = checkWord(word, level.words, foundWordsSnap);

    if (result === 'correct') {
      const newFound = [...foundWordsSnap, word];
      setFoundWords(newFound);
      setSelectedIndices([]);
      setStatus('correct', 800);
      Haptics.notificationAsync?.(Haptics.NotificationFeedbackType.Success);
      if (newFound.length === level.words.length) triggerComplete(newFound);
      return;
    }

    if (result === 'already_found') {
      setStatus('already', 900);
      setSelectedIndices([]);
      return;
    }

    const bonusResult = checkBonusWord(word, level.bonus || [], foundBonusSnap);
    if (bonusResult === 'bonus') {
      setFoundBonus(prev => [...prev, word]);
      setSelectedIndices([]);
      setStatus('bonus', 1200);
      setBonusFlash(true);
      setTimeout(() => setBonusFlash(false), 1200);
      Haptics.notificationAsync?.(Haptics.NotificationFeedbackType.Warning);
      return;
    }

    triggerWrong();
  }, [level, triggerWrong, foundWords, foundBonus]);

  // Sürükleme bitti → indekslerden kelime türet, otomatik submit
  const handleDragComplete = useCallback((indices) => {
    if (!indices || indices.length < 2) {
      setSelectedIndices([]);
      return;
    }
    const word = indices.map(i => letters[i]).join('');
    setSelectedIndices(indices);
    setTimeout(() => processWord(word, foundWords, foundBonus), 30);
  }, [letters, processWord, foundWords, foundBonus]);

  const triggerComplete = async (newFound) => {
    const stars = calcStars(hintsUsed, foundBonus.length, (level.bonus || []).length);
    const reward = calcShardReward(level.shardReward, stars, foundBonus.length);
    const newShards = await Storage.addShards(reward);
    setShards(newShards);
    await Storage.saveLevel(level.id, stars, foundBonus.length);

    setTimeout(() => {
      setIsComplete(true);
      Animated.spring(overlayAnim, {
        toValue: 1,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }, 600);
  };

  // Clear selection
  const handleClear = () => {
    setSelectedIndices([]);
    setWordStatus('idle');
  };

  // Shuffle letters
  const handleShuffle = () => {
    setLetters(prev => shuffleLetters(prev));
    setSelectedIndices([]);
    Haptics.selectionAsync?.();
  };

  // Use hint
  const handleHint = async () => {
    if (!level) return;
    const canSpend = await Storage.spendShards(HINT_COST);
    if (!canSpend) {
      Alert.alert('Yetersiz Kıymık', `İpucu için ${HINT_COST} ◆ Kıymık gerekli.`);
      return;
    }
    const hint = getHint(level.words, foundWords);
    if (!hint) return;
    setShards(prev => prev - HINT_COST);
    setHintsUsed(prev => prev + 1);
    Alert.alert('◆ İpucu', `"${hint.word}" kelimesi "${hint.letter}" harfi ile başlıyor.`);
  };

  // Next level
  const handleNext = () => {
    navigation.replace('Game', { levelId: levelId + 1 });
  };

  const handleBack = () => navigation.goBack();

  if (!level) return null;

  const allFound = foundWords.length === level.words.length;

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <LinearGradient colors={theme.bg} style={StyleSheet.absoluteFill} />

      <Header
        title={level.titleTR || level.title}
        shards={shards}
        onBack={handleBack}
        onThemeToggle={toggleTheme}
        isDark={isDark}
      />

      {/* Level info */}
      <View style={styles.levelInfo}>
        <Text style={[styles.realmTag, { color: theme.accent, borderColor: theme.accent + '50' }]}>
          {theme.icon}  {theme.nameTR}  ·  Seviye {level.realmLevel}
        </Text>
        {foundBonus.length > 0 && (
          <Text style={[styles.bonusTag, { color: C.arcaneCore }]}>
            +{foundBonus.length} bonus
          </Text>
        )}
      </View>

      {/* Crossword grid */}
      <View style={styles.gridArea}>
        <CrosswordGrid
          words={level.words}
          foundWords={foundWords}
          accentColor={theme.accent}
          isDark={isDark}
          wordStatus={wordStatus}
        />
      </View>

      {/* Bonus flash */}
      {bonusFlash && (
        <View style={[styles.bonusFlash, { backgroundColor: C.arcaneCore + '20', borderColor: C.arcaneCore }]}>
          <Text style={[styles.bonusFlashText, { color: C.arcaneCore }]}>✦ BONUS KELİME ✦</Text>
        </View>
      )}

      {/* Kelime göstergesi + karıştır ikonu */}
      <View style={styles.wordRow}>
        {/* Sol — İpucu */}
        <TouchableOpacity
          style={[styles.hintBtn, { borderColor: C.border, backgroundColor: C.elevated }]}
          onPress={handleHint}
          activeOpacity={0.75}
        >
          <Text style={[styles.hintIcon, { color: C.shardGold }]}>◆</Text>
          <Text style={[styles.hintCost, { color: C.shardGold }]}>{HINT_COST}</Text>
        </TouchableOpacity>

        {/* Orta — kelime pill */}
        <TouchableOpacity
          style={[
            styles.wordPill,
            {
              borderColor: currentWord.length > 0 ? theme.accent + '60' : C.border,
              backgroundColor: currentWord.length > 0 ? theme.accent + '12' : C.elevated + '80',
            },
          ]}
          onPress={handleClear}
          activeOpacity={selectedIndices.length > 0 ? 0.7 : 1}
          disabled={selectedIndices.length === 0}
        >
          {currentWord.length > 0 ? (
            <Text style={[styles.wordPillText, { color: theme.accent }]}>
              {currentWord}
              {'  '}<Text style={[styles.wordPillX, { color: theme.accent + 'AA' }]}>✕</Text>
            </Text>
          ) : (
            <Text style={[styles.wordPillEmpty, { color: C.textMuted }]}>· · ·</Text>
          )}
        </TouchableOpacity>

        {/* Sağ — Karıştır ikonu */}
        <TouchableOpacity
          style={[styles.shuffleBtn, { borderColor: C.border, backgroundColor: C.elevated }]}
          onPress={handleShuffle}
          activeOpacity={0.75}
        >
          <Text style={[styles.shuffleIcon, { color: C.textSecondary }]}>⟳</Text>
        </TouchableOpacity>
      </View>

      {/* Letter wheel */}
      <View style={styles.wheelArea}>
        <LetterWheel
          letters={letters}
          selectedIndices={selectedIndices}
          onLetterPress={handleLetterPress}
          onDragStart={handleDragStart}
          onDragComplete={handleDragComplete}
          accentColor={theme.accent}
          shake={shake}
        />
      </View>

      {/* Level complete overlay */}
      {isComplete && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.completeOverlay,
            {
              opacity: overlayAnim,
              transform: [
                {
                  scale: overlayAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={[theme.bg[0] + 'F0', theme.bg[1] + 'F8']}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.completeCard}>
            <Text style={styles.completeIcon}>{theme.icon}</Text>
            <Text style={[styles.completeTitle, { color: theme.accent }]}>
              SEVİYE TAMAMLANDI
            </Text>
            <Text style={styles.completeSub}>{level.titleTR || level.title}</Text>

            <View style={styles.starsRow}>
              {[1, 2, 3].map(s => (
                <Text
                  key={s}
                  style={[
                    styles.starIcon,
                    {
                      color:
                        s <= calcStars(hintsUsed, foundBonus.length, (level.bonus || []).length)
                          ? COLORS.shardGold
                          : COLORS.textMuted,
                    },
                  ]}
                >
                  ★
                </Text>
              ))}
            </View>

            <View style={[styles.rewardBadge, { borderColor: COLORS.shardDim }]}>
              <Text style={styles.rewardText}>
                +{calcShardReward(level.shardReward, calcStars(hintsUsed, foundBonus.length, (level.bonus || []).length), foundBonus.length)}  ◆ Kıymık Kazandın
              </Text>
            </View>

            {foundBonus.length > 0 && (
              <Text style={styles.bonusWords}>
                Bonus: {foundBonus.join('  ·  ')}
              </Text>
            )}

            <View style={styles.completeBtns}>
              <TouchableOpacity style={styles.backBtn} onPress={handleBack} activeOpacity={0.8}>
                <Text style={styles.backBtnText}>‹  Harita</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.nextBtn, { borderColor: theme.accent, shadowColor: theme.glow }]}
                onPress={handleNext}
                activeOpacity={0.8}
              >
                <Text style={[styles.nextBtnText, { color: theme.accent }]}>Sonraki  ›</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

  levelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    gap: 10,
  },
  realmTag: {
    fontSize: 11,
    fontFamily: 'Rajdhani_600SemiBold',
    letterSpacing: 2,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  bonusTag: {
    fontSize: 11,
    fontFamily: 'Rajdhani_700Bold',
    letterSpacing: 1,
  },

  gridArea: {
    flex: 1,
    marginHorizontal: 10,
    overflow: 'hidden',
  },

  bonusFlash: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    backgroundColor: COLORS.arcaneCore + '20',
    borderWidth: 1,
    borderColor: COLORS.arcaneCore,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  bonusFlashText: {
    color: COLORS.arcaneCore,
    fontSize: 13,
    fontFamily: 'Cinzel_700Bold',
    letterSpacing: 3,
  },

  // Kelime göstergesi satırı
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 4,
    gap: 8,
  },
  wordPill: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  wordPillText: {
    fontSize: 26,
    fontFamily: 'Cinzel_700Bold',
    letterSpacing: 6,
  },
  wordPillX: {
    fontSize: 12,
  },
  wordPillEmpty: {
    fontSize: 15,
    fontFamily: 'Rajdhani_400Regular',
    letterSpacing: 8,
    opacity: 0.5,
  },
  hintBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  hintIcon: {
    fontSize: 11,
  },
  hintCost: {
    fontSize: 13,
    fontFamily: 'Rajdhani_700Bold',
  },
  shuffleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shuffleIcon: {
    fontSize: 20,
  },

  // Wheel
  wheelArea: {
    alignItems: 'center',
    marginBottom: 8,
  },

  // Complete overlay
  completeOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  completeCard: {
    width: SW - 48,
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  completeIcon: { fontSize: 48 },
  completeTitle: {
    fontSize: 20,
    fontFamily: 'Cinzel_700Bold',
    letterSpacing: 3,
    textAlign: 'center',
  },
  completeSub: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontFamily: 'Rajdhani_500Medium',
    letterSpacing: 2,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 4,
  },
  starIcon: { fontSize: 32 },
  rewardBadge: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  rewardText: {
    color: COLORS.shardGold,
    fontSize: 14,
    fontFamily: 'Rajdhani_600SemiBold',
    letterSpacing: 1,
  },
  bonusWords: {
    color: COLORS.arcaneCore,
    fontSize: 11,
    fontFamily: 'Rajdhani_500Medium',
    letterSpacing: 1,
    textAlign: 'center',
  },
  completeBtns: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  backBtn: {
    flex: 1,
    backgroundColor: COLORS.elevated,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  backBtnText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontFamily: 'Rajdhani_600SemiBold',
    letterSpacing: 2,
  },
  nextBtn: {
    flex: 1.4,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    borderWidth: 1.5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4,
  },
  nextBtnText: {
    fontSize: 15,
    fontFamily: 'Cinzel_700Bold',
    letterSpacing: 2,
  },
});
