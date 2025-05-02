
import React, { useEffect, useState } from 'react';
import { ItemsProvider } from '@/context/ItemsContext';
import ItemsList from '@/components/ItemsList';
import AddItemDialog from '@/components/AddItemDialog';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // Handle online/offline status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(true);
      toast({
        title: "You're back online",
        description: "Changes will now synchronize.",
      });
    };
    
    const handleOfflineStatus = () => {
      setIsOnline(false);
      toast({
        title: "You're offline",
        description: "App will continue to work with local data.",
        variant: "destructive",
      });
    };
    
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
    };
  }, [toast]);
  
  // Register service worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then((registration) => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, (err) => {
          console.log('ServiceWorker registration failed: ', err);
        });
        
        // Handle service worker updates
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          toast({
            title: "App updated",
            description: "The app has been updated to the latest version.",
          });
        });
      });
    }
  }, [toast]);
  
  return (
    <ItemsProvider>
      <div className="container max-w-5xl mx-auto p-4">
        <header className="py-6 text-center">
          <h1 className="text-3xl font-bold">Fresh Tracker</h1>
          <p className="text-gray-500 mt-2">
            Track how long your perishable items have been open
          </p>
        </header>
        
        {!isOnline && (
          <div className="bg-amber-100 text-amber-800 p-2 mb-4 rounded text-center text-sm">
            You're currently offline. Data is saved locally.
          </div>
        )}
        
        <main className="my-6">
          <ItemsList />
        </main>
        
        <AddItemDialog />
      </div>
    </ItemsProvider>
  );
};

export default Index;
