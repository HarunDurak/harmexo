# HARMEXO — Kelime Alemleri
### Orijinal Mobil Kelime Bulmaca Oyunu

<p align="center">
  <img src="assets/icon.png" width="100" alt="HARMEXO icon" />
</p>

---

## 🎮 Oyun Hakkında

**HARMEXO: Kelime Alemleri**, harflerden kelime oluşturma mekaniklerini **gizemli bir kozmik evren** temasıyla birleştiren, sıfırdan tasarlanmış bağımsız bir mobil kelime bulmaca oyunudur.

Her tasarım öğesi — isimler, temalar, renkler, tipografi, ödül sistemi — özgün olarak yaratılmıştır.

---

## ✨ Öne Çıkan Özellikler

| Özellik | Detay |
|---|---|
| 🌍 **5 Gizemli Alem** | Kor · Buz · Fırtına · Orman · Gök |
| ◆ **Kıymık Sistemi** | Seviye ödülleri, ipucu harcamaları |
| 🔮 **Arcane Kelimeler** | Gizli bonus kelimeler, mor animasyon |
| ⭐ **Yıldız Derecelendirme** | 3 yıldız için ipuçsuz + tüm bonusları bul |
| 🌙 **Gece / Gündüz Modu** | Kozmik koyu tema + ılık taş aydınlık tema |
| ✍️ **Çapraz Kelime Izgarası** | Harfler otomatik crossword düzeninde yerleşir |
| 🎯 **Sürükleme Desteği** | Harfleri sürükleyerek kelime oluştur |
| 📳 **Haptic Geri Bildirim** | Dokunsal animasyonlar |

---

## 📁 Proje Yapısı

```
harmexo/
├── App.js                      # Root, navigation, font yükleme
├── app.json                    # Expo konfigürasyonu
├── package.json                # Bağımlılıklar
├── eas.json                    # Build konfigürasyonu
│
├── assets/
│   └── icon.png / splash.png
│
└── src/
    ├── theme/
    │   └── index.js            # Renkler, alem temaları, fontlar
    │
    ├── data/
    │   └── levels.js           # Tüm seviye verileri (5 alem, 18+ seviye)
    │
    ├── utils/
    │   ├── gameLogic.js        # Saf oyun fonksiyonları (checkWord, hint, stars…)
    │   └── storage.js          # AsyncStorage (ilerleme, kıymık, ayarlar)
    │
    ├── context/
    │   └── ThemeContext.js     # Gece/Gündüz tema context'i
    │
    ├── screens/
    │   ├── HomeScreen.js       # Ana ekran
    │   ├── RealmMapScreen.js   # Alem haritası
    │   └── GameScreen.js       # Oyun ekranı
    │
    └── components/
        ├── Header.js           # Üst bar (geri / kıymık / tema)
        ├── LetterWheel.js      # Dairesel harf seçici
        ├── CrosswordGrid.js    # Çapraz kelime ızgarası
        ├── WordGrid.js         # Kelime yuvaları
        └── WordBar.js          # Anlık kelime göstergesi
```

---

## 🚀 Kurulum

### Gereksinimler
- **Node.js** 18+
- **Expo CLI** — `npm install -g expo-cli`
- **EAS CLI** (build için) — `npm install -g eas-cli`
- Android Studio (Android emülatör) veya Xcode (iOS simülatör)

### 1. Bağımlılıkları Yükle
```bash
cd harmexo
npm install
```

### 2. Geliştirme Sunucusunu Başlat
```bash
npx expo start
```

- **Android** → `a` tuşu veya Expo Go ile QR oku
- **iOS** → `i` tuşu veya Expo Go ile QR oku
- **Web** → `w` tuşu *(tam test için mobil önerilir)*

---

## 📱 Build (APK / IPA)

### Android — Test APK
```bash
eas build --platform android --profile preview
```

### Android — Play Store
```bash
eas build --platform android --profile production
```

### iOS — App Store
```bash
eas build --platform ios --profile production
```

> **Not:** `eas login` ile Expo hesabına giriş gerekir.

---

## 🎯 Oyun Mekaniği

