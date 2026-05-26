// ──────────────────────────────────────────────────────────────────
//  HARMEXO — AIWordModal
//  Yapay Zeka ile kelime üretme modal bileşeni.
//  Yükleme → Önizleme → Onayla / İptal akışını yönetir.
// ──────────────────────────────────────────────────────────────────

import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, LIGHT_COLORS } from '../theme';

const { width: SW } = Dimensions.get('window');
const AI_COST = 100;

export default function AIWordModal({
  visible,
  onClose,
  onConfirm,
  isLoading,
  generatedWords,
  error,
  isDark = true,
}) {
  const C       = isDark ? COLORS : LIGHT_COLORS;
  const aiColor = isDark ? '#C080FF' : '#6655CC'; // arcane mor

  // ── Animasyonlar ────────────────────────────────────────────
  const cardScale    = useRef(new Animated.Value(0.88)).current;
  const cardOpacity  = useRef(new Animated.Value(0)).current;
  const pulseAnim    = useRef(new Animated.Value(1)).current;
  const rotateAnim   = useRef(new Animated.Value(0)).current;
  const wordFadeAnim = useRef(new Animated.Value(0)).current;

  const pulseLoopRef  = useRef(null);
  const spinLoopRef   = useRef(null);

  // Kart giriş animasyonu
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(cardScale, {
          toValue: 1,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      cardScale.setValue(0.88);
      cardOpacity.setValue(0);
      wordFadeAnim.setValue(0);
    }
  }, [visible]);

  // Yükleme animasyonu (pulse + spin)
  useEffect(() => {
    if (isLoading) {
      pulseLoopRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.22,
            duration: 750,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0.88,
            duration: 750,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      pulseLoopRef.current.start();

      spinLoopRef.current = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2800,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      spinLoopRef.current.start();
    } else {
      pulseLoopRef.current?.stop();
      spinLoopRef.current?.stop();
      pulseAnim.setValue(1);
      rotateAnim.setValue(0);
    }

    return () => {
      pulseLoopRef.current?.stop();
      spinLoopRef.current?.stop();
    };
  }, [isLoading]);

  // Kelimeler göründüğünde soluktan belirme animasyonu
  useEffect(() => {
    if (generatedWords && !isLoading) {
      Animated.timing(wordFadeAnim, {
        toValue: 1,
        duration: 380,
        useNativeDriver: true,
      }).start();
    } else {
      wordFadeAnim.setValue(0);
    }
  }, [generatedWords, isLoading]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // ── Render ──────────────────────────────────────────────────
  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* Koyu arka plan */}
      <View style={styles.backdrop}>
        <Animated.View
          style={[
            styles.card,
            {
              backgroundColor: isDark ? COLORS.surface : '#F8F7F4',
              borderColor: aiColor + '55',
              transform: [{ scale: cardScale }],
              opacity: cardOpacity,
            },
          ]}
        >
          {/* Üst mor gradyan */}
          <LinearGradient
            colors={[aiColor + '18', 'transparent']}
            style={styles.headerGrad}
            pointerEvents="none"
          />

          {/* ── Başlık satırı ── */}
          <View style={styles.header}>
            <Animated.Text
              style={[styles.aiIconBig, { color: aiColor, transform: [{ rotate: spin }] }]}
            >
              ✦
            </Animated.Text>

            <View style={styles.headerTexts}>
              <Text style={[styles.title, { color: aiColor }]}>YAPAY ZEKA</Text>
              <Text style={[styles.subtitle, { color: C.textMuted }]}>
                {isLoading ? 'Türkçe kelimeler analiz ediliyor…' : 'Kelime Üretici'}
              </Text>
            </View>

            <View
              style={[
                styles.costBadge,
                { backgroundColor: C.elevated, borderColor: COLORS.shardDim },
              ]}
            >
              <Text style={[styles.costText, { color: COLORS.shardGold }]}>
                {AI_COST} ◆
              </Text>
            </View>
          </View>

          {/* ── İçerik alanı ── */}
          <View style={styles.content}>

            {/* YÜKLENİYOR */}
            {isLoading && (
              <View style={styles.loadingArea}>
                <Animated.View
                  style={[
                    styles.loadingOrb,
                    {
                      backgroundColor: aiColor + '18',
                      borderColor: aiColor + '55',
                      transform: [{ scale: pulseAnim }],
                    },
                  ]}
                >
                  <Text style={[styles.loadingOrbText, { color: aiColor }]}>✦</Text>
                </Animated.View>
                <Text style={[styles.loadingLabel, { color: C.textSecondary }]}>
                  Düşünüyor…
                </Text>
                <Text style={[styles.loadingSub, { color: C.textMuted }]}>
                  Harflerin tüm kombinasyonları taranıyor
                </Text>
              </View>
            )}

            {/* HATA */}
            {error && !isLoading && (
              <View style={styles.errorArea}>
                <Text style={styles.errorEmoji}>⚠️</Text>
                <Text style={[styles.errorText, { color: COLORS.errorCore }]}>{error}</Text>
              </View>
            )}

            {/* SONUÇ — kelime önizlemesi */}
            {generatedWords && !isLoading && !error && (
              <Animated.View style={[styles.wordsArea, { opacity: wordFadeAnim }]}>
                <Text style={[styles.wordsLabel, { color: C.textMuted }]}>
                  ÜRETİLEN KELİMELER
                </Text>
                <View style={styles.chipRow}>
                  {generatedWords.map((word, i) => (
                    <View
                      key={i}
                      style={[
                        styles.wordChip,
                        { backgroundColor: aiColor + '16', borderColor: aiColor + '45' },
                      ]}
                    >
                      <Text style={[styles.chipText, { color: aiColor }]}>{word}</Text>
                    </View>
                  ))}
                </View>
                <Text style={[styles.wordsNote, { color: C.textMuted }]}>
                  Tüm kelimeler mevcut harflerle çözülebilir ✓
                </Text>
              </Animated.View>
            )}
          </View>

          {/* ── Alt butonlar ── */}
          <View style={[styles.btnRow, { borderTopColor: C.border }]}>
            <TouchableOpacity
              style={[
                styles.cancelBtn,
                { backgroundColor: C.elevated, borderColor: C.border },
              ]}
              onPress={onClose}
              activeOpacity={0.72}
            >
              <Text style={[styles.cancelText, { color: C.textSecondary }]}>İptal</Text>
            </TouchableOpacity>

            {generatedWords && !isLoading && !error && (
              <TouchableOpacity
                style={[
                  styles.confirmBtn,
                  { backgroundColor: aiColor + '1E', borderColor: aiColor },
                ]}
                onPress={onConfirm}
                activeOpacity={0.72}
              >
                <Text style={[styles.confirmIcon, { color: aiColor }]}>✦ </Text>
                <Text style={[styles.confirmText, { color: aiColor }]}>Uygula</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: '#000000B8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: SW - 48,
    borderRadius: 26,
    borderWidth: 1,
    overflow: 'hidden',
  },

  /* ── Gradyan üst kat ── */
  headerGrad: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
  },

  /* ── Başlık ── */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    gap: 12,
  },
  aiIconBig: {
    fontSize: 30,
  },
  headerTexts: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Cinzel_700Bold',
    letterSpacing: 2.5,
  },
  subtitle: {
    fontSize: 11,
    fontFamily: 'Rajdhani_400Regular',
    letterSpacing: 1,
    marginTop: 2,
  },
  costBadge: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  costText: {
    fontSize: 13,
    fontFamily: 'Rajdhani_700Bold',
    letterSpacing: 0.5,
  },

  /* ── İçerik ── */
  content: {
    minHeight: 150,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  /* Yükleniyor */
  loadingArea: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  loadingOrb: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingOrbText: {
    fontSize: 36,
  },
  loadingLabel: {
    fontSize: 16,
    fontFamily: 'Rajdhani_600SemiBold',
    letterSpacing: 2,
  },
  loadingSub: {
    fontSize: 11,
    fontFamily: 'Rajdhani_400Regular',
    letterSpacing: 1,
    textAlign: 'center',
  },

  /* Hata */
  errorArea: {
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  errorEmoji: {
    fontSize: 34,
  },
  errorText: {
    fontSize: 13,
    fontFamily: 'Rajdhani_500Medium',
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 20,
  },

  /* Kelimeler */
  wordsArea: {
    gap: 12,
    alignItems: 'center',
  },
  wordsLabel: {
    fontSize: 10,
    fontFamily: 'Rajdhani_600SemiBold',
    letterSpacing: 2.5,
    textAlign: 'center',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  wordChip: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  chipText: {
    fontSize: 16,
    fontFamily: 'Cinzel_700Bold',
    letterSpacing: 2,
  },
  wordsNote: {
    fontSize: 11,
    fontFamily: 'Rajdhani_400Regular',
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  /* ── Butonlar ── */
  btnRow: {
    flexDirection: 'row',
    gap: 10,
    padding: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 13,
    paddingVertical: 13,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 14,
    fontFamily: 'Rajdhani_600SemiBold',
    letterSpacing: 1,
  },
  confirmBtn: {
    flex: 1.5,
    flexDirection: 'row',
    borderWidth: 1.5,
    borderRadius: 13,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmIcon: {
    fontSize: 13,
  },
  confirmText: {
    fontSize: 14,
    fontFamily: 'Cinzel_700Bold',
    letterSpacing: 2,
  },
});
