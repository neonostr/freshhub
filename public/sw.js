
// Optimized service worker for Fresh Tracker with Iconify support
const CACHE_NAME = 'fresh-tracker-v5';
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/lovable-uploads/0cd5dd6f-eea3-49de-8947-b6b427a13b05.png'
];

// Iconify CDN URLs to cache
const ICONIFY_CACHE_NAME = 'iconify-cache-v1';
const ICONIFY_PATTERNS = [
  'https://api.iconify.design/',
  'https://cdn.iconify.design/'
];

// Precache app shell during installation for faster startup
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      // Cache app shell assets
      caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(APP_SHELL)),
      
      // Create a separate cache for Iconify icons
      caches.open(ICONIFY_CACHE_NAME)
        .then(cache => {
          console.log('Iconify cache created');
          return cache;
        })
    ])
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
            .filter(name => name !== CACHE_NAME && name !== ICONIFY_CACHE_NAME)
            .map(name => caches.delete(name))
        );
      })
      .then(() => self.clients.claim()) // Take control of all clients immediately
  );
});

// Helper function to determine if a request is for an Iconify icon
function isIconifyRequest(url) {
  return ICONIFY_PATTERNS.some(pattern => url.startsWith(pattern));
}

// Optimize fetch strategy using stale-while-revalidate pattern
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // Special handling for Iconify icon requests
  if (isIconifyRequest(url)) {
    event.respondWith(
      caches.open(ICONIFY_CACHE_NAME).then(cache => {
        return cache.match(event.request).then(cachedResponse => {
          // Return cached response if available
          if (cachedResponse) {
            // Update cache in background
            fetch(event.request)
              .then(networkResponse => {
                if (networkResponse && networkResponse.status === 200) {
                  cache.put(event.request, networkResponse.clone());
                }
              })
              .catch(error => console.log('Error updating Iconify cache:', error));
            
            return cachedResponse;
          }
          
          // If not in cache, fetch from network and cache
          return fetch(event.request)
            .then(networkResponse => {
              if (networkResponse && networkResponse.status === 200) {
                cache.put(event.request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch(error => {
              console.log('Fetch failed for Iconify icon:', error);
              // Return a simple transparent SVG as fallback
              return new Response(
                '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"></svg>', 
                { 
                  headers: { 'Content-Type': 'image/svg+xml' },
                  status: 200
                }
              );
            });
        });
      })
    );
    return;
  }

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

// When going online, try to update the icon cache
self.addEventListener('online', () => {
  // This will update any icons that were previously requested but may have failed
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({ type: 'online' });
    });
  });
});
