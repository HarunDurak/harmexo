// ──────────────────────────────────────────────────────────────────
//  HARMEXO — Yapay Zeka Servisi
//  Claude API ile verilen harflerden Türkçe kelimeler üretir.
// ──────────────────────────────────────────────────────────────────

import { AI_CONFIG } from '../config/aiConfig';

/**
 * Bir kelimenin verilen harf havuzundan oluşturulup oluşturulamayacağını kontrol eder.
 * @param {string}   word    - Kontrol edilecek kelime (büyük harf)
 * @param {string[]} letters - Mevcut harf dizisi
 */
function canFormWord(word, letters) {
  const pool = [...letters.map(l => l.toUpperCase())];
  for (const ch of word.toUpperCase()) {
    const idx = pool.indexOf(ch);
    if (idx === -1) return false;
    pool.splice(idx, 1);
  }
  return true;
}

/**
 * Claude AI kullanarak verilen harflerden geçerli Türkçe kelimeler üretir.
 *
 * @param {string[]} letters   - Kullanılabilecek harfler, örn. ['K','A','N','A','R','I']
 * @param {number}   wordCount - İstenen kelime sayısı (varsayılan: 5)
 * @returns {Promise<string[]>} - Büyük harfli Türkçe kelimeler dizisi
 */
export async function generateWordsWithAI(letters, wordCount = 5) {
  // ── API anahtarı kontrolü ─────────────────────────────────────
  if (
    !AI_CONFIG.apiKey ||
    AI_CONFIG.apiKey === 'YOUR_ANTHROPIC_API_KEY_HERE' ||
    AI_CONFIG.apiKey.trim() === ''
  ) {
    throw new Error(
      'API anahtarı ayarlanmamış.\nsrc/config/aiConfig.js dosyasını açıp anahtarınızı girin.'
    );
  }

  const letterDisplay = letters.join(', ');
  const maxLen = letters.length;

  const prompt =
    `Sen bir Türkçe kelime oyunu asistanısın.\n\n` +
    `Elimdeki harfler: ${letterDisplay}\n` +
    `(Her harf, listede kaç kez geçiyorsa yalnızca o kadar kullanılabilir)\n\n` +
    `GÖREV:\n` +
    `Bu harflerden oluşturulabilen geçerli Türkçe kelimeler bul.\n` +
    `- Kelime uzunluğu 2 ile ${maxLen} harf arasında olsun\n` +
    `- En az 1 uzun kelime (${maxLen - 1} veya ${maxLen} harfli) mutlaka olsun\n` +
    `- Tam olarak ${wordCount} farklı kelime bul\n` +
    `- Yalnızca Türkçe sözlükte geçen kelimeler kullan\n` +
    `- Türkçe büyük harf kullan (Ç, Ğ, İ, Ö, Ş, Ü)\n\n` +
    `Yanıt olarak YALNIZCA bir JSON dizisi yaz, başka hiçbir şey ekleme:\n` +
    `["KELİME1","KELİME2","KELİME3","KELİME4","KELİME5"]`;

  // ── API isteği ────────────────────────────────────────────────
  let response;
  try {
    response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': AI_CONFIG.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        max_tokens: AI_CONFIG.maxTokens,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
  } catch {
    throw new Error('İnternet bağlantısı yok veya sunucuya ulaşılamıyor.');
  }

  // ── HTTP hata yönetimi ────────────────────────────────────────
  if (!response.ok) {
    if (response.status === 401) throw new Error('Geçersiz API anahtarı. Lütfen kontrol edin.');
    if (response.status === 429) throw new Error('API limiti aşıldı. Biraz bekleyip tekrar deneyin.');
    if (response.status >= 500) throw new Error('Claude sunucusunda geçici bir sorun var. Tekrar deneyin.');
    throw new Error(`API Hatası: ${response.status}`);
  }

  const data = await response.json();
  const rawText = data.content?.[0]?.text || '';

  // ── JSON ayrıştırma ───────────────────────────────────────────
  const match = rawText.match(/\[[\s\S]*?\]/);
  if (!match) {
    throw new Error('Yapay zeka beklenmedik bir yanıt verdi. Tekrar deneyin.');
  }

  let words;
  try {
    words = JSON.parse(match[0]);
  } catch {
    throw new Error('Yanıt işlenemedi. Tekrar deneyin.');
  }

  if (!Array.isArray(words) || words.length === 0) {
    throw new Error('Kelime üretilemedi. Tekrar deneyin.');
  }

  // ── Doğrulama: yalnızca harflerden oluşturulabilen kelimeleri al ──
  const validWords = words
    .map(w => String(w).toUpperCase().trim())
    .filter(w => w.length >= 2 && w.length <= maxLen && canFormWord(w, letters));

  if (validWords.length < 2) {
    throw new Error(
      'Geçerli kelime sayısı yetersiz. Harfler için uygun kelimeler bulunamadı, tekrar deneyin.'
    );
  }

  // Fazlasını kırp, en fazla istenen sayıyı döndür
  return validWords.slice(0, wordCount);
}
