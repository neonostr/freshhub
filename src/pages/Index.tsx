
import React, { useState, useEffect } from 'react';
import { ItemsProvider } from '@/context/ItemsContext';
import { IconManagerProvider } from '@/context/IconManager';
import { HandednessProvider, useHandedness } from '@/context/HandednessContext';
import ItemsList from '@/components/ItemsList';
import AddItemDialog from '@/components/AddItemDialog';
import IconManagerDialog from '@/components/IconManagerDialog';
import SwipeTutorial from '@/components/SwipeTutorial';
import { useItems } from '@/context/ItemsContext';

// Component to conditionally render the SwipeTutorial
const TutorialWrapper = () => {
  const { shouldShowTutorial } = useItems();
  
  if (!shouldShowTutorial) return null;
  return <SwipeTutorial />;
};

// Component to conditionally render the header based on settings
const AppHeader = () => {
  const { hideHeader } = useHandedness();
  
  if (hideHeader) return null;
  
  return (
    <header className="py-6 text-center" id="app-header">
      <h1 className="text-3xl font-bold">Fresh Tracker</h1>
      <p className="text-gray-500 mt-2">
        Track how long your perishable items have been open
      </p>
    </header>
  );
};

// Main content component that requires context
const AppContent = () => {
  const [isCompactMode, setIsCompactMode] = useState(false);

  // Listen for changes to indicate compact mode
  useEffect(() => {
    const handleCompactModeChange = () => {
      // We don't need to modify header visibility based on compact mode anymore
      // as it's controlled by settings now
      const items = document.querySelectorAll('.expandable-card');
      setIsCompactMode(items.length > 0);
    };
    
    // Set up mutation observer to detect DOM changes
    const observer = new MutationObserver(handleCompactModeChange);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="container max-w-5xl mx-auto p-4 pb-20 min-h-screen">
      <AppHeader />
      
      <main className="my-6">
        <ItemsList />
      </main>
      
      <IconManagerDialog />
      <AddItemDialog />
      <TutorialWrapper />
    </div>
  );
};

const Index = () => {
  return (
    <HandednessProvider>
      <IconManagerProvider>
        <ItemsProvider>
          <AppContent />
        </ItemsProvider>
      </IconManagerProvider>
    </HandednessProvider>
  );
};

export default Index;
