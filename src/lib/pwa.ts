
// PWA utility functions for detection and state management

// Extend Navigator interface to include iOS Safari's standalone property
interface NavigatorStandalone extends Navigator {
  standalone?: boolean;
}

export function isPWAMode(): boolean {
  // Check if the app is running as a PWA
  if (typeof window === 'undefined') return false;
  
  // Check if running in standalone mode (iOS Safari)
  if ((window.navigator as NavigatorStandalone).standalone === true) return true;
  
  // Check if running in standalone mode (Android Chrome, Desktop)
  if (window.matchMedia('(display-mode: standalone)').matches) return true;
  
  // Check if running in minimal-ui mode
  if (window.matchMedia('(display-mode: minimal-ui)').matches) return true;
  
  return false;
}

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export type Platform = 'ios-safari' | 'android-chrome' | 'desktop-chrome' | 'desktop-other';

export function detectPlatform(): Platform {
  if (typeof window === 'undefined') return 'desktop-other';
  
  const userAgent = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);
  const isChrome = /Chrome/.test(userAgent);
  const isDesktop = !isMobileDevice();
  
  if (isIOS && isSafari) {
    return 'ios-safari';
  } else if (isAndroid && isChrome) {
    return 'android-chrome';
  } else if (isDesktop && isChrome) {
    return 'desktop-chrome';
  } else {
    return 'desktop-other';
  }
}

const INSTALL_BANNER_DISMISSED_KEY = 'pwa-install-banner-dismissed';
const CAME_FROM_LANDING_KEY = 'came-from-landing';

export function dismissInstallBanner(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(INSTALL_BANNER_DISMISSED_KEY, 'true');
  }
}

export function isInstallBannerDismissed(): boolean {
  if (typeof window === 'undefined') return false;
  
  return localStorage.getItem(INSTALL_BANNER_DISMISSED_KEY) === 'true';
}

export function setCameFromLanding(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CAME_FROM_LANDING_KEY, 'true');
  }
}

export function hasCameFromLanding(): boolean {
  if (typeof window === 'undefined') return false;
  
  return localStorage.getItem(CAME_FROM_LANDING_KEY) === 'true';
}

export function shouldShowInstallBanner(isInstallable: boolean, hasItems: boolean): boolean {
  // Show banner only if:
  // 1. NOT running as PWA
  // 2. NOT dismissed by user
  // 3. User came from landing page (clicked Get Started)
  // 4. User has at least one item (started using the app)
  // 5. AND (is mobile device OR is installable via browser prompt)
  return (
    !isPWAMode() &&
    !isInstallBannerDismissed() &&
    hasCameFromLanding() &&
    hasItems &&
    (isMobileDevice() || isInstallable)
  );
}
