import React, { useState, useEffect } from 'react';
import ItemsList from '@/components/ItemsList';
import AddItemDialog from '@/components/AddItemDialog';
import IconManagerDialog from '@/components/IconManagerDialog';
import SwipeTutorial from '@/components/SwipeTutorial';
import { useItems } from '@/context/ItemsContext';
import { create } from 'zustand';
import { createContext, useContext } from 'react';
import { InstallButton } from '@/components/InstallButton';

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
  const {
    shouldShowTutorial
  } = useItems();
  if (!shouldShowTutorial) return null;
  return <SwipeTutorial />;
};

const Index = () => {
  const [isCompactMode, setIsCompactMode] = useState(false);
  const {
    hideHeader
  } = useHeaderVisibilityStore();

  // Listen for changes to the display style of the header
  // which indicates compact mode is enabled/disabled
  React.useEffect(() => {
    const header = document.getElementById('app-header');
    if (header) {
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.attributeName === 'style') {
            setIsCompactMode(header.style.display === 'none');
          }
        });
      });
      observer.observe(header, {
        attributes: true
      });
      return () => observer.disconnect();
    }
  }, []);
  return <HeaderVisibilityProvider>
      <div className="container max-w-5xl mx-auto p-4 pb-20 min-h-screen">
        {!hideHeader && <header className="py-6 text-center" id="app-header">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                {/* Empty div for flex spacing */}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold">Freshify</h1>
                <p className="text-gray-500 mt-2">Know when it's been open too long</p>
              </div>
              <div className="flex-1 flex justify-end">
                <InstallButton />
              </div>
            </div>
          </header>}
        
        <main className="my-6">
          <ItemsList />
        </main>
        
        {/* Always show IconManagerDialog regardless of compact mode */}
        <IconManagerDialog />
        <AddItemDialog />
        <TutorialWrapper />
      </div>
    </HeaderVisibilityProvider>;
};
export default Index;
