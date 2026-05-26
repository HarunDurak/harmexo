import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

export default function WordBar({ currentWord, status, accentColor = COLORS.crystalCore }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(currentWord ? 1 : 0)).current;

  const statusColors = {
    idle:    COLORS.textMuted,
    typing:  accentColor,
    correct: COLORS.successCore,
    wrong:   COLORS.errorCore,
    bonus:   COLORS.arcaneCore,
    already: COLORS.emberCore,
  };

  const color = statusColors[status] || COLORS.textMuted;
  const hasWord = Boolean(currentWord);

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: hasWord ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [hasWord]);

  useEffect(() => {
    if (status === 'correct' || status === 'bonus') {
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.08, duration: 90, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1.0,  duration: 90, useNativeDriver: true }),
      ]).start();
    }
  }, [status]);

  // Kelime yokken: sadece ince çizgi / çok küçük göstergeMini bar
  if (!hasWord && status === 'idle') {
    return (
      <View style={styles.emptyBar}>
        <View style={styles.emptyLine} />
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          borderColor: color + '90',
          backgroundColor: color + '12',
          transform: [{ scale: pulseAnim }],
          opacity: hasWord ? 1 : 0.6,
        },
      ]}
    >
      <Text style={[styles.word, { color }]}>
        {currentWord || statusLabel(status)}
      </Text>
    </Animated.View>
  );
}

function statusLabel(status) {
  switch (status) {
    case 'wrong':   return '✕';
    case 'already': return '—';
    default:        return '';
  }
}

const styles = StyleSheet.create({
  // Kelime varken: normal pill
  container: {
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 22,
    paddingVertical: 9,
    minWidth: 140,
    alignItems: 'center',
    marginVertical: 6,
    alignSelf: 'center',
  },
  word: {
    fontSize: 22,
    fontFamily: 'Cinzel_700Bold',
    letterSpacing: 4,
  },

  // Kelime yokken: sadece ince çizgi
  emptyBar: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    marginVertical: 6,
  },
  emptyLine: {
    width: 40,
    height: 2,
    borderRadius: 1,
    backgroundColor: COLORS.border,
    opacity: 0.5,
  },
});
