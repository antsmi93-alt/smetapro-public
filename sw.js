// =============================================================
//  SERVICE WORKER — Калькулятор смет PRO
//  Стратегия: precache app shell + runtime cache для иконок.
//  Версия кеша: v1.0.0
// =============================================================

const CACHE_VERSION = 'smeta-pro-1.4.9';
const APP_SHELL = [
  './',
  './calculator-universal.html',
  './manifest.webmanifest',
  './favicon.ico',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './icon-192-maskable.png',
  './icon-512-maskable.png',
  './privacy.html'
];

// === Установка: кешируем app shell ===
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// === Активация: чистим старые версии ===
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// === Fetch: cache-first для app shell, network-first для остального ===
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // App shell — cache-first
  if (APP_SHELL.some((p) => url.pathname.endsWith(p.replace('./', '/')))) {
    event.respondWith(
      caches.match(req).then((cached) =>
        cached || fetch(req).then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
          return resp;
        })
      )
    );
    return;
  }

  // Остальное — network-first с фолбэком
  event.respondWith(
    fetch(req).then((resp) => {
      if (resp.ok && resp.type === 'basic') {
        const copy = resp.clone();
        caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
      }
      return resp;
    }).catch(() => caches.match(req))
  );
});

// === Сообщения от страницы: skipWaiting, getVersion ===
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting();
  if (event.data === 'getVersion') {
    event.ports[0].postMessage({ version: CACHE_VERSION });
  }
});
