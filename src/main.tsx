import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Render app first
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}

// Register service worker after React is mounted
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const { registerSW } = await import("virtual:pwa-register");
      registerSW({ immediate: true });
    } catch (e) {
      console.warn("PWA registration failed:", e);
    }
  });
}

