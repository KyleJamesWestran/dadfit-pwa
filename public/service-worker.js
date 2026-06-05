/* eslint-disable no-restricted-globals */
// Bump this version on every deploy to bust the cache
const CACHE_NAME = 'dadfit-v3';

self.addEventListener('install', event => {
  // Skip waiting immediately — don't hold onto old version
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Delete ALL old caches on activate
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Network-first strategy: always try network, fall back to cache
  // This ensures updates always come through
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache a copy of successful responses
        if (response && response.status === 200 && event.request.method === 'GET') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
