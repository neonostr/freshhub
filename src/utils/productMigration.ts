import { Item } from '@/types/item';
import { findBestMatchIconForName } from './iconMatching';

// List of new product names
export const NEW_PRODUCT_LIST = [
  "Almond Milk", "Almonds", "Apple Juice", "Apples", "Apricots", "Asparagus", 
  "Avocado", "Avocados", "Bacon", "Bagels", "Basil", "Beans", "Beef", 
  "Bell Peppers", "Berries Blackberries", "Berries Blueberries", "Berries Raspberries", 
  "Biscotti", "Bird food", "Bread", "Broccoli", "Butter", "Buttermilk", "Cake", 
  "Carrots", "Cat food", "Cauliflower", "Cereals", "Cherries", "Cheese", "Chicken", 
  "Chips", "Coffee", "Cookies", "Corn", "Crab", "Crackers", "Cream", "Cranberries", 
  "Cucumbers", "Eggs", "Fish", "Garlic", "Granola", "Green Beans", "Ham", 
  "Ice cream", "Kale", "Kefir", "Kiwi", "Lamb", "Lettuce", "Lobster", "Mangoes", 
  "Milk", "Muffins", "Mushrooms", "Olive Oil", "Olives", "Onions", "Oranges", 
  "Pasta", "Peaches", "Pears", "Peas", "Pecans", "Pineapple", "Plums", "Popcorn", 
  "Pork", "Potatoes", "Pretzels", "Prosciutto", "Protein bars", "Raisins", "Rice", 
  "Sausages Beef", "Sausages Chicken", "Sausages Pork", "Scallops", "Scones", 
  "Shrimp", "Soda", "Sour cream", "Spinach", "Steaks", "Strawberries", "Tortillas", 
  "Tomatoes", "Turkey", "Tuna", "Vinegars", "Walnuts", "Water", "Watermelon", 
  "White Wine", "Yogurt"
];

// Function to check if an item's name is in the new product list
export const isProductInNewList = (itemName: string): boolean => {
  return NEW_PRODUCT_LIST.some(name => 
    name.toLowerCase() === itemName.toLowerCase()
  );
};

// Function to find the closest product from the new list
export const findClosestProduct = (itemName: string): string => {
  // If product is in the new list, return it
  const exactMatch = NEW_PRODUCT_LIST.find(name => 
    name.toLowerCase() === itemName.toLowerCase()
  );
  if (exactMatch) return exactMatch;
  
  // Otherwise, find the best match
  let bestMatch = "";
  let highestScore = -1;
  
  for (const product of NEW_PRODUCT_LIST) {
    const score = calculateSimilarity(itemName.toLowerCase(), product.toLowerCase());
    if (score > highestScore) {
      highestScore = score;
      bestMatch = product;
    }
  }
  
  return bestMatch || NEW_PRODUCT_LIST[0]; // Default to first product if no good match
};

// Simple string similarity function
function calculateSimilarity(a: string, b: string): number {
  // Count matching characters
  const aChars = a.split('');
  const bChars = b.split('');
  let matches = 0;
  
  for (const char of aChars) {
    if (bChars.includes(char)) {
      matches++;
      // Remove the matched character to prevent double counting
      const index = bChars.indexOf(char);
      bChars.splice(index, 1);
    }
  }
  
  // Weight by length difference
  const lengthDiff = Math.abs(a.length - b.length);
  const lengthPenalty = 1 / (1 + lengthDiff);
  
  return (matches / Math.max(a.length, b.length)) * lengthPenalty;
}

// Function to migrate existing items to the new product list
export function migrateItems(existingItems: Item[]): Item[] {
  return existingItems.map(item => {
    // Find the closest matching product name
    const newProductName = findClosestProduct(item.name);
    
    // Find appropriate icon for the new product name
    const iconValue = findBestMatchIconForName(newProductName);
    
    return {
      ...item,
      name: newProductName,
      icon: iconValue || item.icon // Keep old icon if no match found
    };
  });
}
