// ──────────────────────────────────────────────────────────────────
//  HARMEXO — Yapay Zeka API Konfigürasyonu
// ──────────────────────────────────────────────────────────────────
//  Claude API anahtarınızı aşağıya girin.
//  https://console.anthropic.com adresinden ücretsiz hesap açabilirsiniz.
//
//  ⚠️  GÜVENLİK NOTU:
//  Bu dosyadaki API anahtarı geliştirme ortamı içindir.
//  Yayın (production) build'inde çağrıları bir backend proxy üzerinden yapın.
// ──────────────────────────────────────────────────────────────────

export const AI_CONFIG = {
  /** Anthropic Console'dan alınan API anahtarı */
  apiKey: 'YOUR_ANTHROPIC_API_KEY_HERE',

  /** Hızlı ve uygun maliyetli model */
  model: 'claude-haiku-4-5-20251001',

  /** Maksimum token sayısı (kısa yanıt yeterli) */
  maxTokens: 300,
};
