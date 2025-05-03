import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Milk, Apple, Carrot, Cherry, Coffee, Cookie, Egg, Fish, 
  Wine, Package as Box, Trash, Banana, Beef, Cake, Beer, BookmarkIcon as Bread,
  Scissors, CircleDot, Bird, Croissant,
  ShoppingBag, Salad, Calendar, Leaf as Kale, Lemon, Orange,
  Sandwich, Pizza, Wheat, Timer, IceCream, Utensils,
  Drumstick, Citrus, Salt, Flame, Frown as Cheese, Workflow as Pasta,
  KanbanSquare as Crackers, Scale as Sugar, Tent as Syrup, LayoutGrid as Cereal,
  FileSpreadsheet as Floor, SquareGantt as Chocolate, Paperclip as HotSauce,
  ThumbsUp as Donut, Zap as Battery, Palmtree as Coconut,
  Container as Butter, Hourglass as Cream, Candy as Icing,
  Grape, KanbanSquareDashed as Jam, ShieldQuestion as Yogurt,
  ScrollText as Pita, LucideIcon
} from "lucide-react";

export type IconOption = {
  value: string;
  label: string;
  icon: React.ReactElement;
  shelfLife: number; // Default shelf life in days
};

// Define all possible icons - sorted alphabetically
export const ALL_ICONS: Record<string, IconOption> = {
  almondMilk: { value: 'almondMilk', label: 'Almond milk', icon: <Milk className="h-5 w-5" />, shelfLife: 3 },
  apple: { value: 'apple', label: 'Apples', icon: <Apple className="h-5 w-5" />, shelfLife: 10 },
  artichokes: { value: 'artichokes', label: 'Artichokes', icon: <CircleDot className="h-5 w-5" />, shelfLife: 5 },
  asparagus: { value: 'asparagus', label: 'Asparagus', icon: <Scissors className="h-5 w-5" />, shelfLife: 3 },
  avocados: { value: 'avocados', label: 'Avocados', icon: <CircleDot className="h-5 w-5" />, shelfLife: 3 },
  bacon: { value: 'bacon', label: 'Bacon', icon: <Drumstick className="h-5 w-5" />, shelfLife: 5 },
  bagels: { value: 'bagels', label: 'Bagels', icon: <Croissant className="h-5 w-5" />, shelfLife: 2 },
  bananas: { value: 'bananas', label: 'Bananas', icon: <Banana className="h-5 w-5" />, shelfLife: 5 },
  beefGround: { value: 'beefGround', label: 'Beef (ground)', icon: <Beef className="h-5 w-5" />, shelfLife: 1 },
  beefSteaks: { value: 'beefSteaks', label: 'Beef (steaks)', icon: <Beef className="h-5 w-5" />, shelfLife: 3 },
  berries: { value: 'berries', label: 'Berries', icon: <Cherry className="h-5 w-5" />, shelfLife: 3 },
  biscuits: { value: 'biscuits', label: 'Biscuits', icon: <Cookie className="h-5 w-5" />, shelfLife: 2 },
  bread: { value: 'bread', label: 'Bread', icon: <Bread className="h-5 w-5" />, shelfLife: 2 },
  broccoli: { value: 'broccoli', label: 'Broccoli', icon: <CircleDot className="h-5 w-5" />, shelfLife: 3 },
  butter: { value: 'butter', label: 'Butter', icon: <Container className="h-5 w-5" />, shelfLife: 7 },
  cabbage: { value: 'cabbage', label: 'Cabbage', icon: <CircleDot className="h-5 w-5" />, shelfLife: 5 },
  cake: { value: 'cake', label: 'Cake', icon: <Cake className="h-5 w-5" />, shelfLife: 2 },
  carrots: { value: 'carrots', label: 'Carrots', icon: <Carrot className="h-5 w-5" />, shelfLife: 10 },
  celery: { value: 'celery', label: 'Celery', icon: <CircleDot className="h-5 w-5" />, shelfLife: 5 },
  cheeseCheddar: { value: 'cheeseCheddar', label: 'Cheese (cheddar)', icon: <Cheese className="h-5 w-5" />, shelfLife: 14 },
  cheeseFeta: { value: 'cheeseFeta', label: 'Cheese (feta)', icon: <Cheese className="h-5 w-5" />, shelfLife: 14 },
  cheeseMozzarella: { value: 'cheeseMozzarella', label: 'Cheese (mozzarella)', icon: <Cheese className="h-5 w-5" />, shelfLife: 5 },
  cherries: { value: 'cherries', label: 'Cherries', icon: <Cherry className="h-5 w-5" />, shelfLife: 3 },
  chickenCooked: { value: 'chickenCooked', label: 'Chicken (cooked)', icon: <Bird className="h-5 w-5" />, shelfLife: 3 },
  chickenRaw: { value: 'chickenRaw', label: 'Chicken (raw)', icon: <Bird className="h-5 w-5" />, shelfLife: 1 },
  chocolate: { value: 'chocolate', label: 'Chocolate', icon: <SquareGantt className="h-5 w-5" />, shelfLife: 14 },
  cilantro: { value: 'cilantro', label: 'Cilantro', icon: <Leaf className="h-5 w-5" />, shelfLife: 3 },
  cinnamon: { value: 'cinnamon', label: 'Cinnamon', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  coconutMilk: { value: 'coconutMilk', label: 'Coconut milk', icon: <Palmtree className="h-5 w-5" />, shelfLife: 3 },
  coffee: { value: 'coffee', label: 'Coffee', icon: <Coffee className="h-5 w-5" />, shelfLife: 7 },
  cookies: { value: 'cookies', label: 'Cookies', icon: <Cookie className="h-5 w-5" />, shelfLife: 2 },
  corn: { value: 'corn', label: 'Corn', icon: <Wheat className="h-5 w-5" />, shelfLife: 5 },
  cottageCheese: { value: 'cottageCheese', label: 'Cottage cheese', icon: <Cheese className="h-5 w-5" />, shelfLife: 5 },
  crackers: { value: 'crackers', label: 'Crackers', icon: <Crackers className="h-5 w-5" />, shelfLife: 5 },
  cream: { value: 'cream', label: 'Cream', icon: <Hourglass className="h-5 w-5" />, shelfLife: 3 },
  creamCheese: { value: 'creamCheese', label: 'Cream cheese', icon: <Cheese className="h-5 w-5" />, shelfLife: 7 },
  cucumber: { value: 'cucumber', label: 'Cucumber', icon: <CircleDot className="h-5 w-5" />, shelfLife: 3 },
  dates: { value: 'dates', label: 'Dates', icon: <Calendar className="h-5 w-5" />, shelfLife: 14 },
  donuts: { value: 'donuts', label: 'Donuts', icon: <ThumbsUp className="h-5 w-5" />, shelfLife: 2 },
  eggs: { value: 'eggs', label: 'Eggs', icon: <Egg className="h-5 w-5" />, shelfLife: 7 },
  endive: { value: 'endive', label: 'Endive', icon: <Leaf className="h-5 w-5" />, shelfLife: 3 },
  figs: { value: 'figs', label: 'Figs', icon: <CircleDot className="h-5 w-5" />, shelfLife: 3 },
  fishCooked: { value: 'fishCooked', label: 'Fish (cooked)', icon: <Fish className="h-5 w-5" />, shelfLife: 3 },
  fishRaw: { value: 'fishRaw', label: 'Fish (raw)', icon: <Fish className="h-5 w-5" />, shelfLife: 1 },
  flour: { value: 'flour', label: 'Flour', icon: <FileSpreadsheet className="h-5 w-5" />, shelfLife: 30 },
  frankfurters: { value: 'frankfurters', label: 'Frankfurters', icon: <Utensils className="h-5 w-5" />, shelfLife: 5 },
  garlic: { value: 'garlic', label: 'Garlic', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  ginger: { value: 'ginger', label: 'Ginger', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  grapes: { value: 'grapes', label: 'Grapes', icon: <Grape className="h-5 w-5" />, shelfLife: 5 },
  granola: { value: 'granola', label: 'Granola', icon: <Cereal className="h-5 w-5" />, shelfLife: 14 },
  greekYogurt: { value: 'greekYogurt', label: 'Greek yogurt', icon: <ShieldQuestion className="h-5 w-5" />, shelfLife: 5 },
  greenBeans: { value: 'greenBeans', label: 'Green beans', icon: <CircleDot className="h-5 w-5" />, shelfLife: 5 },
  groundTurkey: { value: 'groundTurkey', label: 'Ground turkey', icon: <Bird className="h-5 w-5" />, shelfLife: 1 },
  guacamole: { value: 'guacamole', label: 'Guacamole', icon: <CircleDot className="h-5 w-5" />, shelfLife: 3 },
  ham: { value: 'ham', label: 'Ham', icon: <Drumstick className="h-5 w-5" />, shelfLife: 5 },
  hashBrowns: { value: 'hashBrowns', label: 'Hash browns', icon: <CircleDot className="h-5 w-5" />, shelfLife: 3 },
  honey: { value: 'honey', label: 'Honey', icon: <CircleDot className="h-5 w-5" />, shelfLife: 30 },
  hummus: { value: 'hummus', label: 'Hummus', icon: <CircleDot className="h-5 w-5" />, shelfLife: 5 },
  iceCream: { value: 'iceCream', label: 'Ice cream', icon: <IceCream className="h-5 w-5" />, shelfLife: 7 },
  icing: { value: 'icing', label: 'Icing', icon: <Candy className="h-5 w-5" />, shelfLife: 2 },
  jam: { value: 'jam', label: 'Jam', icon: <KanbanSquareDashed className="h-5 w-5" />, shelfLife: 14 },
  juice: { value: 'juice', label: 'Juice (orange)', icon: <CircleDot className="h-5 w-5" />, shelfLife: 3 },
  kale: { value: 'kale', label: 'Kale', icon: <Kale className="h-5 w-5" />, shelfLife: 3 },
  kiwi: { value: 'kiwi', label: 'Kiwi', icon: <Citrus className="h-5 w-5" />, shelfLife: 5 },
  lambCooked: { value: 'lambCooked', label: 'Lamb (cooked)', icon: <Drumstick className="h-5 w-5" />, shelfLife: 3 },
  lambRaw: { value: 'lambRaw', label: 'Lamb (raw)', icon: <Drumstick className="h-5 w-5" />, shelfLife: 1 },
  lettuce: { value: 'lettuce', label: 'Lettuce', icon: <Leaf className="h-5 w-5" />, shelfLife: 3 },
  mayonnaise: { value: 'mayonnaise', label: 'Mayonnaise', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  meatballs: { value: 'meatballs', label: 'Meatballs', icon: <CircleDot className="h-5 w-5" />, shelfLife: 3 },
  milk: { value: 'milk', label: 'Milk', icon: <Milk className="h-5 w-5" />, shelfLife: 3 },
  mozzarellaCheese: { value: 'mozzarellaCheese', label: 'Mozzarella cheese', icon: <Cheese className="h-5 w-5" />, shelfLife: 5 },
  mushrooms: { value: 'mushrooms', label: 'Mushrooms', icon: <CircleDot className="h-5 w-5" />, shelfLife: 3 },
  mustard: { value: 'mustard', label: 'Mustard', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  nuts: { value: 'nuts', label: 'Nuts', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  oatmeal: { value: 'oatmeal', label: 'Oatmeal', icon: <Cereal className="h-5 w-5" />, shelfLife: 14 },
  oliveOil: { value: 'oliveOil', label: 'Olive oil', icon: <CircleDot className="h-5 w-5" />, shelfLife: 30 },
  olives: { value: 'olives', label: 'Olives', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  onions: { value: 'onions', label: 'Onions', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  orangeJuice: { value: 'orangeJuice', label: 'Orange juice', icon: <Orange className="h-5 w-5" />, shelfLife: 3 },
  oranges: { value: 'oranges', label: 'Oranges', icon: <Orange className="h-5 w-5" />, shelfLife: 10 },
  pancakes: { value: 'pancakes', label: 'Pancakes', icon: <CircleDot className="h-5 w-5" />, shelfLife: 2 },
  pastaCooked: { value: 'pastaCooked', label: 'Pasta (cooked)', icon: <Pasta className="h-5 w-5" />, shelfLife: 3 },
  pastaDried: { value: 'pastaDried', label: 'Pasta (dried)', icon: <Pasta className="h-5 w-5" />, shelfLife: 30 },
  peaches: { value: 'peaches', label: 'Peaches', icon: <Citrus className="h-5 w-5" />, shelfLife: 5 },
  pears: { value: 'pears', label: 'Pears', icon: <CircleDot className="h-5 w-5" />, shelfLife: 10 },
  peas: { value: 'peas', label: 'Peas', icon: <CircleDot className="h-5 w-5" />, shelfLife: 5 },
  peanutButter: { value: 'peanutButter', label: 'Peanut butter', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  pecans: { value: 'pecans', label: 'Pecans', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  pickles: { value: 'pickles', label: 'Pickles', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  pineapple: { value: 'pineapple', label: 'Pineapple', icon: <CircleDot className="h-5 w-5" />, shelfLife: 5 },
  pizza: { value: 'pizza', label: 'Pizza', icon: <Pizza className="h-5 w-5" />, shelfLife: 3 },
  plums: { value: 'plums', label: 'Plums', icon: <CircleDot className="h-5 w-5" />, shelfLife: 5 },
  popcorn: { value: 'popcorn', label: 'Popcorn', icon: <CircleDot className="h-5 w-5" />, shelfLife: 5 },
  porkCooked: { value: 'porkCooked', label: 'Pork (cooked)', icon: <Drumstick className="h-5 w-5" />, shelfLife: 3 },
  porkRaw: { value: 'porkRaw', label: 'Pork (raw)', icon: <Drumstick className="h-5 w-5" />, shelfLife: 1 },
  potatoes: { value: 'potatoes', label: 'Potatoes', icon: <CircleDot className="h-5 w-5" />, shelfLife: 10 },
  poultryCooked: { value: 'poultryCooked', label: 'Poultry (cooked)', icon: <Bird className="h-5 w-5" />, shelfLife: 3 },
  poultryRaw: { value: 'poultryRaw', label: 'Poultry (raw)', icon: <Bird className="h-5 w-5" />, shelfLife: 1 },
  provoloneCheese: { value: 'provoloneCheese', label: 'Provolone cheese', icon: <Cheese className="h-5 w-5" />, shelfLife: 14 },
  pumpkin: { value: 'pumpkin', label: 'Pumpkin', icon: <CircleDot className="h-5 w-5" />, shelfLife: 10 },
  quinoa: { value: 'quinoa', label: 'Quinoa', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  radishes: { value: 'radishes', label: 'Radishes', icon: <CircleDot className="h-5 w-5" />, shelfLife: 3 },
  raisins: { value: 'raisins', label: 'Raisins', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  ramenNoodles: { value: 'ramenNoodles', label: 'Ramen noodles', icon: <CircleDot className="h-5 w-5" />, shelfLife: 30 },
  raspberryJam: { value: 'raspberryJam', label: 'Raspberry jam', icon: <KanbanSquareDashed className="h-5 w-5" />, shelfLife: 14 },
  rhubarb: { value: 'rhubarb', label: 'Rhubarb', icon: <CircleDot className="h-5 w-5" />, shelfLife: 3 },
  riceCooked: { value: 'riceCooked', label: 'Rice (cooked)', icon: <CircleDot className="h-5 w-5" />, shelfLife: 3 },
  riceUncooked: { value: 'riceUncooked', label: 'Rice (uncooked)', icon: <CircleDot className="h-5 w-5" />, shelfLife: 30 },
  ricottaCheese: { value: 'ricottaCheese', label: 'Ricotta cheese', icon: <Cheese className="h-5 w-5" />, shelfLife: 5 },
  roastBeef: { value: 'roastBeef', label: 'Roast beef', icon: <Beef className="h-5 w-5" />, shelfLife: 5 },
  salsa: { value: 'salsa', label: 'Salsa', icon: <Salad className="h-5 w-5" />, shelfLife: 5 },
  sardines: { value: 'sardines', label: 'Sardines', icon: <Fish className="h-5 w-5" />, shelfLife: 14 },
  sauerkraut: { value: 'sauerkraut', label: 'Sauerkraut', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  sausages: { value: 'sausages', label: 'Sausages', icon: <CircleDot className="h-5 w-5" />, shelfLife: 5 },
  shrimpCooked: { value: 'shrimpCooked', label: 'Shrimp (cooked)', icon: <Fish className="h-5 w-5" />, shelfLife: 3 },
  shrimpRaw: { value: 'shrimpRaw', label: 'Shrimp (raw)', icon: <Fish className="h-5 w-5" />, shelfLife: 1 },
  sourCream: { value: 'sourCream', label: 'Sour cream', icon: <Hourglass className="h-5 w-5" />, shelfLife: 5 },
  soyMilk: { value: 'soyMilk', label: 'Soy milk', icon: <Milk className="h-5 w-5" />, shelfLife: 3 },
  spaghetti: { value: 'spaghetti', label: 'Spaghetti', icon: <Pasta className="h-5 w-5" />, shelfLife: 3 },
  spinach: { value: 'spinach', label: 'Spinach', icon: <Leaf className="h-5 w-5" />, shelfLife: 3 },
  squash: { value: 'squash', label: 'Squash', icon: <CircleDot className="h-5 w-5" />, shelfLife: 5 },
  strawberries: { value: 'strawberries', label: 'Strawberries', icon: <Cherry className="h-5 w-5" />, shelfLife: 3 },
  sugar: { value: 'sugar', label: 'Sugar', icon: <Scale className="h-5 w-5" />, shelfLife: 30 },
  sweetPotatoes: { value: 'sweetPotatoes', label: 'Sweet potatoes', icon: <CircleDot className="h-5 w-5" />, shelfLife: 10 },
  swissCheese: { value: 'swissCheese', label: 'Swiss cheese', icon: <Cheese className="h-5 w-5" />, shelfLife: 14 },
  syrup: { value: 'syrup', label: 'Syrup', icon: <Tent className="h-5 w-5" />, shelfLife: 14 },
  tartarSauce: { value: 'tartarSauce', label: 'Tartar sauce', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  tea: { value: 'tea', label: 'Tea', icon: <Coffee className="h-5 w-5" />, shelfLife: 14 },
  thyme: { value: 'thyme', label: 'Thyme', icon: <Leaf className="h-5 w-5" />, shelfLife: 14 },
  tomatoSauce: { value: 'tomatoSauce', label: 'Tomato sauce', icon: <CircleDot className="h-5 w-5" />, shelfLife: 5 },
  tomatoes: { value: 'tomatoes', label: 'Tomatoes', icon: <CircleDot className="h-5 w-5" />, shelfLife: 5 },
  tortillas: { value: 'tortillas', label: 'Tortillas', icon: <CircleDot className="h-5 w-5" />, shelfLife: 5 },
  turkeyCooked: { value: 'turkeyCooked', label: 'Turkey (cooked)', icon: <Bird className="h-5 w-5" />, shelfLife: 3 },
  turkeyRaw: { value: 'turkeyRaw', label: 'Turkey (raw)', icon: <Bird className="h-5 w-5" />, shelfLife: 1 },
  turnips: { value: 'turnips', label: 'Turnips', icon: <CircleDot className="h-5 w-5" />, shelfLife: 5 },
  udonNoodles: { value: 'udonNoodles', label: 'Udon noodles', icon: <Pasta className="h-5 w-5" />, shelfLife: 30 },
  vegetableOil: { value: 'vegetableOil', label: 'Vegetable oil', icon: <CircleDot className="h-5 w-5" />, shelfLife: 30 },
  vinegar: { value: 'vinegar', label: 'Vinegar', icon: <CircleDot className="h-5 w-5" />, shelfLife: 30 },
  waterFilter: { value: 'waterFilter', label: 'Water filter cartridge', icon: <CircleDot className="h-5 w-5" />, shelfLife: 30 },
  watermelon: { value: 'watermelon', label: 'Watermelon', icon: <CircleDot className="h-5 w-5" />, shelfLife: 5 },
  wheatBread: { value: 'wheatBread', label: 'Wheat bread', icon: <Bread className="h-5 w-5" />, shelfLife: 2 },
  whippedCream: { value: 'whippedCream', label: 'Whipped cream', icon: <Hourglass className="h-5 w-5" />, shelfLife: 2 },
  wine: { value: 'wine', label: 'Wine', icon: <Wine className="h-5 w-5" />, shelfLife: 14 },
  yogurt: { value: 'yogurt', label: 'Yogurt', icon: <ShieldQuestion className="h-5 w-5" />, shelfLife: 5 },
  zucchini: { value: 'zucchini', label: 'Zucchini', icon: <CircleDot className="h-5 w-5" />, shelfLife: 3 },
  aspirin: { value: 'aspirin', label: 'Aspirin', icon: <CircleDot className="h-5 w-5" />, shelfLife: 30 },
  batteries: { value: 'batteries', label: 'Batteries', icon: <Battery className="h-5 w-5" />, shelfLife: 30 },
  cannedBeans: { value: 'cannedBeans', label: 'Canned beans', icon: <Box className="h-5 w-5" />, shelfLife: 30 },
  cannedCorn: { value: 'cannedCorn', label: 'Canned corn', icon: <Box className="h-5 w-5" />, shelfLife: 30 },
  cannedTomatoes: { value: 'cannedTomatoes', label: 'Canned tomatoes', icon: <Box className="h-5 w-5" />, shelfLife: 30 },
  cereal: { value: 'cereal', label: 'Cereal', icon: <Cereal className="h-5 w-5" />, shelfLife: 14 },
  coffeeCreamer: { value: 'coffeeCreamer', label: 'Coffee creamer', icon: <Milk className="h-5 w-5" />, shelfLife: 14 },
  croutons: { value: 'croutons', label: 'Croutons', icon: <Bread className="h-5 w-5" />, shelfLife: 5 },
  driedApricots: { value: 'driedApricots', label: 'Dried apricots', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  driedCranberries: { value: 'driedCranberries', label: 'Dried cranberries', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  energyBars: { value: 'energyBars', label: 'Energy bars', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  flourTortillas: { value: 'flourTortillas', label: 'Flour tortillas', icon: <CircleDot className="h-5 w-5" />, shelfLife: 5 },
  freshBasil: { value: 'freshBasil', label: 'Fresh basil', icon: <Leaf className="h-5 w-5" />, shelfLife: 3 },
  freshParsley: { value: 'freshParsley', label: 'Fresh parsley', icon: <Leaf className="h-5 w-5" />, shelfLife: 3 },
  frozenPeas: { value: 'frozenPeas', label: 'Frozen peas', icon: <CircleDot className="h-5 w-5" />, shelfLife: 30 },
  grahamCrackers: { value: 'grahamCrackers', label: 'Graham crackers', icon: <Crackers className="h-5 w-5" />, shelfLife: 14 },
  greenTea: { value: 'greenTea', label: 'Green tea', icon: <Coffee className="h-5 w-5" />, shelfLife: 14 },
  groundCoffee: { value: 'groundCoffee', label: 'Ground coffee', icon: <Coffee className="h-5 w-5" />, shelfLife: 14 },
  hamburgerBuns: { value: 'hamburgerBuns', label: 'Hamburger buns', icon: <Bread className="h-5 w-5" />, shelfLife: 5 },
  hotSauce: { value: 'hotSauce', label: 'Hot sauce', icon: <Paperclip className="h-5 w-5" />, shelfLife: 14 },
  instantNoodles: { value: 'instantNoodles', label: 'Instant noodles', icon: <Pasta className="h-5 w-5" />, shelfLife: 30 },
  jelly: { value: 'jelly', label: 'Jelly', icon: <KanbanSquareDashed className="h-5 w-5" />, shelfLife: 14 },
  ketchup: { value: 'ketchup', label: 'Ketchup', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  lemonJuice: { value: 'lemonJuice', label: 'Lemon juice', icon: <Lemon className="h-5 w-5" />, shelfLife: 5 },
  limeJuice: { value: 'limeJuice', label: 'Lime juice', icon: <Citrus className="h-5 w-5" />, shelfLife: 5 },
  mapleSyrup: { value: 'mapleSyrup', label: 'Maple syrup', icon: <Tent className="h-5 w-5" />, shelfLife: 14 },
  mayo: { value: 'mayo', label: 'Mayo', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  mustardSeeds: { value: 'mustardSeeds', label: 'Mustard seeds', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  oliveTapenade: { value: 'oliveTapenade', label: 'Olive tapenade', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  onionPowder: { value: 'onionPowder', label: 'Onion powder', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  paprika: { value: 'paprika', label: 'Paprika', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  peanutOil: { value: 'peanutOil', label: 'Peanut oil', icon: <CircleDot className="h-5 w-5" />, shelfLife: 30 },
  pickleRelish: { value: 'pickleRelish', label: 'Pickle relish', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  pitaBread: { value: 'pitaBread', label: 'Pita bread', icon: <ScrollText className="h-5 w-5" />, shelfLife: 5 },
  pretzels: { value: 'pretzels', label: 'Pretzels', icon: <CircleDot className="h-5 w-5" />, shelfLife: 5 },
  raisinBran: { value: 'raisinBran', label: 'Raisin bran', icon: <Cereal className="h-5 w-5" />, shelfLife: 14 },
  relish: { value: 'relish', label: 'Relish', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  salt: { value: 'salt', label: 'Salt', icon: <Salt className="h-5 w-5" />, shelfLife: 30 },
  sesameOil: { value: 'sesameOil', label: 'Sesame oil', icon: <CircleDot className="h-5 w-5" />, shelfLife: 30 },
  sesameSeeds: { value: 'sesameSeeds', label: 'Sesame seeds', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  soySauce: { value: 'soySauce', label: 'Soy sauce', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  spicySauce: { value: 'spicySauce', label: 'Spicy sauce', icon: <Flame className="h-5 w-5" />, shelfLife: 14 },
  tacoSeasoning: { value: 'tacoSeasoning', label: 'Taco seasoning', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  tahini: { value: 'tahini', label: 'Tahini', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  toiletPaper: { value: 'toiletPaper', label: 'Toilet paper', icon: <Roll className="h-5 w-5" />, shelfLife: 30 },
  tortillaChips: { value: 'tortillaChips', label: 'Tortilla chips', icon: <CircleDot className="h-5 w-5" />, shelfLife: 5 },
  vanillaExtract: { value: 'vanillaExtract', label: 'Vanilla extract', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  wasabi: { value: 'wasabi', label: 'Wasabi', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  worcestershireSauce: { value: 'worcestershireSauce', label: 'Worcestershire sauce', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  yellowMustard: { value: 'yellowMustard', label: 'Yellow mustard', icon: <CircleDot className="h-5 w-5" />, shelfLife: 14 },
  // Fallback options
  box: { value: 'box', label: 'Generic', icon: <Box className="h-5 w-5" />, shelfLife: 7 },
  trash: { value: 'trash', label: 'Trash', icon: <Trash className="h-5 w-5" />, shelfLife: 1 },
};

// Default selected icons (initial state) - select a reasonable set of common items
const DEFAULT_SELECTED_ICONS = [
  'almondMilk', 'apple', 'bananas', 'bread', 'cheeseCheddar', 'chickenCooked', 'coffee', 
  'eggs', 'milk', 'pizza', 'box'
];

interface IconManagerContextType {
  availableIcons: IconOption[];
  allIcons: Record<string, IconOption>;
  toggleIcon: (iconValue: string) => void;
  isIconSelected: (iconValue: string) => boolean;
  updateIconShelfLife: (iconValue: string, days: number) => void;
}

const IconManagerContext = createContext<IconManagerContextType | undefined>(undefined);

export const IconManagerProvider = ({ children }: { children: ReactNode }) => {
  const [selectedIconValues, setSelectedIconValues] = useState<string[]>(() => {
    const saved = localStorage.getItem('freshTrackerSelectedIcons');
    return saved ? JSON.parse(saved) : DEFAULT_SELECTED_ICONS;
  });
  
  const [customShelfLife, setCustomShelfLife] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('freshTrackerCustomShelfLife');
    return saved ? JSON.parse(saved) : {};
  });
  
  // Create a copy of ALL_ICONS with custom shelf life values applied
  const iconsWithCustomShelfLife = { ...ALL_ICONS };
  Object.keys(customShelfLife).forEach(iconKey => {
    if (iconsWithCustomShelfLife[iconKey]) {
      iconsWithCustomShelfLife[iconKey] = {
        ...iconsWithCustomShelfLife[iconKey],
        shelfLife: customShelfLife[iconKey]
      };
    }
  });
  
  // Update available icons based on selected values and sort alphabetically
  const availableIcons = selectedIconValues
    .map(value => iconsWithCustomShelfLife[value])
    .filter(Boolean)
    .sort((a, b) => a.label.localeCompare(b.label));
  
  useEffect(() => {
    localStorage.setItem('freshTrackerSelectedIcons', JSON.stringify(selectedIconValues));
  }, [selectedIconValues]);
  
  useEffect(() => {
    localStorage.setItem('freshTrackerCustomShelfLife', JSON.stringify(customShelfLife));
  }, [customShelfLife]);

  const toggleIcon = (iconValue: string) => {
    setSelectedIconValues(prev => {
      if (prev.includes(iconValue)) {
        return prev.filter(v => v !== iconValue);
      } else {
        return [...prev, iconValue];
      }
    });
  };

  const isIconSelected = (iconValue: string) => {
    return selectedIconValues.includes(iconValue);
  };
  
  const updateIconShelfLife = (iconValue: string, days: number) => {
    setCustomShelfLife(prev => ({
      ...prev,
      [iconValue]: days
    }));
  };

  return (
    <IconManagerContext.Provider value={{ 
      availableIcons, 
      allIcons: iconsWithCustomShelfLife,
      toggleIcon, 
      isIconSelected,
      updateIconShelfLife
    }}>
      {children}
    </IconManagerContext.Provider>
  );
};

export const useIconManager = (): IconManagerContextType => {
  const context = useContext(IconManagerContext);
  if (context === undefined) {
    throw new Error('useIconManager must be used within an IconManagerProvider');
  }
  return context;
};
