
import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_SELECTED_ICONS } from '@/data/productData';
import { createSerializableProducts, reconstructProductsFromStorage } from './utils';
import { IconOption } from '@/data/productData';
import { IconOptionExtended } from '@/types/iconTypes';

export const useIconStorage = () => {
  // Selected icons
  const [selectedIconValues, setSelectedIconValues] = useState<string[]>(() => {
    try {
      console.log("IconStorage: Loading selected icons from storage");
      const saved = localStorage.getItem('freshTrackerSelectedIcons');
      if (!saved) {
        console.log("IconStorage: No saved icons found, using defaults");
        return DEFAULT_SELECTED_ICONS;
      }
      
      const parsed = JSON.parse(saved);
      console.log(`IconStorage: Loaded ${parsed.length} selected icons`);
      return parsed;
    } catch (error) {
      console.error("IconStorage: Error loading selected icons:", error);
      return DEFAULT_SELECTED_ICONS;
    }
  });
  
  // Custom shelf life
  const [customShelfLife, setCustomShelfLife] = useState<Record<string, number>>(() => {
    try {
      console.log("IconStorage: Loading custom shelf life from storage");
      const saved = localStorage.getItem('freshTrackerCustomShelfLife');
      if (!saved) {
        console.log("IconStorage: No custom shelf life found");
        return {};
      }
      
      const parsed = JSON.parse(saved);
      console.log(`IconStorage: Loaded custom shelf life for ${Object.keys(parsed).length} products`);
      return parsed;
    } catch (error) {
      console.error("IconStorage: Error loading custom shelf life:", error);
      return {};
    }
  });
  
  // Custom products
  const [customProducts, setCustomProducts] = useState<Record<string, IconOptionExtended>>(() => {
    try {
      console.log("IconStorage: Loading custom products from storage");
      const saved = localStorage.getItem('freshTrackerCustomProducts');
      if (!saved) {
        console.log("IconStorage: No custom products found");
        return {};
      }
      
      const reconstructed = reconstructProductsFromStorage(saved);
      console.log(`IconStorage: Loaded ${Object.keys(reconstructed).length} custom products`);
      return reconstructed;
    } catch (error) {
      console.error("IconStorage: Error loading custom products:", error);
      return {};
    }
  });
  
  // Persist selected icons to localStorage
  useEffect(() => {
    try {
      console.log(`IconStorage: Saving ${selectedIconValues.length} selected icons to storage`);
      localStorage.setItem('freshTrackerSelectedIcons', JSON.stringify(selectedIconValues));
    } catch (err) {
      console.error("IconStorage: Error saving selectedIconValues to localStorage:", err);
    }
  }, [selectedIconValues]);
  
  // Persist custom shelf life to localStorage
  useEffect(() => {
    try {
      console.log(`IconStorage: Saving custom shelf life for ${Object.keys(customShelfLife).length} products`);
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
      console.error("IconStorage: Error saving customShelfLife to localStorage:", err);
    }
  }, [customShelfLife]);
  
  // Persist custom products to localStorage with proper debouncing
  useEffect(() => {
    try {
      // Serialize products for storage
      console.log(`IconStorage: Saving ${Object.keys(customProducts).length} custom products to storage`);
      const serializableProducts = createSerializableProducts(customProducts);
      localStorage.setItem('freshTrackerCustomProducts', JSON.stringify(serializableProducts));
      
      // Notify the UI about the change
      const timer = setTimeout(() => {
        console.log("IconStorage: Dispatching custom-products-storage-updated event");
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
      console.error("IconStorage: Error saving customProducts to localStorage:", err);
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
