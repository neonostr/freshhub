
import React from 'react';
import { 
  Milk, Apple, Carrot, Cherry, Coffee, Cookie, Egg, Fish, 
  Wine, Banana, Beef, Cake, Beer, Salad, Drumstick, Pizza, 
  IceCream, Sandwich, Package, Utensils, Beaker, Bean, 
  Grape, Ham, Soup, Bowl, Bed, Dices, CakeSlice, 
  Candy, Snowflake, Lollipop, Popcorn, Shell, Apple as AppleIcon,
  Wheat, Aperture, ChevronsUp, Citrus, AlignHorizontalDistributeCenter,
  Layers, Snowflake as Frozen, Flame, Flower, Pumpkin, CandyCane
} from "lucide-react";

export type IconOption = {
  value: string;
  label: string;
  icon: React.ReactElement;
  shelfLife: number; // Default shelf life in days
};

// Define all possible icons with new products and shelf life data
export const ALL_ICONS: Record<string, IconOption> = {
  // Dairy products
  almondMilk: { value: 'almondMilk', label: 'Almond Milk', icon: <Milk className="h-5 w-5" />, shelfLife: 7 },
  cashewMilk: { value: 'cashewMilk', label: 'Cashew Milk', icon: <Milk className="h-5 w-5" />, shelfLife: 7 },
  butter: { value: 'butter', label: 'Butter', icon: <Utensils className="h-5 w-5" />, shelfLife: 14 },
  cheese: { value: 'cheese', label: 'Cheese', icon: <CakeSlice className="h-5 w-5" />, shelfLife: 14 },
  coconutMilk: { value: 'coconutMilk', label: 'Coconut Milk', icon: <Milk className="h-5 w-5" />, shelfLife: 7 },
  cream: { value: 'cream', label: 'Cream', icon: <Milk className="h-5 w-5" />, shelfLife: 7 },
  milk: { value: 'milk', label: 'Milk', icon: <Milk className="h-5 w-5" />, shelfLife: 7 },
  oatMilk: { value: 'oatMilk', label: 'Oat Milk', icon: <Milk className="h-5 w-5" />, shelfLife: 7 },
  sourCream: { value: 'sourCream', label: 'Sour Cream', icon: <Milk className="h-5 w-5" />, shelfLife: 14 },
  soyMilk: { value: 'soyMilk', label: 'Soy Milk', icon: <Milk className="h-5 w-5" />, shelfLife: 7 },
  buttermilk: { value: 'buttermilk', label: 'Buttermilk', icon: <Milk className="h-5 w-5" />, shelfLife: 7 },
  kefir: { value: 'kefir', label: 'Kefir', icon: <Milk className="h-5 w-5" />, shelfLife: 10 },
  yogurt: { value: 'yogurt', label: 'Yogurt', icon: <Milk className="h-5 w-5" />, shelfLife: 14 },
  
  // Fruits
  apples: { value: 'apples', label: 'Apples', icon: <Apple className="h-5 w-5" />, shelfLife: 14 },
  apricots: { value: 'apricots', label: 'Apricots', icon: <Cherry className="h-5 w-5" />, shelfLife: 5 },
  blackberries: { value: 'blackberries', label: 'Blackberries', icon: <Cherry className="h-5 w-5" />, shelfLife: 3 },
  blueberries: { value: 'blueberries', label: 'Blueberries', icon: <Cherry className="h-5 w-5" />, shelfLife: 5 },
  cherries: { value: 'cherries', label: 'Cherries', icon: <Cherry className="h-5 w-5" />, shelfLife: 5 },
  coconuts: { value: 'coconuts', label: 'Coconuts', icon: <CandyCane className="h-5 w-5" />, shelfLife: 14 },
  cranberries: { value: 'cranberries', label: 'Cranberries', icon: <Cherry className="h-5 w-5" />, shelfLife: 14 },
  grapes: { value: 'grapes', label: 'Grapes', icon: <Grape className="h-5 w-5" />, shelfLife: 7 },
  kiwi: { value: 'kiwi', label: 'Kiwi', icon: <Citrus className="h-5 w-5" />, shelfLife: 7 },
  mangoes: { value: 'mangoes', label: 'Mangoes', icon: <Cherry className="h-5 w-5" />, shelfLife: 5 },
  oranges: { value: 'oranges', label: 'Oranges', icon: <Citrus className="h-5 w-5" />, shelfLife: 14 },
  peaches: { value: 'peaches', label: 'Peaches', icon: <Cherry className="h-5 w-5" />, shelfLife: 5 },
  pears: { value: 'pears', label: 'Pears', icon: <Cherry className="h-5 w-5" />, shelfLife: 7 },
  pineapple: { value: 'pineapple', label: 'Pineapple', icon: <Cherry className="h-5 w-5" />, shelfLife: 5 },
  plums: { value: 'plums', label: 'Plums', icon: <Cherry className="h-5 w-5" />, shelfLife: 5 },
  raisins: { value: 'raisins', label: 'Raisins', icon: <Grape className="h-5 w-5" />, shelfLife: 180 },
  raspberries: { value: 'raspberries', label: 'Raspberries', icon: <Cherry className="h-5 w-5" />, shelfLife: 3 },
  strawberries: { value: 'strawberries', label: 'Strawberries', icon: <Cherry className="h-5 w-5" />, shelfLife: 5 },
  watermelon: { value: 'watermelon', label: 'Watermelon', icon: <Cherry className="h-5 w-5" />, shelfLife: 7 },
  
  // Vegetables
  asparagus: { value: 'asparagus', label: 'Asparagus', icon: <Salad className="h-5 w-5" />, shelfLife: 5 },
  avocados: { value: 'avocados', label: 'Avocados', icon: <Cherry className="h-5 w-5" />, shelfLife: 5 },
  basil: { value: 'basil', label: 'Basil', icon: <Flower className="h-5 w-5" />, shelfLife: 7 },
  bellPepper: { value: 'bellPepper', label: 'Bell Pepper', icon: <Salad className="h-5 w-5" />, shelfLife: 7 },
  broccoli: { value: 'broccoli', label: 'Broccoli', icon: <Salad className="h-5 w-5" />, shelfLife: 7 },
  carrots: { value: 'carrots', label: 'Carrots', icon: <Carrot className="h-5 w-5" />, shelfLife: 14 },
  cauliflower: { value: 'cauliflower', label: 'Cauliflower', icon: <Salad className="h-5 w-5" />, shelfLife: 7 },
  corn: { value: 'corn', label: 'Corn', icon: <Salad className="h-5 w-5" />, shelfLife: 5 },
  cucumbers: { value: 'cucumbers', label: 'Cucumbers', icon: <Salad className="h-5 w-5" />, shelfLife: 7 },
  garlic: { value: 'garlic', label: 'Garlic', icon: <Aperture className="h-5 w-5" />, shelfLife: 30 },
  greenBeans: { value: 'greenBeans', label: 'Green Beans', icon: <Bean className="h-5 w-5" />, shelfLife: 7 },
  kale: { value: 'kale', label: 'Kale', icon: <Salad className="h-5 w-5" />, shelfLife: 7 },
  lettuce: { value: 'lettuce', label: 'Lettuce', icon: <Salad className="h-5 w-5" />, shelfLife: 7 },
  mushrooms: { value: 'mushrooms', label: 'Mushrooms', icon: <Aperture className="h-5 w-5" />, shelfLife: 7 },
  olives: { value: 'olives', label: 'Olives', icon: <Cherry className="h-5 w-5" />, shelfLife: 30 },
  onions: { value: 'onions', label: 'Onions', icon: <Aperture className="h-5 w-5" />, shelfLife: 30 },
  peas: { value: 'peas', label: 'Peas', icon: <Bean className="h-5 w-5" />, shelfLife: 7 },
  potatoes: { value: 'potatoes', label: 'Potatoes', icon: <Pumpkin className="h-5 w-5" />, shelfLife: 21 },
  spinach: { value: 'spinach', label: 'Spinach', icon: <Salad className="h-5 w-5" />, shelfLife: 5 },
  tomatoes: { value: 'tomatoes', label: 'Tomatoes', icon: <Cherry className="h-5 w-5" />, shelfLife: 7 },
  
  // Meat and Poultry
  bacon: { value: 'bacon', label: 'Bacon', icon: <Ham className="h-5 w-5" />, shelfLife: 7 },
  beef: { value: 'beef', label: 'Beef', icon: <Beef className="h-5 w-5" />, shelfLife: 3 },
  chicken: { value: 'chicken', label: 'Chicken', icon: <Drumstick className="h-5 w-5" />, shelfLife: 2 },
  ham: { value: 'ham', label: 'Ham', icon: <Ham className="h-5 w-5" />, shelfLife: 7 },
  lamb: { value: 'lamb', label: 'Lamb', icon: <Beef className="h-5 w-5" />, shelfLife: 3 },
  pork: { value: 'pork', label: 'Pork', icon: <Beef className="h-5 w-5" />, shelfLife: 3 },
  prosciutto: { value: 'prosciutto', label: 'Prosciutto', icon: <Ham className="h-5 w-5" />, shelfLife: 7 },
  sausages: { value: 'sausages', label: 'Sausages', icon: <Sandwich className="h-5 w-5" />, shelfLife: 7 },
  steaks: { value: 'steaks', label: 'Steaks', icon: <Beef className="h-5 w-5" />, shelfLife: 3 },
  turkey: { value: 'turkey', label: 'Turkey', icon: <Drumstick className="h-5 w-5" />, shelfLife: 3 },
  
  // Seafood
  crab: { value: 'crab', label: 'Crab', icon: <Shell className="h-5 w-5" />, shelfLife: 2 },
  fish: { value: 'fish', label: 'Fish', icon: <Fish className="h-5 w-5" />, shelfLife: 2 },
  lobster: { value: 'lobster', label: 'Lobster', icon: <Shell className="h-5 w-5" />, shelfLife: 2 },
  scallops: { value: 'scallops', label: 'Scallops', icon: <Shell className="h-5 w-5" />, shelfLife: 2 },
  shrimp: { value: 'shrimp', label: 'Shrimp', icon: <Shell className="h-5 w-5" />, shelfLife: 2 },
  tuna: { value: 'tuna', label: 'Tuna', icon: <Fish className="h-5 w-5" />, shelfLife: 2 },
  
  // Baked Goods
  bagels: { value: 'bagels', label: 'Bagels', icon: <Bed className="h-5 w-5" />, shelfLife: 5 },
  biscotti: { value: 'biscotti', label: 'Biscotti', icon: <Cookie className="h-5 w-5" />, shelfLife: 14 },
  bread: { value: 'bread', label: 'Bread', icon: <Bed className="h-5 w-5" />, shelfLife: 7 },
  cake: { value: 'cake', label: 'Cake', icon: <Cake className="h-5 w-5" />, shelfLife: 5 },
  cookies: { value: 'cookies', label: 'Cookies', icon: <Cookie className="h-5 w-5" />, shelfLife: 14 },
  crackers: { value: 'crackers', label: 'Crackers', icon: <Cookie className="h-5 w-5" />, shelfLife: 14 },
  muffins: { value: 'muffins', label: 'Muffins', icon: <Cake className="h-5 w-5" />, shelfLife: 5 },
  pretzels: { value: 'pretzels', label: 'Pretzels', icon: <Bed className="h-5 w-5" />, shelfLife: 14 },
  scones: { value: 'scones', label: 'Scones', icon: <Cookie className="h-5 w-5" />, shelfLife: 5 },
  tortillas: { value: 'tortillas', label: 'Tortillas', icon: <Bed className="h-5 w-5" />, shelfLife: 7 },
  
  // Prepared Foods and Others
  appleJuice: { value: 'appleJuice', label: 'Apple Juice', icon: <Beaker className="h-5 w-5" />, shelfLife: 7 },
  beans: { value: 'beans', label: 'Beans', icon: <Bean className="h-5 w-5" />, shelfLife: 5 },
  cashews: { value: 'cashews', label: 'Cashews', icon: <Bean className="h-5 w-5" />, shelfLife: 30 },
  cereals: { value: 'cereals', label: 'Cereals', icon: <Layers className="h-5 w-5" />, shelfLife: 90 },
  chips: { value: 'chips', label: 'Chips', icon: <Cookie className="h-5 w-5" />, shelfLife: 14 },
  coffee: { value: 'coffee', label: 'Coffee', icon: <Coffee className="h-5 w-5" />, shelfLife: 14 },
  eggs: { value: 'eggs', label: 'Eggs', icon: <Egg className="h-5 w-5" />, shelfLife: 28 },
  granola: { value: 'granola', label: 'Granola', icon: <Layers className="h-5 w-5" />, shelfLife: 30 },
  iceCream: { value: 'iceCream', label: 'Ice Cream', icon: <IceCream className="h-5 w-5" />, shelfLife: 90 },
  oliveOil: { value: 'oliveOil', label: 'Olive Oil', icon: <Beaker className="h-5 w-5" />, shelfLife: 365 },
  orangeJuice: { value: 'orangeJuice', label: 'Orange Juice', icon: <Beaker className="h-5 w-5" />, shelfLife: 7 },
  pasta: { value: 'pasta', label: 'Pasta', icon: <Layers className="h-5 w-5" />, shelfLife: 5 },
  pecans: { value: 'pecans', label: 'Pecans', icon: <Bean className="h-5 w-5" />, shelfLife: 30 },
  pizza: { value: 'pizza', label: 'Pizza', icon: <Pizza className="h-5 w-5" />, shelfLife: 4 },
  popcorn: { value: 'popcorn', label: 'Popcorn', icon: <Popcorn className="h-5 w-5" />, shelfLife: 14 },
  redWine: { value: 'redWine', label: 'Red Wine', icon: <Wine className="h-5 w-5" />, shelfLife: 5 },
  rice: { value: 'rice', label: 'Rice', icon: <Layers className="h-5 w-5" />, shelfLife: 5 },
  soda: { value: 'soda', label: 'Soda', icon: <Beaker className="h-5 w-5" />, shelfLife: 3 },
  tomatoSauce: { value: 'tomatoSauce', label: 'Tomato Sauce', icon: <Soup className="h-5 w-5" />, shelfLife: 5 },
  vinegars: { value: 'vinegars', label: 'Vinegars', icon: <Beaker className="h-5 w-5" />, shelfLife: 365 },
  walnuts: { value: 'walnuts', label: 'Walnuts', icon: <Bean className="h-5 w-5" />, shelfLife: 30 },
  water: { value: 'water', label: 'Water', icon: <Beaker className="h-5 w-5" />, shelfLife: 365 },
  whiteWine: { value: 'whiteWine', label: 'White Wine', icon: <Wine className="h-5 w-5" />, shelfLife: 5 },
  almonds: { value: 'almonds', label: 'Almonds', icon: <Bean className="h-5 w-5" />, shelfLife: 30 },
};

// Default selected icons (initial state) - first 9 items alphabetically sorted
export const DEFAULT_SELECTED_ICONS = [
  'almondMilk', 'almonds', 'appleJuice', 'apples', 'apricots', 
  'asparagus', 'avocados', 'bacon', 'bagels'
];
