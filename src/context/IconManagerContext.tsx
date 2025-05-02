
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Milk, Apple, Carrot, Cherry, Coffee, Cookie, Egg, Fish, 
  Wine, Box, Trash, Banana, Beef, Cake, Beer, BookmarkIcon as Bread,
  Scissors as Asparagus, CircleDot as Artichoke, Avocado, Bacon, 
  Croissant as Bagel, CircleDot as Broccoli, CircleDot as Butter, CircleDot as Cabbage,
  CircleDot as Celery, CircleDot as Cheese, Bird as Chicken, CircleDot as Chocolate,
  CircleDot as Cilantro, CircleDot as Cinnamon, CircleDot as CoconutMilk, 
  CircleDot as Corn, CircleDot as CottageCheese, CircleDot as Crackers,
  CircleDot as Cream, CircleDot as CreamCheese, CircleDot as Cucumber, CircleDot as Dates,
  Donut, CircleDot as Endive, CircleDot as Figs, CircleDot as Flour, CircleDot as Frankfurter,
  CircleDot as Garlic, CircleDot as Ginger, Grape, CircleDot as Granola, CircleDot as GreekYogurt,
  CircleDot as GreenBeans, CircleDot as GroundTurkey, CircleDot as Guacamole,
  CircleDot as Ham, CircleDot as HashBrowns, CircleDot as Honey, CircleDot as Hummus,
  IceCream, CircleDot as Icing, CircleDot as Jam, CircleDot as Juice, CircleDot as Kale,
  CircleDot as Kiwi, CircleDot as Lamb, CircleDot as Lettuce, CircleDot as Mayonnaise,
  CircleDot as Meatballs, CircleDot as Mushrooms, CircleDot as Mustard, CircleDot as Nuts,
  CircleDot as Oatmeal, CircleDot as OliveOil, CircleDot as Olives, CircleDot as Onions,
  CircleDot as OrangeJuice, CircleDot as Orange, CircleDot as Pancakes, CircleDot as Pasta,
  CircleDot as Peaches, CircleDot as Pears, CircleDot as Peas, CircleDot as PeanutButter,
  CircleDot as Pecans, CircleDot as Pickles, CircleDot as Pineapple, Pizza,
  CircleDot as Plums, CircleDot as Popcorn, CircleDot as Pork, CircleDot as Potatoes,
  CircleDot as Poultry, CircleDot as ProvoloneCheese, CircleDot as Pumpkin, CircleDot as Quinoa,
  CircleDot as Radishes, CircleDot as Raisins, CircleDot as RamenNoodles, CircleDot as RaspberryJam,
  CircleDot as Rhubarb, CircleDot as Rice, CircleDot as RicottaCheese, CircleDot as RoastBeef,
  Salad, CircleDot as Sardines, CircleDot as Sauerkraut, CircleDot as Sausages,
  CircleDot as Shrimp, CircleDot as SourCream, CircleDot as SoyMilk, CircleDot as Spaghetti,
  CircleDot as Spinach, CircleDot as Squash, CircleDot as Strawberries, CircleDot as Sugar,
  CircleDot as SweetPotatoes, CircleDot as SwissCheese, CircleDot as Syrup, CircleDot as TartarSauce,
  CircleDot as Tea, CircleDot as Thyme, CircleDot as TomatoSauce, CircleDot as Tomatoes,
  CircleDot as Tortillas, CircleDot as Turkey, CircleDot as Turnips, CircleDot as UdonNoodles,
  CircleDot as VegetableOil, CircleDot as Vinegar, CircleDot as WaterFilter, CircleDot as Watermelon,
  CircleDot as WheatBread, CircleDot as WhippedCream, CircleDot as Yogurt, CircleDot as Zucchini,
  CircleDot as Aspirin, Battery, CircleDot as CannedBeans, CircleDot as CannedCorn,
  CircleDot as CannedTomatoes, CircleDot as Cereal, CircleDot as CoffeeCreamer, CircleDot as Croutons,
  CircleDot as DriedApricots, CircleDot as DriedCranberries, CircleDot as EnergyBars, CircleDot as FlourTortillas,
  CircleDot as FreshBasil, CircleDot as FreshParsley, CircleDot as FrozenPeas, CircleDot as GrahamCrackers,
  CircleDot as GreenTea, CircleDot as GroundCoffee, CircleDot as HamburgerBuns, CircleDot as HotSauce,
  CircleDot as InstantNoodles, CircleDot as Jelly, CircleDot as Ketchup, CircleDot as LemonJuice,
  CircleDot as LimeJuice, CircleDot as MapleSyrup, CircleDot as Mayo, CircleDot as MustardSeeds,
  CircleDot as OliveTapenade, CircleDot as OnionPowder, CircleDot as Paprika, CircleDot as PeanutOil,
  CircleDot as PickleRelish, CircleDot as PitaBread, CircleDot as Pretzels, CircleDot as RaisinBran,
  CircleDot as Relish, CircleDot as Salt, CircleDot as SesameOil, CircleDot as SesameSeeds,
  CircleDot as SoySauce, CircleDot as SpicySauce, CircleDot as TacoSeasoning, CircleDot as Tahini,
  CircleDot as ToiletPaper, CircleDot as TortillaChips, CircleDot as VanillaExtract, CircleDot as Wasabi,
  CircleDot as WorcestershireSauce, CircleDot as YellowMustard
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
  artichokes: { value: 'artichokes', label: 'Artichokes', icon: <Artichoke className="h-5 w-5" />, shelfLife: 5 },
  asparagus: { value: 'asparagus', label: 'Asparagus', icon: <Asparagus className="h-5 w-5" />, shelfLife: 3 },
  avocados: { value: 'avocados', label: 'Avocados', icon: <Avocado className="h-5 w-5" />, shelfLife: 3 },
  bacon: { value: 'bacon', label: 'Bacon', icon: <Bacon className="h-5 w-5" />, shelfLife: 5 },
  bagels: { value: 'bagels', label: 'Bagels', icon: <Bagel className="h-5 w-5" />, shelfLife: 2 },
  bananas: { value: 'bananas', label: 'Bananas', icon: <Banana className="h-5 w-5" />, shelfLife: 5 },
  beefGround: { value: 'beefGround', label: 'Beef (ground)', icon: <Beef className="h-5 w-5" />, shelfLife: 1 },
  beefSteaks: { value: 'beefSteaks', label: 'Beef (steaks)', icon: <Beef className="h-5 w-5" />, shelfLife: 3 },
  berries: { value: 'berries', label: 'Berries', icon: <Cherry className="h-5 w-5" />, shelfLife: 3 },
  biscuits: { value: 'biscuits', label: 'Biscuits', icon: <Cookie className="h-5 w-5" />, shelfLife: 2 },
  bread: { value: 'bread', label: 'Bread', icon: <Bread className="h-5 w-5" />, shelfLife: 2 },
  broccoli: { value: 'broccoli', label: 'Broccoli', icon: <Broccoli className="h-5 w-5" />, shelfLife: 3 },
  butter: { value: 'butter', label: 'Butter', icon: <Butter className="h-5 w-5" />, shelfLife: 7 },
  cabbage: { value: 'cabbage', label: 'Cabbage', icon: <Cabbage className="h-5 w-5" />, shelfLife: 5 },
  cake: { value: 'cake', label: 'Cake', icon: <Cake className="h-5 w-5" />, shelfLife: 2 },
  carrots: { value: 'carrots', label: 'Carrots', icon: <Carrot className="h-5 w-5" />, shelfLife: 10 },
  celery: { value: 'celery', label: 'Celery', icon: <Celery className="h-5 w-5" />, shelfLife: 5 },
  cheeseCheddar: { value: 'cheeseCheddar', label: 'Cheese (cheddar)', icon: <Cheese className="h-5 w-5" />, shelfLife: 14 },
  cheeseFeta: { value: 'cheeseFeta', label: 'Cheese (feta)', icon: <Cheese className="h-5 w-5" />, shelfLife: 14 },
  cheeseMozzarella: { value: 'cheeseMozzarella', label: 'Cheese (mozzarella)', icon: <Cheese className="h-5 w-5" />, shelfLife: 5 },
  cherries: { value: 'cherries', label: 'Cherries', icon: <Cherry className="h-5 w-5" />, shelfLife: 3 },
  chickenCooked: { value: 'chickenCooked', label: 'Chicken (cooked)', icon: <Chicken className="h-5 w-5" />, shelfLife: 3 },
  chickenRaw: { value: 'chickenRaw', label: 'Chicken (raw)', icon: <Chicken className="h-5 w-5" />, shelfLife: 1 },
  chocolate: { value: 'chocolate', label: 'Chocolate', icon: <Chocolate className="h-5 w-5" />, shelfLife: 14 },
  cilantro: { value: 'cilantro', label: 'Cilantro', icon: <Cilantro className="h-5 w-5" />, shelfLife: 3 },
  cinnamon: { value: 'cinnamon', label: 'Cinnamon', icon: <Cinnamon className="h-5 w-5" />, shelfLife: 14 },
  coconutMilk: { value: 'coconutMilk', label: 'Coconut milk', icon: <CoconutMilk className="h-5 w-5" />, shelfLife: 3 },
  coffee: { value: 'coffee', label: 'Coffee', icon: <Coffee className="h-5 w-5" />, shelfLife: 7 },
  cookies: { value: 'cookies', label: 'Cookies', icon: <Cookie className="h-5 w-5" />, shelfLife: 2 },
  corn: { value: 'corn', label: 'Corn', icon: <Corn className="h-5 w-5" />, shelfLife: 5 },
  cottageCheese: { value: 'cottageCheese', label: 'Cottage cheese', icon: <CottageCheese className="h-5 w-5" />, shelfLife: 5 },
  crackers: { value: 'crackers', label: 'Crackers', icon: <Crackers className="h-5 w-5" />, shelfLife: 5 },
  cream: { value: 'cream', label: 'Cream', icon: <Cream className="h-5 w-5" />, shelfLife: 3 },
  creamCheese: { value: 'creamCheese', label: 'Cream cheese', icon: <CreamCheese className="h-5 w-5" />, shelfLife: 7 },
  cucumber: { value: 'cucumber', label: 'Cucumber', icon: <Cucumber className="h-5 w-5" />, shelfLife: 3 },
  dates: { value: 'dates', label: 'Dates', icon: <Dates className="h-5 w-5" />, shelfLife: 14 },
  donuts: { value: 'donuts', label: 'Donuts', icon: <Donut className="h-5 w-5" />, shelfLife: 2 },
  eggs: { value: 'eggs', label: 'Eggs', icon: <Egg className="h-5 w-5" />, shelfLife: 7 },
  endive: { value: 'endive', label: 'Endive', icon: <Endive className="h-5 w-5" />, shelfLife: 3 },
  figs: { value: 'figs', label: 'Figs', icon: <Figs className="h-5 w-5" />, shelfLife: 3 },
  fishCooked: { value: 'fishCooked', label: 'Fish (cooked)', icon: <Fish className="h-5 w-5" />, shelfLife: 3 },
  fishRaw: { value: 'fishRaw', label: 'Fish (raw)', icon: <Fish className="h-5 w-5" />, shelfLife: 1 },
  flour: { value: 'flour', label: 'Flour', icon: <Flour className="h-5 w-5" />, shelfLife: 30 },
  frankfurters: { value: 'frankfurters', label: 'Frankfurters', icon: <Frankfurter className="h-5 w-5" />, shelfLife: 5 },
  garlic: { value: 'garlic', label: 'Garlic', icon: <Garlic className="h-5 w-5" />, shelfLife: 14 },
  ginger: { value: 'ginger', label: 'Ginger', icon: <Ginger className="h-5 w-5" />, shelfLife: 14 },
  grapes: { value: 'grapes', label: 'Grapes', icon: <Grape className="h-5 w-5" />, shelfLife: 5 },
  granola: { value: 'granola', label: 'Granola', icon: <Granola className="h-5 w-5" />, shelfLife: 14 },
  greekYogurt: { value: 'greekYogurt', label: 'Greek yogurt', icon: <GreekYogurt className="h-5 w-5" />, shelfLife: 5 },
  greenBeans: { value: 'greenBeans', label: 'Green beans', icon: <GreenBeans className="h-5 w-5" />, shelfLife: 5 },
  groundTurkey: { value: 'groundTurkey', label: 'Ground turkey', icon: <GroundTurkey className="h-5 w-5" />, shelfLife: 1 },
  guacamole: { value: 'guacamole', label: 'Guacamole', icon: <Guacamole className="h-5 w-5" />, shelfLife: 3 },
  ham: { value: 'ham', label: 'Ham', icon: <Ham className="h-5 w-5" />, shelfLife: 5 },
  hashBrowns: { value: 'hashBrowns', label: 'Hash browns', icon: <HashBrowns className="h-5 w-5" />, shelfLife: 3 },
  honey: { value: 'honey', label: 'Honey', icon: <Honey className="h-5 w-5" />, shelfLife: 30 },
  hummus: { value: 'hummus', label: 'Hummus', icon: <Hummus className="h-5 w-5" />, shelfLife: 5 },
  iceCream: { value: 'iceCream', label: 'Ice cream', icon: <IceCream className="h-5 w-5" />, shelfLife: 7 },
  icing: { value: 'icing', label: 'Icing', icon: <Icing className="h-5 w-5" />, shelfLife: 2 },
  jam: { value: 'jam', label: 'Jam', icon: <Jam className="h-5 w-5" />, shelfLife: 14 },
  juice: { value: 'juice', label: 'Juice (orange)', icon: <Juice className="h-5 w-5" />, shelfLife: 3 },
  kale: { value: 'kale', label: 'Kale', icon: <Kale className="h-5 w-5" />, shelfLife: 3 },
  kiwi: { value: 'kiwi', label: 'Kiwi', icon: <Kiwi className="h-5 w-5" />, shelfLife: 5 },
  lambCooked: { value: 'lambCooked', label: 'Lamb (cooked)', icon: <Lamb className="h-5 w-5" />, shelfLife: 3 },
  lambRaw: { value: 'lambRaw', label: 'Lamb (raw)', icon: <Lamb className="h-5 w-5" />, shelfLife: 1 },
  lettuce: { value: 'lettuce', label: 'Lettuce', icon: <Lettuce className="h-5 w-5" />, shelfLife: 3 },
  mayonnaise: { value: 'mayonnaise', label: 'Mayonnaise', icon: <Mayonnaise className="h-5 w-5" />, shelfLife: 14 },
  meatballs: { value: 'meatballs', label: 'Meatballs', icon: <Meatballs className="h-5 w-5" />, shelfLife: 3 },
  milk: { value: 'milk', label: 'Milk', icon: <Milk className="h-5 w-5" />, shelfLife: 3 },
  mozzarellaCheese: { value: 'mozzarellaCheese', label: 'Mozzarella cheese', icon: <Cheese className="h-5 w-5" />, shelfLife: 5 },
  mushrooms: { value: 'mushrooms', label: 'Mushrooms', icon: <Mushrooms className="h-5 w-5" />, shelfLife: 3 },
  mustard: { value: 'mustard', label: 'Mustard', icon: <Mustard className="h-5 w-5" />, shelfLife: 14 },
  nuts: { value: 'nuts', label: 'Nuts', icon: <Nuts className="h-5 w-5" />, shelfLife: 14 },
  oatmeal: { value: 'oatmeal', label: 'Oatmeal', icon: <Oatmeal className="h-5 w-5" />, shelfLife: 14 },
  oliveOil: { value: 'oliveOil', label: 'Olive oil', icon: <OliveOil className="h-5 w-5" />, shelfLife: 30 },
  olives: { value: 'olives', label: 'Olives', icon: <Olives className="h-5 w-5" />, shelfLife: 14 },
  onions: { value: 'onions', label: 'Onions', icon: <Onions className="h-5 w-5" />, shelfLife: 14 },
  orangeJuice: { value: 'orangeJuice', label: 'Orange juice', icon: <OrangeJuice className="h-5 w-5" />, shelfLife: 3 },
  oranges: { value: 'oranges', label: 'Oranges', icon: <Orange className="h-5 w-5" />, shelfLife: 10 },
  pancakes: { value: 'pancakes', label: 'Pancakes', icon: <Pancakes className="h-5 w-5" />, shelfLife: 2 },
  pastaCooked: { value: 'pastaCooked', label: 'Pasta (cooked)', icon: <Pasta className="h-5 w-5" />, shelfLife: 3 },
  pastaDried: { value: 'pastaDried', label: 'Pasta (dried)', icon: <Pasta className="h-5 w-5" />, shelfLife: 30 },
  peaches: { value: 'peaches', label: 'Peaches', icon: <Peaches className="h-5 w-5" />, shelfLife: 5 },
  pears: { value: 'pears', label: 'Pears', icon: <Pears className="h-5 w-5" />, shelfLife: 10 },
  peas: { value: 'peas', label: 'Peas', icon: <Peas className="h-5 w-5" />, shelfLife: 5 },
  peanutButter: { value: 'peanutButter', label: 'Peanut butter', icon: <PeanutButter className="h-5 w-5" />, shelfLife: 14 },
  pecans: { value: 'pecans', label: 'Pecans', icon: <Pecans className="h-5 w-5" />, shelfLife: 14 },
  pickles: { value: 'pickles', label: 'Pickles', icon: <Pickles className="h-5 w-5" />, shelfLife: 14 },
  pineapple: { value: 'pineapple', label: 'Pineapple', icon: <Pineapple className="h-5 w-5" />, shelfLife: 5 },
  pizza: { value: 'pizza', label: 'Pizza', icon: <Pizza className="h-5 w-5" />, shelfLife: 3 },
  plums: { value: 'plums', label: 'Plums', icon: <Plums className="h-5 w-5" />, shelfLife: 5 },
  popcorn: { value: 'popcorn', label: 'Popcorn', icon: <Popcorn className="h-5 w-5" />, shelfLife: 5 },
  porkCooked: { value: 'porkCooked', label: 'Pork (cooked)', icon: <Pork className="h-5 w-5" />, shelfLife: 3 },
  porkRaw: { value: 'porkRaw', label: 'Pork (raw)', icon: <Pork className="h-5 w-5" />, shelfLife: 1 },
  potatoes: { value: 'potatoes', label: 'Potatoes', icon: <Potatoes className="h-5 w-5" />, shelfLife: 10 },
  poultryCooked: { value: 'poultryCooked', label: 'Poultry (cooked)', icon: <Poultry className="h-5 w-5" />, shelfLife: 3 },
  poultryRaw: { value: 'poultryRaw', label: 'Poultry (raw)', icon: <Poultry className="h-5 w-5" />, shelfLife: 1 },
  provoloneCheese: { value: 'provoloneCheese', label: 'Provolone cheese', icon: <ProvoloneCheese className="h-5 w-5" />, shelfLife: 14 },
  pumpkin: { value: 'pumpkin', label: 'Pumpkin', icon: <Pumpkin className="h-5 w-5" />, shelfLife: 10 },
  quinoa: { value: 'quinoa', label: 'Quinoa', icon: <Quinoa className="h-5 w-5" />, shelfLife: 14 },
  radishes: { value: 'radishes', label: 'Radishes', icon: <Radishes className="h-5 w-5" />, shelfLife: 3 },
  raisins: { value: 'raisins', label: 'Raisins', icon: <Raisins className="h-5 w-5" />, shelfLife: 14 },
  ramenNoodles: { value: 'ramenNoodles', label: 'Ramen noodles', icon: <RamenNoodles className="h-5 w-5" />, shelfLife: 30 },
  raspberryJam: { value: 'raspberryJam', label: 'Raspberry jam', icon: <RaspberryJam className="h-5 w-5" />, shelfLife: 14 },
  rhubarb: { value: 'rhubarb', label: 'Rhubarb', icon: <Rhubarb className="h-5 w-5" />, shelfLife: 3 },
  riceCooked: { value: 'riceCooked', label: 'Rice (cooked)', icon: <Rice className="h-5 w-5" />, shelfLife: 3 },
  riceUncooked: { value: 'riceUncooked', label: 'Rice (uncooked)', icon: <Rice className="h-5 w-5" />, shelfLife: 30 },
  ricottaCheese: { value: 'ricottaCheese', label: 'Ricotta cheese', icon: <RicottaCheese className="h-5 w-5" />, shelfLife: 5 },
  roastBeef: { value: 'roastBeef', label: 'Roast beef', icon: <RoastBeef className="h-5 w-5" />, shelfLife: 5 },
  salad: { value: 'salad', label: 'Salad', icon: <Salad className="h-5 w-5" />, shelfLife: 3 },
  sardines: { value: 'sardines', label: 'Sardines', icon: <Sardines className="h-5 w-5" />, shelfLife: 14 },
  sauerkraut: { value: 'sauerkraut', label: 'Sauerkraut', icon: <Sauerkraut className="h-5 w-5" />, shelfLife: 14 },
  sausages: { value: 'sausages', label: 'Sausages', icon: <Sausages className="h-5 w-5" />, shelfLife: 5 },
  shrimpCooked: { value: 'shrimpCooked', label: 'Shrimp (cooked)', icon: <Shrimp className="h-5 w-5" />, shelfLife: 3 },
  shrimpRaw: { value: 'shrimpRaw', label: 'Shrimp (raw)', icon: <Shrimp className="h-5 w-5" />, shelfLife: 1 },
  sourCream: { value: 'sourCream', label: 'Sour cream', icon: <SourCream className="h-5 w-5" />, shelfLife: 5 },
  soyMilk: { value: 'soyMilk', label: 'Soy milk', icon: <SoyMilk className="h-5 w-5" />, shelfLife: 3 },
  spaghetti: { value: 'spaghetti', label: 'Spaghetti', icon: <Spaghetti className="h-5 w-5" />, shelfLife: 3 },
  spinach: { value: 'spinach', label: 'Spinach', icon: <Spinach className="h-5 w-5" />, shelfLife: 3 },
  squash: { value: 'squash', label: 'Squash', icon: <Squash className="h-5 w-5" />, shelfLife: 5 },
  strawberries: { value: 'strawberries', label: 'Strawberries', icon: <Strawberries className="h-5 w-5" />, shelfLife: 3 },
  sugar: { value: 'sugar', label: 'Sugar', icon: <Sugar className="h-5 w-5" />, shelfLife: 30 },
  sweetPotatoes: { value: 'sweetPotatoes', label: 'Sweet potatoes', icon: <SweetPotatoes className="h-5 w-5" />, shelfLife: 10 },
  swissCheese: { value: 'swissCheese', label: 'Swiss cheese', icon: <SwissCheese className="h-5 w-5" />, shelfLife: 14 },
  syrup: { value: 'syrup', label: 'Syrup', icon: <Syrup className="h-5 w-5" />, shelfLife: 14 },
  tartarSauce: { value: 'tartarSauce', label: 'Tartar sauce', icon: <TartarSauce className="h-5 w-5" />, shelfLife: 14 },
  tea: { value: 'tea', label: 'Tea', icon: <Tea className="h-5 w-5" />, shelfLife: 14 },
  thyme: { value: 'thyme', label: 'Thyme', icon: <Thyme className="h-5 w-5" />, shelfLife: 14 },
  tomatoSauce: { value: 'tomatoSauce', label: 'Tomato sauce', icon: <TomatoSauce className="h-5 w-5" />, shelfLife: 5 },
  tomatoes: { value: 'tomatoes', label: 'Tomatoes', icon: <Tomatoes className="h-5 w-5" />, shelfLife: 5 },
  tortillas: { value: 'tortillas', label: 'Tortillas', icon: <Tortillas className="h-5 w-5" />, shelfLife: 5 },
  turkeyCooked: { value: 'turkeyCooked', label: 'Turkey (cooked)', icon: <Turkey className="h-5 w-5" />, shelfLife: 3 },
  turkeyRaw: { value: 'turkeyRaw', label: 'Turkey (raw)', icon: <Turkey className="h-5 w-5" />, shelfLife: 1 },
  turnips: { value: 'turnips', label: 'Turnips', icon: <Turnips className="h-5 w-5" />, shelfLife: 5 },
  udonNoodles: { value: 'udonNoodles', label: 'Udon noodles', icon: <UdonNoodles className="h-5 w-5" />, shelfLife: 30 },
  vegetableOil: { value: 'vegetableOil', label: 'Vegetable oil', icon: <VegetableOil className="h-5 w-5" />, shelfLife: 30 },
  vinegar: { value: 'vinegar', label: 'Vinegar', icon: <Vinegar className="h-5 w-5" />, shelfLife: 30 },
  waterFilter: { value: 'waterFilter', label: 'Water filter cartridge', icon: <WaterFilter className="h-5 w-5" />, shelfLife: 30 },
  watermelon: { value: 'watermelon', label: 'Watermelon', icon: <Watermelon className="h-5 w-5" />, shelfLife: 5 },
  wheatBread: { value: 'wheatBread', label: 'Wheat bread', icon: <WheatBread className="h-5 w-5" />, shelfLife: 2 },
  whippedCream: { value: 'whippedCream', label: 'Whipped cream', icon: <WhippedCream className="h-5 w-5" />, shelfLife: 2 },
  wine: { value: 'wine', label: 'Wine', icon: <Wine className="h-5 w-5" />, shelfLife: 14 },
  yogurt: { value: 'yogurt', label: 'Yogurt', icon: <Yogurt className="h-5 w-5" />, shelfLife: 5 },
  zucchini: { value: 'zucchini', label: 'Zucchini', icon: <Zucchini className="h-5 w-5" />, shelfLife: 3 },
  aspirin: { value: 'aspirin', label: 'Aspirin', icon: <Aspirin className="h-5 w-5" />, shelfLife: 30 },
  batteries: { value: 'batteries', label: 'Batteries', icon: <Battery className="h-5 w-5" />, shelfLife: 30 },
  cannedBeans: { value: 'cannedBeans', label: 'Canned beans', icon: <CannedBeans className="h-5 w-5" />, shelfLife: 30 },
  cannedCorn: { value: 'cannedCorn', label: 'Canned corn', icon: <CannedCorn className="h-5 w-5" />, shelfLife: 30 },
  cannedTomatoes: { value: 'cannedTomatoes', label: 'Canned tomatoes', icon: <CannedTomatoes className="h-5 w-5" />, shelfLife: 30 },
  cereal: { value: 'cereal', label: 'Cereal', icon: <Cereal className="h-5 w-5" />, shelfLife: 14 },
  coffeeCreamer: { value: 'coffeeCreamer', label: 'Coffee creamer', icon: <CoffeeCreamer className="h-5 w-5" />, shelfLife: 14 },
  croutons: { value: 'croutons', label: 'Croutons', icon: <Croutons className="h-5 w-5" />, shelfLife: 5 },
  driedApricots: { value: 'driedApricots', label: 'Dried apricots', icon: <DriedApricots className="h-5 w-5" />, shelfLife: 14 },
  driedCranberries: { value: 'driedCranberries', label: 'Dried cranberries', icon: <DriedCranberries className="h-5 w-5" />, shelfLife: 14 },
  energyBars: { value: 'energyBars', label: 'Energy bars', icon: <EnergyBars className="h-5 w-5" />, shelfLife: 14 },
  flourTortillas: { value: 'flourTortillas', label: 'Flour tortillas', icon: <FlourTortillas className="h-5 w-5" />, shelfLife: 5 },
  freshBasil: { value: 'freshBasil', label: 'Fresh basil', icon: <FreshBasil className="h-5 w-5" />, shelfLife: 3 },
  freshParsley: { value: 'freshParsley', label: 'Fresh parsley', icon: <FreshParsley className="h-5 w-5" />, shelfLife: 3 },
  frozenPeas: { value: 'frozenPeas', label: 'Frozen peas', icon: <FrozenPeas className="h-5 w-5" />, shelfLife: 30 },
  grahamCrackers: { value: 'grahamCrackers', label: 'Graham crackers', icon: <GrahamCrackers className="h-5 w-5" />, shelfLife: 14 },
  greenTea: { value: 'greenTea', label: 'Green tea', icon: <GreenTea className="h-5 w-5" />, shelfLife: 14 },
  groundCoffee: { value: 'groundCoffee', label: 'Ground coffee', icon: <GroundCoffee className="h-5 w-5" />, shelfLife: 14 },
  hamburgerBuns: { value: 'hamburgerBuns', label: 'Hamburger buns', icon: <HamburgerBuns className="h-5 w-5" />, shelfLife: 5 },
  hotSauce: { value: 'hotSauce', label: 'Hot sauce', icon: <HotSauce className="h-5 w-5" />, shelfLife: 14 },
  instantNoodles: { value: 'instantNoodles', label: 'Instant noodles', icon: <InstantNoodles className="h-5 w-5" />, shelfLife: 30 },
  jelly: { value: 'jelly', label: 'Jelly', icon: <Jelly className="h-5 w-5" />, shelfLife: 14 },
  ketchup: { value: 'ketchup', label: 'Ketchup', icon: <Ketchup className="h-5 w-5" />, shelfLife: 14 },
  lemonJuice: { value: 'lemonJuice', label: 'Lemon juice', icon: <LemonJuice className="h-5 w-5" />, shelfLife: 5 },
  limeJuice: { value: 'limeJuice', label: 'Lime juice', icon: <LimeJuice className="h-5 w-5" />, shelfLife: 5 },
  mapleSyrup: { value: 'mapleSyrup', label: 'Maple syrup', icon: <MapleSyrup className="h-5 w-5" />, shelfLife: 14 },
  mayo: { value: 'mayo', label: 'Mayo', icon: <Mayo className="h-5 w-5" />, shelfLife: 14 },
  mustardSeeds: { value: 'mustardSeeds', label: 'Mustard seeds', icon: <MustardSeeds className="h-5 w-5" />, shelfLife: 14 },
  oliveTapenade: { value: 'oliveTapenade', label: 'Olive tapenade', icon: <OliveTapenade className="h-5 w-5" />, shelfLife: 14 },
  onionPowder: { value: 'onionPowder', label: 'Onion powder', icon: <OnionPowder className="h-5 w-5" />, shelfLife: 14 },
  paprika: { value: 'paprika', label: 'Paprika', icon: <Paprika className="h-5 w-5" />, shelfLife: 14 },
  peanutOil: { value: 'peanutOil', label: 'Peanut oil', icon: <PeanutOil className="h-5 w-5" />, shelfLife: 30 },
  pickleRelish: { value: 'pickleRelish', label: 'Pickle relish', icon: <PickleRelish className="h-5 w-5" />, shelfLife: 14 },
  pitaBread: { value: 'pitaBread', label: 'Pita bread', icon: <PitaBread className="h-5 w-5" />, shelfLife: 5 },
  pretzels: { value: 'pretzels', label: 'Pretzels', icon: <Pretzels className="h-5 w-5" />, shelfLife: 5 },
  raisinBran: { value: 'raisinBran', label: 'Raisin bran', icon: <RaisinBran className="h-5 w-5" />, shelfLife: 14 },
  relish: { value: 'relish', label: 'Relish', icon: <Relish className="h-5 w-5" />, shelfLife: 14 },
  salt: { value: 'salt', label: 'Salt', icon: <Salt className="h-5 w-5" />, shelfLife: 30 },
  sesameOil: { value: 'sesameOil', label: 'Sesame oil', icon: <SesameOil className="h-5 w-5" />, shelfLife: 30 },
  sesameSeeds: { value: 'sesameSeeds', label: 'Sesame seeds', icon: <SesameSeeds className="h-5 w-5" />, shelfLife: 14 },
  soySauce: { value: 'soySauce', label: 'Soy sauce', icon: <SoySauce className="h-5 w-5" />, shelfLife: 14 },
  spicySauce: { value: 'spicySauce', label: 'Spicy sauce', icon: <SpicySauce className="h-5 w-5" />, shelfLife: 14 },
  tacoSeasoning: { value: 'tacoSeasoning', label: 'Taco seasoning', icon: <TacoSeasoning className="h-5 w-5" />, shelfLife: 14 },
  tahini: { value: 'tahini', label: 'Tahini', icon: <Tahini className="h-5 w-5" />, shelfLife: 14 },
  toiletPaper: { value: 'toiletPaper', label: 'Toilet paper', icon: <ToiletPaper className="h-5 w-5" />, shelfLife: 30 },
  tortillaChips: { value: 'tortillaChips', label: 'Tortilla chips', icon: <TortillaChips className="h-5 w-5" />, shelfLife: 5 },
  vanillaExtract: { value: 'vanillaExtract', label: 'Vanilla extract', icon: <VanillaExtract className="h-5 w-5" />, shelfLife: 14 },
  wasabi: { value: 'wasabi', label: 'Wasabi', icon: <Wasabi className="h-5 w-5" />, shelfLife: 14 },
  worcestershireSauce: { value: 'worcestershireSauce', label: 'Worcestershire sauce', icon: <WorcestershireSauce className="h-5 w-5" />, shelfLife: 14 },
  yellowMustard: { value: 'yellowMustard', label: 'Yellow mustard', icon: <YellowMustard className="h-5 w-5" />, shelfLife: 14 },
  // Fallback options
  box: { value: 'box', label: 'Generic', icon: <Box className="h-5 w-5" />, shelfLife: 7 },
  trash: { value: 'trash', label: 'Trash', icon: <Trash className="h-5 w-5" />, shelfLife: 1 },
};

// Default selected icons (initial state) - select a reasonable set of common items
const DEFAULT_SELECTED_ICONS = [
  'almondMilk', 'apple', 'bananas', 'bread', 'cheese', 'chicken', 'coffee', 
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
