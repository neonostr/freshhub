
import React from 'react';

export type IconOption = {
  value: string;
  label: string;
  icon: React.ReactElement;
  shelfLife: number; // Default shelf life in days
};

// Define all possible icons with new products and shelf life data
export const ALL_ICONS: Record<string, IconOption> = {
  // Dairy products
  almondMilk: { value: 'almondMilk', label: 'Almond Milk', icon: <div />, shelfLife: 7 },
  cashewMilk: { value: 'cashewMilk', label: 'Cashew Milk', icon: <div />, shelfLife: 7 },
  butter: { value: 'butter', label: 'Butter', icon: <div />, shelfLife: 14 },
  cheese: { value: 'cheese', label: 'Cheese', icon: <div />, shelfLife: 14 },
  coconutMilk: { value: 'coconutMilk', label: 'Coconut Milk', icon: <div />, shelfLife: 7 },
  cream: { value: 'cream', label: 'Cream', icon: <div />, shelfLife: 7 },
  milk: { value: 'milk', label: 'Milk', icon: <div />, shelfLife: 7 },
  oatMilk: { value: 'oatMilk', label: 'Oat Milk', icon: <div />, shelfLife: 7 },
  sourCream: { value: 'sourCream', label: 'Sour Cream', icon: <div />, shelfLife: 14 },
  soyMilk: { value: 'soyMilk', label: 'Soy Milk', icon: <div />, shelfLife: 7 },
  buttermilk: { value: 'buttermilk', label: 'Buttermilk', icon: <div />, shelfLife: 7 },
  kefir: { value: 'kefir', label: 'Kefir', icon: <div />, shelfLife: 10 },
  yogurt: { value: 'yogurt', label: 'Yogurt', icon: <div />, shelfLife: 14 },
  
  // Fruits
  apples: { value: 'apples', label: 'Apples', icon: <div />, shelfLife: 14 },
  apricots: { value: 'apricots', label: 'Apricots', icon: <div />, shelfLife: 5 },
  blackberries: { value: 'blackberries', label: 'Blackberries', icon: <div />, shelfLife: 3 },
  blueberries: { value: 'blueberries', label: 'Blueberries', icon: <div />, shelfLife: 5 },
  cherries: { value: 'cherries', label: 'Cherries', icon: <div />, shelfLife: 5 },
  coconuts: { value: 'coconuts', label: 'Coconuts', icon: <div />, shelfLife: 14 },
  cranberries: { value: 'cranberries', label: 'Cranberries', icon: <div />, shelfLife: 14 },
  grapes: { value: 'grapes', label: 'Grapes', icon: <div />, shelfLife: 7 },
  kiwi: { value: 'kiwi', label: 'Kiwi', icon: <div />, shelfLife: 7 },
  mangoes: { value: 'mangoes', label: 'Mangoes', icon: <div />, shelfLife: 5 },
  oranges: { value: 'oranges', label: 'Oranges', icon: <div />, shelfLife: 14 },
  peaches: { value: 'peaches', label: 'Peaches', icon: <div />, shelfLife: 5 },
  pears: { value: 'pears', label: 'Pears', icon: <div />, shelfLife: 7 },
  pineapple: { value: 'pineapple', label: 'Pineapple', icon: <div />, shelfLife: 5 },
  plums: { value: 'plums', label: 'Plums', icon: <div />, shelfLife: 5 },
  raisins: { value: 'raisins', label: 'Raisins', icon: <div />, shelfLife: 180 },
  raspberries: { value: 'raspberries', label: 'Raspberries', icon: <div />, shelfLife: 3 },
  strawberries: { value: 'strawberries', label: 'Strawberries', icon: <div />, shelfLife: 5 },
  watermelon: { value: 'watermelon', label: 'Watermelon', icon: <div />, shelfLife: 7 },
  banana: { value: 'banana', label: 'Banana', icon: <div />, shelfLife: 5 },
  
  // Vegetables
  asparagus: { value: 'asparagus', label: 'Asparagus', icon: <div />, shelfLife: 5 },
  avocados: { value: 'avocados', label: 'Avocados', icon: <div />, shelfLife: 5 },
  basil: { value: 'basil', label: 'Basil', icon: <div />, shelfLife: 7 },
  bellPepper: { value: 'bellPepper', label: 'Bell Pepper', icon: <div />, shelfLife: 7 },
  broccoli: { value: 'broccoli', label: 'Broccoli', icon: <div />, shelfLife: 7 },
  carrots: { value: 'carrots', label: 'Carrots', icon: <div />, shelfLife: 14 },
  cauliflower: { value: 'cauliflower', label: 'Cauliflower', icon: <div />, shelfLife: 7 },
  corn: { value: 'corn', label: 'Corn', icon: <div />, shelfLife: 5 },
  cucumbers: { value: 'cucumbers', label: 'Cucumbers', icon: <div />, shelfLife: 7 },
  garlic: { value: 'garlic', label: 'Garlic', icon: <div />, shelfLife: 30 },
  greenBeans: { value: 'greenBeans', label: 'Green Beans', icon: <div />, shelfLife: 7 },
  kale: { value: 'kale', label: 'Kale', icon: <div />, shelfLife: 7 },
  lettuce: { value: 'lettuce', label: 'Lettuce', icon: <div />, shelfLife: 7 },
  mushrooms: { value: 'mushrooms', label: 'Mushrooms', icon: <div />, shelfLife: 7 },
  olives: { value: 'olives', label: 'Olives', icon: <div />, shelfLife: 30 },
  onions: { value: 'onions', label: 'Onions', icon: <div />, shelfLife: 30 },
  peas: { value: 'peas', label: 'Peas', icon: <div />, shelfLife: 7 },
  potatoes: { value: 'potatoes', label: 'Potatoes', icon: <div />, shelfLife: 21 },
  spinach: { value: 'spinach', label: 'Spinach', icon: <div />, shelfLife: 5 },
  tomatoes: { value: 'tomatoes', label: 'Tomatoes', icon: <div />, shelfLife: 7 },
  
  // Meat and Poultry
  bacon: { value: 'bacon', label: 'Bacon', icon: <div />, shelfLife: 7 },
  beef: { value: 'beef', label: 'Beef', icon: <div />, shelfLife: 3 },
  chicken: { value: 'chicken', label: 'Chicken', icon: <div />, shelfLife: 2 },
  ham: { value: 'ham', label: 'Ham', icon: <div />, shelfLife: 7 },
  lamb: { value: 'lamb', label: 'Lamb', icon: <div />, shelfLife: 3 },
  pork: { value: 'pork', label: 'Pork', icon: <div />, shelfLife: 3 },
  prosciutto: { value: 'prosciutto', label: 'Prosciutto', icon: <div />, shelfLife: 7 },
  sausages: { value: 'sausages', label: 'Sausages', icon: <div />, shelfLife: 7 },
  steaks: { value: 'steaks', label: 'Steaks', icon: <div />, shelfLife: 3 },
  turkey: { value: 'turkey', label: 'Turkey', icon: <div />, shelfLife: 3 },
  
  // Seafood
  crab: { value: 'crab', label: 'Crab', icon: <div />, shelfLife: 2 },
  fish: { value: 'fish', label: 'Fish', icon: <div />, shelfLife: 2 },
  lobster: { value: 'lobster', label: 'Lobster', icon: <div />, shelfLife: 2 },
  scallops: { value: 'scallops', label: 'Scallops', icon: <div />, shelfLife: 2 },
  shrimp: { value: 'shrimp', label: 'Shrimp', icon: <div />, shelfLife: 2 },
  tuna: { value: 'tuna', label: 'Tuna', icon: <div />, shelfLife: 2 },
  
  // Baked Goods
  bagels: { value: 'bagels', label: 'Bagels', icon: <div />, shelfLife: 5 },
  biscotti: { value: 'biscotti', label: 'Biscotti', icon: <div />, shelfLife: 14 },
  bread: { value: 'bread', label: 'Bread', icon: <div />, shelfLife: 7 },
  cake: { value: 'cake', label: 'Cake', icon: <div />, shelfLife: 5 },
  cookies: { value: 'cookies', label: 'Cookies', icon: <div />, shelfLife: 14 },
  crackers: { value: 'crackers', label: 'Crackers', icon: <div />, shelfLife: 14 },
  muffins: { value: 'muffins', label: 'Muffins', icon: <div />, shelfLife: 5 },
  pretzels: { value: 'pretzels', label: 'Pretzels', icon: <div />, shelfLife: 14 },
  scones: { value: 'scones', label: 'Scones', icon: <div />, shelfLife: 5 },
  tortillas: { value: 'tortillas', label: 'Tortillas', icon: <div />, shelfLife: 7 },
  
  // Prepared Foods and Others
  appleJuice: { value: 'appleJuice', label: 'Apple Juice', icon: <div />, shelfLife: 7 },
  beans: { value: 'beans', label: 'Beans', icon: <div />, shelfLife: 5 },
  cashews: { value: 'cashews', label: 'Cashews', icon: <div />, shelfLife: 30 },
  cereals: { value: 'cereals', label: 'Cereals', icon: <div />, shelfLife: 90 },
  chips: { value: 'chips', label: 'Chips', icon: <div />, shelfLife: 14 },
  coffee: { value: 'coffee', label: 'Coffee', icon: <div />, shelfLife: 14 },
  eggs: { value: 'eggs', label: 'Eggs', icon: <div />, shelfLife: 28 },
  granola: { value: 'granola', label: 'Granola', icon: <div />, shelfLife: 30 },
  iceCream: { value: 'iceCream', label: 'Ice Cream', icon: <div />, shelfLife: 90 },
  oliveOil: { value: 'oliveOil', label: 'Olive Oil', icon: <div />, shelfLife: 365 },
  orangeJuice: { value: 'orangeJuice', label: 'Orange Juice', icon: <div />, shelfLife: 7 },
  pasta: { value: 'pasta', label: 'Pasta', icon: <div />, shelfLife: 5 },
  pecans: { value: 'pecans', label: 'Pecans', icon: <div />, shelfLife: 30 },
  pizza: { value: 'pizza', label: 'Pizza', icon: <div />, shelfLife: 4 },
  popcorn: { value: 'popcorn', label: 'Popcorn', icon: <div />, shelfLife: 14 },
  redWine: { value: 'redWine', label: 'Red Wine', icon: <div />, shelfLife: 5 },
  rice: { value: 'rice', label: 'Rice', icon: <div />, shelfLife: 5 },
  soda: { value: 'soda', label: 'Soda', icon: <div />, shelfLife: 3 },
  tomatoSauce: { value: 'tomatoSauce', label: 'Tomato Sauce', icon: <div />, shelfLife: 5 },
  vinegars: { value: 'vinegars', label: 'Vinegars', icon: <div />, shelfLife: 365 },
  walnuts: { value: 'walnuts', label: 'Walnuts', icon: <div />, shelfLife: 30 },
  water: { value: 'water', label: 'Water', icon: <div />, shelfLife: 365 },
  whiteWine: { value: 'whiteWine', label: 'White Wine', icon: <div />, shelfLife: 5 },
  almonds: { value: 'almonds', label: 'Almonds', icon: <div />, shelfLife: 30 },
  waterFilter: { value: 'waterFilter', label: 'Water Filter', icon: <div />, shelfLife: 30 },
};

// Default selected icons (initial state) - first 9 items alphabetically sorted
export const DEFAULT_SELECTED_ICONS = [
  'almondMilk', 'almonds', 'appleJuice', 'apples', 'apricots', 
  'asparagus', 'avocados', 'bacon', 'bagels'
];
