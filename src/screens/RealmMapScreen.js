import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, REALM_THEMES } from '../theme';
import { LEVELS, REALM_ORDER, REALM_UNLOCK_LEVEL } from '../data/levels';
import { Storage } from '../utils/storage';
import Header from '../components/Header';

const { width: SW } = Dimensions.get('window');

function RealmSection({ realm, levels, completedIds, starMap, onLevel, isLocked, shards }) {
  const theme = REALM_THEMES[realm];
  const completedCount = levels.filter(l => completedIds.includes(l.id)).length;
  const progress = levels.length ? completedCount / levels.length : 0;

  return (
    <View style={[styles.realmSection, isLocked && styles.lockedSection]}>
      {/* Realm header */}
      <View style={styles.realmHeader}>
        <Text style={styles.realmIcon}>{theme.icon}</Text>
        <View style={{ flex: 1 }}>
          <Text style={[styles.realmName, { color: theme.accent }]}>{theme.nameTR}</Text>
          <Text style={styles.realmSub}>{theme.name}</Text>
        </View>
        {isLocked ? (
          <View style={styles.lockBadge}>
            <Text style={styles.lockText}>🔒 Kilitli</Text>
          </View>
        ) : (
          <Text style={[styles.progressText, { color: theme.accent }]}>
            {completedCount}/{levels.length}
          </Text>
        )}
      </View>

      {/* Progress bar */}
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${progress * 100}%`, backgroundColor: theme.accent },
          ]}
        />
      </View>

      {/* Level grid */}
      {!isLocked && (
        <View style={styles.levelGrid}>
          {levels.map((level, i) => {
            const completed = completedIds.includes(level.id);
            const stars = starMap[level.id] || 0;
            const unlocked = i === 0 || completedIds.includes(levels[i - 1]?.id);

            return (
              <TouchableOpacity
                key={level.id}
                style={[
                  styles.levelBtn,
                  completed && { borderColor: theme.accent, backgroundColor: theme.accent + '20' },
                  !unlocked && { opacity: 0.4 },
                ]}
                onPress={() => unlocked && onLevel(level.id)}
                activeOpacity={0.75}
                disabled={!unlocked}
              >
                <Text style={[styles.levelNum, completed && { color: theme.accent }]}>
                  {level.realmLevel}
                </Text>
                {completed && (
                  <Text style={styles.stars}>
                    {'★'.repeat(stars)}{'☆'.repeat(3 - stars)}
                  </Text>
                )}
                {!completed && unlocked && (
                  <Text style={styles.levelUnlocked}>▶</Text>
                )}
                {!unlocked && <Text style={styles.levelLocked}>🔒</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

export default function RealmMapScreen({ navigation }) {
  const [completedIds, setCompletedIds] = useState([]);
  const [starMap, setStarMap] = useState({});
  const [shards, setShards] = useState(0);

  useEffect(() => {
    const load = async () => {
      const prog = await Storage.getProgress();
      const s = await Storage.getShards();
      setCompletedIds(prog.completedLevels);
      setStarMap(prog.starMap);
      setShards(s);
    };
    load();
    const unsub = navigation.addListener('focus', load);
    return unsub;
  }, [navigation]);

  const totalCompleted = completedIds.length;

  const handleLevel = (levelId) => {
    navigation.navigate('Game', { levelId });
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient colors={['#080C1A', '#060A14', '#040810']} style={StyleSheet.absoluteFill} />

      <Header
        title="ALEMLER"
        shards={shards}
        onBack={() => navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Global progress */}
        <View style={styles.globalStats}>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{totalCompleted}</Text>
            <Text style={styles.statLabel}>Tamamlanan</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNum}>{shards}</Text>
            <Text style={[styles.statLabel, { color: COLORS.shardGold }]}>◆ Kıymık</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNum}>{LEVELS.length}</Text>
            <Text style={styles.statLabel}>Toplam</Text>
          </View>
        </View>

        {/* Realm sections */}
        {REALM_ORDER.map((realm) => {
          const realmLevels = LEVELS.filter(l => l.realm === realm);
          const isLocked = totalCompleted < REALM_UNLOCK_LEVEL[realm];
          return (
            <RealmSection
              key={realm}
              realm={realm}
              levels={realmLevels}
              completedIds={completedIds}
              starMap={starMap}
              onLevel={handleLevel}
              isLocked={isLocked}
              shards={shards}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { padding: 16, gap: 16, paddingTop: 12 },

  globalStats: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 8,
  },
  stat: { flex: 1, alignItems: 'center' },
  statNum: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontFamily: 'Cinzel_700Bold',
  },
  statLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontFamily: 'Rajdhani_400Regular',
    letterSpacing: 1,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },

  realmSection: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  lockedSection: { opacity: 0.6 },

  realmHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  realmIcon: { fontSize: 28 },
  realmName: {
    fontSize: 16,
    fontFamily: 'Cinzel_700Bold',
    letterSpacing: 2,
  },
  realmSub: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontFamily: 'Rajdhani_400Regular',
    letterSpacing: 2,
    marginTop: 2,
  },
  lockBadge: {
    backgroundColor: COLORS.elevated,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  lockText: { color: COLORS.textMuted, fontSize: 12, fontFamily: 'Rajdhani_500Medium' },
  progressText: {
    fontSize: 14,
    fontFamily: 'Rajdhani_700Bold',
  },

  progressBar: {
    height: 3,
    backgroundColor: COLORS.elevated,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 2 },

  levelGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  levelBtn: {
    width: (SW - 32 - 16 - 48) / 5,
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: COLORS.elevated,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelNum: {
    color: COLORS.textSecondary,
    fontSize: 16,
    fontFamily: 'Cinzel_700Bold',
  },
  stars: { fontSize: 9, color: COLORS.shardGold, marginTop: 2 },
  levelUnlocked: { fontSize: 10, color: COLORS.crystalDim, marginTop: 2 },
  levelLocked: { fontSize: 10, marginTop: 2 },
});
