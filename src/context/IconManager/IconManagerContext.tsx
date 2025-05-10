
import React, { createContext, useContext, useEffect } from 'react';
import { ALL_ICONS } from '@/data/productData';
import { IconOption } from '@/data/productData';
import { saveItems, loadItems } from '@/utils/itemUtils';
import { IconManagerContextType, IconManagerProviderProps } from './types';
import { useIconStorage } from './useIconStorage';
import { IconOptionExtended } from '@/types/iconTypes';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  
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
    // Get all tracked items
    const items = loadItems();
    let hasChanges = false;
    
    // Update items using the affected product IDs so they'll recalculate freshness levels
    // We don't need to modify the items directly since the shelf life is stored externally
    // Just saving items will force a re-render of components that depend on them
    if (items.length > 0) {
      // Save the items to trigger a refresh of components
      saveItems([...items]);
      
      // If any items were affected, show a toast notification
      const affectedIcons = Object.keys(customShelfLife).filter(iconId => 
        items.some(item => item.icon === iconId)
      );
      
      if (affectedIcons.length > 0) {
        toast({
          title: "Shelf life updated",
          description: `Freshness calculations for ${affectedIcons.length} product type(s) have been updated.`
        });
      }
    }
  }, [customShelfLife, toast]);
  
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
    
    // If we removed any items, save the updated list and show a notification
    if (filteredItems.length !== items.length) {
      const removedCount = items.length - filteredItems.length;
      saveItems(filteredItems);
      
      toast({
        title: "Items removed",
        description: `${removedCount} tracked item(s) using this product were also removed.`
      });
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
