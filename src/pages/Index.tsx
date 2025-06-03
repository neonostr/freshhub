import React, { useState, useEffect } from 'react';
import ItemsList from '@/components/ItemsList';
import AddItemDialog from '@/components/AddItemDialog';
import IconManagerDialog from '@/components/IconManagerDialog';
import SwipeTutorial from '@/components/SwipeTutorial';
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
  // Corrected the return statement to wrap children with the context provider
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

  return (
    <HeaderVisibilityProvider>
      <div className="flex flex-col h-full w-full max-w-5xl mx-auto relative overflow-hidden">
        {/* Fixed Header */}
        {!hideHeader && (
          <header className="flex-shrink-0 py-6 px-4 text-center bg-background relative z-20" id="app-header">
            <h1 className="text-3xl font-bold">FreshHub</h1>
            <p className="text-gray-500 mt-1">All your shelf life in one spot</p>
          </header>
        )}

        {/* Scrollable Content Area with precise clipping boundaries */}
        {/* Using flexbox layout to position below the header */}
        <main className="flex-1 relative overflow-hidden">
          {/* Main scroll container with precise boundaries */}
          <div
            className="h-full px-4 overflow-y-auto overscroll-contain"
            style={{
              paddingTop: hideHeader ? '1rem' : '0', // Ensure no top padding when header is visible
              paddingBottom: `calc(env(safe-area-inset-bottom) + 7rem)`, // Extra space for floating buttons
              scrollPaddingTop: '0.5rem',
              scrollPaddingBottom: '1rem'
            }}
          >
            <ItemsList />
          </div>

          {/* Top clipping gradient when header is hidden */}
          {hideHeader && (
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none"></div>
          )}

          {/* Bottom clipping zone with gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none"></div>
        </main>

        <IconManagerDialog />
        <AddItemDialog />
        <TutorialWrapper />
      </div>
    </HeaderVisibilityProvider>
  );
};

export default Index;