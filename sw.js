/* Pick One — service worker. Cache-first for the shell so the app opens
   instantly and works offline. Bump CACHE when you change index.html. */
const CACHE = 'pickone-v1';
const ASSETS = [
  '.', 'index.html', 'manifest.webmanifest',
  'icon-192.png', 'icon-512.png', 'icon-maskable.png', 'apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Never cache the GitHub API — sync must always hit the network.
  if (url.hostname === 'api.github.com' || url.hostname.endsWith('githubusercontent.com')) return;

  // Navigations: network-first (so a fresh deploy is picked up), fall back to cached shell offline.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res => {
        caches.open(CACHE).then(c => c.put('index.html', res.clone())).catch(()=>{});
        return res;
      }).catch(() => caches.match('index.html').then(r => r || caches.match('.')))
    );
    return;
  }

  // Same-origin assets: cache-first, then network (and cache the result).
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{});
        return res;
      }).catch(() => hit))
    );
  }
});
