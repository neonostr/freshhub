
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

interface InstallPromptContextType {
  showInstallPrompt: boolean;
  promptInstall: () => Promise<void>;
  isAppInstalled: boolean;
  isPlatformIOS: boolean;
  deferredPrompt: BeforeInstallPromptEvent | null;
  dismissPrompt: () => void;
}

const InstallPromptContext = createContext<InstallPromptContextType | undefined>(undefined);

export const InstallPromptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [isPlatformIOS, setIsPlatformIOS] = useState(false);
  const [promptDismissed, setPromptDismissed] = useState(false);
  const { toast } = useToast();

  // Check if the app is already installed
  useEffect(() => {
    // Check if running as standalone PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                          (window.navigator as any).standalone || 
                          document.referrer.includes('android-app://');
    
    setIsAppInstalled(isStandalone);
    
    // Detect iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsPlatformIOS(isIOS);
    
    // Check if prompt was previously dismissed
    const dismissed = localStorage.getItem('installPromptDismissed') === 'true';
    setPromptDismissed(dismissed);
  }, []);

  // Listen for the beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Only show the prompt if the user hasn't dismissed it before
      if (!promptDismissed && !isAppInstalled) {
        // Wait a bit before showing the prompt to avoid interrupting the initial user experience
        const timer = setTimeout(() => {
          setShowInstallPrompt(true);
        }, 3000); // Show after 3 seconds
        
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [promptDismissed, isAppInstalled]);

  // Listen for app installed event
  useEffect(() => {
    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setShowInstallPrompt(false);
      toast({
        title: "App Installed!",
        description: "Thank you for installing our app.",
        duration: 3000,
      });
    };

    window.addEventListener('appinstalled', handleAppInstalled);
    
    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [toast]);

  // Function to prompt installation
  const promptInstall = async () => {
    if (deferredPrompt) {
      try {
        // Show the install prompt
        await deferredPrompt.prompt();
        
        // Wait for the user to respond to the prompt
        const choiceResult = await deferredPrompt.userChoice;
        
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          setShowInstallPrompt(false);
        } else {
          console.log('User dismissed the install prompt');
          // If user dismissed the browser prompt, also dismiss our banner
          dismissPrompt();
        }
      } catch (e) {
        console.error('Error during installation prompt:', e);
      } finally {
        // The prompt can only be used once, reset it
        setDeferredPrompt(null);
      }
    }
  };

  // Function to dismiss the prompt
  const dismissPrompt = () => {
    setShowInstallPrompt(false);
    setPromptDismissed(true);
    localStorage.setItem('installPromptDismissed', 'true');
  };

  return (
    <InstallPromptContext.Provider 
      value={{ 
        showInstallPrompt, 
        promptInstall, 
        isAppInstalled, 
        isPlatformIOS,
        deferredPrompt,
        dismissPrompt
      }}
    >
      {children}
    </InstallPromptContext.Provider>
  );
};

export const useInstallPrompt = (): InstallPromptContextType => {
  const context = useContext(InstallPromptContext);
  if (!context) {
    throw new Error('useInstallPrompt must be used within an InstallPromptProvider');
  }
  return context;
};
