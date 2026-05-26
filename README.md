# LEXORA — Word Realms
### Orijinal Mobil Kelime Oyunu | Original Mobile Word Game

---

## 🎮 Oyun Hakkında / About

**LEXORA: Word Realms**, Words of Wonders'dan ilham alınarak sıfırdan tasarlanmış, **telif hakkı açısından tamamen bağımsız** bir mobil kelime bulmaca oyunudur.

**LEXORA: Word Realms** is a fully original mobile word puzzle game inspired by (not copying) the word-connection genre. Every asset, mechanic name, system, and design element is original.

---

## ✨ Orijinallik Farkları / Original Differentiators

| Özellik | Words of Wonders | **LEXORA** |
|---|---|---|
| Tema | Dünya anıtları | **Gizemli Alemler (Realms)** |
| Para birimi | Coins | **◆ Kıymık (Shards)** |
| İpucu sistemi | Hint | **Echo Reveal** |
| Level geçişi | Ülke/şehir bazlı | **Realm + kristal enerji** |
| Renk kimliği | Açık mavi/yeşil | **Kozmik kristal / void siyahı** |
| Font | Sistem fontları | **Cinzel + Rajdhani (özgün çift)** |
| Ekstra kelimeler | Bonus words | **Arcane Words (gizli ödüller)** |
| Estetik | Turistik harita | **Karanlık uzay kristali** |

---

## 📁 Proje Yapısı / Project Structure

```
LEXORA/
├── App.js                    # Root, navigation, font loading
├── app.json                  # Expo config
├── package.json              # Dependencies
├── eas.json                  # Build config (Android + iOS)
├── babel.config.js
│
├── src/
│   ├── theme/
│   │   └── index.js          # Colors, realm themes, fonts, sizes
│   │
│   ├── data/
│   │   └── levels.js         # All level data (EN + TR) — 100 levels plan
│   │
│   ├── utils/
│   │   ├── gameLogic.js      # Pure game functions (check word, hint, stars...)
│   │   └── storage.js        # AsyncStorage wrapper (progress, shards, settings)
│   │
│   ├── screens/
│   │   ├── HomeScreen.js     # Ana ekran / Main menu
│   │   ├── RealmMapScreen.js # Dünya haritası / Level map
│   │   └── GameScreen.js     # Oyun ekranı / Gameplay
│   │
│   └── components/
│       ├── Header.js         # Top bar with back/shards/settings
│       ├── LetterWheel.js    # Circular letter selector
│       ├── WordGrid.js       # Word slots display
│       └── WordBar.js        # Current word feedback bar
```

---

## 🚀 Kurulum / Setup

### Gereksinimler / Requirements
- **Node.js** 18+ 
- **Expo CLI**: `npm install -g expo-cli`
- **EAS CLI** (build için): `npm install -g eas-cli`
- Android Studio (Android emulator) veya Xcode (iOS simulator)

### 1. Bağımlılıkları Yükle / Install Dependencies
```bash
cd LEXORA
npm install
```

### 2. Geliştirme Sunucusu / Start Dev Server
```bash
npx expo start
```

Ardından:
- **Android**: `a` tuşuna bas veya Expo Go app ile QR oku
- **iOS**: `i` tuşuna bas veya Expo Go app ile QR oku
- **Web**: `w` tuşuna bas (tam test için mobil önerilir)

---

## 📱 Build (APK / IPA)

### Android APK (test için / for testing)
```bash
eas build --platform android --profile preview
```

### Android App Bundle (Play Store)
```bash
eas build --platform android --profile production
```

### iOS (App Store)
```bash
eas build --platform ios --profile production
```

> **Not:** EAS Build için `eas login` ile Expo hesabına giriş yapman gerekir.
> Ücretsiz hesap ile ayda birkaç build yapılabilir.

---

## 🎯 Oyun Mekaniği / Game Mechanics

