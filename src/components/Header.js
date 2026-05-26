import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, LIGHT_COLORS } from '../theme';

export default function Header({
  title,
  shards,
  onBack,
  onSettings,
  onThemeToggle,
  isDark = true,
}) {
  const C = isDark ? COLORS : LIGHT_COLORS;
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: C.border, paddingTop: insets.top + 8 },
      ]}
    >
      {/* Sol — Geri butonu */}
      {onBack ? (
        <TouchableOpacity
          style={styles.btn}
          onPress={onBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.icon, { color: C.crystalCore }]}>‹</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.btn} />
      )}

      {/* Orta — başlık */}
      <Text style={[styles.title, { color: C.textPrimary }]}>{title}</Text>

      {/* Sağ — kıymık + tema + ayar */}
      <View style={styles.rightGroup}>
        {shards !== undefined && (
          <View style={[styles.shardBadge, { backgroundColor: C.elevated, borderColor: C.shardDim }]}>
            <Text style={[styles.shardIcon, { color: C.shardGold }]}>◆</Text>
            <Text style={[styles.shardCount, { color: C.shardGold }]}>{shards}</Text>
          </View>
        )}

        {/* Gece / Gündüz butonu */}
        {onThemeToggle && (
          <TouchableOpacity
            style={[
              styles.themeBtn,
              {
                backgroundColor: isDark ? '#1A2240' : '#E0E8FF',
                borderColor: isDark ? '#253060' : '#C0CCEE',
              },
            ]}
            onPress={onThemeToggle}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.themeIcon}>{isDark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
        )}

        {onSettings && (
          <TouchableOpacity
            style={styles.btn}
            onPress={onSettings}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={[styles.icon, { color: C.crystalCore }]}>⚙</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  btn: {
    width: 36,
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
    fontWeight: '300',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Cinzel_400Regular',
    letterSpacing: 3,
    textTransform: 'uppercase',
    flex: 1,
    textAlign: 'center',
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  shardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderWidth: 1,
    gap: 4,
  },
  shardIcon: {
    fontSize: 10,
  },
  shardCount: {
    fontSize: 13,
    fontFamily: 'Rajdhani_600SemiBold',
    letterSpacing: 0.5,
  },
  themeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeIcon: {
    fontSize: 16,
  },
});
