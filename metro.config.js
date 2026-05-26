const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Hermes uyumluluğu: bu paketleri Babel'dan geçir (private fields + DOMException)
config.transformer.transformIgnorePatterns = [
  'node_modules/(?!(react-native|@react-native|react-native-svg|react-native-gesture-handler|react-native-screens|react-native-safe-area-context|expo|@expo|@expo-google-fonts|expo-linear-gradient|expo-haptics|expo-font|expo-splash-screen|expo-status-bar|@react-navigation|whatwg-fetch)/)',
];

module.exports = config;
