/* Prazo por navegador. A validade no checkout deve ser conferida pelo servidor. */
(function (root) {
  'use strict';
  const DURATION = 80 * 60 * 1000;
  const STORAGE_KEY = 'missao-numeros:oferta-80min:v1';

  function createOfferClock(storage, now = Date.now) {
    let deadline = null;
    function parse(value) {
      const number = Number(value);
      return value.trim() !== '' && Number.isSafeInteger(number) && number >= 0 ? number : 0;
    }
    try {
      const saved = storage.getItem(STORAGE_KEY);
      deadline = saved === null ? now() + DURATION : parse(saved);
      storage.setItem(STORAGE_KEY, String(deadline));
    } catch {
      // Sem persistência, não apresentar um prazo que reiniciaria a cada visita.
      deadline = null;
    }
    return {
      get available() { return deadline !== null; },
      remaining() {
        if (deadline === null) return null;
        try {
          const saved = storage.getItem(STORAGE_KEY);
          if (saved !== null) deadline = Math.min(deadline, parse(saved));
          storage.setItem(STORAGE_KEY, String(deadline));
        } catch { /* Mantém o prazo já conhecido durante esta visita. */ }
        return Math.max(0, Math.min(DURATION, deadline - now()));
      }
    };
  }

  function formatRemaining(milliseconds) {
    const seconds = Math.ceil(milliseconds / 1000);
    return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60]
      .map(value => String(value).padStart(2, '0')).join(':');
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createOfferClock, formatRemaining, STORAGE_KEY, DURATION };
    return;
  }

  let storage;
  try { storage = root.localStorage; } catch { storage = null; }
  const clock = createOfferClock(storage);
  root.MISSAO_OFFER = { isExpired: () => clock.available && clock.remaining() === 0 };
  const banner = document.querySelector('#offer-countdown');
  if (!banner || !clock.available) return;
  document.querySelector('#announcement-default').hidden = true;
  banner.hidden = false;
  const value = document.querySelector('#countdown-value');
  const label = document.querySelector('#countdown-label');
  let expired = false;
  let interval;

  function update() {
    const remaining = clock.remaining();
    value.textContent = formatRemaining(remaining);
    if (remaining === 0 && !expired) {
      expired = true;
      label.textContent = 'Seu prazo para esta oferta terminou';
      banner.classList.add('is-expired');
      document.querySelector('#countdown-status').textContent = 'Oferta encerrada.';
      root.dispatchEvent(new Event('missao:offer-expired'));
      root.clearInterval(interval);
    }
  }

  update();
  if (!expired) interval = root.setInterval(update, 1000);
  root.addEventListener('storage', event => {
    if (event.key === STORAGE_KEY || event.key === null) update();
  });
  root.addEventListener('pageshow', update);
  document.addEventListener('visibilitychange', update);
})(typeof window !== 'undefined' ? window : globalThis);
