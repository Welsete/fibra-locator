// ─────────────────────────────────────────────
//  Localizador de Fibra · ICOMON / VIVO
//  Quando atualizar o app, mude só a data abaixo
//  Ex: 2026-04-23  →  2026-05-01
// ─────────────────────────────────────────────
const CACHE_NAME = 'fibra-locator-2026-04-24';

const ASSETS = [
  './index.html',
  './tutorial.html',
  './manifest.json',
  './icon.svg',
  './sw.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
