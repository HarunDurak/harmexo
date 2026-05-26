export const LEVELS = [

  // ── KOR ALEMİ ─────────────────────────────────────────
  {
    id: 1, realm: 'ember', realmLevel: 1,
    title: 'İlk Alev', titleTR: 'İlk Alev',
    letters: ['K','A','N','A','R','I'],
    words:   ['KAN','KAR','NAR','KINA','KARIN','KARINA'],
    bonus:   ['KARA','ANI','KANI','RAN'],
    shardReward: 10, difficulty: 1,
  },
  {
    id: 2, realm: 'ember', realmLevel: 2,
    title: 'Alevlenen', titleTR: 'Alevlenen',
    letters: ['Y','A','K','M','A','K'],
    words:   ['YAK','KAY','YAKA','KAMA','KAYAK','YAKMAK'],
    bonus:   ['MAK','YAMA','AKA','KAM'],
    shardReward: 15, difficulty: 1,
  },
  {
    id: 3, realm: 'ember', realmLevel: 3,
    title: 'Kartal Uçuşu', titleTR: 'Kartal Uçuşu',
    letters: ['K','A','R','T','A','L'],
    words:   ['KAR','KAT','KART','KARA','TARLA','KARTAL'],
    bonus:   ['KAL','TAL','TAK','AKTAR'],
    shardReward: 15, difficulty: 1,
  },
  {
    id: 4, realm: 'ember', realmLevel: 4,
    title: 'Kavramak', titleTR: 'Kavramak',
    letters: ['K','A','V','R','A','M'],
    words:   ['KAR','KAM','KARA','KARMA','KAVRAM'],
    bonus:   ['MAR','KAMA','RAKAM','MAK'],
    shardReward: 20, difficulty: 2,
  },
  {
    id: 5, realm: 'ember', realmLevel: 5,
    title: 'Şelale', titleTR: 'Şelale',
    letters: ['Ş','E','L','A','L','E'],
    words:   ['EL','ŞAL','LALE','ŞALE','ŞELALE'],
    bonus:   ['ELA','EŞ','ALE','ELL'],
    shardReward: 25, difficulty: 2,
  },

  // ── BUZ ALEMİ ─────────────────────────────────────────
  {
    id: 21, realm: 'frost', realmLevel: 1,
    title: 'İlk Buz', titleTR: 'İlk Buz',
    letters: ['D','O','N','M','A','K'],
    words:   ['DON','ODA','DONA','DONMA','DONMAK'],
    bonus:   ['DAM','KOMA','MOD','KOM'],
    shardReward: 10, difficulty: 1,
  },
  {
    id: 22, realm: 'frost', realmLevel: 2,
    title: 'Buzul', titleTR: 'Buzul',
    letters: ['B','U','Z','U','L','A'],
    words:   ['BUZ','ULU','ZULA','BUZUL'],
    bonus:   ['BAL','BUL','BLUZ','LAZ'],
    shardReward: 15, difficulty: 1,
  },
  {
    id: 23, realm: 'frost', realmLevel: 3,
    title: 'Yelken', titleTR: 'Yelken',
    letters: ['Y','E','L','K','E','N'],
    words:   ['YEL','KEL','YELE','ELEK','YELEK','YELKEN'],
    bonus:   ['KEN','ELE','LEK','EL'],
    shardReward: 15, difficulty: 1,
  },
  {
    id: 24, realm: 'frost', realmLevel: 4,
    title: 'Sarmal', titleTR: 'Sarmal',
    letters: ['S','A','R','M','A','L'],
    words:   ['SAR','SAL','MAL','ARMA','SARMAL'],
    bonus:   ['MAR','MASA','ALARM','LAM'],
    shardReward: 20, difficulty: 2,
  },
  {
    id: 25, realm: 'frost', realmLevel: 5,
    title: 'Armoni', titleTR: 'Armoni',
    letters: ['A','R','M','O','N','I'],
    words:   ['ANI','ORAN','ROMAN','ARMONI'],
    bonus:   ['MAR','MANI','ORA','MORA'],
    shardReward: 25, difficulty: 2,
  },

  // ── FIRTINA ALEMİ ─────────────────────────────────────
  {
    id: 41, realm: 'storm', realmLevel: 1,
    title: 'Anlama', titleTR: 'Anlama',
    letters: ['A','N','L','A','M','A'],
    words:   ['ANA','MAL','ALMA','ANLAM','ANLAMA'],
    bonus:   ['NAM','MANA','ALAN','LAM'],
    shardReward: 25, difficulty: 2,
  },
  {
    id: 42, realm: 'storm', realmLevel: 2,
    title: 'Keskin', titleTR: 'Keskin',
    letters: ['K','E','S','K','I','N'],
    words:   ['KES','EKIN','SINEK','KESKIN'],
    bonus:   ['SIN','KEN','SINE','KESKI'],
    shardReward: 30, difficulty: 2,
  },
  {
    id: 43, realm: 'storm', realmLevel: 3,
    title: 'Kapalı', titleTR: 'Kapalı',
    letters: ['K','A','P','A','L','I'],
    words:   ['KAP','KAPI','KAPLA','KAPALI'],
    bonus:   ['KAL','PALA','KALIP','KALP'],
    shardReward: 30, difficulty: 3,
  },

  // ── ORMAN ALEMİ ───────────────────────────────────────
  {
    id: 61, realm: 'verdant', realmLevel: 1,
    title: 'Yaprak', titleTR: 'Yaprak',
    letters: ['Y','A','P','R','A','K'],
    words:   ['YAK','KAP','PARA','KARA','YAPRAK'],
    bonus:   ['KAY','PAY','ARK','PARYA'],
    shardReward: 30, difficulty: 2,
  },
  {
    id: 62, realm: 'verdant', realmLevel: 2,
    title: 'Servet', titleTR: 'Servet',
    letters: ['S','E','R','V','E','T'],
    words:   ['SET','SERT','TERS','SEVER','SERVET'],
    bonus:   ['VER','ESER','RES','VERSE'],
    shardReward: 35, difficulty: 2,
  },

  // ── GÖK ALEMİ ─────────────────────────────────────────
  {
    id: 81, realm: 'celestial', realmLevel: 1,
    title: 'Yıldız', titleTR: 'Yıldız',
    letters: ['Y','I','L','D','I','Z'],
    words:   ['DIZ','DIL','DIZI','YILDI','YILDIZ'],
    bonus:   ['ZIL','YIL','ILK','LID'],
    shardReward: 40, difficulty: 3,
  },
  {
    id: 82, realm: 'celestial', realmLevel: 2,
    title: 'Kâinat', titleTR: 'Kâinat',
    letters: ['K','A','I','N','A','T'],
    words:   ['TAN','KAT','NAKIT','TANIK','KAINAT'],
    bonus:   ['KAN','ANI','TIKAN','KIN'],
    shardReward: 50, difficulty: 3,
  },
  {
    id: 83, realm: 'celestial', realmLevel: 3,
    title: 'Yılmaz', titleTR: 'Yılmaz',
    letters: ['Y','I','L','M','A','Z'],
    words:   ['MAL','YALI','ALIM','ZALIM','YILMAZ'],
    bonus:   ['YIL','LAZ','AZIM','LAZIM'],
    shardReward: 60, difficulty: 3,
  },
];

export const REALM_ORDER = ['ember','frost','storm','verdant','celestial'];
export const REALM_UNLOCK_LEVEL = { ember:0, frost:20, storm:40, verdant:60, celestial:80 };
export function getLevelsByRealm(realm) { return LEVELS.filter(l => l.realm === realm); }
export function getLevelById(id) { return LEVELS.find(l => l.id === id) || null; }
