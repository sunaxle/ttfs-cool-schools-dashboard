/**
 * Progressive Web App Service Worker (sw.js) - Version 3.0.0 (Network-First)
 * Texas Trees Foundation (TTFS) × UTRGV Project Cool Schools
 *
 * Purges legacy v2.0.0 caches that caused stale HTML/JS mismatches and uses
 * Network-First with safe offline fallback.
 */

'use strict';

const CACHE_VERSION = 'ttfs-cool-schools-v3.0.0-20261029';
const RUNTIME_CACHE = `ttfs-runtime-${CACHE_VERSION}`;

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== RUNTIME_CACHE) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== RUNTIME_CACHE) {
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Only handle same-origin requests; let external CDNs and map tiles load natively
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          }).catch(() => {});
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(request, { ignoreSearch: true });
      })
  );
});
