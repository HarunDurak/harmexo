/**
 * HARMEXO — CrosswordGrid
 * Özgün çarpraz kelime ızgarası.
 * Tüm tasarım ve kod orijinaldir.
 */
import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import { View, Text, Animated, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { COLORS, LIGHT_COLORS } from '../theme';

const { width: SW } = Dimensions.get('window');
const BASE_CELL = 36;
const GAP = 3;

// ─── Crossword Layout Builder ────────────────────────────────────────────────
function buildCrossword(words) {
  // En uzun kelimeden başla — daha fazla kesişim noktası sağlar
  const sorted = [...words].sort((a, b) => b.length - a.length);

  const grid = {};   // grid[row][col] = { letter, wordStr }
  const placed = []; // { word, row, col, dir }

  const get = (r, c) => grid[r]?.[c];

  const set = (r, c, letter, wordStr) => {
    if (!grid[r]) grid[r] = {};
    // Kesişim noktası: birden fazla kelime aynı hücreyi kullanabilir
    if (!grid[r][c]) grid[r][c] = { letter, words: [] };
    if (!grid[r][c].words.includes(wordStr)) {
      grid[r][c].words.push(wordStr);
    }
  };

  function canPlace(word, row, col, dir) {
    let intersections = placed.length === 0 ? 1 : 0;

    for (let i = 0; i < word.length; i++) {
      const r = dir === 'H' ? row : row + i;
      const c = dir === 'H' ? col + i : col;
      const cell = get(r, c);

      if (cell) {
        if (cell.letter !== word[i]) return false; // harf çakışması
        intersections++;
      } else {
        // Paralel komşu kontrol: iki kelime yan yana oturamaz
        if (dir === 'H') {
          if (get(r - 1, c) || get(r + 1, c)) return false;
        } else {
          if (get(r, c - 1) || get(r, c + 1)) return false;
        }
      }
    }

    // Kelime başı ve sonu boş olmalı
    if (dir === 'H') {
      if (get(row, col - 1) || get(row, col + word.length)) return false;
    } else {
      if (get(row - 1, col) || get(row + word.length, col)) return false;
    }

    return intersections > 0;
  }

  function placeWord(word, row, col, dir) {
    for (let i = 0; i < word.length; i++) {
      const r = dir === 'H' ? row : row + i;
      const c = dir === 'H' ? col + i : col;
      set(r, c, word[i], word);
    }
    placed.push({ word, row, col, dir });
  }

  const C = 10; // merkez nokta
  const first = sorted[0];
  placeWord(first, C, C - Math.floor(first.length / 2), 'H');

  for (let wi = 1; wi < sorted.length; wi++) {
    const word = sorted[wi];
    let best = null;
    let bestScore = -Infinity;

    for (const p of placed) {
      const nDir = p.dir === 'H' ? 'V' : 'H';

      for (let pi = 0; pi < p.word.length; pi++) {
        for (let li = 0; li < word.length; li++) {
          if (p.word[pi] !== word[li]) continue;

          const nr = p.dir === 'H' ? p.row - li : p.row + pi;
          const nc = p.dir === 'H' ? p.col + pi : p.col - li;

          if (canPlace(word, nr, nc, nDir)) {
            // Merkeze yakın yerleştirmeleri tercih et
            const score = 100 - Math.abs(nr - C) - Math.abs(nc - C);
            if (score > bestScore) {
              bestScore = score;
              best = { row: nr, col: nc, dir: nDir };
            }
          }
        }
      }
    }

    if (best) placeWord(word, best.row, best.col, best.dir);
  }

  return { grid, placed, sortedWords: sorted };
}

// ─── Hücre bileşeni ──────────────────────────────────────────────────────────
function Cell({ letter, revealed, accent, cellSize, isDark }) {
  const C = isDark ? COLORS : LIGHT_COLORS;
  const fadeAnim = useRef(new Animated.Value(revealed ? 1 : 0)).current;
  const scaleAnim = useRef(new Animated.Value(revealed ? 1 : 0.6)).current;
  const glowAnim = useRef(new Animated.Value(revealed ? 1 : 0)).current;

  useEffect(() => {
    if (revealed) {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 320, useNativeDriver: true }),
        Animated.spring(scaleAnim, {
          toValue: 1, tension: 90, friction: 6, useNativeDriver: true,
        }),
        Animated.timing(glowAnim, { toValue: 1, duration: 400, useNativeDriver: false }),
      ]).start();
    }
  }, [revealed]);

  const bgColor = isDark
    ? (revealed ? accent + '1A' : C.surface)
    : (revealed ? accent + '25' : '#FFFFFF');

  const borderColor = isDark
    ? (revealed ? accent : C.border)
    : (revealed ? accent : '#C4CEEA');

  const fontSize = cellSize * 0.46;

  return (
    <Animated.View
      style={[
        styles.cell,
        {
          width: cellSize,
          height: cellSize,
          borderRadius: cellSize * 0.14,
          backgroundColor: bgColor,
          borderColor: borderColor,
          shadowColor: revealed ? accent : 'transparent',
          shadowOpacity: revealed ? 0.45 : 0,
          shadowRadius: revealed ? 6 : 0,
          shadowOffset: { width: 0, height: 0 },
          elevation: revealed ? 4 : 1,
        },
      ]}
    >
      {revealed ? (
        <Animated.Text
          style={[
            styles.cellLetter,
            {
              fontSize,
              color: accent,
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {letter}
        </Animated.Text>
      ) : (
        // Boş hücre — sadece küçük nokta göster
        <View
          style={[
            styles.emptyDot,
            { backgroundColor: isDark ? C.border : '#B0BCDA' },
          ]}
        />
      )}
    </Animated.View>
  );
}

// ─── Ana bileşen ─────────────────────────────────────────────────────────────
export default function CrosswordGrid({
  words,
  foundWords,
  accentColor,
  isDark = true,
  wordStatus = 'idle',   // 'idle' | 'correct' | 'wrong' | 'already'
}) {
  const C = isDark ? COLORS : LIGHT_COLORS;
  const accent = accentColor || C.crystalCore;

  // ── Panel animasyonları ────────────────────────────────────────────────
  // borderAnim: -1=kırmızı  0=normal  1=yeşil  (useNativeDriver:false)
  const borderAnim  = useRef(new Animated.Value(0)).current;
  // shakeAnim: sadece yanlış için  (useNativeDriver:true)
  const shakeAnim   = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (wordStatus === 'correct') {
      // Yeşil yanıp söner
      Animated.sequence([
        Animated.timing(borderAnim, { toValue: 1,  duration: 120, useNativeDriver: false }),
        Animated.timing(borderAnim, { toValue: 0,  duration: 700, useNativeDriver: false }),
      ]).start();

    } else if (wordStatus === 'wrong' || wordStatus === 'already') {
      // Kırmızı yanıp söner + grid titrer
      borderAnim.setValue(-1);
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue:  5, duration: 55, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -5, duration: 55, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue:  3, duration: 45, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue:  0, duration: 45, useNativeDriver: true }),
      ]).start();
      Animated.timing(borderAnim, { toValue: 0, duration: 700, delay: 150, useNativeDriver: false }).start();
    }
  }, [wordStatus]);

  // Renk interpolasyonu
  const panelBorderColor = borderAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['#FF4D6A', isDark ? COLORS.border : '#C4CEEA', '#4AE896'],
  });
  const panelBorderWidth = borderAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [2.5, 1, 2.5],
  });
  const panelGlow = borderAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['#FF4D6A', 'transparent', '#4AE896'],
  });

  const [containerH, setContainerH] = useState(260);
  const onLayout = useCallback((e) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0) setContainerH(h);
  }, []);

  const { grid, placed } = useMemo(
    () => buildCrossword(words),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [words.join(',')]
  );

  // Izgara sınırlarını bul
  let minR = Infinity, maxR = -Infinity;
  let minC = Infinity, maxC = -Infinity;

  for (const rKey of Object.keys(grid)) {
    const ri = Number(rKey);
    minR = Math.min(minR, ri);
    maxR = Math.max(maxR, ri);
    for (const cKey of Object.keys(grid[rKey])) {
      const ci = Number(cKey);
      minC = Math.min(minC, ci);
      maxC = Math.max(maxC, ci);
    }
  }

  const totalCols = maxC - minC + 1;
  const totalRows = maxR - minR + 1;
  const maxWidth  = SW - 48;
  const padding   = 12 * 2 + 6 * 2; // panel padding + scrollView paddingVertical

  // Hem genişlik hem yüksekliğe sığacak şekilde hesapla
  const cellByW = Math.floor((maxWidth  - (totalCols - 1) * GAP) / totalCols);
  const cellByH = Math.floor((containerH - padding - (totalRows - 1) * GAP) / totalRows);
  const cellSize = Math.min(BASE_CELL, cellByW, cellByH);

  // Hücrenin herhangi bir kelimesi bulundu mu?
  const isCellRevealed = (r, c) => {
    const cell = grid[r]?.[c];
    if (!cell) return false;
    return cell.words.some(w => foundWords.includes(w));
  };

  // Satır satır render
  const rows = [];
  for (let r = minR; r <= maxR; r++) {
    const cells = [];
    for (let c = minC; c <= maxC; c++) {
      const cell = grid[r]?.[c];
      if (cell) {
        cells.push(
          <Cell
            key={`${r}-${c}`}
            letter={cell.letter}
            revealed={isCellRevealed(r, c)}
            accent={accent}
            cellSize={cellSize}
            isDark={isDark}
          />
        );
      } else {
        // Boş alan — görünmez spacer
        cells.push(
          <View key={`${r}-${c}`} style={{ width: cellSize, height: cellSize }} />
        );
      }
    }
    rows.push(
      <View key={r} style={[styles.row, { gap: GAP }]}>
        {cells}
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      onLayout={onLayout}
    >
      {/* Titreme + renk: iki ayrı Animated.View (native vs non-native) */}
      <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
        <Animated.View
          style={[
            styles.gridPanel,
            {
              backgroundColor: isDark ? COLORS.deep + '80' : '#EEF2FA',
              borderColor: panelBorderColor,
              borderWidth: panelBorderWidth,
              shadowColor: panelGlow,
              shadowOpacity: 0.8,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 0 },
            },
          ]}
        >
          <View style={[styles.gridInner, { gap: GAP }]}>
            {rows}
          </View>
        </Animated.View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  gridPanel: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
  },
  gridInner: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellLetter: {
    fontFamily: 'Cinzel_700Bold',
    letterSpacing: 0,
    textAlign: 'center',
  },
  emptyDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    opacity: 0.35,
  },
});
