
import React, { useState } from 'react';
import { ItemsProvider } from '@/context/ItemsContext';
import { IconManagerProvider } from '@/context/IconManager';
import ItemsList from '@/components/ItemsList';
import AddItemDialog from '@/components/AddItemDialog';
import IconManagerDialog from '@/components/IconManagerDialog';

const Index = () => {
  const [isCompactMode, setIsCompactMode] = useState(false);

  // Listen for changes to the display style of the header
  // which indicates compact mode is enabled/disabled
  React.useEffect(() => {
    const header = document.getElementById('app-header');
    if (header) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'style') {
            setIsCompactMode(header.style.display === 'none');
          }
        });
      });
      
      observer.observe(header, { attributes: true });
      
      return () => observer.disconnect();
    }
  }, []);

  return (
    <IconManagerProvider>
      <ItemsProvider>
        <div className="container max-w-5xl mx-auto p-4 pb-20 min-h-screen">
          <header className="py-6 text-center" id="app-header">
            <h1 className="text-3xl font-bold">Fresh Tracker</h1>
            <p className="text-gray-500 mt-2">
              Track how long your perishable items have been open
            </p>
          </header>
          
          <main className="my-6">
            <ItemsList />
          </main>
          
          {/* Only show settings when not in compact mode */}
          {!isCompactMode && <IconManagerDialog />}
          <AddItemDialog />
        </div>
      </ItemsProvider>
    </IconManagerProvider>
  );
};

export default Index;
