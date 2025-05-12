
import React from 'react';
import { DEFAULT_SELECTED_ICONS } from '@/data/productData';
import { createSerializableProducts, reconstructProductsFromStorage } from './utils';
import { IconOptionExtended } from '@/types/iconTypes';

// Define the hook as a function that returns an object with state and setters
export function useIconStorage() {
  // Selected icons
  const [selectedIconValues, setSelectedIconValues] = React.useState<string[]>(() => {
    const saved = localStorage.getItem('freshTrackerSelectedIcons');
    return saved ? JSON.parse(saved) : DEFAULT_SELECTED_ICONS;
  });
  
  // Custom shelf life
  const [customShelfLife, setCustomShelfLife] = React.useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('freshTrackerCustomShelfLife');
    return saved ? JSON.parse(saved) : {};
  });
  
  // Custom products
  const [customProducts, setCustomProducts] = React.useState<Record<string, IconOptionExtended>>(() => {
    const saved = localStorage.getItem('freshTrackerCustomProducts');
    if (saved) {
      return reconstructProductsFromStorage(saved);
    }
    return {};
  });
  
  // Persist selected icons to localStorage
  React.useEffect(() => {
    try {
      localStorage.setItem('freshTrackerSelectedIcons', JSON.stringify(selectedIconValues));
    } catch (err) {
      console.error("Error saving selectedIconValues to localStorage:", err);
    }
  }, [selectedIconValues]);
  
  // Persist custom shelf life to localStorage
  React.useEffect(() => {
    try {
      localStorage.setItem('freshTrackerCustomShelfLife', JSON.stringify(customShelfLife));
    } catch (err) {
      console.error("Error saving customShelfLife to localStorage:", err);
    }
  }, [customShelfLife]);
  
  // Persist custom products to localStorage
  React.useEffect(() => {
    try {
      // Serialize products for storage
      const serializableProducts = createSerializableProducts(customProducts);
      localStorage.setItem('freshTrackerCustomProducts', JSON.stringify(serializableProducts));
    } catch (err) {
      console.error("Error saving customProducts to localStorage:", err);
    }
  }, [customProducts]);
  
  return {
    selectedIconValues,
    setSelectedIconValues,
    customShelfLife,
    setCustomShelfLife,
    customProducts,
    setCustomProducts
  };
}
