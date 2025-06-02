import React, { useState, useEffect } from 'react';
import ItemsList from '@/components/ItemsList';
import AddItemDialog from '@/components/AddItemDialog';
import IconManagerDialog from '@/components/IconManagerDialog';
import SwipeTutorial from '@/components/SwipeTutorial';
import { useItems } from '@/context/ItemsContext';
import { create } from 'zustand';
import { createContext, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useHandedness } from '@/context/HandednessContext';

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
  return <HeaderVisibilityContext.Provider value={{
    hideHeader,
    setHideHeader
  }}>
      {children}
    </HeaderVisibilityContext.Provider>;
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
  const { handedness } = useHandedness();

  // Settings button positioning - always show, positioned opposite to other buttons
  const settingsButtonStyle = {
    position: 'fixed' as const,
    zIndex: 50,
    bottom: `calc(env(safe-area-inset-bottom) + 1.5rem)`,
    [handedness === 'right' ? 'left' : 'right']: '1.5rem', // Opposite side from other buttons
    width: '3.5rem',
    height: '3.5rem',
    borderRadius: '50%',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
  };

  return (
    <HeaderVisibilityProvider>
      <div className="flex flex-col h-full w-full max-w-5xl mx-auto relative">
        {/* Conditionally rendered Header */}
        {!hideHeader && (
          <header className="flex-shrink-0 py-6 px-4 text-center bg-background relative z-10" id="app-header">
            <h1 className="text-3xl font-bold">Freshify</h1>
            <p className="text-gray-500 mt-1">Know when it's been open too long</p>
          </header>
        )}
        
        {/* Scrollable Content Area */}
        <main className="flex-1 px-4 overflow-hidden relative">
          <div 
            className="h-full overflow-y-auto overscroll-contain"
            style={{ 
              paddingBottom: `calc(env(safe-area-inset-bottom) + 5.5rem)` // Space for buttons
            }}
          >
            <ItemsList />
          </div>
        </main>

        {/* Settings Button - always visible, positioned based on handedness */}
        <Button
          style={settingsButtonStyle}
          size="icon"
          variant="outline"
          onClick={() => {
            const manageButton = document.querySelector('[data-manage-products-trigger]') as HTMLButtonElement;
            if (manageButton) {
              manageButton.click();
            }
          }}
        >
          <Settings className="h-6 w-6" />
        </Button>
        
        <IconManagerDialog />
        <AddItemDialog />
        <TutorialWrapper />
      </div>
    </HeaderVisibilityProvider>
  );
};

export default Index;
