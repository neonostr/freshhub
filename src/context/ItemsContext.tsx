
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Item } from '@/types/item';
import { loadItems, saveItems } from '@/utils/itemUtils';

interface ItemsContextType {
  items: Item[];
  addItem: (item: Omit<Item, 'id' | 'openedDate'>) => void;
  deleteItem: (id: string) => void;
  resetItem: (id: string) => void;
  updateItemsWithProductChanges: (productId: string, newName: string) => void;
  isFirstTimeUser: boolean;
  setIsFirstTimeUser: (value: boolean) => void;
  shouldShowTutorial: boolean;
  dismissTutorial: () => void;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(false);
  const [shouldShowTutorial, setShouldShowTutorial] = useState<boolean>(false);

  useEffect(() => {
    const loadedItems = loadItems();
    setItems(loadedItems);
    
    // Check if first time user
    const hasSeenTutorial = localStorage.getItem('hasSeenSwipeTutorial');
    if (!hasSeenTutorial) {
      setIsFirstTimeUser(true);
      
      // Only show tutorial when we have at least one item and we're on mobile
      if (loadedItems.length > 0 && window.innerWidth <= 768) {
        setShouldShowTutorial(true);
      }
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      saveItems(items);
      
      // For first time users, show tutorial when they add their first item
      if (isFirstTimeUser && items.length === 1 && window.innerWidth <= 768) {
        setShouldShowTutorial(true);
      }
    }
  }, [items, isFirstTimeUser]);
  
  const dismissTutorial = () => {
    setShouldShowTutorial(false);
    localStorage.setItem('hasSeenSwipeTutorial', 'true');
    setIsFirstTimeUser(false);
  };
  
  // Listen for custom product deletion events
  useEffect(() => {
    const handleCustomProductDeleted = (event: CustomEvent) => {
      const { productId } = event.detail;
      setItems(prev => prev.filter(item => item.icon !== productId));
    };
    
    // Listen for custom product updates
    const handleCustomProductUpdated = (event: CustomEvent) => {
      const { productId, newName, action } = event.detail;
      
      if (action === 'updated' && newName) {
        // Update all items using this product to have the new name
        setItems(prev => prev.map(item => 
          item.icon === productId 
            ? { ...item, name: newName } 
            : item
        ));
      } else {
        // Force a re-render to ensure UI is updated with the latest product info
        setItems(prev => [...prev]);
      }
    };
    
    // Listen for shelf life updates
    const handleShelfLifeUpdated = () => {
      // Force a re-render to update freshness calculations
      setItems(prev => [...prev]);
    };
    
    // Add event listeners
    window.addEventListener('custom-product-deleted', handleCustomProductDeleted as EventListener);
    window.addEventListener('custom-product-updated', handleCustomProductUpdated as EventListener);
    window.addEventListener('shelf-life-updated', handleShelfLifeUpdated);
    
    // Cleanup
    return () => {
      window.removeEventListener('custom-product-deleted', handleCustomProductDeleted as EventListener);
      window.removeEventListener('custom-product-updated', handleCustomProductUpdated as EventListener);
      window.removeEventListener('shelf-life-updated', handleShelfLifeUpdated);
    };
  }, []);

  const addItem = (item: Omit<Item, 'id' | 'openedDate'>) => {
    const newItem: Item = {
      ...item,
      id: Math.random().toString(36).substring(2, 15),
      openedDate: new Date().toISOString(),
    };
    
    setItems(prev => [...prev, newItem]);
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const resetItem = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, openedDate: new Date().toISOString() } 
        : item
    ));
  };
  
  // Function to update items when a custom product changes
  const updateItemsWithProductChanges = (productId: string, newName: string) => {
    const itemsToUpdate = items.filter(item => item.icon === productId);
    
    if (itemsToUpdate.length > 0) {
      setItems(prev => prev.map(item => 
        item.icon === productId 
          ? { ...item, name: newName } // Update name to match the product's new name
          : item
      ));
    }
  };

  return (
    <ItemsContext.Provider value={{ 
      items, 
      addItem, 
      deleteItem, 
      resetItem, 
      updateItemsWithProductChanges,
      isFirstTimeUser,
      setIsFirstTimeUser,
      shouldShowTutorial,
      dismissTutorial
    }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = (): ItemsContextType => {
  const context = useContext(ItemsContext);
  if (context === undefined) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
};
