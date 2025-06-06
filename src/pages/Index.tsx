import React, { useState, useEffect } from 'react';
import ItemsList from '@/components/ItemsList';
import AddItemDialog from '@/components/AddItemDialog';
import IconManagerDialog from '@/components/IconManagerDialog';
import SwipeTutorial from '@/components/SwipeTutorial';
import PWAInstallBanner from '@/components/PWAInstallBanner';
import PWAInstallInstructions from '@/components/PWAInstallInstructions';
import PWAOnboardingDialog from '@/components/PWAOnboardingDialog';
import { useItems } from '@/context/ItemsContext';
import { create } from 'zustand';
import { createContext, useContext } from 'react';

// Create a Zustand store to manage header visibility
interface HeaderVisibilityState {
  hideHeader: boolean;
  setHideHeader: (hide: boolean) => void;
}

const useHeaderVisibilityStore = create<HeaderVisibilityState>((set) => ({
  hideHeader: false,
  setHideHeader: (hide) => set({ hideHeader: hide }),
}));

// Create a context for the header visibility
const HeaderVisibilityContext = createContext<HeaderVisibilityState | undefined>(undefined);

// Create a provider component
const HeaderVisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = useHeaderVisibilityStore();
  return (
    <HeaderVisibilityContext.Provider value={store}>
      {children}
    </HeaderVisibilityContext.Provider>
  );
};

// Create a hook to use the header visibility context
export const useHeaderVisibility = () => {
  const context = useContext(HeaderVisibilityContext);
  if (context === undefined) {
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
  const { shouldShowPWAOnboarding, dismissPWAOnboarding } = useItems();
  const [showPWAInstructions, setShowPWAInstructions] = useState(false);

  // When the user clicks "Install App", show the install instructions dialog
  const handleInstallClick = () => {
    dismissPWAOnboarding();
    setShowPWAInstructions(true);
  };

  return (
    <HeaderVisibilityProvider>
      {/* Changed h-full to h-screen and added bg-background */}
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
        <TutorialWrapper />
        
        <PWAOnboardingDialog
          open={shouldShowPWAOnboarding}
          onClose={dismissPWAOnboarding}
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