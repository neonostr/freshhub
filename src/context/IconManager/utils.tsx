
import React from 'react';
import { IconOption } from '@/data/productData';
import { IconOptionExtended } from '@/types/iconTypes';

// TextIcon component for creating simple text-based icons
export const TextIcon = ({ text, className = "h-5 w-5" }: { text: string; className?: string }) => (
  <div className={`flex items-center justify-center ${className} bg-primary/10 text-primary rounded-full font-medium text-xs`}>
    {text.charAt(0).toUpperCase()}
  </div>
);

// Create an icon element from a name (now using TextIcon instead of LucideIcons)
export const createIconFromName = (iconName: string, className = "h-5 w-5") => {
  // Ensure we have a valid icon name
  if (!iconName) {
    console.error("No icon name provided to createIconFromName");
    return <TextIcon text="?" className={className} />;
  }
  
  console.log(`Creating text icon from name: ${iconName}`);
  
  // Generate a text representation based on the icon name
  const label = iconName
    .split('-')
    .map(part => part.charAt(0).toUpperCase())
    .join('');
  
  return <TextIcon text={label} className={className} />;
};

// Create serializable product data for storage
export const createSerializableProducts = (
  products: Record<string, IconOptionExtended>
) => {
  return Object.entries(products).reduce((acc, [key, product]) => {
    // Ensure iconName is stored properly - this is a critical fix
    const iconName = product.iconName || 'default';
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
        // Use the stored icon name or default to a placeholder
        const iconName = productData.iconName || 'default';
        console.log(`Reconstructing product ${productData.label} with icon: ${iconName}`);
        
        // Create a text-based icon element
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
