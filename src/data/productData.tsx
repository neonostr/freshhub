import React from 'react';
import {
  IconApple, IconGlass, IconBowl, IconCherry, IconCup, IconCookie,
  IconEgg, IconFish, IconBottle, IconBeer, IconCake,
  IconSalad, IconMeat, IconPizza, IconIceCream, IconBread,
  IconPackage, IconQuestionMark, IconFlask, IconLeaf, IconGrain,
  IconSoup, IconBread as IconBreadSlice, IconCandy, IconSnowflake,
  IconMilkshake, IconCircle, IconCircleDot, IconApple as IconAppleHalf,
  IconWheat, IconLemon, IconLemon as IconCitrus, 
  IconFlower, IconFilter, IconPepper, IconMushroom, IconEggFried,
  IconCoffee, IconBottle as IconWaterBottle, IconToolsKitchen, IconChefHat, IconMicrowave, IconFridge,
  IconPlant, IconCherry as IconDrumstick, IconQuestionMark as IconPineapple, IconPlant as IconBanana,
  IconCheese, IconLeaf as IconShrimp, IconWheat as IconRice, IconGrain as IconSugar
} from '@tabler/icons-react';

export type IconOption = {
  value: string;
  label: string;
  icon: React.ReactElement;
  shelfLife: number; // Default shelf life in days
};

