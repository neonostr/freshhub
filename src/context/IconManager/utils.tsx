
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
  const pascalCase = iconName
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  
  // Get the component from LucideIcons
  const IconComponent = (LucideIcons as any)[pascalCase];
  
  if (IconComponent) {
    // For LucideIcons, we need to pass appropriate props
    return <IconComponent className={className} />;
  } else {
    console.warn(`Icon "${iconName}" (${pascalCase}) not found in Lucide icons, using fallback`);
    
    // Fallback to a generic icon
    const FallbackIcon = LucideIcons.HelpCircle;
    return <FallbackIcon className={className} />;
  }
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
