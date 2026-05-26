// HARMEXO — Design System
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

// ── Day palette — warm stone + soft blue ─────────────
export const LIGHT_COLORS = {
  // Surfaces — ılık taş beyazı, göz yormaz
  void:     '#E8E6E1',
  abyss:    '#F0EEE9',   // ana arka plan
  deep:     '#E2E0DA',
  surface:  '#F8F7F4',
  elevated: '#CCDCEE',   // soft mavi — kelime/input alanları
  border:   '#A8C4DC',

  // Primary accent — soft blue
  crystalCore:  '#3A7DB8',
  crystalGlow:  '#1A5C96',
  crystalDim:   '#6AAAD8',
  crystalFaint: '#C8E0F4',

  emberCore: '#3A7DB8',
  emberGlow: '#1A5C96',

  arcaneCore: '#5898C8',
  arcaneGlow: '#3070A8',

  successCore: '#3A9870',
  successGlow: '#1A7850',
  errorCore:   '#C03838',
  errorGlow:   '#A01818',

  // Text — koyu, net okunur
  textPrimary:   '#18222E',
  textSecondary: '#2E4460',
  textMuted:     '#6880A0',

  shardGold: '#9A7820',
  shardDim:  '#6E5610',
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

// ── Light realm themes — warm stone bg, soft blue tones
export const LIGHT_REALM_THEMES = {
  ember: {
    name:   'Ember Realm',
    nameTR: 'Kor Alemi',
    bg:     ['#F0EEE9', '#E8E6E1', '#F5F4F0'],
    accent: '#3A7DB8',
    glow:   '#1A5C96',
    particle: '#6AAAD8',
    icon: '🔥',
  },
  frost: {
    name:   'Frost Realm',
    nameTR: 'Buz Alemi',
    bg:     ['#EDF0F4', '#E4E8EE', '#F3F5F8'],
    accent: '#3A7DB8',
    glow:   '#1A5C96',
    particle: '#80B8DC',
    icon: '❄️',
  },
  storm: {
    name:   'Storm Realm',
    nameTR: 'Fırtına Alemi',
    bg:     ['#EEEDF4', '#E6E4EE', '#F4F3F8'],
    accent: '#5A6CB8',
    glow:   '#3A4C98',
    particle: '#8890D0',
    icon: '⚡',
  },
  verdant: {
    name:   'Verdant Realm',
    nameTR: 'Orman Alemi',
    bg:     ['#EDF2EE', '#E4EDE6', '#F3F7F4'],
    accent: '#3A9870',
    glow:   '#1A7850',
    particle: '#60B898',
    icon: '🌿',
  },
  celestial: {
    name:   'Celestial Realm',
    nameTR: 'Gök Alemi',
    bg:     ['#F0EEE9', '#E8E6E1', '#F5F4F0'],
    accent: '#5888B8',
    glow:   '#386898',
    particle: '#88AAD0',
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