// Define all possible icons with new products and shelf life data
export const ALL_ICONS: Record<string, IconOption> = {
  // Dairy products
  almondMilk: { value: 'almondMilk', label: 'Almond Milk', icon: <IconBottle className="h-5 w-5" />, shelfLife: 7 },
  cashewMilk: { value: 'cashewMilk', label: 'Cashew Milk', icon: <IconBottle className="h-5 w-5" />, shelfLife: 7 },
  butter: { value: 'butter', label: 'Butter', icon: <IconCheese className="h-5 w-5" />, shelfLife: 14 },
  cheese: { value: 'cheese', label: 'Cheese', icon: <IconCheese className="h-5 w-5" />, shelfLife: 14 },
  coconutMilk: { value: 'coconutMilk', label: 'Coconut Milk', icon: <IconBottle className="h-5 w-5" />, shelfLife: 7 },
  cream: { value: 'cream', label: 'Cream', icon: <IconBottle className="h-5 w-5" />, shelfLife: 7 },
  milk: { value: 'milk', label: 'Milk', icon: <IconBottle className="h-5 w-5" />, shelfLife: 7 },
  oatMilk: { value: 'oatMilk', label: 'Oat Milk', icon: <IconBottle className="h-5 w-5" />, shelfLife: 7 },
  sourCream: { value: 'sourCream', label: 'Sour Cream', icon: <IconBottle className="h-5 w-5" />, shelfLife: 14 },
  soyMilk: { value: 'soyMilk', label: 'Soy Milk', icon: <IconBottle className="h-5 w-5" />, shelfLife: 7 },
  buttermilk: { value: 'buttermilk', label: 'Buttermilk', icon: <IconBottle className="h-5 w-5" />, shelfLife: 7 },
  kefir: { value: 'kefir', label: 'Kefir', icon: <IconBottle className="h-5 w-5" />, shelfLife: 10 },
  yogurt: { value: 'yogurt', label: 'Yogurt', icon: <IconBowl className="h-5 w-5" />, shelfLife: 14 },
  
  // Fruits
  apples: { value: 'apples', label: 'Apples', icon: <IconApple className="h-5 w-5" />, shelfLife: 14 },
  apricots: { value: 'apricots', label: 'Apricots', icon: <IconCherry className="h-5 w-5" />, shelfLife: 5 },
  blackberries: { value: 'blackberries', label: 'Blackberries', icon: <IconCherry className="h-5 w-5" />, shelfLife: 3 },
  blueberries: { value: 'blueberries', label: 'Blueberries', icon: <IconCherry className="h-5 w-5" />, shelfLife: 5 },
  cherries: { value: 'cherries', label: 'Cherries', icon: <IconCherry className="h-5 w-5" />, shelfLife: 5 },
  coconuts: { value: 'coconuts', label: 'Coconuts', icon: <IconCircle className="h-5 w-5" />, shelfLife: 14 },
  cranberries: { value: 'cranberries', label: 'Cranberries', icon: <IconCherry className="h-5 w-5" />, shelfLife: 14 },
  grapes: { value: 'grapes', label: 'Grapes', icon: <IconCircle className="h-5 w-5" />, shelfLife: 7 },
  kiwi: { value: 'kiwi', label: 'Kiwi', icon: <IconLemon className="h-5 w-5" />, shelfLife: 7 },
  mangoes: { value: 'mangoes', label: 'Mangoes', icon: <IconCherry className="h-5 w-5" />, shelfLife: 5 },
  oranges: { value: 'oranges', label: 'Oranges', icon: <IconLemon className="h-5 w-5" />, shelfLife: 14 },
  peaches: { value: 'peaches', label: 'Peaches', icon: <IconCherry className="h-5 w-5" />, shelfLife: 5 },
  pears: { value: 'pears', label: 'Pears', icon: <IconCherry className="h-5 w-5" />, shelfLife: 7 },
  pineapple: { value: 'pineapple', label: 'Pineapple', icon: <IconPineapple className="h-5 w-5" />, shelfLife: 5 },
  plums: { value: 'plums', label: 'Plums', icon: <IconCherry className="h-5 w-5" />, shelfLife: 5 },
  raisins: { value: 'raisins', label: 'Raisins', icon: <IconCircle className="h-5 w-5" />, shelfLife: 180 },
  raspberries: { value: 'raspberries', label: 'Raspberries', icon: <IconCherry className="h-5 w-5" />, shelfLife: 3 },
  strawberries: { value: 'strawberries', label: 'Strawberries', icon: <IconCherry className="h-5 w-5" />, shelfLife: 5 },
  watermelon: { value: 'watermelon', label: 'Watermelon', icon: <IconCircle className="h-5 w-5" />, shelfLife: 7 },
  banana: { value: 'banana', label: 'Banana', icon: <IconBanana className="h-5 w-5" />, shelfLife: 5 },
  
  // Vegetables
  asparagus: { value: 'asparagus', label: 'Asparagus', icon: <IconPlant className="h-5 w-5" />, shelfLife: 5 },
  avocados: { value: 'avocados', label: 'Avocados', icon: <IconPlant className="h-5 w-5" />, shelfLife: 5 },
  basil: { value: 'basil', label: 'Basil', icon: <IconFlower className="h-5 w-5" />, shelfLife: 7 },
  bellPepper: { value: 'bellPepper', label: 'Bell Pepper', icon: <IconPepper className="h-5 w-5" />, shelfLife: 7 },
  broccoli: { value: 'broccoli', label: 'Broccoli', icon: <IconPlant className="h-5 w-5" />, shelfLife: 7 },
  carrots: { value: 'carrots', label: 'Carrots', icon: <IconLeaf className="h-5 w-5" />, shelfLife: 14 },
  cauliflower: { value: 'cauliflower', label: 'Cauliflower', icon: <IconPlant className="h-5 w-5" />, shelfLife: 7 },
  corn: { value: 'corn', label: 'Corn', icon: <IconPlant className="h-5 w-5" />, shelfLife: 5 },
  cucumbers: { value: 'cucumbers', label: 'Cucumbers', icon: <IconPlant className="h-5 w-5" />, shelfLife: 7 },
  garlic: { value: 'garlic', label: 'Garlic', icon: <IconCircle className="h-5 w-5" />, shelfLife: 30 },
  greenBeans: { value: 'greenBeans', label: 'Green Beans', icon: <IconLeaf className="h-5 w-5" />, shelfLife: 7 },
  kale: { value: 'kale', label: 'Kale', icon: <IconPlant className="h-5 w-5" />, shelfLife: 7 },
  lettuce: { value: 'lettuce', label: 'Lettuce', icon: <IconSalad className="h-5 w-5" />, shelfLife: 7 },
  mushrooms: { value: 'mushrooms', label: 'Mushrooms', icon: <IconMushroom className="h-5 w-5" />, shelfLife: 7 },
  olives: { value: 'olives', label: 'Olives', icon: <IconCircleDot className="h-5 w-5" />, shelfLife: 30 },
  onions: { value: 'onions', label: 'Onions', icon: <IconCircle className="h-5 w-5" />, shelfLife: 30 },
  peas: { value: 'peas', label: 'Peas', icon: <IconLeaf className="h-5 w-5" />, shelfLife: 7 },
  potatoes: { value: 'potatoes', label: 'Potatoes', icon: <IconCircleDot className="h-5 w-5" />, shelfLife: 21 },
  spinach: { value: 'spinach', label: 'Spinach', icon: <IconPlant className="h-5 w-5" />, shelfLife: 5 },
  tomatoes: { value: 'tomatoes', label: 'Tomatoes', icon: <IconCherry className="h-5 w-5" />, shelfLife: 7 },
  
  // Meat and Poultry
  bacon: { value: 'bacon', label: 'Bacon', icon: <IconMeat className="h-5 w-5" />, shelfLife: 7 },
  beef: { value: 'beef', label: 'Beef', icon: <IconMeat className="h-5 w-5" />, shelfLife: 3 },
  chicken: { value: 'chicken', label: 'Chicken', icon: <IconDrumstick className="h-5 w-5" />, shelfLife: 2 },
  ham: { value: 'ham', label: 'Ham', icon: <IconMeat className="h-5 w-5" />, shelfLife: 7 },
  lamb: { value: 'lamb', label: 'Lamb', icon: <IconMeat className="h-5 w-5" />, shelfLife: 3 },
  pork: { value: 'pork', label: 'Pork', icon: <IconMeat className="h-5 w-5" />, shelfLife: 3 },
  prosciutto: { value: 'prosciutto', label: 'Prosciutto', icon: <IconMeat className="h-5 w-5" />, shelfLife: 7 },
  sausages: { value: 'sausages', label: 'Sausages', icon: <IconMeat className="h-5 w-5" />, shelfLife: 7 },
  steaks: { value: 'steaks', label: 'Steaks', icon: <IconMeat className="h-5 w-5" />, shelfLife: 3 },
  turkey: { value: 'turkey', label: 'Turkey', icon: <IconDrumstick className="h-5 w-5" />, shelfLife: 3 },
  
  // Seafood
  crab: { value: 'crab', label: 'Crab', icon: <IconFish className="h-5 w-5" />, shelfLife: 2 },
  fish: { value: 'fish', label: 'Fish', icon: <IconFish className="h-5 w-5" />, shelfLife: 2 },
  lobster: { value: 'lobster', label: 'Lobster', icon: <IconFish className="h-5 w-5" />, shelfLife: 2 },
  scallops: { value: 'scallops', label: 'Scallops', icon: <IconFish className="h-5 w-5" />, shelfLife: 2 },
  shrimp: { value: 'shrimp', label: 'Shrimp', icon: <IconShrimp className="h-5 w-5" />, shelfLife: 2 },
  tuna: { value: 'tuna', label: 'Tuna', icon: <IconFish className="h-5 w-5" />, shelfLife: 2 },
  
  // Baked Goods
  bagels: { value: 'bagels', label: 'Bagels', icon: <IconBread className="h-5 w-5" />, shelfLife: 5 },
  biscotti: { value: 'biscotti', label: 'Biscotti', icon: <IconBreadSlice className="h-5 w-5" />, shelfLife: 14 },
  bread: { value: 'bread', label: 'Bread', icon: <IconBread className="h-5 w-5" />, shelfLife: 7 },
  cake: { value: 'cake', label: 'Cake', icon: <IconCake className="h-5 w-5" />, shelfLife: 5 },
  cookies: { value: 'cookies', label: 'Cookies', icon: <IconCookie className="h-5 w-5" />, shelfLife: 14 },
  crackers: { value: 'crackers', label: 'Crackers', icon: <IconBreadSlice className="h-5 w-5" />, shelfLife: 14 },
  muffins: { value: 'muffins', label: 'Muffins', icon: <IconCake className="h-5 w-5" />, shelfLife: 5 },
  pretzels: { value: 'pretzels', label: 'Pretzels', icon: <IconBread className="h-5 w-5" />, shelfLife: 14 },
  scones: { value: 'scones', label: 'Scones', icon: <IconBreadSlice className="h-5 w-5" />, shelfLife: 5 },
  tortillas: { value: 'tortillas', label: 'Tortillas', icon: <IconBread className="h-5 w-5" />, shelfLife: 7 },
  
  // Prepared Foods and Others
  appleJuice: { value: 'appleJuice', label: 'Apple Juice', icon: <IconBottle className="h-5 w-5" />, shelfLife: 7 },
  beans: { value: 'beans', label: 'Beans', icon: <IconLeaf className="h-5 w-5" />, shelfLife: 5 },
  cashews: { value: 'cashews', label: 'Cashews', icon: <IconLeaf className="h-5 w-5" />, shelfLife: 30 },
  cereals: { value: 'cereals', label: 'Cereals', icon: <IconPackage className="h-5 w-5" />, shelfLife: 90 },
  chips: { value: 'chips', label: 'Chips', icon: <IconBreadSlice className="h-5 w-5" />, shelfLife: 14 },
  coffee: { value: 'coffee', label: 'Coffee', icon: <IconCoffee className="h-5 w-5" />, shelfLife: 14 },
  eggs: { value: 'eggs', label: 'Eggs', icon: <IconEgg className="h-5 w-5" />, shelfLife: 28 },
  granola: { value: 'granola', label: 'Granola', icon: <IconPackage className="h-5 w-5" />, shelfLife: 30 },
  iceCream: { value: 'iceCream', label: 'Ice Cream', icon: <IconIceCream className="h-5 w-5" />, shelfLife: 90 },
  oliveOil: { value: 'oliveOil', label: 'Olive Oil', icon: <IconBottle className="h-5 w-5" />, shelfLife: 365 },
  orangeJuice: { value: 'orangeJuice', label: 'Orange Juice', icon: <IconBottle className="h-5 w-5" />, shelfLife: 7 },
  pasta: { value: 'pasta', label: 'Pasta', icon: <IconPackage className="h-5 w-5" />, shelfLife: 5 },
  pecans: { value: 'pecans', label: 'Pecans', icon: <IconLeaf className="h-5 w-5" />, shelfLife: 30 },
  pizza: { value: 'pizza', label: 'Pizza', icon: <IconPizza className="h-5 w-5" />, shelfLife: 4 },
  popcorn: { value: 'popcorn', label: 'Popcorn', icon: <IconPackage className="h-5 w-5" />, shelfLife: 14 },
  redWine: { value: 'redWine', label: 'Red Wine', icon: <IconGlass className="h-5 w-5" />, shelfLife: 5 },
  rice: { value: 'rice', label: 'Rice', icon: <IconRice className="h-5 w-5" />, shelfLife: 5 },
  soda: { value: 'soda', label: 'Soda', icon: <IconBottle className="h-5 w-5" />, shelfLife: 3 },
  tomatoSauce: { value: 'tomatoSauce', label: 'Tomato Sauce', icon: <IconSoup className="h-5 w-5" />, shelfLife: 5 },
  vinegars: { value: 'vinegars', label: 'Vinegars', icon: <IconBottle className="h-5 w-5" />, shelfLife: 365 },
  walnuts: { value: 'walnuts', label: 'Walnuts', icon: <IconLeaf className="h-5 w-5" />, shelfLife: 30 },
  water: { value: 'water', label: 'Water', icon: <IconWaterBottle className="h-5 w-5" />, shelfLife: 365 },
  whiteWine: { value: 'whiteWine', label: 'White Wine', icon: <IconGlass className="h-5 w-5" />, shelfLife: 5 },
  almonds: { value: 'almonds', label: 'Almonds', icon: <IconLeaf className="h-5 w-5" />, shelfLife: 30 },
  // Add the new Water Filter product
  waterFilter: { value: 'waterFilter', label: 'Water Filter', icon: <IconFilter className="h-5 w-5" />, shelfLife: 30 },
};

// Default selected icons (initial state) - first 9 items alphabetically sorted
export const DEFAULT_SELECTED_ICONS = [
  'almondMilk', 'almonds', 'appleJuice', 'apples', 'apricots', 
  'asparagus', 'avocados', 'bacon', 'bagels'
];
