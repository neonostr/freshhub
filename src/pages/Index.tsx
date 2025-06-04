import React, { useState, useEffect } from 'react';
import ItemsList from '@/components/ItemsList';
import AddItemDialog from '@/components/AddItemDialog';
import IconManagerDialog from '@/components/IconManagerDialog';
import SwipeTutorial from '@/components/SwipeTutorial';
import PWAInstallBanner from '@/components/PWAInstallBanner';
import PWAInstallInstructions from '@/components/PWAInstallInstructions';
import { useItems } from '@/context/ItemsContext';
import { create } from 'zustand';
import { createContext, useContext } from 'react';

// Create a Zustand store to manage header visibility
interface HeaderVisibilityState {
  hideHeader: boolean;
  setHideHeader: (hide: boolean) => void;
}
export const useHeaderVisibilityStore = create<HeaderVisibilityState>(set => ({
  hideHeader: false,
  // Default to showing the header
  setHideHeader: hideHeader => {
    // Save to localStorage
    localStorage.setItem('hideHeader', hideHeader.toString());
    set({
      hideHeader
    });
  }
}));

// Create a context for components that don't have direct access to zustand
const HeaderVisibilityContext = createContext<HeaderVisibilityState | undefined>(undefined);
export const HeaderVisibilityProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  useEffect(() => {
    // Initialize from localStorage if available
    const savedHideHeader = localStorage.getItem('hideHeader');
    if (savedHideHeader !== null) {
      useHeaderVisibilityStore.getState().setHideHeader(savedHideHeader === 'true');
    }
  }, []);
  const {
    hideHeader,
    setHideHeader
  } = useHeaderVisibilityStore();
  return (
    <HeaderVisibilityContext.Provider value={{
      hideHeader,
      setHideHeader
    }}>
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
const TutorialWrapper = () => {
  const { shouldShowTutorial } = useItems();
  if (!shouldShowTutorial) return null;
  return <SwipeTutorial />;
};

const Index = () => {
  const { hideHeader } = useHeaderVisibilityStore();
  const [showPWAInstructions, setShowPWAInstructions] = useState(false);

  return (
    <HeaderVisibilityProvider>
      {/* Changed h-full to h-screen and added bg-background */}
      <div className="flex flex-col h-screen w-full max-w-5xl mx-auto relative overflow-hidden bg-background">
        {/* Fixed Header */}
        {!hideHeader && (
          // Added style to include safe area inset at the top
          <header className="flex-shrink-0 pt-6 px-4 text-center bg-background relative z-20 mb-2" id="app-header" style={{ paddingTop: `calc(1rem + env(safe-area-inset-top))` }}>
            <h1 className="text-3xl font-bold"><span className="underline decoration-[#49DE80]">FreshHub</span></h1>
            <p className="text-gray-500 mt-1">All your shelf life in one spot</p>
          </header>
        )}

        {/* Scrollable Content Area with precise clipping boundaries */}
        <main className="flex-1 relative overflow-hidden">
          {/* Top clipping gradient - always visible */}
          
          
          <div
  className="absolute left-0 right-0 h-4 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none"
  style={{ top: '-0.6rem' }} // or any negative value you want
></div>
          
          

          {/* Main scroll container with precise boundaries */}
          <div
            className="h-full px-4 overflow-y-auto overscroll-contain"
            style={{
              // Minimal gap: 1px below header text, end 1px above floating buttons
              paddingTop: hideHeader ? `calc(1rem + env(safe-area-inset-top))` : '1px',
              paddingBottom: `calc(env(safe-area-inset-bottom) + 6rem)`, // Space for floating buttons + PWA banner
              scrollPaddingTop: '0.5rem',
              scrollPaddingBottom: '1rem'
            }}
          >
            <ItemsList />
          </div>

          {/* Bottom clipping zone with gradient */}
    <div
  className="fixed left-0 right-0 pointer-events-none"
  style={{
    bottom: 0,
    height: 'calc(5.21rem + env(safe-area-inset-bottom))', // 3rem visible everywhere, plus safe area on iOS
    background: 'linear-gradient(to top, #fff, rgba(255,255,255,0.8), transparent)',
    zIndex: 10,
  }}
></div>
        </main>

        <IconManagerDialog />
        <AddItemDialog />
        <TutorialWrapper />
        
        {/* PWA Install Banner */}
        <PWAInstallBanner 
          onLearnHow={() => setShowPWAInstructions(true)}
        />
        
        {/* PWA Install Instructions Dialog */}
        <PWAInstallInstructions
          isOpen={showPWAInstructions}
          onClose={() => setShowPWAInstructions(false)}
        />
      </div>
    </HeaderVisibilityProvider>
  );
};

export default Index;
