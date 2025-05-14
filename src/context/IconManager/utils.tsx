
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
  
  // Convert kebab-case to PascalCase for Lucide icon names
  const pascalCaseName = iconName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  // Define better mappings for food items that need specialized icons
  const iconMappings: Record<string, string> = {
    'bread': 'Cookie', // Better representation for bread
    'bagels': 'Circle', // Circle shape for bagels
    'tortillas': 'CircleDot', // Flat circular shape
    'pretzels': 'CircleDashed', // Twisted shape suggestion
    'bowl': 'CircleOff',
    'pumpkin': 'CircleDot',
    'watermelon': 'Watermelon', // Use dedicated watermelon icon
    'water-filter': 'Filter', // Use Filter for water filter
  };
  
  // Check if we have a special mapping for this icon
  const mappedName = iconMappings[iconName] || pascalCaseName;
  
  // Try to use the mapped or pascal-cased name to get the icon
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<any>>)[mappedName];
  
  if (IconComponent) {
    return React.createElement(IconComponent, { className });
  } else {
    console.warn(`Icon "${iconName}" (${mappedName}) not found in Lucide icons, trying alternate parsing`);
    
    // Try to directly access by the name (some icons might have different naming patterns)
    const directIcon = Object.entries(LucideIcons).find(([key]) => 
      key.toLowerCase() === iconName.toLowerCase() || 
      key.toLowerCase() === pascalCaseName.toLowerCase()
    );
    
    if (directIcon && directIcon[1]) {
      const DirectIconComponent = directIcon[1] as React.ComponentType<any>;
      return React.createElement(DirectIconComponent, { className });
    }
  }
  
  console.warn(`Icon "${iconName}" could not be found in Lucide icons`);
  return React.createElement('div', {
    className: `flex items-center justify-center ${className} text-muted-foreground`
  }, '?');
};

// Create serializable product data for storage
export const createSerializableProducts = (
  products: Record<string, IconOptionExtended>
) => {
  return Object.entries(products).reduce((acc, [key, product]) => {
    // Ensure iconName is stored properly - this is a critical fix
    const iconName = product.iconName || 'apple';
    
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
  }, {} as Record<string, Omit<IconOptionExtended, 'icon'> & { iconName: string }>);
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
        const iconElement = createIconFromName(iconName);
        
        // Create the fully reconstructed product
        reconstructedProducts[key] = {
          value: productData.value,
          label: productData.label,
          shelfLife: productData.shelfLife,
          icon: iconElement as React.ReactElement,
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
