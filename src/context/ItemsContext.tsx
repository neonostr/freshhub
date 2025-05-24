import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Item } from '@/types/item';
import { loadItems, saveItems } from '@/utils/itemUtils';
import { toast } from 'sonner';

interface ItemsContextType {
  items: Item[];
  addItem: (item: Omit<Item, 'id' | 'openedDate'>) => Promise<void>;
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
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Load items from storage on initial render
  useEffect(() => {
    try {
      console.log("ItemsContext: Loading items from local storage");
      const loadedItems = loadItems();
      console.log(`ItemsContext: Loaded ${loadedItems.length} items`);
      setItems(loadedItems);
      
      // Check if first time user
      const hasSeenTutorial = localStorage.getItem('hasSeenSwipeTutorial');
      console.log(`ItemsContext: User has seen tutorial: ${!!hasSeenTutorial}`);
      if (!hasSeenTutorial) {
        setIsFirstTimeUser(true);
        
        // Only show tutorial when we have at least one item and we're on mobile
        if (loadedItems.length > 0 && window.innerWidth <= 768) {
          console.log("ItemsContext: Showing tutorial for mobile first-time user");
          setShouldShowTutorial(true);
        }
      }
      
      setIsInitialized(true);
    } catch (error) {
      console.error("ItemsContext: Error initializing:", error);
    }
  }, []);

  // Save items to storage when they change
  useEffect(() => {
    // Only save if we've already initialized (to prevent wiping storage on first render)
    if (isInitialized && items.length > 0) {
      try {
        console.log(`ItemsContext: Saving ${items.length} items to local storage`);
        saveItems(items);
        
        // For first time users, show tutorial when they add their first item
        if (isFirstTimeUser && items.length === 1 && window.innerWidth <= 768) {
          console.log("ItemsContext: Showing tutorial for first item added");
          setShouldShowTutorial(true);
        }
      } catch (error) {
        console.error("ItemsContext: Error saving items:", error);
      }
    }
  }, [items, isFirstTimeUser, isInitialized]);
  
  const dismissTutorial = () => {
    try {
      console.log("ItemsContext: Dismissing tutorial");
      setShouldShowTutorial(false);
      localStorage.setItem('hasSeenSwipeTutorial', 'true');
      setIsFirstTimeUser(false);
    } catch (error) {
      console.error("ItemsContext: Error dismissing tutorial:", error);
    }
  };
  
  // Listen for custom product deletion events
  useEffect(() => {
    const handleCustomProductDeleted = (event: CustomEvent) => {
      try {
        const { productId } = event.detail;
        console.log(`ItemsContext: Received custom-product-deleted event for ${productId}`);
        setItems(prev => {
          const filtered = prev.filter(item => item.icon !== productId);
          console.log(`ItemsContext: Removed ${prev.length - filtered.length} items using product ${productId}`);
          return filtered;
        });
      } catch (error) {
        console.error("ItemsContext: Error handling product deletion:", error);
      }
    };
    
    // Listen for custom product updates
    const handleCustomProductUpdated = (event: CustomEvent) => {
      try {
        const { productId, newName, action } = event.detail;
        console.log(`ItemsContext: Received custom-product-updated event for ${productId}`, event.detail);
        
        if (action === 'updated' && newName) {
          console.log(`ItemsContext: Updating items with product ${productId} to name "${newName}"`);
          // Update all items using this product to have the new name
          setItems(prev => {
            const updated = prev.map(item => 
              item.icon === productId 
                ? { ...item, name: newName } 
                : item
            );
            
            // Log how many items were updated
            const updatedCount = updated.filter((item, idx) => 
              item.name !== prev[idx].name
            ).length;
            
            console.log(`ItemsContext: Updated ${updatedCount} items with new name "${newName}"`);
            return updated;
          });
        } else {
          // Force a re-render to ensure UI is updated with the latest product info
          console.log(`ItemsContext: Forcing re-render for product update, action = ${action}`);
          setItems(prev => [...prev]);
        }
      } catch (error) {
        console.error("ItemsContext: Error handling product update:", error);
      }
    };
    
    // Listen for shelf life updates
    const handleShelfLifeUpdated = () => {
      try {
        console.log("ItemsContext: Received shelf-life-updated event");
        // Force a re-render to update freshness calculations
        setItems(prev => [...prev]);
      } catch (error) {
        console.error("ItemsContext: Error handling shelf life update:", error);
      }
    };

    // Listen for storage events from other tabs/windows
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'freshItems' && event.newValue) {
        try {
          console.log("ItemsContext: Storage event detected for freshItems");
          const newItems = JSON.parse(event.newValue);
          setItems(newItems);
        } catch (error) {
          console.error("ItemsContext: Error parsing items from storage event:", error);
        }
      }
    };
    
