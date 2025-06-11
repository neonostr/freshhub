
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

export type Platform = 'ios-safari' | 'android-chrome' | 'desktop-chrome' | 'desktop-safari' | 'desktop-other';

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
  } else if (isDesktop && isSafari) {
    return 'desktop-safari';
  } else {
    return 'desktop-other';
  }
}

const INSTALL_BANNER_SHOWN_COUNT_KEY = 'pwa-install-banner-shown-count';
const INSTALL_BANNER_SESSION_SHOWN_KEY = 'pwa-install-banner-session-shown';

export function getInstallBannerShownCount(): number {
  if (typeof window === 'undefined') return 0;
  
  const count = localStorage.getItem(INSTALL_BANNER_SHOWN_COUNT_KEY);
  return count ? parseInt(count, 10) : 0;
}

export function incrementInstallBannerShownCount(): void {
  if (typeof window !== 'undefined') {
    const currentCount = getInstallBannerShownCount();
    localStorage.setItem(INSTALL_BANNER_SHOWN_COUNT_KEY, (currentCount + 1).toString());
  }
}

export function hasShownBannerInCurrentSession(): boolean {
  if (typeof window === 'undefined') return false;
  
  return sessionStorage.getItem(INSTALL_BANNER_SESSION_SHOWN_KEY) === 'true';
}

export function markBannerShownInCurrentSession(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(INSTALL_BANNER_SESSION_SHOWN_KEY, 'true');
  }
}

export function dismissInstallBanner(): void {
  if (typeof window !== 'undefined') {
    incrementInstallBannerShownCount();
    markBannerShownInCurrentSession();
  }
}

export function shouldShowInstallBanner(hasItems: boolean): boolean {
  // Don't show if running as PWA
  if (isPWAMode()) return false;
  
  // Don't show if user hasn't added any items yet
  if (!hasItems) return false;
  
  // Don't show if already shown 3 times
  const shownCount = getInstallBannerShownCount();
  if (shownCount >= 3) return false;
  
  // Don't show if already shown in current session
  if (hasShownBannerInCurrentSession()) return false;
  
  return true;
}

// Legacy functions - keeping for backward compatibility
export function setCameFromLanding(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('came-from-landing', 'true');
  }
}

export function hasCameFromLanding(): boolean {
  if (typeof window === 'undefined') return false;
  
  return localStorage.getItem('came-from-landing') === 'true';
}

export function isInstallBannerDismissed(): boolean {
  // Legacy function - now replaced by count-based system
  return getInstallBannerShownCount() >= 3;
}
