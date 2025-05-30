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

  return (
    <HeaderVisibilityProvider>
      <div className="flex flex-col h-full w-full max-w-5xl mx-auto relative">
        {/* Conditionally rendered Header */}
        {!hideHeader && (
          <header className="flex-shrink-0 py-6 px-4 text-center bg-background relative z-10" id="app-header">
            <h1 className="text-3xl font-bold">Freshify</h1>
            <p className="text-gray-500 mt-2">Know when it's been open too long</p>
          </header>
        )}
        
        {/* Scrollable Content Area with minimal padding */}
        <main className="flex-1 px-4 overflow-hidden relative" style={{ marginTop: hideHeader ? '1px' : '1px' }}>
          <div 
            className="h-full overflow-y-auto overscroll-contain"
            style={{ 
              paddingBottom: '7rem' // Proper space for buttons (3.5rem button + 1.5rem bottom + 2rem buffer)
            }}
          >
            <ItemsList />
          </div>
        </main>
        
        <IconManagerDialog />
        <AddItemDialog />
        <TutorialWrapper />
      </div>
    </HeaderVisibilityProvider>
  );
};

export default Index;
