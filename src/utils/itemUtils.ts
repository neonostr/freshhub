
import { Item, FreshnessLevel } from '@/types/item';
import { ALL_ICONS } from '@/data/productData';

// Function to calculate freshness level based on days until expiry
export const calculateFreshnessLevel = (item: Item): FreshnessLevel => {
  const daysUntilExpiry = calculateDaysUntilExpiry(item);
  
  if (daysUntilExpiry <= 0) {
    return 'expired';
  } else if (daysUntilExpiry <= 1) {
    return 'warning';
  } else if (daysUntilExpiry <= 3) {
    return 'good';
  } else {
    return 'fresh';
  }
};

// Function to format the opened date
export const formatOpenedDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
};

// Function to calculate and format time since opened
export const formatTimeOpen = (dateString: string): string => {
  const openedDate = new Date(dateString);
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - openedDate.getTime();
  const daysOpen = Math.floor(timeDiff / (1000 * 3600 * 24));
  
  if (daysOpen < 1) {
    const hoursOpen = Math.floor(timeDiff / (1000 * 3600));
    return hoursOpen < 1 ? 'less than an hour' : `${hoursOpen} hour(s)`;
  } else if (daysOpen === 1) {
    return '1 day';
  } else {
    return `${daysOpen} days`;
  }
};

// Function to load items from local storage
export const loadItems = (): Item[] => {
  try {
    const storedItems = localStorage.getItem('freshItems');
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error("Failed to load items from local storage:", error);
    return [];
  }
};

// Function to save items to local storage
export const saveItems = (items: Item[]): void => {
  try {
    localStorage.setItem('freshItems', JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save items to local storage:", error);
  }
};

// Function to get shelf life data using the most up-to-date values
export const getShelfLifeData = (iconId: string): number | undefined => {
  // Check for custom shelf life settings in localStorage
  try {
    const customShelfLifeStr = localStorage.getItem('freshTrackerCustomShelfLife');
    if (customShelfLifeStr) {
      const customShelfLife = JSON.parse(customShelfLifeStr);
      if (customShelfLife[iconId] !== undefined) {
        return customShelfLife[iconId];
      }
    }
  } catch (err) {
    console.error("Error reading custom shelf life settings:", err);
  }
  
  // Check custom products
  try {
    const customProductsStr = localStorage.getItem('freshTrackerCustomProducts');
    if (customProductsStr) {
      const customProducts = JSON.parse(customProductsStr);
      if (customProducts[iconId] && customProducts[iconId].shelfLife !== undefined) {
        return customProducts[iconId].shelfLife;
      }
    }
  } catch (err) {
    console.error("Error reading custom products:", err);
  }
  
  // Fall back to built-in icons data
  const iconData = ALL_ICONS[iconId];
  return iconData ? iconData.shelfLife : undefined;
};

// Calculate days until the item expires based on its shelf life
export const calculateDaysUntilExpiry = (item: Item): number => {
  const openedDate = new Date(item.openedDate);
  const currentDate = new Date();
  
  // Calculate days since the item was opened
  const daysSinceOpened = Math.floor((currentDate.getTime() - openedDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // If we don't have shelf life data for this item, use a default value
  const defaultShelfLife = 30; // default shelf life in days if none specified
  
  // Get the shelf life from the item's icon data if available
  const shelfLifeData = getShelfLifeData(item.icon);
  
  // Calculate days until expiry
  const shelfLife = shelfLifeData ?? defaultShelfLife;
  const daysUntilExpiry = shelfLife - daysSinceOpened;
  
  return daysUntilExpiry > 0 ? daysUntilExpiry : 0;
};

// Calculate the maximum days until expiry across all items
export const getMaxDaysUntilExpiry = (items: Item[]): number => {
  if (items.length === 0) return 30; // Default value for empty list
  
  const maxDays = Math.max(...items.map(item => calculateDaysUntilExpiry(item)));
  // Ensure we always have a reasonable value (between 7 and 365 days)
  return Math.max(7, Math.min(maxDays, 365));
};
