
import React, { useEffect } from 'react';
import { ItemsProvider } from '@/context/ItemsContext';
import ItemsList from '@/components/ItemsList';
import AddItemDialog from '@/components/AddItemDialog';

const Index = () => {
  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then((registration) => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, (err) => {
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }
  }, []);
  
  return (
    <ItemsProvider>
      <div className="container max-w-5xl mx-auto p-4">
        <header className="py-6 text-center">
          <h1 className="text-3xl font-bold">Fresh Tracker</h1>
          <p className="text-gray-500 mt-2">
            Track how long your perishable items have been open
          </p>
        </header>
        
        <main className="my-6">
          <ItemsList />
        </main>
        
        <AddItemDialog />
      </div>
    </ItemsProvider>
  );
};

export default Index;
