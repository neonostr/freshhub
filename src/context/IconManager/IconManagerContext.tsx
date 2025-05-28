
import React, { createContext, useContext, useEffect, useRef } from 'react';
import { ALL_ICONS } from '@/data/productData';
import { IconOption } from '@/data/productData';
import { saveItems, loadItems } from '@/utils/itemUtils';
import { useIconStorage } from './useIconStorage';
import { IconOptionExtended } from '@/types/iconTypes';
import { createSerializableProducts, reconstructProductsFromStorage } from './utils';
import { toast } from 'sonner';

interface IconManagerContextType {
  availableIcons: IconOption[];
  allIcons: Record<string, IconOption | IconOptionExtended>;
  toggleIcon: (iconValue: string) => void;
  isIconSelected: (iconValue: string) => boolean;
  updateIconShelfLife: (iconValue: string, days: number) => void;
  addCustomProduct: (product: IconOptionExtended) => void;
  updateProductName: (iconValue: string, newName: string) => void;
  deleteCustomProduct: (iconValue: string) => void;
  isCustomProduct: (iconValue: string) => boolean;
  customProducts: Record<string, IconOptionExtended>;
}

interface IconManagerProviderProps {
  children: React.ReactNode;
}

const IconManagerContext = createContext<IconManagerContextType | undefined>(undefined);

