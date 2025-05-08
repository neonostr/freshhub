import { Item, FreshnessLevel } from '@/types/item';
import { ALL_ICONS } from '@/data/productData';

// Function to calculate freshness level based on opened date
export const calculateFreshnessLevel = (item: Item): FreshnessLevel => {
  const openedDate = new Date(item.openedDate);
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - openedDate.getTime();
  const daysOpen = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  // Get shelf life from icon data or use default
  const shelfLife = getShelfLifeData(item.icon) ?? 30; // Default to 30 days
  
  const warningThreshold = shelfLife * 0.75; // 75% of shelf life
  const expiredThreshold = shelfLife; // 100% of shelf life
  
  if (daysOpen > expiredThreshold) {
    return 'expired';
  } else if (daysOpen > warningThreshold) {
    return 'warning';
  } else if (daysOpen > shelfLife / 2) {
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

// Function to get shelf life data from ALL_ICONS
export const getShelfLifeData = (iconId: string): number | undefined => {
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
