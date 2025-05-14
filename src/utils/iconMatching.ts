
import { ALL_ICONS } from '@/data/productData';

// Function to find the best matching icon for a product name
export function findBestMatchIconForName(productName: string): string | null {
  const nameLower = productName.toLowerCase();
  
  // Try exact match first
  for (const [key, iconData] of Object.entries(ALL_ICONS)) {
    if (iconData.label.toLowerCase() === nameLower) {
      return key;
    }
  }
  
  // Try partial match
  for (const [key, iconData] of Object.entries(ALL_ICONS)) {
    if (nameLower.includes(iconData.label.toLowerCase()) || 
        iconData.label.toLowerCase().includes(nameLower)) {
      return key;
    }
  }
  
  // Try word match
  const words = nameLower.split(/\s+/);
  for (const word of words) {
    if (word.length < 3) continue; // Skip short words
    
    for (const [key, iconData] of Object.entries(ALL_ICONS)) {
      if (iconData.label.toLowerCase().includes(word)) {
        return key;
      }
    }
  }
  
  // Default mappings for common items
  const defaultMappings: Record<string, string> = {
    "milk": "milk",
    "almond milk": "milk",
    "juice": "orange",
    "apple juice": "apple",
    "berries": "strawberry",
    "bread": "bread",
    "cheese": "cheese",
    "chicken": "chicken",
    "beef": "steak",
    "fish": "fish",
    "water": "water",
    "coffee": "coffee",
    "eggs": "egg",
    "yogurt": "milk",
    "meat": "steak",
  };
  
  // Check default mappings
  for (const [term, iconKey] of Object.entries(defaultMappings)) {
    if (nameLower.includes(term)) {
      return iconKey;
    }
  }
  
  return null; // No match found
}
