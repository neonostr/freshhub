
import { useState, useEffect, useCallback } from 'react';
import {
  isPWAMode,
  shouldShowInstallBanner,
  dismissInstallBanner as dismissBannerUtil,
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

  useEffect(() => {
    // Set PWA mode status
    setIsRunningAsPwa(isPWAMode());

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (event: Event) => {
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

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  useEffect(() => {
    // Update banner visibility based on installable state
    setShowInstallBanner(shouldShowInstallBanner(isInstallable));
  }, [isInstallable]);

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
