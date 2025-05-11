
const CACHE_NAME = 'fresh-tracker-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/lovable-uploads/0cd5dd6f-eea3-49de-8947-b6b427a13b05.png'
];

// Performance optimizations
const PRECACHE = 'precache-' + CACHE_NAME;
const RUNTIME = 'runtime-' + CACHE_NAME;

// Installation event: cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then((cache) => cache.addAll(urlsToCache))
      .then(self.skipWaiting())
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event: improved cache strategy with stale-while-revalidate
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Use cache-first for HTML and critical assets
        if (cachedResponse) {
          // If we have a cached response, return it immediately
          // but also update the cache in the background
          const fetchPromise = fetch(event.request)
            .then((response) => {
              // Don't cache non-successful responses or API calls
              if (!response || response.status !== 200 || event.request.url.includes('/api/')) {
                return response;
              }
              
              const responseToCache = response.clone();
              caches.open(RUNTIME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
              
              return response;
            })
            .catch(() => {
              // Network request failed, we'll just use the cached response
            });
            
          return cachedResponse;
        }
        
        // If not in cache, make a network request
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses or API calls
            if (!response || response.status !== 200 || event.request.url.includes('/api/')) {
              return response;
            }
            
            const responseToCache = response.clone();
            caches.open(RUNTIME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
            
            return response;
          })
          .catch((error) => {
            // If network fails for navigation requests, return the cached homepage
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
            
            // For other types of requests, return a simple offline message
            return new Response('Network error occurred. App is in offline mode.', {
              status: 200,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
    );
  }
});

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Periodically check for updates when online
self.addEventListener('sync', (event) => {
  if (event.tag === 'check-updates') {
    event.waitUntil(
      self.registration.update()
    );
  }
});

// Pre-fetch important assets during idle time
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'refresh-content') {
    event.waitUntil(updateContent());
  }
});

// Update content function for periodic sync
async function updateContent() {
  try {
    const cache = await caches.open(RUNTIME);
    await Promise.all(urlsToCache.map(url => {
      return fetch(url).then(response => {
        if (response.ok) {
          return cache.put(url, response);
        }
      });
    }));
  } catch (error) {
    console.error('Failed to update content:', error);
  }
}
