import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  PROGRESS:       '@harmexo_progress',
  SHARDS:         '@harmexo_shards',
  SETTINGS:       '@harmexo_settings',
  LANG:           '@harmexo_lang',
  LAST_LEVEL:     '@harmexo_last_level',
};

export const Storage = {
  // ── Progress ──────────────────────────────────────────────
  async getProgress() {
    try {
      const raw = await AsyncStorage.getItem(KEYS.PROGRESS);
      return raw ? JSON.parse(raw) : { completedLevels: [], starMap: {}, bonusMap: {} };
    } catch {
      return { completedLevels: [], starMap: {}, bonusMap: {} };
    }
  },

  async saveLevel(levelId, stars, bonusFound) {
    try {
      const prog = await Storage.getProgress();
      if (!prog.completedLevels.includes(levelId)) {
        prog.completedLevels.push(levelId);
      }
      // Keep best stars
      if (!prog.starMap[levelId] || stars > prog.starMap[levelId]) {
        prog.starMap[levelId] = stars;
      }
      prog.bonusMap[levelId] = bonusFound;
      await AsyncStorage.setItem(KEYS.PROGRESS, JSON.stringify(prog));
    } catch (e) {
      console.warn('Storage.saveLevel error', e);
    }
  },

  async isLevelCompleted(levelId) {
    const prog = await Storage.getProgress();
    return prog.completedLevels.includes(levelId);
  },

  // ── Shards ────────────────────────────────────────────────
  async getShards() {
    try {
      const raw = await AsyncStorage.getItem(KEYS.SHARDS);
      return raw ? parseInt(raw, 10) : 100; // start with 100
    } catch {
      return 100;
    }
  },

  async addShards(amount) {
    const current = await Storage.getShards();
    const next = current + amount;
    await AsyncStorage.setItem(KEYS.SHARDS, String(next));
    return next;
  },

  async spendShards(amount) {
    const current = await Storage.getShards();
    if (current < amount) return false;
    await AsyncStorage.setItem(KEYS.SHARDS, String(current - amount));
    return true;
  },

  // ── Settings ─────────────────────────────────────────────
  async getSettings() {
    try {
      const raw = await AsyncStorage.getItem(KEYS.SETTINGS);
      return raw ? JSON.parse(raw) : { sound: true, haptics: true, notifications: true };
    } catch {
      return { sound: true, haptics: true, notifications: true };
    }
  },

  async saveSettings(settings) {
    await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  },

  // ── Language ──────────────────────────────────────────────
  async getLang() {
    try {
      return (await AsyncStorage.getItem(KEYS.LANG)) || 'en';
    } catch {
      return 'en';
    }
  },

  async setLang(lang) {
    await AsyncStorage.setItem(KEYS.LANG, lang);
  },

  // ── Last level (devam et) ─────────────────────────────────
  async getLastLevelId() {
    try {
      const raw = await AsyncStorage.getItem(KEYS.LAST_LEVEL);
      return raw ? parseInt(raw, 10) : 1;
    } catch {
      return 1;
    }
  },

  async saveLastLevelId(levelId) {
    try {
      await AsyncStorage.setItem(KEYS.LAST_LEVEL, String(levelId));
    } catch (e) {
      console.warn('Storage.saveLastLevelId error', e);
    }
  },

  // ── Reset (for testing) ───────────────────────────────────
  async resetAll() {
    await AsyncStorage.multiRemove(Object.values(KEYS));
  },
};
