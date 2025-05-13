
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize and register service worker as early as possible
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        // Check for updates in background
        registration.update();
        
        // When the service worker is updated, reload the page to use the new version
        registration.onupdatefound = () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.onstatechange = () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker is installed but waiting, send skipWaiting message
                newWorker.postMessage('skipWaiting');
              }
            };
          }
        };
      })
      .catch(err => {
        console.error('Service worker registration failed:', err);
      });
  });
  
  // Handle controller change (service worker updated)
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload(); // Reload once when service worker takes control
    }
  });
}

// Render app using createRoot for better performance
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
