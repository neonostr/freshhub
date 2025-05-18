
import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_SELECTED_ICONS } from '@/data/productData';
import { createSerializableProducts, reconstructProductsFromStorage } from './utils';
import { IconOption } from '@/data/productData';
import { IconOptionExtended } from '@/types/iconTypes';

export const useIconStorage = () => {
  // Selected icons
  const [selectedIconValues, setSelectedIconValues] = useState<string[]>(() => {
    const saved = localStorage.getItem('freshTrackerSelectedIcons');
    return saved ? JSON.parse(saved) : DEFAULT_SELECTED_ICONS;
  });
  
  // Custom shelf life
  const [customShelfLife, setCustomShelfLife] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('freshTrackerCustomShelfLife');
    return saved ? JSON.parse(saved) : {};
  });
  
  // Custom products
  const [customProducts, setCustomProducts] = useState<Record<string, IconOptionExtended>>(() => {
    const saved = localStorage.getItem('freshTrackerCustomProducts');
    if (saved) {
      return reconstructProductsFromStorage(saved);
    }
    return {};
  });
  
  // Persist selected icons to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('freshTrackerSelectedIcons', JSON.stringify(selectedIconValues));
    } catch (err) {
      console.error("Error saving selectedIconValues to localStorage:", err);
    }
  }, [selectedIconValues]);
  
  // Persist custom shelf life to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('freshTrackerCustomShelfLife', JSON.stringify(customShelfLife));
      
      // Trigger shelf-life-updated event to update UI components
      const event = new CustomEvent('shelf-life-updated');
      window.dispatchEvent(event);
      
      // Also dispatch a storage event for PWA listeners
      window.dispatchEvent(new StorageEvent('storage', { 
        key: 'freshTrackerCustomShelfLife',
        newValue: JSON.stringify(customShelfLife),
        storageArea: localStorage
      }));
      
    } catch (err) {
      console.error("Error saving customShelfLife to localStorage:", err);
    }
  }, [customShelfLife]);
  
  // Persist custom products to localStorage with proper debouncing
  useEffect(() => {
    try {
      // Serialize products for storage
      const serializableProducts = createSerializableProducts(customProducts);
      localStorage.setItem('freshTrackerCustomProducts', JSON.stringify(serializableProducts));
      
      // Notify the UI about the change
      const timer = setTimeout(() => {
        window.dispatchEvent(new CustomEvent('custom-products-storage-updated'));
        
        // Also dispatch a storage event for PWA listeners
        window.dispatchEvent(new StorageEvent('storage', { 
          key: 'freshTrackerCustomProducts',
          newValue: JSON.stringify(serializableProducts),
          storageArea: localStorage
        }));
      }, 50);
      
      return () => clearTimeout(timer);
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
};
