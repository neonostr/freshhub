
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { IconOption } from '@/data/productData';
import { IconOptionExtended } from '@/types/iconTypes';

// Reconstruct an icon component from an icon name
export const createIconFromName = (iconName: string, className = "h-5 w-5") => {
  // Ensure we have a valid icon name
  if (!iconName) {
    console.error("No icon name provided to createIconFromName");
    iconName = 'apple'; // Default fallback
  }
  
  console.log(`Creating icon from name: ${iconName}`);
  
  // Convert kebab-case to PascalCase for Lucide icon names
  const pascalCaseName = iconName.charAt(0).toUpperCase() + 
    iconName.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase());
  
  const IconComponent = (LucideIcons as any)[pascalCaseName];
  
  if (IconComponent) {
    // Use JSX to create the element
    return React.createElement(IconComponent, { className });
  } else {
    console.warn(`Icon "${iconName}" (${pascalCaseName}) not found in Lucide icons, trying alternate parsing`);
    
    // Try to directly access by the name (some icons might have different naming patterns)
    const directIcon = Object.entries(LucideIcons).find(([key]) => 
      key.toLowerCase() === iconName.toLowerCase() || 
      key.toLowerCase() === pascalCaseName.toLowerCase()
    );
    
    if (directIcon) {
      const DirectIconComponent = directIcon[1];
      return React.createElement(DirectIconComponent, { className });
    }
  }
  
  console.warn(`Icon "${iconName}" could not be found in Lucide icons`);
  return React.createElement('div', {
    className: `flex items-center justify-center ${className}`
  }, '?');
};

// Create serializable product data for storage
export const createSerializableProducts = (
  products: Record<string, IconOptionExtended>
) => {
  return Object.entries(products).reduce((acc, [key, product]) => {
    // Ensure iconName is stored properly - this is a critical fix
    const iconName = product.iconName || 'apple';
    console.log(`Serializing product ${product.label} with icon: ${iconName}`);
    
    // Store only the essential data without the React element
    return {
      ...acc,
      [key]: {
        value: product.value,
        label: product.label,
        shelfLife: product.shelfLife,
        // Store icon name explicitly to ensure it's retained
        iconName: iconName
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
        console.log(`Reconstructing product ${productData.label} with icon: ${iconName}`);
        
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
