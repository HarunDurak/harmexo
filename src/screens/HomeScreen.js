import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, REALM_THEMES } from '../theme';
import { Storage } from '../utils/storage';

const { width: SW, height: SH } = Dimensions.get('window');

// Floating particles
function Particles({ color }) {
  const particles = useRef(
    Array.from({ length: 12 }, () => ({
      x: new Animated.Value(Math.random() * SW),
      y: new Animated.Value(Math.random() * SH),
      op: new Animated.Value(Math.random()),
      size: Math.random() * 3 + 1,
    }))
  ).current;

  useEffect(() => {
    particles.forEach((p, i) => {
      const loop = () => {
        Animated.parallel([
          Animated.timing(p.y, {
            toValue: -20,
            duration: 4000 + i * 500,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(p.op, { toValue: 0.8, duration: 2000, useNativeDriver: true }),
            Animated.timing(p.op, { toValue: 0, duration: 2000, useNativeDriver: true }),
          ]),
        ]).start(() => {
          p.x.setValue(Math.random() * SW);
          p.y.setValue(SH + 20);
          p.op.setValue(0);
          loop();
        });
      };
      setTimeout(loop, i * 400);
    });
  }, []);

  return (
    <>
      {particles.map((p, i) => (
        <Animated.View
          key={i}
          style={{
            position: 'absolute',
            transform: [{ translateX: p.x }, { translateY: p.y }],
            opacity: p.op,
            width: p.size,
            height: p.size,
            borderRadius: p.size / 2,
            backgroundColor: color,
          }}
        />
      ))}
    </>
  );
}

export default function HomeScreen({ navigation }) {
  const [shards, setShards] = useState(0);
  const [lastRealm, setLastRealm] = useState('frost');
  const titleAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const btnAnim = useRef(new Animated.Value(0)).current;

  const theme = REALM_THEMES[lastRealm] || REALM_THEMES.frost;

  useEffect(() => {
    Storage.getShards().then(setShards);

    Animated.stagger(200, [
      Animated.timing(titleAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.timing(subtitleAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(btnAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const handlePlay = () => navigation.navigate('RealmMap');
  const handleContinue = () => navigation.navigate('Game', { levelId: 1 });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient colors={theme.bg} style={StyleSheet.absoluteFill} />
      <Particles color={theme.particle} />

      {/* Decorative rings */}
      <View style={[styles.ring, styles.ringOuter, { borderColor: theme.accent + '18' }]} />
      <View style={[styles.ring, styles.ringMid, { borderColor: theme.accent + '25' }]} />
      <View style={[styles.ring, styles.ringInner, { borderColor: theme.accent + '35' }]} />

      {/* Shard counter */}
      <View style={styles.shardBar}>
        <View style={[styles.shardBadge, { borderColor: COLORS.shardDim }]}>
          <Text style={styles.shardIcon}>◆</Text>
          <Text style={styles.shardCount}>{shards}</Text>
        </View>
      </View>

      {/* Logo */}
      <View style={styles.logoArea}>
        <Animated.Text
          style={[
            styles.logoText,
            { color: theme.accent },
            {
              opacity: titleAnim,
              transform: [
                {
                  translateY: titleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [40, 0],
                  }),
                },
              ],
            },
          ]}
        >
          HARMEXO
        </Animated.Text>
        <Animated.Text
          style={[
            styles.logoSub,
            {
              opacity: subtitleAnim,
              transform: [
                {
                  translateY: subtitleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          KELIME  ALEMLERİ
        </Animated.Text>

        <Animated.View style={{ opacity: subtitleAnim, marginTop: 8 }}>
          <Text style={[styles.realmBadge, { color: theme.accent + 'AA', borderColor: theme.accent + '40' }]}>
            {theme.icon}  {theme.nameTR}
          </Text>
        </Animated.View>
      </View>

      {/* Buttons */}
      <Animated.View
        style={[
          styles.btnArea,
          {
            opacity: btnAnim,
            transform: [
              {
                translateY: btnAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.primaryBtn, { borderColor: theme.accent, shadowColor: theme.glow }]}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[theme.accent + '30', theme.accent + '10']}
            style={styles.btnGradient}
          >
            <Text style={[styles.primaryBtnText, { color: theme.accent }]}>DEVAM ET</Text>
            <Text style={[styles.primaryBtnSub, { color: theme.accent + '99' }]}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={handlePlay}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryBtnText}>ALEMLER  ›</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Bottom tagline */}
      <Text style={styles.tagline}>Kelimelerin Ötesine Geç  ·  HARMEXO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  ring: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 1,
    left: '50%',
    top: '50%',
  },
  ringOuter: {
    width: SW * 1.4,
    height: SW * 1.4,
    marginLeft: -(SW * 0.7),
    marginTop: -(SW * 0.7),
  },
  ringMid: {
    width: SW * 0.95,
    height: SW * 0.95,
    marginLeft: -(SW * 0.475),
    marginTop: -(SW * 0.475),
  },
  ringInner: {
    width: SW * 0.55,
    height: SW * 0.55,
    marginLeft: -(SW * 0.275),
    marginTop: -(SW * 0.275),
  },

  shardBar: {
    position: 'absolute',
    top: 54,
    right: 20,
  },
  shardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.elevated,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    gap: 5,
  },
  shardIcon: { color: COLORS.shardGold, fontSize: 11 },
  shardCount: {
    color: COLORS.shardGold,
    fontSize: 15,
    fontFamily: 'Rajdhani_600SemiBold',
  },

  logoArea: { alignItems: 'center', marginBottom: 60 },
  logoText: {
    fontSize: 52,
    fontFamily: 'Cinzel_700Bold',
    letterSpacing: 10,
  },
  logoSub: {
    fontSize: 13,
    fontFamily: 'Rajdhani_600SemiBold',
    color: COLORS.textSecondary,
    letterSpacing: 8,
    marginTop: 4,
  },
  realmBadge: {
    fontSize: 13,
    fontFamily: 'Rajdhani_500Medium',
    letterSpacing: 3,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 10,
  },

  btnArea: { width: SW - 60, alignItems: 'center', gap: 14 },

  primaryBtn: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1.5,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 8,
  },
  btnGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  primaryBtnText: {
    fontSize: 18,
    fontFamily: 'Cinzel_700Bold',
    letterSpacing: 4,
  },
  primaryBtnSub: {
    fontSize: 12,
    fontFamily: 'Rajdhani_400Regular',
    letterSpacing: 2,
    marginTop: 2,
  },

  secondaryBtn: {
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  secondaryBtnText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontFamily: 'Rajdhani_600SemiBold',
    letterSpacing: 4,
  },

  tagline: {
    position: 'absolute',
    bottom: 36,
    color: COLORS.textMuted,
    fontSize: 12,
    fontFamily: 'Rajdhani_400Regular',
    letterSpacing: 3,
  },
});
