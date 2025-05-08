import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ALL_ICONS, DEFAULT_SELECTED_ICONS, IconOption } from '@/data/productData';
import { saveItems, loadItems } from '@/utils/itemUtils';
import * as LucideIcons from 'lucide-react';

interface IconManagerContextType {
  availableIcons: IconOption[];
  allIcons: Record<string, IconOption & { iconName?: string }>;
  toggleIcon: (iconValue: string) => void;
  isIconSelected: (iconValue: string) => boolean;
  updateIconShelfLife: (iconValue: string, days: number) => void;
  addCustomProduct: (product: IconOption, iconName: string) => void;
  updateProductName: (iconValue: string, newName: string) => void;
  deleteCustomProduct: (iconValue: string) => void;
  isCustomProduct: (iconValue: string) => boolean;
  customProducts: Record<string, IconOption & { iconName?: string }>;
}

const IconManagerContext = createContext<IconManagerContextType | undefined>(undefined);

export const IconManagerProvider = ({ children }: { children: ReactNode }) => {
  const [selectedIconValues, setSelectedIconValues] = useState<string[]>(() => {
    const saved = localStorage.getItem('freshTrackerSelectedIcons');
    return saved ? JSON.parse(saved) : DEFAULT_SELECTED_ICONS;
  });
  
  const [customShelfLife, setCustomShelfLife] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('freshTrackerCustomShelfLife');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [customProducts, setCustomProducts] = useState<Record<string, IconOption & { iconName?: string }>>(() => {
    const saved = localStorage.getItem('freshTrackerCustomProducts');
    if (saved) {
      try {
        // Parse the saved custom products
        const parsed = JSON.parse(saved);
        
        // Reconstruct the icon components from icon names
        const reconstructedProducts: Record<string, IconOption & { iconName?: string }> = {};
        
        for (const [key, product] of Object.entries(parsed)) {
          const productData = product as Partial<IconOption> & { iconName?: string };
          
          if (productData.value && productData.label && productData.shelfLife) {
            // Store the icon name for future reference
            const iconName = productData.iconName || 'apple';
            
            // Create the icon component from the stored name
            const pascalCaseName = iconName.charAt(0).toUpperCase() + 
              iconName.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase());
            
            const IconComponent = (LucideIcons as any)[pascalCaseName];
            
            // Create the fully reconstructed product
            reconstructedProducts[key] = {
              value: productData.value,
              label: productData.label,
              shelfLife: productData.shelfLife,
              icon: IconComponent ? React.createElement(IconComponent) : <div className="h-5 w-5 flex items-center justify-center">?</div>,
              iconName: iconName // Store the icon name for reference
            };
          }
        }
        
        return reconstructedProducts;
      } catch (e) {
        console.error("Error parsing custom products:", e);
        return {};
      }
    }
    return {};
  });
  
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
    .map(value => allIcons[value])
    .filter(Boolean)
    .sort((a, b) => a.label.localeCompare(b.label));
  
  useEffect(() => {
    try {
      localStorage.setItem('freshTrackerSelectedIcons', JSON.stringify(selectedIconValues));
    } catch (err) {
      console.error("Error saving selectedIconValues to localStorage:", err);
    }
  }, [selectedIconValues]);
  
  useEffect(() => {
    try {
      localStorage.setItem('freshTrackerCustomShelfLife', JSON.stringify(customShelfLife));
    } catch (err) {
      console.error("Error saving customShelfLife to localStorage:", err);
    }
  }, [customShelfLife]);
  
  useEffect(() => {
    try {
      // When saving to localStorage, serialize only the necessary properties
      // without the React component which causes the cyclic reference
      const serializableProducts = Object.entries(customProducts).reduce((acc, [key, product]) => {
        // Safely handle icon type extraction
        let iconName = 'apple'; // Default fallback
        
        if (React.isValidElement(product.icon)) {
          const iconType = product.icon.type as { displayName?: string } | null;
          if (iconType && typeof iconType === 'object' && 'displayName' in iconType && iconType.displayName) {
            iconName = iconType.displayName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
          }
        }
        
        // Store only the essential data without the React element
        return {
          ...acc,
          [key]: {
            value: product.value,
            label: product.label,
            shelfLife: product.shelfLife,
            // Store icon name or identifier
            iconName: iconName
          }
        };
      }, {});
      
      localStorage.setItem('freshTrackerCustomProducts', JSON.stringify(serializableProducts));
    } catch (err) {
      console.error("Error saving customProducts to localStorage:", err);
    }
  }, [customProducts]);

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
