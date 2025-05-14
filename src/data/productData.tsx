
import React from 'react';
import { renderFoodIcon } from '@/context/IconManager/utils';

export type IconOption = {
  value: string;
  label: string;
  icon: React.ReactElement;
  shelfLife: number; // Default shelf life in days
};

// Define all possible icons with new products and shelf life data
export const ALL_ICONS: Record<string, IconOption> = {
  // Dairy products
  almondMilk: { value: 'almondMilk', label: 'Almond Milk', icon: renderFoodIcon('almondMilk'), shelfLife: 7 },
  cashewMilk: { value: 'cashewMilk', label: 'Cashew Milk', icon: renderFoodIcon('cashewMilk'), shelfLife: 7 },
  butter: { value: 'butter', label: 'Butter', icon: renderFoodIcon('butter'), shelfLife: 14 },
  cheese: { value: 'cheese', label: 'Cheese', icon: renderFoodIcon('cheese'), shelfLife: 14 },
  coconutMilk: { value: 'coconutMilk', label: 'Coconut Milk', icon: renderFoodIcon('coconutMilk'), shelfLife: 7 },
  cream: { value: 'cream', label: 'Cream', icon: renderFoodIcon('cream'), shelfLife: 7 },
  milk: { value: 'milk', label: 'Milk', icon: renderFoodIcon('milk'), shelfLife: 7 },
  oatMilk: { value: 'oatMilk', label: 'Oat Milk', icon: renderFoodIcon('oatMilk'), shelfLife: 7 },
  sourCream: { value: 'sourCream', label: 'Sour Cream', icon: renderFoodIcon('sourCream'), shelfLife: 14 },
  soyMilk: { value: 'soyMilk', label: 'Soy Milk', icon: renderFoodIcon('soyMilk'), shelfLife: 7 },
  buttermilk: { value: 'buttermilk', label: 'Buttermilk', icon: renderFoodIcon('buttermilk'), shelfLife: 7 },
  kefir: { value: 'kefir', label: 'Kefir', icon: renderFoodIcon('kefir'), shelfLife: 10 },
  yogurt: { value: 'yogurt', label: 'Yogurt', icon: renderFoodIcon('yogurt'), shelfLife: 14 },
  
  // Fruits
  apples: { value: 'apples', label: 'Apples', icon: renderFoodIcon('apples'), shelfLife: 14 },
  apricots: { value: 'apricots', label: 'Apricots', icon: renderFoodIcon('apricots'), shelfLife: 5 },
  blackberries: { value: 'blackberries', label: 'Blackberries', icon: renderFoodIcon('blackberries'), shelfLife: 3 },
  blueberries: { value: 'blueberries', label: 'Blueberries', icon: renderFoodIcon('blueberries'), shelfLife: 5 },
  cherries: { value: 'cherries', label: 'Cherries', icon: renderFoodIcon('cherries'), shelfLife: 5 },
  coconuts: { value: 'coconuts', label: 'Coconuts', icon: renderFoodIcon('coconuts'), shelfLife: 14 },
  cranberries: { value: 'cranberries', label: 'Cranberries', icon: renderFoodIcon('cranberries'), shelfLife: 14 },
  grapes: { value: 'grapes', label: 'Grapes', icon: renderFoodIcon('grapes'), shelfLife: 7 },
  kiwi: { value: 'kiwi', label: 'Kiwi', icon: renderFoodIcon('kiwi'), shelfLife: 7 },
  mangoes: { value: 'mangoes', label: 'Mangoes', icon: renderFoodIcon('mangoes'), shelfLife: 5 },
  oranges: { value: 'oranges', label: 'Oranges', icon: renderFoodIcon('oranges'), shelfLife: 14 },
  peaches: { value: 'peaches', label: 'Peaches', icon: renderFoodIcon('peaches'), shelfLife: 5 },
  pears: { value: 'pears', label: 'Pears', icon: renderFoodIcon('pears'), shelfLife: 7 },
  pineapple: { value: 'pineapple', label: 'Pineapple', icon: renderFoodIcon('pineapple'), shelfLife: 5 },
  plums: { value: 'plums', label: 'Plums', icon: renderFoodIcon('plums'), shelfLife: 5 },
  raisins: { value: 'raisins', label: 'Raisins', icon: renderFoodIcon('raisins'), shelfLife: 180 },
  raspberries: { value: 'raspberries', label: 'Raspberries', icon: renderFoodIcon('raspberries'), shelfLife: 3 },
  strawberries: { value: 'strawberries', label: 'Strawberries', icon: renderFoodIcon('strawberries'), shelfLife: 5 },
  watermelon: { value: 'watermelon', label: 'Watermelon', icon: renderFoodIcon('watermelon'), shelfLife: 7 },
  
  // Vegetables
  asparagus: { value: 'asparagus', label: 'Asparagus', icon: renderFoodIcon('asparagus'), shelfLife: 5 },
  avocados: { value: 'avocados', label: 'Avocados', icon: renderFoodIcon('avocados'), shelfLife: 5 },
  basil: { value: 'basil', label: 'Basil', icon: renderFoodIcon('basil'), shelfLife: 7 },
  bellPepper: { value: 'bellPepper', label: 'Bell Pepper', icon: renderFoodIcon('bellPepper'), shelfLife: 7 },
  broccoli: { value: 'broccoli', label: 'Broccoli', icon: renderFoodIcon('broccoli'), shelfLife: 7 },
  carrots: { value: 'carrots', label: 'Carrots', icon: renderFoodIcon('carrots'), shelfLife: 14 },
  cauliflower: { value: 'cauliflower', label: 'Cauliflower', icon: renderFoodIcon('cauliflower'), shelfLife: 7 },
  corn: { value: 'corn', label: 'Corn', icon: renderFoodIcon('corn'), shelfLife: 5 },
  cucumbers: { value: 'cucumbers', label: 'Cucumbers', icon: renderFoodIcon('cucumbers'), shelfLife: 7 },
  garlic: { value: 'garlic', label: 'Garlic', icon: renderFoodIcon('garlic'), shelfLife: 30 },
  greenBeans: { value: 'greenBeans', label: 'Green Beans', icon: renderFoodIcon('greenBeans'), shelfLife: 7 },
  kale: { value: 'kale', label: 'Kale', icon: renderFoodIcon('kale'), shelfLife: 7 },
  lettuce: { value: 'lettuce', label: 'Lettuce', icon: renderFoodIcon('lettuce'), shelfLife: 7 },
  mushrooms: { value: 'mushrooms', label: 'Mushrooms', icon: renderFoodIcon('mushrooms'), shelfLife: 7 },
  olives: { value: 'olives', label: 'Olives', icon: renderFoodIcon('olives'), shelfLife: 30 },
  onions: { value: 'onions', label: 'Onions', icon: renderFoodIcon('onions'), shelfLife: 30 },
  peas: { value: 'peas', label: 'Peas', icon: renderFoodIcon('peas'), shelfLife: 7 },
  potatoes: { value: 'potatoes', label: 'Potatoes', icon: renderFoodIcon('potatoes'), shelfLife: 21 },
  spinach: { value: 'spinach', label: 'Spinach', icon: renderFoodIcon('spinach'), shelfLife: 5 },
  tomatoes: { value: 'tomatoes', label: 'Tomatoes', icon: renderFoodIcon('tomatoes'), shelfLife: 7 },
  
  // Meat and Poultry
  bacon: { value: 'bacon', label: 'Bacon', icon: renderFoodIcon('bacon'), shelfLife: 7 },
  beef: { value: 'beef', label: 'Beef', icon: renderFoodIcon('beef'), shelfLife: 3 },
  chicken: { value: 'chicken', label: 'Chicken', icon: renderFoodIcon('chicken'), shelfLife: 2 },
  ham: { value: 'ham', label: 'Ham', icon: renderFoodIcon('ham'), shelfLife: 7 },
  lamb: { value: 'lamb', label: 'Lamb', icon: renderFoodIcon('lamb'), shelfLife: 3 },
  pork: { value: 'pork', label: 'Pork', icon: renderFoodIcon('pork'), shelfLife: 3 },
  prosciutto: { value: 'prosciutto', label: 'Prosciutto', icon: renderFoodIcon('prosciutto'), shelfLife: 7 },
  sausages: { value: 'sausages', label: 'Sausages', icon: renderFoodIcon('sausages'), shelfLife: 7 },
  steaks: { value: 'steaks', label: 'Steaks', icon: renderFoodIcon('steaks'), shelfLife: 3 },
  turkey: { value: 'turkey', label: 'Turkey', icon: renderFoodIcon('turkey'), shelfLife: 3 },
  
  // Seafood
  crab: { value: 'crab', label: 'Crab', icon: renderFoodIcon('crab'), shelfLife: 2 },
  fish: { value: 'fish', label: 'Fish', icon: renderFoodIcon('fish'), shelfLife: 2 },
  lobster: { value: 'lobster', label: 'Lobster', icon: renderFoodIcon('lobster'), shelfLife: 2 },
  scallops: { value: 'scallops', label: 'Scallops', icon: renderFoodIcon('scallops'), shelfLife: 2 },
  shrimp: { value: 'shrimp', label: 'Shrimp', icon: renderFoodIcon('shrimp'), shelfLife: 2 },
  tuna: { value: 'tuna', label: 'Tuna', icon: renderFoodIcon('tuna'), shelfLife: 2 },
  
  // Baked Goods
  bagels: { value: 'bagels', label: 'Bagels', icon: renderFoodIcon('bagels'), shelfLife: 5 },
  biscotti: { value: 'biscotti', label: 'Biscotti', icon: renderFoodIcon('biscotti'), shelfLife: 14 },
  bread: { value: 'bread', label: 'Bread', icon: renderFoodIcon('bread'), shelfLife: 7 },
  cake: { value: 'cake', label: 'Cake', icon: renderFoodIcon('cake'), shelfLife: 5 },
  cookies: { value: 'cookies', label: 'Cookies', icon: renderFoodIcon('cookies'), shelfLife: 14 },
  crackers: { value: 'crackers', label: 'Crackers', icon: renderFoodIcon('crackers'), shelfLife: 14 },
  muffins: { value: 'muffins', label: 'Muffins', icon: renderFoodIcon('muffins'), shelfLife: 5 },
  pretzels: { value: 'pretzels', label: 'Pretzels', icon: renderFoodIcon('pretzels'), shelfLife: 14 },
  scones: { value: 'scones', label: 'Scones', icon: renderFoodIcon('scones'), shelfLife: 5 },
  tortillas: { value: 'tortillas', label: 'Tortillas', icon: renderFoodIcon('tortillas'), shelfLife: 7 },
  
  // Prepared Foods and Others
  appleJuice: { value: 'appleJuice', label: 'Apple Juice', icon: renderFoodIcon('appleJuice'), shelfLife: 7 },
  beans: { value: 'beans', label: 'Beans', icon: renderFoodIcon('beans'), shelfLife: 5 },
  cashews: { value: 'cashews', label: 'Cashews', icon: renderFoodIcon('cashews'), shelfLife: 30 },
  cereals: { value: 'cereals', label: 'Cereals', icon: renderFoodIcon('cereals'), shelfLife: 90 },
  chips: { value: 'chips', label: 'Chips', icon: renderFoodIcon('chips'), shelfLife: 14 },
  coffee: { value: 'coffee', label: 'Coffee', icon: renderFoodIcon('coffee'), shelfLife: 14 },
  eggs: { value: 'eggs', label: 'Eggs', icon: renderFoodIcon('eggs'), shelfLife: 28 },
  granola: { value: 'granola', label: 'Granola', icon: renderFoodIcon('granola'), shelfLife: 30 },
  iceCream: { value: 'iceCream', label: 'Ice Cream', icon: renderFoodIcon('iceCream'), shelfLife: 90 },
  oliveOil: { value: 'oliveOil', label: 'Olive Oil', icon: renderFoodIcon('oliveOil'), shelfLife: 365 },
  orangeJuice: { value: 'orangeJuice', label: 'Orange Juice', icon: renderFoodIcon('orangeJuice'), shelfLife: 7 },
  pasta: { value: 'pasta', label: 'Pasta', icon: renderFoodIcon('pasta'), shelfLife: 5 },
  pecans: { value: 'pecans', label: 'Pecans', icon: renderFoodIcon('pecans'), shelfLife: 30 },
  pizza: { value: 'pizza', label: 'Pizza', icon: renderFoodIcon('pizza'), shelfLife: 4 },
  popcorn: { value: 'popcorn', label: 'Popcorn', icon: renderFoodIcon('popcorn'), shelfLife: 14 },
  redWine: { value: 'redWine', label: 'Red Wine', icon: renderFoodIcon('redWine'), shelfLife: 5 },
  rice: { value: 'rice', label: 'Rice', icon: renderFoodIcon('rice'), shelfLife: 5 },
  soda: { value: 'soda', label: 'Soda', icon: renderFoodIcon('soda'), shelfLife: 3 },
  tomatoSauce: { value: 'tomatoSauce', label: 'Tomato Sauce', icon: renderFoodIcon('tomatoSauce'), shelfLife: 5 },
  vinegars: { value: 'vinegars', label: 'Vinegars', icon: renderFoodIcon('vinegars'), shelfLife: 365 },
  walnuts: { value: 'walnuts', label: 'Walnuts', icon: renderFoodIcon('walnuts'), shelfLife: 30 },
  water: { value: 'water', label: 'Water', icon: renderFoodIcon('water'), shelfLife: 365 },
  whiteWine: { value: 'whiteWine', label: 'White Wine', icon: renderFoodIcon('whiteWine'), shelfLife: 5 },
  almonds: { value: 'almonds', label: 'Almonds', icon: renderFoodIcon('almonds'), shelfLife: 30 },
  // Add the new Water Filter product
  waterFilter: { value: 'waterFilter', label: 'Water Filter', icon: renderFoodIcon('waterFilter'), shelfLife: 30 },
};

// Default selected icons (initial state) - first 9 items alphabetically sorted
export const DEFAULT_SELECTED_ICONS = [
  'almondMilk', 'almonds', 'appleJuice', 'apples', 'apricots', 
  'asparagus', 'avocados', 'bacon', 'bagels'
];
