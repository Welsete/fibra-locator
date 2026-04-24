// ─────────────────────────────────────────────
//  Localizador de Fibra · ICOMON / VIVO
//  Quando atualizar o app, mude só a data abaixo
//  Ex: 2026-04-24  →  2026-05-01
// ─────────────────────────────────────────────
const CACHE_NAME = 'fibra-locator-2026-04-24';

const ASSETS = [
  './index.html',
  './tutorial.html',
  './manifest.json',
  './icon.svg',
  './sw.js'
];

// Instala e cacheia todos os arquivos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Limpa caches antigos e assume controle imediatamente
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-first pra HTML, cache-first pro resto
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  const isHTML = e.request.destination === 'document' ||
                 url.pathname.endsWith('.html') ||
                 url.pathname === '/' ||
                 url.pathname.endsWith('/');

  if (isHTML) {
    // Network-first: tenta rede, cai no cache se offline
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    // Cache-first: assets estáticos
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
  }
});

// Recebe sinal da página pra ativar imediatamente
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
