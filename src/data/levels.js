// LEXORA — Türkçe Seviye Verileri
// Tüm kelimeler Türkçedir. Harf havuzundan oluşturulabilir kelimeler.
// Pool: oyuncuya verilen harfler | words: bulunması gereken kelimeler | bonus: ekstra kelimeler

export const LEVELS = [

  // ═══════════════════════════════════════════
  // KOR ALEMİ  (Ember) — Levels 1–5
  // ═══════════════════════════════════════════
  {
    id: 1,
    realm: 'ember',
    realmLevel: 1,
    title: 'İlk Alev',
    titleTR: 'İlk Alev',
    letters: ['K', 'A', 'S', 'T', 'O', 'E'],
    words:   ['KAS', 'TAS', 'SAT', 'SOTE', 'STOK'],
    bonus:   ['TOK', 'SET', 'KOT', 'TAK', 'TOKA'],
    shardReward: 10,
    difficulty: 1,
  },
  {
    id: 2,
    realm: 'ember',
    realmLevel: 2,
    title: 'Alevlenen',
    titleTR: 'Alevlenen',
    letters: ['Y', 'A', 'K', 'M', 'A', 'K'],
    words:   ['YAK', 'KAMA', 'YAKA', 'KAYAK', 'YAKMAK'],
    bonus:   ['KAY', 'MAYA', 'YAMA', 'MAK'],
    shardReward: 15,
    difficulty: 1,
  },
  {
    id: 3,
    realm: 'ember',
    realmLevel: 3,
    title: 'Kalem Alemi',
    titleTR: 'Kalem Alemi',
    letters: ['K', 'A', 'L', 'E', 'M', 'A'],
    words:   ['KAL', 'MAL', 'KALE', 'ELMA', 'KALEM'],
    bonus:   ['KAMA', 'ELA', 'ALMA', 'LAM'],
    shardReward: 15,
    difficulty: 1,
  },
  {
    id: 4,
    realm: 'ember',
    realmLevel: 4,
    title: 'Kartal Uçuşu',
    titleTR: 'Kartal Uçuşu',
    letters: ['K', 'A', 'R', 'T', 'A', 'L'],
    words:   ['KAR', 'KAT', 'KARA', 'KART', 'KARTAL'],
    bonus:   ['KAL', 'TAK', 'ART', 'LAK'],
    shardReward: 20,
    difficulty: 2,
  },
  {
    id: 5,
    realm: 'ember',
    realmLevel: 5,
    title: 'Kızgın Toprak',
    titleTR: 'Kızgın Toprak',
    letters: ['T', 'O', 'P', 'R', 'A', 'K'],
    words:   ['TOP', 'KOR', 'ART', 'KOPRA', 'TOPRAK'],
    bonus:   ['TAK', 'PAK', 'KAP', 'OKA'],
    shardReward: 25,
    difficulty: 2,
  },

  // ═══════════════════════════════════════════
  // BUZ ALEMİ  (Frost) — Levels 21–25
  // ═══════════════════════════════════════════
  {
    id: 21,
    realm: 'frost',
    realmLevel: 1,
    title: 'İlk Buz',
    titleTR: 'İlk Buz',
    letters: ['D', 'O', 'N', 'M', 'A', 'K'],
    words:   ['DON', 'DAM', 'ODA', 'DONA', 'DONMAK'],
    bonus:   ['DAK', 'KAM', 'MAD', 'MOD'],
    shardReward: 10,
    difficulty: 1,
  },
  {
    id: 22,
    realm: 'frost',
    realmLevel: 2,
    title: 'Buzul',
    titleTR: 'Buzul',
    letters: ['B', 'U', 'Z', 'U', 'L', 'A'],
    words:   ['BUZ', 'BAL', 'BUL', 'ZULA', 'BUZUL'],
    bonus:   ['ULU', 'LAZ', 'BAZ', 'ALU'],
    shardReward: 15,
    difficulty: 1,
  },
  {
    id: 23,
    realm: 'frost',
    realmLevel: 3,
    title: 'Kar Sesi',
    titleTR: 'Kar Sesi',
    letters: ['K', 'A', 'R', 'L', 'A', 'R'],
    words:   ['KAR', 'KAL', 'KARA', 'KARLA', 'KARLAR'],
    bonus:   ['LAK', 'RAK', 'ARLA', 'LAR'],
    shardReward: 15,
    difficulty: 1,
  },
  {
    id: 24,
    realm: 'frost',
    realmLevel: 4,
    title: 'Yelken Açıyor',
    titleTR: 'Yelken Açıyor',
    letters: ['Y', 'E', 'L', 'K', 'E', 'N'],
    words:   ['YEL', 'KEL', 'YELE', 'ELEK', 'YELKEN'],
    bonus:   ['EKO', 'LEK', 'KEN', 'ELE'],
    shardReward: 20,
    difficulty: 2,
  },
  {
    id: 25,
    realm: 'frost',
    realmLevel: 5,
    title: 'Yarın',
    titleTR: 'Yarın',
    letters: ['Y', 'A', 'R', 'I', 'N', 'A'],
    words:   ['NAR', 'ARI', 'YARI', 'ANA', 'YARIN'],
    bonus:   ['YAR', 'ANI', 'RAN', 'ARIN'],
    shardReward: 25,
    difficulty: 2,
  },

  // ═══════════════════════════════════════════
  // FIRTINA ALEMİ  (Storm) — Levels 41–43
  // ═══════════════════════════════════════════
  {
    id: 41,
    realm: 'storm',
    realmLevel: 1,
    title: 'Tufan',
    titleTR: 'Tufan',
    letters: ['T', 'U', 'F', 'A', 'N', 'S'],
    words:   ['TAN', 'FAN', 'SUN', 'FANUS', 'TUFAN'],
    bonus:   ['NUT', 'FUT', 'ANT', 'SAT'],
    shardReward: 25,
    difficulty: 2,
  },
  {
    id: 42,
    realm: 'storm',
    realmLevel: 2,
    title: 'Boran',
    titleTR: 'Boran',
    letters: ['B', 'O', 'R', 'A', 'N', 'A'],
    words:   ['BAR', 'NAR', 'OBA', 'BORA', 'BORAN'],
    bonus:   ['BAN', 'ARN', 'ORAN', 'RON'],
    shardReward: 30,
    difficulty: 2,
  },
  {
    id: 43,
    realm: 'storm',
    realmLevel: 3,
    title: 'Simsek',
    titleTR: 'Simsek',
    letters: ['S', 'I', 'M', 'S', 'E', 'K'],
    words:   ['SES', 'ESKI', 'SEKI', 'EKIM', 'SIMSEK'],
    bonus:   ['MES', 'SKI', 'KIM', 'ISM'],
    shardReward: 30,
    difficulty: 3,
  },

  // ═══════════════════════════════════════════
  // ORMAN ALEMİ  (Verdant) — Levels 61–62
  // ═══════════════════════════════════════════
  {
    id: 61,
    realm: 'verdant',
    realmLevel: 1,
    title: 'Orman',
    titleTR: 'Orman',
    letters: ['O', 'R', 'M', 'A', 'N', 'A'],
    words:   ['NAR', 'ARMA', 'ORAN', 'AROMA', 'ORMAN'],
    bonus:   ['ORA', 'MAR', 'NOM', 'ROMAN'],
    shardReward: 30,
    difficulty: 2,
  },
  {
    id: 62,
    realm: 'verdant',
    realmLevel: 2,
    title: 'Yaprak',
    titleTR: 'Yaprak',
    letters: ['Y', 'A', 'P', 'R', 'A', 'K'],
    words:   ['KAP', 'PAK', 'PARA', 'KARA', 'YAPRAK'],
    bonus:   ['YAK', 'KAY', 'PAY', 'ARK'],
    shardReward: 35,
    difficulty: 2,
  },

  // ═══════════════════════════════════════════
  // GÖK ALEMİ  (Celestial) — Levels 81–83
  // ═══════════════════════════════════════════
  {
    id: 81,
    realm: 'celestial',
    realmLevel: 1,
    title: 'Yildiz',
    titleTR: 'Yıldız',
    letters: ['Y', 'I', 'L', 'D', 'I', 'Z'],
    words:   ['DIZ', 'DIL', 'ZIL', 'DIZI', 'YILDIZ'],
    bonus:   ['ILK', 'LID', 'ILD', 'ZID'],
    shardReward: 40,
    difficulty: 3,
  },
  {
    id: 82,
    realm: 'celestial',
    realmLevel: 2,
    title: 'Kainat',
    titleTR: 'Kainat',
    letters: ['K', 'A', 'I', 'N', 'A', 'T'],
    words:   ['TAN', 'ANI', 'KATI', 'KINA', 'KAINAT'],
    bonus:   ['KAT', 'TAK', 'NIT', 'KAN'],
    shardReward: 50,
    difficulty: 3,
  },
  {
    id: 83,
    realm: 'celestial',
    realmLevel: 3,
    title: 'Nebula',
    titleTR: 'Nebula',
    letters: ['N', 'E', 'B', 'U', 'L', 'A'],
    words:   ['NAL', 'BAL', 'BUL', 'BALE', 'NEBULA'],
    bonus:   ['ULU', 'BAN', 'LAB', 'ABU'],
    shardReward: 60,
    difficulty: 3,
  },
];

// ─── Yardımcı fonksiyonlar ──────────────────────────────────────────────────
export const REALM_ORDER = ['ember', 'frost', 'storm', 'verdant', 'celestial'];

export const REALM_UNLOCK_LEVEL = {
  ember:     0,
  frost:    20,
  storm:    40,
  verdant:  60,
  celestial: 80,
};

export function getLevelsByRealm(realm) {
  return LEVELS.filter(l => l.realm === realm);
}

export function getLevelById(id) {
  return LEVELS.find(l => l.id === id) || null;
}
