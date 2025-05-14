
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { IconOption } from '@/data/productData';
import { IconOptionExtended } from '@/types/iconTypes';
import { Icon } from '@iconify/react';

// Reconstruct an icon component from an icon name
export const createIconFromName = (iconName: string, className = "h-5 w-5") => {
  // Ensure we have a valid icon name
  if (!iconName) {
    console.error("No icon name provided to createIconFromName");
    iconName = 'tabler:apple'; // Default fallback
  }
  
  console.log(`Creating icon from name: ${iconName}`);
  
  // Check if this is an Iconify icon (contains a colon)
  if (iconName.includes(':')) {
    try {
      return <Icon icon={iconName} className={className} />;
    } catch (error) {
      console.warn(`Failed to render Iconify icon: ${iconName}`, error);
      // Fallback to apple icon for failed Iconify icons
      return <Icon icon="tabler:apple" className={className} />;
    }
  }
  
  // Legacy Lucide icon handling (for backwards compatibility)
  // Convert kebab-case to PascalCase for Lucide icon names
  const pascalCaseName = iconName.charAt(0).toUpperCase() + 
    iconName.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase());
  
  // Define better mappings for food items that need specialized icons
  const iconMappings: Record<string, string> = {
    'bread': 'Cookie', // Better representation for bread
    'bagels': 'Circle', // Circle shape for bagels
    'tortillas': 'CircleDot', // Flat circular shape
    'pretzels': 'CircleDashed', // Twisted shape suggestion
    'bowl': 'CircleOff',
    'pumpkin': 'CircleDot',
    'watermelon': 'Cherry', // Better representation for watermelon
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
  
  console.warn(`Icon "${iconName}" could not be found in Lucide icons, using default`);
  // Fallback to Iconify apple icon
  return <Icon icon="tabler:apple" className={className} />;
};

// Create serializable product data for storage
export const createSerializableProducts = (
  products: Record<string, IconOptionExtended>
) => {
  return Object.entries(products).reduce((acc, [key, product]) => {
    // Ensure iconName is stored properly - this is a critical fix
    const iconName = product.iconName || 'tabler:apple';
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
        // Use the stored icon name or default to 'tabler:apple' only if iconName is undefined
        const iconName = productData.iconName || 'tabler:apple';
        console.log(`Reconstructing product ${productData.label} with icon: ${iconName}`);
        
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
