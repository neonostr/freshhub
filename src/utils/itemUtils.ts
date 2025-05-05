import { Item, FreshnessLevel } from "@/types/item";
import { format, formatDistanceToNow, differenceInDays } from "date-fns";
import { ALL_ICONS } from "@/data/productData";

export const getShelfLife = (item: Item): number => {
  // If item has custom duration, use that
  if (item.customDuration) {
    return item.customDuration;
  }
  
  // Try to get shelf life from local storage custom products
  const customProductsStr = localStorage.getItem('freshTrackerCustomProducts');
  if (customProductsStr) {
    try {
      const customProducts = JSON.parse(customProductsStr);
      if (customProducts[item.icon]) {
        return customProducts[item.icon].shelfLife;
      }
    } catch (e) {
      console.error('Error parsing custom products:', e);
    }
  }
  
  // Get custom shelf life if available
  const customShelfLifeStr = localStorage.getItem('freshTrackerCustomShelfLife');
  if (customShelfLifeStr) {
    try {
      const customShelfLife = JSON.parse(customShelfLifeStr);
      if (customShelfLife[item.icon]) {
        return customShelfLife[item.icon];
      }
    } catch (e) {
      console.error('Error parsing custom shelf life:', e);
    }
  }
  
  // Otherwise use the default shelf life for the icon
  // Fall back to 7 days if icon not found
  return ALL_ICONS[item.icon]?.shelfLife ?? 7;
};

export const calculateFreshnessLevel = (item: Item): FreshnessLevel => {
  const daysSinceOpened = differenceInDays(new Date(), new Date(item.openedDate));
  const shelfLife = getShelfLife(item);
  
  const percentUsed = (daysSinceOpened / shelfLife) * 100;
  
  if (percentUsed < 25) return 'fresh';
  if (percentUsed < 75) return 'good';
  if (percentUsed < 100) return 'warning';
  return 'expired';
};

export const getFreshnessColor = (level: FreshnessLevel): string => {
  switch (level) {
    case 'fresh': return 'fresh-green';
    case 'good': return 'fresh-yellow';
    case 'warning': return 'fresh-orange';
    case 'expired': return 'fresh-red';
  }
};

export const formatOpenedDate = (date: string): string => {
  return format(new Date(date), 'MMM d, yyyy');
};

export const formatTimeOpen = (date: string): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

export const saveItems = (items: Item[]): void => {
  localStorage.setItem('freshTrackerItems', JSON.stringify(items));
};

export const loadItems = (): Item[] => {
  const storedItems = localStorage.getItem('freshTrackerItems');
  return storedItems ? JSON.parse(storedItems) : [];
};

// Update getCategoryForIcon to use our centralized mapping
export const getCategoryForIcon = (iconName: string): string => {
  // Check if it's a custom product
  if (iconName.startsWith('custom_')) {
    return 'custom';
  }
  
  // Simple category mapping based on product types
  if (iconName.includes('milk') || iconName.includes('cream') || 
      iconName.includes('cheese') || iconName === 'eggs') {
    return 'dairy';
  }
  
  if (iconName.includes('coffee')) {
    return 'coffee';
  }
  
  if (iconName.includes('apple') || iconName.includes('banana') || 
      iconName.includes('carrot') || iconName.includes('cherry') || 
      iconName.includes('salad') || iconName.includes('fruit') || 
      iconName.includes('vegetable')) {
    return 'produce';
  }
  
  if (iconName.includes('cookie') || iconName.includes('cake') || 
      iconName.includes('bread') || iconName.includes('bagel')) {
    return 'bakery';
  }
  
  if (iconName.includes('pizza') || iconName.includes('sandwich')) {
    return 'ready-meals';
  }
  
  if (iconName.includes('beef') || iconName.includes('chicken') || 
      iconName.includes('meat') || iconName.includes('turkey') || 
      iconName.includes('pork')) {
    return 'meat';
  }
  
  if (iconName.includes('beer') || iconName.includes('wine') || 
      iconName.includes('juice')) {
    return 'drinks';
  }
  
  if (iconName.includes('fish') || iconName.includes('shrimp')) {
    return 'seafood';
  }
  
  // Default category
  return 'other';
};