export const IconManagerProvider = ({ children }: IconManagerProviderProps) => {
  const {
    selectedIconValues,
    setSelectedIconValues,
    customShelfLife,
    setCustomShelfLife,
    customProducts,
    setCustomProducts
  } = useIconStorage();
  
  // Use ref to prevent multiple simultaneous updates
  const updateInProgressRef = useRef(false);
  
  // Create a copy of ALL_ICONS with custom shelf life values applied
  const iconsWithCustomShelfLife = { ...ALL_ICONS };
  Object.keys(customShelfLife).forEach(iconKey => {
    if (iconsWithCustomShelfLife[iconKey]) {
      iconsWithCustomShelfLife[iconKey] = {
        ...iconsWithCustomShelfLife[iconKey],
        shelfLife: customShelfLife[iconKey]
      };
    }
  });
  
  // Combine built-in icons with custom products
  const allIcons = { ...iconsWithCustomShelfLife, ...customProducts };
  
  // Update available icons based on selected values - sorted alphabetically by label
  const availableIcons = selectedIconValues
    .filter(value => allIcons[value]) // Filter out any values that don't exist in allIcons
    .map(value => allIcons[value])
    .filter(Boolean)
    .sort((a, b) => a.label.localeCompare(b.label));

  const toggleIcon = (iconValue: string) => {
    try {
      console.log(`IconManager: Toggling icon ${iconValue}`);
      
      setSelectedIconValues(prev => {
        if (prev.includes(iconValue)) {
          console.log(`IconManager: Removing icon ${iconValue} from selected icons`);
          return prev.filter(v => v !== iconValue);
        } else {
          console.log(`IconManager: Adding icon ${iconValue} to selected icons`);
          return [...prev, iconValue];
        }
      });
    } catch (error) {
      console.error(`IconManager: Error toggling icon ${iconValue}:`, error);
      toast.error("Failed to update product selection");
    }
  };

  const isIconSelected = (iconValue: string) => {
    return selectedIconValues.includes(iconValue);
  };
  
  // Watch for shelf life changes and update items if needed - with debouncing
  useEffect(() => {
    if (Object.keys(customShelfLife).length > 0 && !updateInProgressRef.current) {
      updateInProgressRef.current = true;
      
      const timeoutId = setTimeout(() => {
        try {
          console.log(`IconManager: Custom shelf life updated, keys: ${Object.keys(customShelfLife).join(', ')}`);
          
          // Get all tracked items
          const items = loadItems();
          
          if (items.length > 0) {
            console.log(`IconManager: Updating freshness for ${items.length} items after shelf life changes`);
            // Force a UI update by saving and then dispatching an event
            saveItems([...items]);
          }
        } catch (error) {
          console.error("IconManager: Error handling shelf life changes:", error);
        } finally {
          updateInProgressRef.current = false;
        }
      }, 200); // Increased debounce time
      
      return () => {
        clearTimeout(timeoutId);
        updateInProgressRef.current = false;
      };
    }
  }, [customShelfLife]);
  
  const updateIconShelfLife = (iconValue: string, days: number) => {
    try {
      console.log(`IconManager: Updating shelf life for ${iconValue} to ${days} days`);
      
      // Check if this is a custom product
      if (customProducts[iconValue]) {
        console.log(`IconManager: Updating custom product ${iconValue} shelf life`);
        // Update the custom product's shelf life
        setCustomProducts(prev => ({
          ...prev,
          [iconValue]: {
            ...prev[iconValue],
            shelfLife: days
          }
        }));
      } else {
        // For built-in products, update custom shelf life
        setCustomShelfLife(prev => ({
          ...prev,
          [iconValue]: days
        }));
      }
      
      toast.success(`Updated shelf life to ${days} days`);
    } catch (error) {
      console.error(`IconManager: Error updating shelf life for ${iconValue}:`, error);
      toast.error("Failed to update shelf life");
    }
  };
  
  const addCustomProduct = (product: IconOptionExtended) => {
    try {
      console.log(`IconManager: Adding custom product "${product.label}" with ID ${product.value}`);
      
      // Add the product to the custom products store
      setCustomProducts(prev => ({
        ...prev,
        [product.value]: {
          ...product
        }
      }));
      
      // Auto-select the new product immediately
      console.log(`IconManager: Auto-selecting new product ${product.value}`);
      setSelectedIconValues(prev => {
        if (!prev.includes(product.value)) {
          return [...prev, product.value];
        }
        return prev;
      });
      
      // Notify that a custom product was added/updated
      setTimeout(() => {
        console.log(`IconManager: Dispatching custom-product-updated event for ${product.value}`);
        window.dispatchEvent(new CustomEvent('custom-product-updated', { 
          detail: { productId: product.value, action: 'added' } 
        }));
      }, 0);
      
      toast.success(`Added ${product.label}`);
    } catch (error) {
      console.error(`IconManager: Error adding custom product:`, error);
      toast.error("Failed to add custom product");
    }
  };
  
  const updateProductName = (iconValue: string, newName: string) => {
    try {
      if (!customProducts[iconValue]) {
        console.error(`IconManager: Cannot update non-existent product ${iconValue}`);
        toast.error("Product not found");
        return;
      }
      
      console.log(`IconManager: Updating product ${iconValue} name from "${customProducts[iconValue].label}" to "${newName}"`);
      
      // Update the product in our state
      setCustomProducts(prev => ({
        ...prev,
        [iconValue]: {
          ...prev[iconValue],
          label: newName
        }
      }));
      
      // Update tracked items with this product directly
      const items = loadItems();
      console.log(`IconManager: Checking ${items.length} items for product ${iconValue}`);
      
      const updatedItems = items.map(item => {
        if (item.icon === iconValue) {
          console.log(`IconManager: Updating item ${item.id} name to "${newName}"`);
          return { ...item, name: newName };
        }
        return item;
      });
      
      // Calculate number of affected items
      const affectedItemsCount = items.reduce((count, item) => 
        item.icon === iconValue ? count + 1 : count, 0);
      
      if (affectedItemsCount > 0) {
        console.log(`IconManager: Updating ${affectedItemsCount} items with new product name`);
        saveItems(updatedItems);
        
        // Notify about changes immediately to trigger UI updates
        window.dispatchEvent(new CustomEvent('custom-product-updated', {
          detail: { productId: iconValue, newName, action: 'updated' }
        }));
        
        toast.success(`Updated ${affectedItemsCount} items with new name`);
      } else {
        console.log(`IconManager: No items found using product ${iconValue}`);
        
        // Still dispatch event to update UI
        window.dispatchEvent(new CustomEvent('custom-product-updated', {
          detail: { productId: iconValue, newName, action: 'updated' }
        }));
      }
    } catch (error) {
      console.error(`IconManager: Error updating product ${iconValue} name:`, error);
      toast.error("Failed to update product name");
    }
  };
  
  const deleteCustomProduct = (iconValue: string) => {
    try {
      if (!customProducts[iconValue]) {
        console.error(`IconManager: Cannot delete non-existent product ${iconValue}`);
        toast.error("Product not found");
        return;
      }
      
      console.log(`IconManager: Deleting custom product ${iconValue}`);
      
      // Get product name for notification
      const productName = customProducts[iconValue]?.label || 'product';
      
      // Remove from selected icons first
      if (isIconSelected(iconValue)) {
        console.log(`IconManager: Removing ${iconValue} from selected icons`);
        setSelectedIconValues(prev => prev.filter(v => v !== iconValue));
      }
      
      // Remove all items that use this custom product
      const items = loadItems();
      const filteredItems = items.filter(item => item.icon !== iconValue);
      
      // Calculate number of affected items
      const removedItemsCount = items.length - filteredItems.length;
      
      // If we removed any items, save the updated list
      if (removedItemsCount > 0) {
        console.log(`IconManager: Removing ${removedItemsCount} items using product ${iconValue}`);
        saveItems(filteredItems);
        
        // Force an update to the items context by dispatching an event
        // This ensures the UI updates immediately without needing user interaction
        window.dispatchEvent(new CustomEvent('custom-product-deleted', { 
          detail: { productId: iconValue } 
        }));
        
        toast.success(`Deleted ${productName} and ${removedItemsCount} items`);
      } else {
        console.log(`IconManager: No items found using product ${iconValue}`);
        toast.success(`Deleted ${productName}`);
      }
      
      // Then remove the custom product
      setCustomProducts(prev => {
        const newProducts = { ...prev };
        delete newProducts[iconValue];
        return newProducts;
      });
    } catch (error) {
      console.error(`IconManager: Error deleting custom product ${iconValue}:`, error);
      toast.error("Failed to delete product");
    }
  };
  
  const isCustomProduct = (iconValue: string) => {
    return !!customProducts[iconValue];
  };

  return (
    <IconManagerContext.Provider value={{ 
      availableIcons, 
      allIcons,
      toggleIcon, 
      isIconSelected,
      updateIconShelfLife,
      addCustomProduct,
      updateProductName,
      deleteCustomProduct,
      isCustomProduct,
      customProducts
    }}>
      {children}
    </IconManagerContext.Provider>
  );
};

export const useIconManager = (): IconManagerContextType => {
  const context = useContext(IconManagerContext);
  if (context === undefined) {
    throw new Error('useIconManager must be used within an IconManagerProvider');
  }
  return context;
};

// Re-export ALL_ICONS for convenience
export { ALL_ICONS } from '@/data/productData';
