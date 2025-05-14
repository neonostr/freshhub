
import React, { createContext, useContext, useEffect } from 'react';
import { ALL_ICONS } from '@/data/productData';
import { IconOption } from '@/data/productData';
import { saveItems, loadItems } from '@/utils/itemUtils';
import { IconManagerContextType, IconManagerProviderProps } from './types';
import { useIconStorage } from './useIconStorage';
import { IconOptionExtended } from '@/types/iconTypes';
import { renderFoodIcon } from './utils';

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
    setSelectedIconValues(prev => {
      if (prev.includes(iconValue)) {
        return prev.filter(v => v !== iconValue);
      } else {
        return [...prev, iconValue];
      }
    });
  };

  const isIconSelected = (iconValue: string) => {
    return selectedIconValues.includes(iconValue);
  };
  
  // Watch for shelf life changes and update items if needed
  useEffect(() => {
    if (Object.keys(customShelfLife).length > 0) {
      // Get all tracked items
      const items = loadItems();
      
      if (items.length > 0) {
        // Force a UI update by saving and then dispatching an event
        saveItems([...items]);
        
        // Dispatch a custom event to notify the app that shelf life settings have changed
        window.dispatchEvent(new CustomEvent('shelf-life-updated'));
      }
    }
  }, [customShelfLife]);
  
  const updateIconShelfLife = (iconValue: string, days: number) => {
    setCustomShelfLife(prev => ({
      ...prev,
      [iconValue]: days
    }));
  };
  
  const addCustomProduct = (product: IconOptionExtended, iconName: string) => {
    // Include the iconName in the stored product
    setCustomProducts(prev => ({
      ...prev,
      [product.value]: {
        ...product,
        iconName: iconName // Store the icon name for reference
      }
    }));
    
    // Auto-select the new product
    if (!isIconSelected(product.value)) {
      setSelectedIconValues(prev => [...prev, product.value]);
    }
    
    // Notify that a custom product was added/updated
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('custom-product-updated', { 
        detail: { productId: product.value, action: 'added' } 
      }));
    }, 0);
  };
  
  const updateProductName = (iconValue: string, newName: string) => {
    if (customProducts[iconValue]) {
      setCustomProducts(prev => ({
        ...prev,
        [iconValue]: {
          ...prev[iconValue],
          label: newName
        }
      }));
      
      // Update tracked items with this product
      const items = loadItems();
      const updatedItems = items.map(item => {
        if (item.icon === iconValue) {
          return { ...item, name: newName };
        }
        return item;
      });
      
      if (JSON.stringify(items) !== JSON.stringify(updatedItems)) {
        saveItems(updatedItems);
        // Notify about changes immediately to trigger UI updates
        window.dispatchEvent(new CustomEvent('custom-product-updated', {
          detail: { productId: iconValue, newName, action: 'updated' }
        }));
      }
    }
  };
  
  const deleteCustomProduct = (iconValue: string) => {
    // Remove from selected icons first
    if (isIconSelected(iconValue)) {
      setSelectedIconValues(prev => prev.filter(v => v !== iconValue));
    }
    
    // Remove all items that use this custom product
    const items = loadItems();
    const filteredItems = items.filter(item => item.icon !== iconValue);
    
    // If we removed any items, save the updated list
    if (filteredItems.length !== items.length) {
      saveItems(filteredItems);
      
      // Force an update to the items context by dispatching an event
      // This ensures the UI updates immediately without needing user interaction
      window.dispatchEvent(new CustomEvent('custom-product-deleted', { 
        detail: { productId: iconValue } 
      }));
    }
    
    // Then remove the custom product
    setCustomProducts(prev => {
      const newProducts = { ...prev };
      delete newProducts[iconValue];
      return newProducts;
    });
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
