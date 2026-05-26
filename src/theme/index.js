// VERBEX — Design System
// Original aesthetic: "Cosmic Crystal" — deep space with crystalline geometry

// ── Night palette ────────────────────────────────────
export const COLORS = {
  // Surfaces — deep navy, daha az siyah, daha atmosferik
  void:     '#05091A',
  abyss:    '#080E22',
  deep:     '#0E1630',
  surface:  '#131D3A',
  elevated: '#1C2848',
  border:   '#2A3A6A',

  // Crystal accent
  crystalCore:  '#5CF0E0',
  crystalGlow:  '#30C0B0',
  crystalDim:   '#1A7068',
  crystalFaint: '#0D3430',

  // Ember
  emberCore: '#FF9A50',
  emberGlow: '#E06828',

  // Arcane
  arcaneCore: '#C080FF',
  arcaneGlow: '#8044CC',

  // Status
  successCore: '#50EAA0',
  successGlow: '#28A868',
  errorCore:   '#FF5577',
  errorGlow:   '#CC2848',

  // Text
  textPrimary:   '#ECF2FF',
  textSecondary: '#8EA8D8',
  textMuted:     '#4A5E90',

  // Shard
  shardGold: '#FFD166',
  shardDim:  '#9B7820',
};

// ── Day palette — sıcak, iç açıcı ───────────────────
export const LIGHT_COLORS = {
  void:     '#F5F0E8',
  abyss:    '#FAF6EF',
  deep:     '#EDE8E0',
  surface:  '#FFFFFF',
  elevated: '#F0ECE4',
  border:   '#D4C8B8',

  crystalCore:  '#1A7FAA',
  crystalGlow:  '#005E88',
  crystalDim:   '#7ABBD4',
  crystalFaint: '#C8E8F4',

  emberCore: '#D45500',
  emberGlow: '#A83800',

  arcaneCore: '#7030C8',
  arcaneGlow: '#501099',

  successCore: '#1A8850',
  successGlow: '#006638',
  errorCore:   '#CC1A30',
  errorGlow:   '#A00020',

  textPrimary:   '#1A1A2E',
  textSecondary: '#4A4A6E',
  textMuted:     '#888899',

  shardGold: '#A07800',
  shardDim:  '#7A5A00',
};

// ── Night realm themes — daha renkli arka planlar ───
export const REALM_THEMES = {
  ember: {
    name:   'Ember Realm',
    nameTR: 'Kor Alemi',
    bg:     ['#1A0804', '#120504', '#0A0308'],
    accent: '#FF9A50',
    glow:   '#FF5500',
    particle: '#FFAA44',
    icon: '🔥',
  },
  frost: {
    name:   'Frost Realm',
    nameTR: 'Buz Alemi',
    bg:     ['#041826', '#020E1A', '#030A14'],
    accent: '#5CF0E0',
    glow:   '#00CCFF',
    particle: '#AAEEFF',
    icon: '❄️',
  },
  storm: {
    name:   'Storm Realm',
    nameTR: 'Fırtına Alemi',
    bg:     ['#0E0A22', '#080618', '#05020E'],
    accent: '#C080FF',
    glow:   '#9050FF',
    particle: '#DDAAFF',
    icon: '⚡',
  },
  verdant: {
    name:   'Verdant Realm',
    nameTR: 'Orman Alemi',
    bg:     ['#071209', '#050C06', '#030804'],
    accent: '#50EAA0',
    glow:   '#28CC70',
    particle: '#88FFBB',
    icon: '🌿',
  },
  celestial: {
    name:   'Celestial Realm',
    nameTR: 'Gök Alemi',
    bg:     ['#0C0814', '#080512', '#04020A'],
    accent: '#FFD166',
    glow:   '#FFAA00',
    particle: '#FFE888',
    icon: '✨',
  },
};

// ── Light realm themes — sıcak, canlı ───────────────
export const LIGHT_REALM_THEMES = {
  ember: {
    name:   'Ember Realm',
    nameTR: 'Kor Alemi',
    bg:     ['#FFF0E4', '#FFE4CC', '#FFF8F2'],
    accent: '#D45500',
    glow:   '#FF7700',
    particle: '#FF9944',
    icon: '🔥',
  },
  frost: {
    name:   'Frost Realm',
    nameTR: 'Buz Alemi',
    bg:     ['#EAF4FF', '#D4ECFF', '#F0F8FF'],
    accent: '#1A7FAA',
    glow:   '#00AACC',
    particle: '#55CCEE',
    icon: '❄️',
  },
  storm: {
    name:   'Storm Realm',
    nameTR: 'Fırtına Alemi',
    bg:     ['#F0EAFF', '#E4D8FF', '#F8F4FF'],
    accent: '#7030C8',
    glow:   '#9A50FF',
    particle: '#BB88FF',
    icon: '⚡',
  },
  verdant: {
    name:   'Verdant Realm',
    nameTR: 'Orman Alemi',
    bg:     ['#E8F6EC', '#D4EFDC', '#F2FAF4'],
    accent: '#1A8850',
    glow:   '#22AA55',
    particle: '#55CC88',
    icon: '🌿',
  },
  celestial: {
    name:   'Celestial Realm',
    nameTR: 'Gök Alemi',
    bg:     ['#FFF8E8', '#FFF0CC', '#FFFCF0'],
    accent: '#A07800',
    glow:   '#CC9900',
    particle: '#DDBB44',
    icon: '✨',
  },
};

export function getTheme(isDark) {
  return {
    colors:      isDark ? COLORS : LIGHT_COLORS,
    realmThemes: isDark ? REALM_THEMES : LIGHT_REALM_THEMES,
  };
}

export const FONTS = {
  display: 'Cinzel',
  heading: 'Cinzel',
  body:    'Rajdhani',
};

export const SIZES = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48,
};

export const SHADOWS = {
  crystalGlow: {
    shadowColor: '#5CF0E0',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 10,
  },
};
