
import { useState, useEffect, useCallback } from 'react';
import {
  isPWAMode,
  shouldShowInstallBanner,
  dismissInstallBanner as dismissBannerUtil,
  markBannerShownInCurrentSession,
} from '@/lib/pwa';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface UsePWAReturn {
  isInstallable: boolean;
  isRunningAsPwa: boolean;
  showInstallBanner: boolean;
  promptInstall: () => Promise<boolean>;
  dismissBanner: () => void;
}

export function usePWA(): UsePWAReturn {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isRunningAsPwa, setIsRunningAsPwa] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [hasItems, setHasItems] = useState(false);

  useEffect(() => {
    // Set PWA mode status
    setIsRunningAsPwa(isPWAMode());

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (event: Event) => {
      console.log('beforeinstallprompt fired');
      event.preventDefault();
      const promptEvent = event as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      setIsInstallable(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setDeferredPrompt(null);
      setIsInstallable(false);
      setIsRunningAsPwa(true);
    };

    // Listen for items changes to update hasItems state
    const updateItemsState = () => {
      // Use the correct localStorage key that matches what ItemsContext uses
      const items = JSON.parse(localStorage.getItem('freshItems') || '[]');
      console.log('usePWA: updateItemsState - found', items.length, 'items');
      setHasItems(items.length > 0);
    };

    // Initial check
    updateItemsState();

    // Listen for storage changes
    window.addEventListener('storage', updateItemsState);
    
    // Listen for custom events when items are added/removed
    window.addEventListener('items-updated', updateItemsState);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('storage', updateItemsState);
      window.removeEventListener('items-updated', updateItemsState);
    };
  }, []);

  useEffect(() => {
    // Update banner visibility based on new logic
    const shouldShow = shouldShowInstallBanner(hasItems);
    console.log('usePWA: shouldShowInstallBanner:', shouldShow, 'hasItems:', hasItems, 'isPWA:', isPWAMode());
    setShowInstallBanner(shouldShow);
    
    // Mark banner as shown in current session when it becomes visible
    if (shouldShow) {
      markBannerShownInCurrentSession();
    }
  }, [hasItems]);

  const promptInstall = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt) {
      return false;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setDeferredPrompt(null);
        setIsInstallable(false);
        return true;
      } else {
        console.log('User dismissed the install prompt');
        return false;
      }
    } catch (error) {
      console.error('Error during install prompt:', error);
      return false;
    }
  }, [deferredPrompt]);

  const dismissBanner = useCallback(() => {
    dismissBannerUtil();
    setShowInstallBanner(false);
  }, []);

  return {
    isInstallable,
    isRunningAsPwa,
    showInstallBanner,
    promptInstall,
    dismissBanner,
  };
}