### Temel Döngü
1. Ekranda **gizli kelime yuvaları** crossword düzeninde gösterilir
2. Harfler **kristal çark** üzerinde daire şeklinde dizilir
3. Harflere tıklayarak veya **sürükleyerek** kelime oluşturulur
4. Doğru kelime → yuvayı doldurur, animasyon oynar
5. Tüm kelimeler tamamlanınca seviye biter

### Yıldız Sistemi
| Yıldız | Koşul |
|---|---|
| ⭐⭐⭐ | İpucu yok + tüm Arcane kelimeler bulundu |
| ⭐⭐ | İpucu yok |
| ⭐ | İpucu kullanıldı |

### ◆ Kıymık Sistemi
- Her seviye tamamlandığında Kıymık kazanılır
- Yıldız sayısı ödülü artırır (×1.0 → ×1.25 → ×1.5)
- **◆ İpucu:** 50 Kıymık — bulunmamış en kısa kelimenin ilk harfini gösterir
- Bonus Arcane kelimeler +5 ◆ ekstra ödül verir

### 🔮 Arcane (Bonus) Kelimeler
Seviyenin ana listesinde olmayan, ama mevcut harflerden oluşturulabilen gizli kelimeler.
Mor animasyon ile gösterilir; ekstra Kıymık ödülü verir.

---

## 🌍 Alemler

| Alem | Seviyeler | Tema | Renk |
|---|---|---|---|
| 🔥 **Kor Alemi** (Ember) | 1 – 20 | Ateş, kül, volkan | Turuncu |
| ❄️ **Buz Alemi** (Frost) | 21 – 40 | Buz, kar, aurora | Teal |
| ⚡ **Fırtına Alemi** (Storm) | 41 – 60 | Gök gürültüsü, rüzgar | Mor |
| 🌿 **Orman Alemi** (Verdant) | 61 – 80 | Orman, kök, yaprak | Yeşil |
| ✨ **Gök Alemi** (Celestial) | 81 – 100 | Yıldızlar, galaksi | Altın |

Her alem, bir öncekinde belirli sayıda seviye tamamlanınca açılır.

---

## 📊 Yol Haritası

### v1.0 ✅ Mevcut
- [x] 5 Alem, 18 başlangıç seviyesi
- [x] Tam oyun döngüsü (wheel → submit → complete)
- [x] Çapraz kelime ızgarası (otomatik crossword layout)
- [x] Sürükleme + tıklama desteği
- [x] AsyncStorage ile ilerleme kaydetme
- [x] Kıymık & İpucu sistemi
- [x] Arcane bonus kelimeler
- [x] Gece / Gündüz tema
- [x] Haptic feedback & animasyonlar

### v1.1
- [ ] 100 seviyeye tamamlama
- [ ] Türkçe kelime bankası genişletme
- [ ] Ses efektleri (Expo AV)
- [ ] Günlük görev sistemi
- [ ] Cloud save (Supabase / Firebase)

### v1.2
- [ ] Çok oyunculu (realtime battle)
- [ ] Reklam monetizasyon (AdMob)
- [ ] IAP — Kıymık paketi satışları
- [ ] Küresel sıralama tablosu

### v2.0
- [ ] 3D alem animasyonları (Lottie)
- [ ] Özel seviye editörü
- [ ] Seslendirme

---

## 🏪 Yayınlama

### Google Play Store
1. `eas build --platform android --profile production`
2. `.aab` dosyasını Play Console'a yükle
3. İçerik derecelendirmesi: **Everyone (E)**
4. Kategori: **Kelime Oyunları / Word Games**

### Apple App Store
1. `eas build --platform ios --profile production`
2. TestFlight üzerinden test et
3. App Store Connect'e gönder

---

## 📜 Telif Hakkı

Bu proje tamamen orijinal bir eserdir:
- Tüm kelimeler genel sözlük kelimeleridir
- Oyun mekaniği bağımsız olarak tasarlanmıştır
- Tüm isimler, temalar, renkler ve tipografiler özgün seçimlerdir

---

*HARMEXO — Kelimelerin Alemine Aç Kapıyı*
