const CACHE = 'learning-garden-v6';
const SHELL = ['./', './index.html', './spelling.html', './grownups.html', './parents.html', './profiles.html', './math.html', './math-settings.html', './grammar.html', './grammar-settings.html', './common.js', './math.js', './math-core.js', './math-settings.js', './math.css', './home.css', './shared.css', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png', './correct.wav', './try-again.wav'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([caches.keys().then(keys => Promise.all(keys.filter(key => (key.startsWith('spell-sprout-') || key.startsWith('learning-garden-')) && key !== CACHE).map(key => caches.delete(key)))), self.clients.claim()]));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => { if (response.ok) { const copy=response.clone(); caches.open(CACHE).then(cache => cache.put(request,copy)); } return response; }).catch(() => caches.match(request).then(cached => cached || caches.match('./index.html'))));
  } else {
    event.respondWith(caches.match(request).then(cached => cached || fetch(request)));
  }
});
