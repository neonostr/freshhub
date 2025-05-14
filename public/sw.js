
// Optimized service worker for Fresh Tracker
const CACHE_NAME = 'fresh-tracker-v4';
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/lovable-uploads/0cd5dd6f-eea3-49de-8947-b6b427a13b05.png'
];

// Precache app shell during installation for faster startup
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()) // Immediately take control
  );
});

// Clean up old caches during activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME)
            .map(name => caches.delete(name))
        );
      })
      .then(() => self.clients.claim()) // Take control of all clients immediately
  );
});

// Optimize fetch strategy using stale-while-revalidate pattern
self.addEventListener('fetch', (event) => {
  // For navigation requests, prefer the cache but update it in the background
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('/')
        .then(cachedResponse => {
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              // Update the cache with the latest version in background
              if (networkResponse && networkResponse.status === 200) {
                const clonedResponse = networkResponse.clone();
                caches.open(CACHE_NAME).then(cache => {
                  cache.put(event.request, clonedResponse);
                });
              }
              return networkResponse;
            })
            .catch(() => cachedResponse);
          
          // Return cached response immediately if available
          return cachedResponse || fetchPromise;
        })
    );
    return;
  }

  // For static assets, use stale-while-revalidate strategy
  if (event.request.url.includes('/static/') || 
      APP_SHELL.some(url => event.request.url.endsWith(url)) ||
      event.request.url.endsWith('.js') ||
      event.request.url.endsWith('.css')) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          // Return cached response immediately if available
          if (cachedResponse) {
            // Update cache in background
            fetch(event.request)
              .then(networkResponse => {
                if (networkResponse && networkResponse.status === 200) {
                  caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, networkResponse.clone());
                  });
                }
              })
              .catch(() => {/* Ignore network errors */});
            
            return cachedResponse;
          }
          
          // If not in cache, fetch from network and cache
          return fetch(event.request)
            .then(networkResponse => {
              if (!networkResponse || networkResponse.status !== 200) {
                return networkResponse;
              }
              
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseToCache);
              });
              
              return networkResponse;
            });
        })
    );
    return;
  }

  // For API or other dynamic requests, try network first, fall back to generic offline response
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        // Show simple cached homepage for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
        
        // For other types of requests, return a simple offline message
        return new Response('Network error occurred. App is in offline mode.', {
          status: 200,
          headers: { 'Content-Type': 'text/plain' }
        });
      })
  );
});

// Periodic background sync when online
self.addEventListener('sync', (event) => {
  if (event.tag === 'check-updates') {
    event.waitUntil(self.registration.update());
  }
});

// Immediately handle skipWaiting messages
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
