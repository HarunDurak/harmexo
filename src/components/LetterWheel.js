import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  PanResponder,
} from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { COLORS } from '../theme';
import { calcCirclePositions } from '../utils/gameLogic';

const { width: SW } = Dimensions.get('window');
const WHEEL_SIZE   = Math.min(SW - 40, 320);
const CENTER       = WHEEL_SIZE / 2;
const LETTER_RADIUS = WHEEL_SIZE * 0.36;
const LETTER_SIZE  = 54;
const HIT_RADIUS   = LETTER_SIZE / 2 + 10; // Dokunma toleransı

export default function LetterWheel({
  letters,
  selectedIndices,
  onLetterPress,
  onDragStart,     // Sürükleme başlarken seçimi temizle
  onDragComplete,  // Sürükleme bitince (indices[]) gönder → otomatik submit
  accentColor = COLORS.crystalCore,
  shake = false,
}) {
  const positions = calcCirclePositions(letters.length, LETTER_RADIUS, CENTER, CENTER);

  const shakeAnim  = useRef(new Animated.Value(0)).current;
  const scaleAnims = useRef(letters.map(() => new Animated.Value(1))).current;

  // Ref'ler — PanResponder stale closure sorununu önler
  const onLetterPressRef   = useRef(onLetterPress);
  const onDragStartRef     = useRef(onDragStart);
  const onDragCompleteRef  = useRef(onDragComplete);
  const positionsRef       = useRef(positions);
  useEffect(() => { onLetterPressRef.current  = onLetterPress;  });
  useEffect(() => { onDragStartRef.current    = onDragStart;    });
  useEffect(() => { onDragCompleteRef.current = onDragComplete; });
  useEffect(() => { positionsRef.current = positions; }, [letters.length]);

  // Shake animasyonu
  useEffect(() => {
    if (!shake) return;
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue:  5, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -5, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue:  3, duration: 45, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue:  0, duration: 45, useNativeDriver: true }),
    ]).start();
  }, [shake]);

  // Ekran koordinatlarını ölç
  const containerRef    = useRef(null);
  const containerOffset = useRef({ x: 0, y: 0 });
  const measureLayout   = () => {
    containerRef.current?.measure((_, __, ___, ____, pageX, pageY) => {
      containerOffset.current = { x: pageX, y: pageY };
    });
  };

  // Hangi harfin üzerinde → index (-1 = yok)
  const findLetterAt = (px, py) => {
    const { x: ox, y: oy } = containerOffset.current;
    const pos = positionsRef.current;
    for (let i = 0; i < pos.length; i++) {
      const dx = px - (ox + pos[i].x);
      const dy = py - (oy + pos[i].y);
      if (Math.sqrt(dx * dx + dy * dy) < HIT_RADIUS) return i;
    }
    return -1;
  };

  // Harf pulse animasyonu
  const pulseIdx = (idx) => {
    if (!scaleAnims[idx]) return;
    Animated.sequence([
      Animated.timing(scaleAnims[idx], { toValue: 1.35, duration: 65, useNativeDriver: true }),
      Animated.timing(scaleAnims[idx], { toValue: 1.0,  duration: 65, useNativeDriver: true }),
    ]).start();
  };

  // Jestür durumu
  const gestureMode  = useRef('none'); // 'none' | 'tap' | 'drag'
  const tapStartIdx  = useRef(-1);
  const dragVisited  = useRef([]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder:        () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder:         () => true,

      onPanResponderGrant: (evt) => {
        measureLayout();
        gestureMode.current = 'tap';
        dragVisited.current = [];
        const { pageX, pageY } = evt.nativeEvent;
        tapStartIdx.current = findLetterAt(pageX, pageY);
      },

      onPanResponderMove: (evt, gs) => {
        const moved = Math.sqrt(gs.dx * gs.dx + gs.dy * gs.dy);

        if (gestureMode.current === 'tap' && moved > 8) {
          // Sürüklemeye geç
          gestureMode.current = 'drag';
          dragVisited.current = [];
          onDragStartRef.current?.();   // GameScreen seçimi temizler

          // İlk harfi ekle
          if (tapStartIdx.current !== -1) {
            dragVisited.current.push(tapStartIdx.current);
            onLetterPressRef.current(tapStartIdx.current);
            pulseIdx(tapStartIdx.current);
          }
        }

        if (gestureMode.current === 'drag') {
          const { pageX, pageY } = evt.nativeEvent;
          const idx = findLetterAt(pageX, pageY);
          if (idx !== -1 && !dragVisited.current.includes(idx)) {
            dragVisited.current.push(idx);
            onLetterPressRef.current(idx);
            pulseIdx(idx);
          }
        }
      },

      onPanResponderRelease: () => {
        if (gestureMode.current === 'tap') {
          // Normal tek tıklama
          const idx = tapStartIdx.current;
          if (idx !== -1) {
            pulseIdx(idx);
            onLetterPressRef.current(idx);
          }
        } else if (gestureMode.current === 'drag') {
          // Sürükleme bitti → GameScreen otomatik submit
          onDragCompleteRef.current?.(dragVisited.current);
        }
        gestureMode.current = 'none';
        dragVisited.current = [];
      },

      onPanResponderTerminate: () => {
        gestureMode.current = 'none';
        dragVisited.current = [];
      },
    })
  ).current;

  const isSelected    = (idx) => selectedIndices.includes(idx);
  const selectionOrder = (idx) => selectedIndices.indexOf(idx) + 1;

  return (
    <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
      <View
        ref={containerRef}
        onLayout={measureLayout}
        style={[styles.container, { width: WHEEL_SIZE, height: WHEEL_SIZE }]}
        {...panResponder.panHandlers}
      >
        {/* Bağlantı çizgileri */}
        <Svg
          width={WHEEL_SIZE}
          height={WHEEL_SIZE}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        >
          {selectedIndices.slice(0, -1).map((fromIdx, i) => {
            const from = positions[fromIdx];
            const to   = positions[selectedIndices[i + 1]];
            if (!from || !to) return null;
            return (
              <Line
                key={`ln-${i}`}
                x1={from.x} y1={from.y}
                x2={to.x}   y2={to.y}
                stroke={accentColor}
                strokeWidth={2.5}
                strokeOpacity={0.65}
                strokeLinecap="round"
              />
            );
          })}
        </Svg>

        {/* Merkez orb */}
        <View style={[styles.centerOrb, { borderColor: accentColor + '40' }]}>
          <View style={[styles.centerOrbInner, { backgroundColor: accentColor + '15' }]} />
        </View>

        {/* Harf düğmeleri */}
        {letters.map((letter, idx) => {
          const pos      = positions[idx];
          const selected = isSelected(idx);
          const order    = selectionOrder(idx);

          return (
            <Animated.View
              key={idx}
              style={[
                styles.letterWrap,
                {
                  left: pos.x - LETTER_SIZE / 2,
                  top:  pos.y - LETTER_SIZE / 2,
                  transform: [{ scale: scaleAnims[idx] }],
                },
              ]}
            >
              <View
                style={[
                  styles.letterBtn,
                  {
                    backgroundColor: selected ? accentColor + '25' : COLORS.elevated,
                    borderColor:     selected ? accentColor : COLORS.border,
                    borderWidth:     selected ? 2 : 1,
                    shadowColor:     selected ? accentColor : 'transparent',
                    shadowOpacity:   selected ? 0.85 : 0,
                    shadowRadius:    selected ? 12 : 0,
                    elevation:       selected ? 7 : 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.letterText,
                    { color: selected ? accentColor : COLORS.textPrimary },
                  ]}
                >
                  {letter}
                </Text>
                {selected && (
                  <View style={[styles.orderBadge, { backgroundColor: accentColor }]}>
                    <Text style={styles.orderText}>{order}</Text>
                  </View>
                )}
              </View>
            </Animated.View>
          );
        })}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'center',
  },
  centerOrb: {
    position: 'absolute',
    width: 64, height: 64,
    borderRadius: 32,
    borderWidth: 1,
    left: CENTER - 32,
    top:  CENTER - 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerOrbInner: {
    width: 48, height: 48,
    borderRadius: 24,
  },
  letterWrap: {
    position: 'absolute',
    width: LETTER_SIZE,
    height: LETTER_SIZE,
  },
  letterBtn: {
    width: LETTER_SIZE,
    height: LETTER_SIZE,
    borderRadius: LETTER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 0 },
  },
  letterText: {
    fontSize: 26,
    fontFamily: 'Cinzel_700Bold',
    letterSpacing: 1,
  },
  orderBadge: {
    position: 'absolute',
    top: -4, right: -4,
    width: 18, height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Rajdhani_700Bold',
  },
});