### Temel Döngü / Core Loop
1. Ekranda **gizli kelime yuvalar** gösterilir
2. Harfler **kristal çark** üzerinde daire şeklinde dizilir
3. Harflere sırayla tıklayarak kelime oluşturulur
4. **GİR** butonuna basılır → Doğruysa kelime yuvasını doldurur
5. Tüm kelimeler bulununca seviye tamamlanır

### Puanlama / Scoring
- ⭐⭐⭐ **3 Yıldız**: İpucu kullanmadan tüm bonus kelimeleri bul
- ⭐⭐ **2 Yıldız**: İpucu kullanmadan bitir
- ⭐ **1 Yıldız**: İpucu kullanarak bitir

### Kıymık Sistemi / Shard System
- Her seviye tamamlandığında **◆ Kıymık** kazanılır
- Yıldız sayısı ve bonus kelimeler ödülü artırır
- İpucu için **30 ◆ Kıymık** harcanır

### Arcane (Bonus) Kelimeler
- Seviyenin ana listesinde olmayan ama harflerden oluşturulabilen gizli kelimeler
- Mor renk animasyonu ile gösterilir
- +5 ◆ Kıymık her bonus kelime için

---

## 🌍 Alemler / Realms

| Alem | Seviyeler | Tema | Renk |
|---|---|---|---|
| 🔥 Kor Alemi (Ember) | 1–20 | Ateş, kül, volkan | Turuncu |
| ❄️ Buz Alemi (Frost) | 21–40 | Buz, kar, aurora | Teal |
| ⚡ Fırtına Alemi (Storm) | 41–60 | Gök gürültüsü, rüzgar | Mor |
| 🌿 Orman Alemi (Verdant) | 61–80 | Orman, kök, yaprak | Yeşil |
| ✨ Gök Alemi (Celestial) | 81–100 | Yıldızlar, galaksi | Altın |

---

## 📊 Genişletme Planı / Roadmap

### v1.0 (Mevcut / Current)
- [x] 5 Realm, 15+ başlangıç seviyesi
- [x] Tam oyun döngüsü (wheel → submit → complete)
- [x] AsyncStorage ile ilerleme kaydetme
- [x] Kıymık sistemi
- [x] İpucu sistemi
- [x] Türkçe + İngilizce kelime desteği
- [x] Haptic feedback
- [x] Animasyonlar (shake, pulse, level complete)

### v1.1
- [ ] 100 seviye tamamlanması
- [ ] Türkçe kelime bankası genişletilmesi
- [ ] Ses efektleri (Expo AV)
- [ ] Günlük görev sistemi
- [ ] Cloud save (Supabase / Firebase)

### v1.2
- [ ] Çok oyunculu (realtime battle mod)
- [ ] Reklam monetizasyon (AdMob)
- [ ] IAP — Kıymık paketi satışları
- [ ] Leaderboard

### v2.0
- [ ] 3D realm animasyonları (Three.js / Lottie)
- [ ] Seslendirme (harfler için)
- [ ] Özel seviye editörü

---

## 🏪 Yayınlama / Publishing

### Google Play Store
1. `eas build --platform android --profile production`
2. `.aab` dosyasını Play Console'a yükle
3. İçerik derecelendirmesi: **Everyone (E)**
4. Kategori: **Word Games / Kelime Oyunları**

### Apple App Store
1. Expo Apple Developer hesabı bağla
2. `eas build --platform ios --profile production`
3. TestFlight üzerinden test
4. App Store Connect'e gönder

---

## 📜 Telif Hakkı / Copyright Notice

Bu proje tamamen orijinal bir eserdir:
- Tüm kelimeler genel sözlük kelimeleridir (telif hakkı koruması yoktur)
- Oyun mekaniği tamamen özgün biçimde yeniden tasarlanmıştır
- Tüm isimler, temalar, renkler, tipografiler özgün seçimlerdir
- Words of Wonders veya Zynga'nın herhangi bir varlığı kullanılmamıştır

This is a completely original work. All game mechanics are independently designed.

---

*LEXORA — Kelimelerin Ötesine Geç / Beyond the Word*
