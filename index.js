// ─── Polyfills — Hermes uyumluluğu için en önce çalışmalı ───────────────────

// DOMException: undici / fetch tarafından kullanılıyor
if (typeof global.DOMException === 'undefined') {
  global.DOMException = class DOMException extends Error {
    constructor(message = '', name = 'Error') {
      super(message);
      this.name = name;
      this.code = 0;
    }
  };
}

// TextEncoder / TextDecoder: bazı ağ paketleri için gerekli
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = class TextEncoder {
    encode(str) {
      const arr = [];
      for (let i = 0; i < str.length; i++) arr.push(str.charCodeAt(i));
      return new Uint8Array(arr);
    }
  };
}

// ─── Uygulamayı yükle ────────────────────────────────────────────────────────
require('expo/AppEntry');
