import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../theme';

function WordSlot({ word, found, accentColor }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (found) {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scaleAnim, { toValue: 1.12, duration: 150, useNativeDriver: true }),
          Animated.timing(scaleAnim, { toValue: 1.0, duration: 150, useNativeDriver: true }),
        ]),
        Animated.timing(glowAnim, { toValue: 1, duration: 400, useNativeDriver: false }),
      ]).start();
    }
  }, [found]);

  return (
    <Animated.View
      style={[
        styles.wordRow,
        { transform: [{ scale: scaleAnim }] },
        found && {
          borderColor: accentColor,
          backgroundColor: accentColor + '12',
        },
      ]}
    >
      {word.split('').map((letter, i) => (
        <View
          key={i}
          style={[
            styles.letterSlot,
            found && { borderBottomColor: accentColor },
          ]}
        >
          <Text
            style={[
              styles.slotLetter,
              found
                ? { color: accentColor }
                : { color: 'transparent' },
            ]}
          >
            {found ? letter : '●'}
          </Text>
        </View>
      ))}
    </Animated.View>
  );
}

export default function WordGrid({ words, foundWords, accentColor = COLORS.crystalCore }) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {words.map((word, i) => (
        <WordSlot
          key={i}
          word={word}
          found={foundWords.includes(word)}
          accentColor={accentColor}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    alignItems: 'center',
    gap: 10,
  },
  wordRow: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
  },
  letterSlot: {
    width: 28,
    height: 34,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.border,
    paddingBottom: 2,
  },
  slotLetter: {
    fontSize: 20,
    fontFamily: 'Cinzel_700Bold',
    letterSpacing: 1,
  },
});
