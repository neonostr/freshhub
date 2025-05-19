
import React from 'react';
import { IconOption } from '@/data/productData';
import { IconOptionExtended } from '@/types/iconTypes';

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
        
        // Create a placeholder element
        const placeholderElement = <div className="h-5 w-5" />;
        
        // Create the fully reconstructed product
        reconstructedProducts[key] = {
          value: productData.value,
          label: productData.label,
          shelfLife: productData.shelfLife,
          icon: placeholderElement as React.ReactElement,
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
