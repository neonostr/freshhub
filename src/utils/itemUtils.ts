
import { Item, FreshnessLevel } from "@/types/item";
import { format, formatDistanceToNow, differenceInDays } from "date-fns";

// Default shelf life in days for common perishables
const DEFAULT_SHELF_LIFE: Record<string, number> = {
  dairy: 7, // milk, yogurt
  condiments: 30, // ketchup, mayo
  coffee: 14,
  produce: 5, // fruits, vegetables
  bakery: 5,
  "ready-meals": 3, // Added quotes around ready-meals
  snacks: 14,
  meat: 3,
  seafood: 2,
  drinks: 5,
  other: 7 // default
};

export const getShelfLife = (item: Item): number => {
  return item.customDuration ?? DEFAULT_SHELF_LIFE[item.category] ?? DEFAULT_SHELF_LIFE.other;
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
  switch (iconName) {
    case 'milk':
      return 'dairy';
    case 'coffee':
      return 'coffee';
    case 'apple':
    case 'banana':
    case 'carrot':
    case 'cherry':
    case 'salad':
      return 'produce';
    case 'egg':
    case 'iceCream':
      return 'dairy';
    case 'cookie':
    case 'cake':
    case 'croissant':
      return 'bakery';
    case 'pizza':
    case 'sandwich':
      return 'ready-meals';
    case 'beef':
    case 'drumstick':
      return 'meat';
    case 'beer':
      return 'drinks';
    case 'fish':
      return 'seafood';
    case 'box':
    case 'trash':
    default:
      return 'other';
  }
};