    // Add event listeners
    console.log("ItemsContext: Adding event listeners");
    window.addEventListener('custom-product-deleted', handleCustomProductDeleted as EventListener);
    window.addEventListener('custom-product-updated', handleCustomProductUpdated as EventListener);
    window.addEventListener('shelf-life-updated', handleShelfLifeUpdated);
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup
    return () => {
      console.log("ItemsContext: Removing event listeners");
      window.removeEventListener('custom-product-deleted', handleCustomProductDeleted as EventListener);
      window.removeEventListener('custom-product-updated', handleCustomProductUpdated as EventListener);
      window.removeEventListener('shelf-life-updated', handleShelfLifeUpdated);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addItem = async (item: Omit<Item, 'id' | 'openedDate'>): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        console.log(`ItemsContext: Adding new item "${item.name}" with icon "${item.icon}"`);
        
        // Generate a more reliable ID (timestamp + random)
        const id = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
        
        const newItem: Item = {
          ...item,
          id,
          openedDate: new Date().toISOString(),
        };
        
        console.log("ItemsContext: Created new item:", newItem);
        
        setItems(prev => {
          const newItems = [...prev, newItem];
          console.log(`ItemsContext: Updated items array to ${newItems.length} items`);
          
          // Immediately save to storage to prevent data loss
          try {
            saveItems(newItems);
            console.log(`ItemsContext: Saved ${newItems.length} items to storage`);
          } catch (saveError) {
            console.error("ItemsContext: Error saving items after add:", saveError);
            reject(saveError);
            return prev; // Return previous state on error
          }
          
          // Resolve the promise after successful save
          setTimeout(() => {
            console.log("ItemsContext: addItem operation completed successfully");
            resolve();
          }, 0);
          
          return newItems;
        });
      } catch (error) {
        console.error("ItemsContext: Error adding item:", error);
        reject(error);
      }
    });
  };

  const deleteItem = (id: string) => {
    try {
      console.log(`ItemsContext: Deleting item with ID "${id}"`);
      setItems(prev => {
        const filtered = prev.filter(item => item.id !== id);
        console.log(`ItemsContext: Removed ${prev.length - filtered.length} items`);
        
        // If we actually removed something, save to storage
        if (prev.length !== filtered.length) {
          try {
            saveItems(filtered);
            console.log(`ItemsContext: Saved ${filtered.length} items after deletion`);
          } catch (saveError) {
            console.error("ItemsContext: Error saving items after delete:", saveError);
          }
        } else {
          console.warn(`ItemsContext: Item with ID "${id}" not found for deletion`);
        }
        
        return filtered;
      });
    } catch (error) {
      console.error(`ItemsContext: Error deleting item ${id}:`, error);
      toast.error("Failed to delete item");
    }
  };

  const resetItem = (id: string) => {
    try {
      console.log(`ItemsContext: Resetting item with ID "${id}"`);
      setItems(prev => {
        const updated = prev.map(item => 
          item.id === id 
            ? { ...item, openedDate: new Date().toISOString() } 
            : item
        );
        
        // Check if we actually updated something
        const wasUpdated = updated.some((item, idx) => 
          item.openedDate !== prev[idx].openedDate
        );
        
        if (wasUpdated) {
          console.log(`ItemsContext: Reset item ${id} successfully`);
          try {
            saveItems(updated);
            console.log(`ItemsContext: Saved ${updated.length} items after reset`);
          } catch (saveError) {
            console.error("ItemsContext: Error saving items after reset:", saveError);
          }
        } else {
          console.warn(`ItemsContext: Item with ID "${id}" not found for reset`);
        }
        
        return updated;
      });
    } catch (error) {
      console.error(`ItemsContext: Error resetting item ${id}:`, error);
      toast.error("Failed to reset item");
    }
  };
  
  // Function to update items when a custom product changes
  const updateItemsWithProductChanges = (productId: string, newName: string) => {
    try {
      console.log(`ItemsContext: Updating items for product ${productId} with name ${newName}`);
      
      setItems(prev => {
        const itemsToUpdate = prev.filter(item => item.icon === productId);
        console.log(`ItemsContext: Found ${itemsToUpdate.length} items to update`);
        
        if (itemsToUpdate.length > 0) {
          const updated = prev.map(item => 
            item.icon === productId 
              ? { ...item, name: newName } 
              : item
          );
          
          // Save the updated items immediately to ensure consistency
          try {
            saveItems(updated);
            console.log(`ItemsContext: Saved ${updated.length} items after product rename`);
          } catch (saveError) {
            console.error("ItemsContext: Error saving items after product rename:", saveError);
          }
          
          return updated;
        }
        
        return prev;
      });
    } catch (error) {
      console.error(`ItemsContext: Error updating items for product ${productId}:`, error);
      toast.error("Failed to update items with product changes");
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
