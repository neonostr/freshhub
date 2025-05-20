
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

  // Initial loading of items and first-time user check
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

  // Save items when they change and show tutorial for first-time users
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
  
  // Listen for product-related events
  useEffect(() => {
    // Handle product deletion
    const handleCustomProductDeleted = (event: CustomEvent) => {
      const { productId } = event.detail;
      setItems(prev => prev.filter(item => item.icon !== productId));
    };
    
    // Handle product updates with improved logging
    const handleCustomProductUpdated = (event: CustomEvent) => {
      const { productId, newName, action } = event.detail;
      
      if (action === 'updated' && newName) {
        console.log('Product updated, applying name change to items:', productId, newName);
        
        // Force a direct update of all items using this product to have the new name
        setItems(prev => {
          const updatedItems = prev.map(item => 
            item.icon === productId 
              ? { ...item, name: newName } 
              : item
          );
          
          const changedItemsCount = updatedItems.filter((item, index) => 
            item.name !== prev[index].name
          ).length;
          
          if (changedItemsCount > 0) {
            console.log(`Updated ${changedItemsCount} items with new name "${newName}"`);
            // Explicitly save the updated items to ensure persistence
            saveItems(updatedItems);
          } else {
            console.log('No items needed name updates');
          }
          
          return updatedItems;
        });
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
    
    // Also listen for storage events to handle PWA sync
    window.addEventListener('storage', (event) => {
      if (event.key === 'freshItems') {
        console.log('Items storage changed externally, reloading items');
        setItems(loadItems());
      }
    });
    
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
      console.log(`Manually updating ${itemsToUpdate.length} items with product ID ${productId} to name "${newName}"`);
      
      setItems(prev => {
        const updated = prev.map(item => 
          item.icon === productId 
            ? { ...item, name: newName } 
            : item
        );
        
        // Also save to storage to ensure persistence
        saveItems(updated);
        return updated;
      });
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
