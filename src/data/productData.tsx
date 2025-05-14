
import React from 'react';
import { Icon } from '@iconify/react';
import { 
  Milk, Coffee, Cookie, Egg, Fish, 
  Wine, Beef, Cake, Beer, Salad, Drumstick, Pizza, 
  IceCream, Sandwich, Package, Utensils, Beaker, Bean,  
  Soup, Circle, Cookie as CookieIcon, Dices, CakeSlice, 
  Candy, Snowflake, Lollipop, Popcorn, Shell,
  Wheat, Aperture, ChevronsUp, Citrus, AlignHorizontalDistributeCenter,
  Layers, Snowflake as Frozen, Flame, Flower, CircleDot, CandyCane,
  Filter
} from "lucide-react";

export type IconOption = {
  value: string;
  label: string;
  icon: React.ReactElement;
  shelfLife: number; // Default shelf life in days
  iconName?: string; // Store the icon reference for serialization
};

// Define all possible icons with new products and shelf life data
export const ALL_ICONS: Record<string, IconOption> = {
  // Dairy products
  almondMilk: { value: 'almondMilk', label: 'Almond Milk', icon: <Icon icon="tabler:milk" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:milk' },
  cashewMilk: { value: 'cashewMilk', label: 'Cashew Milk', icon: <Icon icon="tabler:milk" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:milk' },
  butter: { value: 'butter', label: 'Butter', icon: <Icon icon="tabler:bacon" className="h-5 w-5" />, shelfLife: 14, iconName: 'tabler:bacon' },
  cheese: { value: 'cheese', label: 'Cheese', icon: <Icon icon="tabler:cheese" className="h-5 w-5" />, shelfLife: 14, iconName: 'tabler:cheese' },
  coconutMilk: { value: 'coconutMilk', label: 'Coconut Milk', icon: <Icon icon="tabler:milk" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:milk' },
  cream: { value: 'cream', label: 'Cream', icon: <Icon icon="tabler:milk" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:milk' },
  milk: { value: 'milk', label: 'Milk', icon: <Icon icon="tabler:milk" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:milk' },
  oatMilk: { value: 'oatMilk', label: 'Oat Milk', icon: <Icon icon="tabler:milk" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:milk' },
  sourCream: { value: 'sourCream', label: 'Sour Cream', icon: <Icon icon="tabler:bowl" className="h-5 w-5" />, shelfLife: 14, iconName: 'tabler:bowl' },
  soyMilk: { value: 'soyMilk', label: 'Soy Milk', icon: <Icon icon="tabler:milk" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:milk' },
  buttermilk: { value: 'buttermilk', label: 'Buttermilk', icon: <Icon icon="tabler:milk" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:milk' },
  kefir: { value: 'kefir', label: 'Kefir', icon: <Icon icon="tabler:milk" className="h-5 w-5" />, shelfLife: 10, iconName: 'tabler:milk' },
  yogurt: { value: 'yogurt', label: 'Yogurt', icon: <Icon icon="tabler:bowl" className="h-5 w-5" />, shelfLife: 14, iconName: 'tabler:bowl' },
  
  // Fruits
  apples: { value: 'apples', label: 'Apples', icon: <Icon icon="tabler:apple" className="h-5 w-5" />, shelfLife: 14, iconName: 'tabler:apple' },
  apricots: { value: 'apricots', label: 'Apricots', icon: <Icon icon="tabler:cherry" className="h-5 w-5" />, shelfLife: 5, iconName: 'tabler:cherry' },
  blackberries: { value: 'blackberries', label: 'Blackberries', icon: <Icon icon="tabler:point" className="h-5 w-5" />, shelfLife: 3, iconName: 'tabler:point' },
  blueberries: { value: 'blueberries', label: 'Blueberries', icon: <Icon icon="tabler:point" className="h-5 w-5" />, shelfLife: 5, iconName: 'tabler:point' },
  cherries: { value: 'cherries', label: 'Cherries', icon: <Icon icon="tabler:cherry" className="h-5 w-5" />, shelfLife: 5, iconName: 'tabler:cherry' },
  coconuts: { value: 'coconuts', label: 'Coconuts', icon: <Icon icon="tabler:circle-dotted" className="h-5 w-5" />, shelfLife: 14, iconName: 'tabler:circle-dotted' },
  cranberries: { value: 'cranberries', label: 'Cranberries', icon: <Icon icon="tabler:point" className="h-5 w-5" />, shelfLife: 14, iconName: 'tabler:point' },
  grapes: { value: 'grapes', label: 'Grapes', icon: <Icon icon="tabler:grape" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:grape' },
  kiwi: { value: 'kiwi', label: 'Kiwi', icon: <Icon icon="tabler:lemon" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:lemon' },
  mangoes: { value: 'mangoes', label: 'Mangoes', icon: <Icon icon="tabler:lemon" className="h-5 w-5" />, shelfLife: 5, iconName: 'tabler:lemon' },
  oranges: { value: 'oranges', label: 'Oranges', icon: <Icon icon="tabler:lemon" className="h-5 w-5" />, shelfLife: 14, iconName: 'tabler:lemon' },
  peaches: { value: 'peaches', label: 'Peaches', icon: <Icon icon="tabler:cherry" className="h-5 w-5" />, shelfLife: 5, iconName: 'tabler:cherry' },
  pears: { value: 'pears', label: 'Pears', icon: <Icon icon="tabler:pear" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:pear' },
  pineapple: { value: 'pineapple', label: 'Pineapple', icon: <Icon icon="tabler:plant" className="h-5 w-5" />, shelfLife: 5, iconName: 'tabler:plant' },
  plums: { value: 'plums', label: 'Plums', icon: <Icon icon="tabler:cherry" className="h-5 w-5" />, shelfLife: 5, iconName: 'tabler:cherry' },
  raisins: { value: 'raisins', label: 'Raisins', icon: <Icon icon="tabler:grape" className="h-5 w-5" />, shelfLife: 180, iconName: 'tabler:grape' },
  raspberries: { value: 'raspberries', label: 'Raspberries', icon: <Icon icon="tabler:point" className="h-5 w-5" />, shelfLife: 3, iconName: 'tabler:point' },
  strawberries: { value: 'strawberries', label: 'Strawberries', icon: <Icon icon="tabler:cherry" className="h-5 w-5" />, shelfLife: 5, iconName: 'tabler:cherry' },
  watermelon: { value: 'watermelon', label: 'Watermelon', icon: <Icon icon="tabler:circle" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:circle' },
  
  // Vegetables
  asparagus: { value: 'asparagus', label: 'Asparagus', icon: <Icon icon="tabler:plant-2" className="h-5 w-5" />, shelfLife: 5, iconName: 'tabler:plant-2' },
  avocados: { value: 'avocados', label: 'Avocados', icon: <Icon icon="tabler:egg" className="h-5 w-5" />, shelfLife: 5, iconName: 'tabler:egg' },
  basil: { value: 'basil', label: 'Basil', icon: <Icon icon="tabler:plant" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:plant' },
  bellPepper: { value: 'bellPepper', label: 'Bell Pepper', icon: <Icon icon="tabler:pepper" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:pepper' },
  broccoli: { value: 'broccoli', label: 'Broccoli', icon: <Icon icon="tabler:plant-2" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:plant-2' },
  carrots: { value: 'carrots', label: 'Carrots', icon: <Icon icon="tabler:carrot" className="h-5 w-5" />, shelfLife: 14, iconName: 'tabler:carrot' },
  cauliflower: { value: 'cauliflower', label: 'Cauliflower', icon: <Icon icon="tabler:plant-2" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:plant-2' },
  corn: { value: 'corn', label: 'Corn', icon: <Icon icon="tabler:seeding" className="h-5 w-5" />, shelfLife: 5, iconName: 'tabler:seeding' },
  cucumbers: { value: 'cucumbers', label: 'Cucumbers', icon: <Icon icon="tabler:plant" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:plant' },
  garlic: { value: 'garlic', label: 'Garlic', icon: <Icon icon="tabler:circle-dotted" className="h-5 w-5" />, shelfLife: 30, iconName: 'tabler:circle-dotted' },
  greenBeans: { value: 'greenBeans', label: 'Green Beans', icon: <Icon icon="tabler:seeding" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:seeding' },
  kale: { value: 'kale', label: 'Kale', icon: <Icon icon="tabler:salad" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:salad' },
  lettuce: { value: 'lettuce', label: 'Lettuce', icon: <Icon icon="tabler:salad" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:salad' },
  mushrooms: { value: 'mushrooms', label: 'Mushrooms', icon: <Icon icon="tabler:mushroom" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:mushroom' },
  olives: { value: 'olives', label: 'Olives', icon: <Icon icon="tabler:point" className="h-5 w-5" />, shelfLife: 30, iconName: 'tabler:point' },
  onions: { value: 'onions', label: 'Onions', icon: <Icon icon="tabler:circle-dotted" className="h-5 w-5" />, shelfLife: 30, iconName: 'tabler:circle-dotted' },
  peas: { value: 'peas', label: 'Peas', icon: <Icon icon="tabler:point" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:point' },
  potatoes: { value: 'potatoes', label: 'Potatoes', icon: <Icon icon="tabler:egg" className="h-5 w-5" />, shelfLife: 21, iconName: 'tabler:egg' },
  spinach: { value: 'spinach', label: 'Spinach', icon: <Icon icon="tabler:salad" className="h-5 w-5" />, shelfLife: 5, iconName: 'tabler:salad' },
  tomatoes: { value: 'tomatoes', label: 'Tomatoes', icon: <Icon icon="tabler:circle" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:circle' },
  
  // Meat and Poultry
  bacon: { value: 'bacon', label: 'Bacon', icon: <Icon icon="tabler:bacon" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:bacon' },
  beef: { value: 'beef', label: 'Beef', icon: <Icon icon="tabler:meat" className="h-5 w-5" />, shelfLife: 3, iconName: 'tabler:meat' },
  chicken: { value: 'chicken', label: 'Chicken', icon: <Icon icon="tabler:bone" className="h-5 w-5" />, shelfLife: 2, iconName: 'tabler:bone' },
  ham: { value: 'ham', label: 'Ham', icon: <Icon icon="tabler:meat" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:meat' },
  lamb: { value: 'lamb', label: 'Lamb', icon: <Icon icon="tabler:meat" className="h-5 w-5" />, shelfLife: 3, iconName: 'tabler:meat' },
  pork: { value: 'pork', label: 'Pork', icon: <Icon icon="tabler:meat" className="h-5 w-5" />, shelfLife: 3, iconName: 'tabler:meat' },
  prosciutto: { value: 'prosciutto', label: 'Prosciutto', icon: <Icon icon="tabler:meat" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:meat' },
  sausages: { value: 'sausages', label: 'Sausages', icon: <Icon icon="tabler:sausage" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:sausage' },
  steaks: { value: 'steaks', label: 'Steaks', icon: <Icon icon="tabler:meat" className="h-5 w-5" />, shelfLife: 3, iconName: 'tabler:meat' },
  turkey: { value: 'turkey', label: 'Turkey', icon: <Icon icon="tabler:meat" className="h-5 w-5" />, shelfLife: 3, iconName: 'tabler:meat' },
  
  // Seafood
  crab: { value: 'crab', label: 'Crab', icon: <Icon icon="tabler:fish" className="h-5 w-5" />, shelfLife: 2, iconName: 'tabler:fish' },
  fish: { value: 'fish', label: 'Fish', icon: <Icon icon="tabler:fish" className="h-5 w-5" />, shelfLife: 2, iconName: 'tabler:fish' },
  lobster: { value: 'lobster', label: 'Lobster', icon: <Icon icon="tabler:fish" className="h-5 w-5" />, shelfLife: 2, iconName: 'tabler:fish' },
  scallops: { value: 'scallops', label: 'Scallops', icon: <Icon icon="tabler:seeding" className="h-5 w-5" />, shelfLife: 2, iconName: 'tabler:seeding' },
  shrimp: { value: 'shrimp', label: 'Shrimp', icon: <Icon icon="tabler:fish" className="h-5 w-5" />, shelfLife: 2, iconName: 'tabler:fish' },
  tuna: { value: 'tuna', label: 'Tuna', icon: <Icon icon="tabler:fish" className="h-5 w-5" />, shelfLife: 2, iconName: 'tabler:fish' },
  
  // Baked Goods
  bagels: { value: 'bagels', label: 'Bagels', icon: <Icon icon="tabler:bread" className="h-5 w-5" />, shelfLife: 5, iconName: 'tabler:bread' },
  biscotti: { value: 'biscotti', label: 'Biscotti', icon: <Icon icon="tabler:cookie" className="h-5 w-5" />, shelfLife: 14, iconName: 'tabler:cookie' },
  bread: { value: 'bread', label: 'Bread', icon: <Icon icon="tabler:bread" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:bread' },
  cake: { value: 'cake', label: 'Cake', icon: <Icon icon="tabler:cake" className="h-5 w-5" />, shelfLife: 5, iconName: 'tabler:cake' },
  cookies: { value: 'cookies', label: 'Cookies', icon: <Icon icon="tabler:cookie" className="h-5 w-5" />, shelfLife: 14, iconName: 'tabler:cookie' },
  crackers: { value: 'crackers', label: 'Crackers', icon: <Icon icon="tabler:cookie" className="h-5 w-5" />, shelfLife: 14, iconName: 'tabler:cookie' },
  muffins: { value: 'muffins', label: 'Muffins', icon: <Icon icon="tabler:cake" className="h-5 w-5" />, shelfLife: 5, iconName: 'tabler:cake' },
  pretzels: { value: 'pretzels', label: 'Pretzels', icon: <Icon icon="tabler:infinity" className="h-5 w-5" />, shelfLife: 14, iconName: 'tabler:infinity' },
  scones: { value: 'scones', label: 'Scones', icon: <Icon icon="tabler:triangle" className="h-5 w-5" />, shelfLife: 5, iconName: 'tabler:triangle' },
  tortillas: { value: 'tortillas', label: 'Tortillas', icon: <Icon icon="tabler:circle" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:circle' },
  
  // Prepared Foods and Others
  appleJuice: { value: 'appleJuice', label: 'Apple Juice', icon: <Icon icon="tabler:glass" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:glass' },
  beans: { value: 'beans', label: 'Beans', icon: <Icon icon="tabler:bean" className="h-5 w-5" />, shelfLife: 5, iconName: 'tabler:bean' },
  cashews: { value: 'cashews', label: 'Cashews', icon: <Icon icon="tabler:point" className="h-5 w-5" />, shelfLife: 30, iconName: 'tabler:point' },
  cereals: { value: 'cereals', label: 'Cereals', icon: <Icon icon="tabler:grain" className="h-5 w-5" />, shelfLife: 90, iconName: 'tabler:grain' },
  chips: { value: 'chips', label: 'Chips', icon: <Icon icon="tabler:pyramid" className="h-5 w-5" />, shelfLife: 14, iconName: 'tabler:pyramid' },
  coffee: { value: 'coffee', label: 'Coffee', icon: <Icon icon="tabler:coffee" className="h-5 w-5" />, shelfLife: 14, iconName: 'tabler:coffee' },
  eggs: { value: 'eggs', label: 'Eggs', icon: <Icon icon="tabler:egg" className="h-5 w-5" />, shelfLife: 28, iconName: 'tabler:egg' },
  granola: { value: 'granola', label: 'Granola', icon: <Icon icon="tabler:bowl" className="h-5 w-5" />, shelfLife: 30, iconName: 'tabler:bowl' },
  iceCream: { value: 'iceCream', label: 'Ice Cream', icon: <Icon icon="tabler:ice-cream" className="h-5 w-5" />, shelfLife: 90, iconName: 'tabler:ice-cream' },
  oliveOil: { value: 'oliveOil', label: 'Olive Oil', icon: <Icon icon="tabler:bottle" className="h-5 w-5" />, shelfLife: 365, iconName: 'tabler:bottle' },
  orangeJuice: { value: 'orangeJuice', label: 'Orange Juice', icon: <Icon icon="tabler:glass" className="h-5 w-5" />, shelfLife: 7, iconName: 'tabler:glass' },
  pasta: { value: 'pasta', label: 'Pasta', icon: <Icon icon="tabler:assembly" className="h-5 w-5" />, shelfLife: 5, iconName: 'tabler:assembly' },
  pecans: { value: 'pecans', label: 'Pecans', icon: <Icon icon="tabler:point" className="h-5 w-5" />, shelfLife: 30, iconName: 'tabler:point' },
  pizza: { value: 'pizza', label: 'Pizza', icon: <Icon icon="tabler:pizza" className="h-5 w-5" />, shelfLife: 4, iconName: 'tabler:pizza' },
  popcorn: { value: 'popcorn', label: 'Popcorn', icon: <Icon icon="tabler:dots" className="h-5 w-5" />, shelfLife: 14, iconName: 'tabler:dots' },
  redWine: { value: 'redWine', label: 'Red Wine', icon: <Icon icon="tabler:bottle" className="h-5 w-5" />, shelfLife: 5, iconName: 'tabler:bottle' },
  rice: { value: 'rice', label: 'Rice', icon: <Icon icon="tabler:grain" className="h-5 w-5" />, shelfLife: 5, iconName: 'tabler:grain' },
  soda: { value: 'soda', label: 'Soda', icon: <Icon icon="tabler:bottle" className="h-5 w-5" />, shelfLife: 3, iconName: 'tabler:bottle' },
  tomatoSauce: { value: 'tomatoSauce', label: 'Tomato Sauce', icon: <Icon icon="tabler:bowl" className="h-5 w-5" />, shelfLife: 5, iconName: 'tabler:bowl' },
  vinegars: { value: 'vinegars', label: 'Vinegars', icon: <Icon icon="tabler:bottle" className="h-5 w-5" />, shelfLife: 365, iconName: 'tabler:bottle' },
  walnuts: { value: 'walnuts', label: 'Walnuts', icon: <Icon icon="tabler:point" className="h-5 w-5" />, shelfLife: 30, iconName: 'tabler:point' },
  water: { value: 'water', label: 'Water', icon: <Icon icon="tabler:bottle" className="h-5 w-5" />, shelfLife: 365, iconName: 'tabler:bottle' },
  whiteWine: { value: 'whiteWine', label: 'White Wine', icon: <Icon icon="tabler:bottle" className="h-5 w-5" />, shelfLife: 5, iconName: 'tabler:bottle' },
  almonds: { value: 'almonds', label: 'Almonds', icon: <Icon icon="tabler:point" className="h-5 w-5" />, shelfLife: 30, iconName: 'tabler:point' },
  // Add the new Water Filter product
  waterFilter: { value: 'waterFilter', label: 'Water Filter', icon: <Icon icon="tabler:filter" className="h-5 w-5" />, shelfLife: 30, iconName: 'tabler:filter' },
};

// Default selected icons (initial state) - first 9 items alphabetically sorted
export const DEFAULT_SELECTED_ICONS = [
  'almondMilk', 'almonds', 'appleJuice', 'apples', 'apricots', 
  'asparagus', 'avocados', 'bacon', 'bagels'
];
