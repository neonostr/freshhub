
import { IconOptionExtended } from '@/types/iconTypes';

// Create serializable product data for storage
export const createSerializableProducts = (
  products: Record<string, IconOptionExtended>
) => {
  return Object.entries(products).reduce((acc, [key, product]) => {
    return {
      ...acc,
      [key]: {
        value: product.value,
        label: product.label,
        shelfLife: product.shelfLife
      }
    };
  }, {} as Record<string, Omit<IconOptionExtended, 'icon'>>);
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
        reconstructedProducts[key] = {
          value: productData.value,
          label: productData.label,
          shelfLife: productData.shelfLife
        };
      }
    }
    
    return reconstructedProducts;
  } catch (e) {
    console.error("Error parsing custom products:", e);
    return {};
  }
};
