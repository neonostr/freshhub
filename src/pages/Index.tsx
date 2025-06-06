import React, { useState, useEffect } from 'react';
import ItemsList from '@/components/ItemsList';
import AddItemDialog from '@/components/AddItemDialog';
import IconManagerDialog from '@/components/IconManagerDialog';
import SwipeTutorial from '@/components/SwipeTutorial';
import PWAInstallBanner from '@/components/PWAInstallBanner';
import PWAInstallInstructions from '@/components/PWAInstallInstructions';
import PWAOnboardingDialog from '@/components/PWAOnboardingDialog';
import { useItems } from '@/context/ItemsContext';
import { usePWA } from '@/hooks/usePWA';
import { create } from 'zustand';
import { createContext, useContext } from 'react';

// Create a Zustand store to manage header visibility
interface HeaderVisibilityState {
  hideHeader: boolean;
  setHideHeader: (hide: boolean) => void;
}

export const useHeaderVisibilityStore = create<HeaderVisibilityState>(set => ({
  hideHeader: false,
  setHideHeader: hideHeader => {
    localStorage.setItem('hideHeader', hideHeader.toString());
    set({ hideHeader });
  }
}));

// Create a context for components that don't have direct access to zustand
const HeaderVisibilityContext = createContext<HeaderVisibilityState | undefined>(undefined);

export const HeaderVisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Initialize from localStorage if available
    const savedHideHeader = localStorage.getItem('hideHeader');
    if (savedHideHeader !== null) {
      useHeaderVisibilityStore.getState().setHideHeader(savedHideHeader === 'true');
    }
  }, []);

  const { hideHeader, setHideHeader } = useHeaderVisibilityStore();
  return (
    <HeaderVisibilityContext.Provider value={{ hideHeader, setHideHeader }}>
      {children}
    </HeaderVisibilityContext.Provider>
  );
};

export const useHeaderVisibility = (): HeaderVisibilityState => {
  const context = useContext(HeaderVisibilityContext);
  if (!context) {
    throw new Error('useHeaderVisibility must be used within a HeaderVisibilityProvider');
  }
  return context;
};

// Component to conditionally render the SwipeTutorial
const TutorialWrapper = ({ onTutorialComplete }: { onTutorialComplete?: () => void }) => {
  const { shouldShowTutorial, dismissTutorial } = useItems();
  
  if (!shouldShowTutorial) return null;
  
  const handleTutorialDismiss = () => {
    dismissTutorial();
    if (onTutorialComplete) {
      onTutorialComplete();
    }
  };
  
  return <SwipeTutorial onDismiss={handleTutorialDismiss} />;
};

const Index = () => {
  const { hideHeader } = useHeaderVisibilityStore();
  const { shouldShowTutorial, isFirstTimeUser, items } = useItems();
  const { isRunningAsPwa } = usePWA();
  const [showPWAOnboarding, setShowPWAOnboarding] = useState(false);
  const [showPWAInstructions, setShowPWAInstructions] = useState(false);

  // Show PWA onboarding dialog when user adds their first item
  useEffect(() => {
    const handleItemsUpdated = () => {
      console.log("Index: Received items-updated event");
      console.log("Index: Current items count:", items.length);
      
      // Only show if:
      // 1. Not already running as PWA
      // 2. Not seeing tutorial
      // 3. Haven't seen PWA onboarding before
      // 4. Have at least one item
      // 5. Haven't shown the dialog in this session
      const hasSeenPWAOnboarding = localStorage.getItem('hasSeenPWAOnboarding') === 'true';
      const hasShownDialogThisSession = sessionStorage.getItem('hasShownPWAOnboarding') === 'true';
      
      console.log("Index: PWA onboarding conditions:", {
        isRunningAsPwa,
        shouldShowTutorial,
        hasSeenPWAOnboarding,
        itemsCount: items.length,
        hasShownDialogThisSession
      });
      
      if (!isRunningAsPwa && 
          !shouldShowTutorial && 
          !hasSeenPWAOnboarding && 
          items.length > 1 &&
          !hasShownDialogThisSession) {
        console.log("Index: Showing PWA onboarding dialog");
        setShowPWAOnboarding(true);
        // Mark that we've shown the dialog in this session
        sessionStorage.setItem('hasShownPWAOnboarding', 'true');
      }
    };

    // Initial check for items
    if (items.length > 1) {
      console.log("Index: Initial items check - showing PWA onboarding");
      handleItemsUpdated();
    }

    // Listen for items-updated event
    window.addEventListener('items-updated', handleItemsUpdated);
    
    return () => {
      window.removeEventListener('items-updated', handleItemsUpdated);
    };
  }, [isRunningAsPwa, shouldShowTutorial, items.length]);


  // When the PWA onboarding is closed, mark it as seen
  const handlePWAOnboardingClose = () => {
    setShowPWAOnboarding(false);
    localStorage.setItem('hasSeenPWAOnboarding', 'true');
  };

  // When the user clicks "Install App", show the install instructions dialog
  const handleInstallClick = () => {
    setShowPWAOnboarding(false);
    localStorage.setItem('hasSeenPWAOnboarding', 'true');
    setShowPWAInstructions(true);
  };

  return (
    <HeaderVisibilityProvider>
      <div className="flex flex-col h-screen w-full max-w-5xl mx-auto relative overflow-hidden bg-background">
        {!hideHeader && (
          <header className="flex-shrink-0 pt-6 px-4 text-center bg-background relative z-20 mb-2" id="app-header" style={{ paddingTop: `calc(1rem + env(safe-area-inset-top))` }}>
            <h1 className="text-3xl font-bold"><span className="underline decoration-[#49DE80]">FreshHub</span></h1>
            <p className="text-gray-500 mt-1">All your shelf life in one spot</p>
          </header>
        )}

        <main className="flex-1 relative overflow-hidden">
          <div
            className="absolute left-0 right-0 h-4 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none"
            style={{ top: '-0.6rem' }}
          />

          <div
            className="h-full px-4 overflow-y-auto overscroll-contain"
            style={{
              paddingTop: hideHeader ? `calc(1rem + env(safe-area-inset-top))` : '1px',
              paddingBottom: `calc(env(safe-area-inset-bottom) + 11rem)`,
              scrollPaddingTop: '0.5rem',
              scrollPaddingBottom: '11rem'
            }}
          >
            <ItemsList />
          </div>

          <div
            className="fixed left-0 right-0 pointer-events-none"
            style={{
              bottom: 0,
              height: 'calc(5.21rem + env(safe-area-inset-bottom))',
              background: 'linear-gradient(to top, #fff, rgba(255,255,255,0.8), transparent)',
              zIndex: 10,
            }}
          />
        </main>

        <IconManagerDialog />
        <AddItemDialog />
        <TutorialWrapper onTutorialComplete={handleTutorialComplete} />
        
        <PWAInstallBanner 
          onLearnHow={() => setShowPWAInstructions(true)}
        />
        
        <PWAOnboardingDialog
          open={showPWAOnboarding}
          onClose={handlePWAOnboardingClose}
          onInstallClick={handleInstallClick}
        />
        <PWAInstallInstructions
          isOpen={showPWAInstructions}
          onClose={() => setShowPWAInstructions(false)}
        />
      </div>
    </HeaderVisibilityProvider>
  );
};

export default Index;