
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Item } from '@/types/item';
import { loadItems, saveItems } from '@/utils/itemUtils';

interface ItemsContextType {
  items: Item[];
  addItem: (item: Omit<Item, 'id' | 'openedDate'>) => void;
  deleteItem: (id: string) => void;
  resetItem: (id: string) => void;
  updateItemsWithProductChanges: (productId: string, newName: string) => void;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const loadedItems = loadItems();
    setItems(loadedItems);
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      saveItems(items);
    }
  }, [items]);
  
  // Listen for custom product deletion events
  useEffect(() => {
    const handleCustomProductDeleted = (event: CustomEvent) => {
      const { productId } = event.detail;
      setItems(prev => prev.filter(item => item.icon !== productId));
    };
    
    // Add event listener
    window.addEventListener('custom-product-deleted', handleCustomProductDeleted as EventListener);
    
    // Cleanup
    return () => {
      window.removeEventListener('custom-product-deleted', handleCustomProductDeleted as EventListener);
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
      updateItemsWithProductChanges 
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
