
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { IconOption } from '@/data/productData';
import { IconOptionExtended } from '@/types/iconTypes';

// Reconstruct an icon component from an icon name
export const createIconFromName = (iconName: string, className = "h-5 w-5") => {
  const pascalCaseName = iconName.charAt(0).toUpperCase() + 
    iconName.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase());
  
  const IconComponent = (LucideIcons as any)[pascalCaseName];
  
  if (IconComponent) {
    return React.createElement(IconComponent, { className });
  }
  
  // Using React.createElement instead of JSX to avoid syntax issues
  return React.createElement('div', {
    className: `flex items-center justify-center ${className}`
  }, '?');
};

// Create serializable product data for storage
export const createSerializableProducts = (
  products: Record<string, IconOptionExtended>
) => {
  return Object.entries(products).reduce((acc, [key, product]) => {
    // Store only the essential data without the React element
    return {
      ...acc,
      [key]: {
        value: product.value,
        label: product.label,
        shelfLife: product.shelfLife,
        // Store icon name explicitly - make sure it's not lost
        iconName: product.iconName || 'apple'
      }
    };
  }, {});
};

// Reconstruct custom products from storage
export const reconstructProductsFromStorage = (
  savedData: string
): Record<string, IconOptionExtended> => {
  try {
    // Parse the saved custom products
    const parsed = JSON.parse(savedData);
    const reconstructedProducts: Record<string, IconOptionExtended> = {};
    
    for (const [key, product] of Object.entries(parsed)) {
      const productData = product as Partial<IconOptionExtended>;
      
      if (productData.value && productData.label && productData.shelfLife) {
        // Use the stored icon name or default to 'apple' only if iconName is undefined
        const iconName = productData.iconName || 'apple';
        
        // Create the icon component from the stored name
        const IconComponent = createIconFromName(iconName);
        
        // Create the fully reconstructed product
        reconstructedProducts[key] = {
          value: productData.value,
          label: productData.label,
          shelfLife: productData.shelfLife,
          icon: IconComponent,
          iconName: iconName // Store the icon name explicitly
        };
      }
    }
    
    return reconstructedProducts;
  } catch (e) {
    console.error("Error parsing custom products:", e);
    return {};
  }
};
