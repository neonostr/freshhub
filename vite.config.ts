import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      selfDestroying: false,
      devOptions: {
        // Enables the service worker during `vite dev` (Lovable preview) so offline can be tested reliably.
        enabled: true,
        type: 'module'
      },
      includeAssets: [
        'favicon.ico',
        'icon-192x192.png',
        'icon-512x512.png',
        'lovable-uploads/**/*'
      ],
      manifest: {
        name: 'FreshHub - Food Freshness Tracker',
        short_name: 'FreshHub',
        description: 'Track how long your perishable items have been open',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/app',
        id: '/app',
        icons: [
          {
            src: '/lovable-uploads/e78b0f07-33d3-4cd6-b657-1b0574021f09.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/lovable-uploads/e78b0f07-33d3-4cd6-b657-1b0574021f09.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/lovable-uploads/e78b0f07-33d3-4cd6-b657-1b0574021f09.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2}'],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/pfp\.nostr\.build\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'external-images-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 30
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api/]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
