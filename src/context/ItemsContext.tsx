
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Item } from '@/types/item';
import { loadItems, saveItems } from '@/utils/itemUtils';
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  useEffect(() => {
    const loadedItems = loadItems();
    setItems(loadedItems);
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      saveItems(items);
    }
  }, [items]);

  const addItem = (item: Omit<Item, 'id' | 'openedDate'>) => {
    const newItem: Item = {
      ...item,
      id: Math.random().toString(36).substring(2, 15),
      openedDate: new Date().toISOString(),
    };
    
    setItems(prev => [...prev, newItem]);
    toast({
      title: "Item added",
      description: `${item.name} has been added to your tracker.`
    });
  };

  const deleteItem = (id: string) => {
    const itemToDelete = items.find(item => item.id === id);
    
    if (itemToDelete) {
      setItems(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Item removed",
        description: `${itemToDelete.name} has been removed from your tracker.`
      });
    }
  };

  const resetItem = (id: string) => {
    const itemToReset = items.find(item => item.id === id);
    
    if (itemToReset) {
      setItems(prev => prev.map(item => 
        item.id === id 
          ? { ...item, openedDate: new Date().toISOString() } 
          : item
      ));
      toast({
        title: "Item reset",
        description: `${itemToReset.name} has been marked as freshly opened.`
      });
    }
  };
  
  // New function to update items when a custom product changes
  const updateItemsWithProductChanges = (productId: string, newName: string) => {
    const itemsToUpdate = items.filter(item => item.icon === productId);
    
    if (itemsToUpdate.length > 0) {
      setItems(prev => prev.map(item => 
        item.icon === productId 
          ? { ...item, name: newName } // Update name to match the product's new name
          : item
      ));
      
      toast({
        title: "Items updated",
        description: `${itemsToUpdate.length} tracked item(s) have been updated with the new product name.`
      });
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
