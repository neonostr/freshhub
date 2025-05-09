
import React, { createContext, useContext } from 'react';
import { ALL_ICONS } from '@/data/productData';
import { IconOption } from '@/data/productData';
import { saveItems, loadItems } from '@/utils/itemUtils';
import { IconManagerContextType, IconManagerProviderProps } from './types';
import { useIconStorage } from './useIconStorage';

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
  
  const updateIconShelfLife = (iconValue: string, days: number) => {
    setCustomShelfLife(prev => ({
      ...prev,
      [iconValue]: days
    }));
  };
  
  const addCustomProduct = (product: IconOption, iconName: string) => {
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
