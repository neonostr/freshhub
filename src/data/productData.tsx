
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
  almondMilk: { value: 'almondMilk', label: 'Almond Milk', icon: <Milk className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:glass-of-milk' },
  cashewMilk: { value: 'cashewMilk', label: 'Cashew Milk', icon: <Icon icon="noto:glass-of-milk" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:glass-of-milk' },
  butter: { value: 'butter', label: 'Butter', icon: <Icon icon="fluent-emoji-high-contrast:butter" className="h-5 w-5" />, shelfLife: 14, iconName: 'fluent-emoji-high-contrast:butter' },
  cheese: { value: 'cheese', label: 'Cheese', icon: <Icon icon="noto:cheese-wedge" className="h-5 w-5" />, shelfLife: 14, iconName: 'noto:cheese-wedge' },
  coconutMilk: { value: 'coconutMilk', label: 'Coconut Milk', icon: <Icon icon="noto:coconut" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:coconut' },
  cream: { value: 'cream', label: 'Cream', icon: <Icon icon="noto:glass-of-milk" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:glass-of-milk' },
  milk: { value: 'milk', label: 'Milk', icon: <Icon icon="noto:glass-of-milk" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:glass-of-milk' },
  oatMilk: { value: 'oatMilk', label: 'Oat Milk', icon: <Icon icon="noto:glass-of-milk" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:glass-of-milk' },
  sourCream: { value: 'sourCream', label: 'Sour Cream', icon: <Icon icon="noto:pot-of-food" className="h-5 w-5" />, shelfLife: 14, iconName: 'noto:pot-of-food' },
  soyMilk: { value: 'soyMilk', label: 'Soy Milk', icon: <Icon icon="noto:glass-of-milk" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:glass-of-milk' },
  buttermilk: { value: 'buttermilk', label: 'Buttermilk', icon: <Icon icon="noto:glass-of-milk" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:glass-of-milk' },
  kefir: { value: 'kefir', label: 'Kefir', icon: <Icon icon="noto:glass-of-milk" className="h-5 w-5" />, shelfLife: 10, iconName: 'noto:glass-of-milk' },
  yogurt: { value: 'yogurt', label: 'Yogurt', icon: <Icon icon="noto:yogurt" className="h-5 w-5" />, shelfLife: 14, iconName: 'noto:yogurt' },
  
  // Fruits
  apples: { value: 'apples', label: 'Apples', icon: <Icon icon="noto:red-apple" className="h-5 w-5" />, shelfLife: 14, iconName: 'noto:red-apple' },
  apricots: { value: 'apricots', label: 'Apricots', icon: <Icon icon="streamline-emojis:peach" className="h-5 w-5" />, shelfLife: 5, iconName: 'streamline-emojis:peach' },
  blackberries: { value: 'blackberries', label: 'Blackberries', icon: <Icon icon="fluent-emoji-high-contrast:blueberries" className="h-5 w-5" />, shelfLife: 3, iconName: 'fluent-emoji-high-contrast:blueberries' },
  blueberries: { value: 'blueberries', label: 'Blueberries', icon: <Icon icon="fluent-emoji-high-contrast:blueberries" className="h-5 w-5" />, shelfLife: 5, iconName: 'fluent-emoji-high-contrast:blueberries' },
  cherries: { value: 'cherries', label: 'Cherries', icon: <Icon icon="noto:cherries" className="h-5 w-5" />, shelfLife: 5, iconName: 'noto:cherries' },
  coconuts: { value: 'coconuts', label: 'Coconuts', icon: <Icon icon="noto:coconut" className="h-5 w-5" />, shelfLife: 14, iconName: 'noto:coconut' },
  cranberries: { value: 'cranberries', label: 'Cranberries', icon: <Icon icon="fluent-emoji-high-contrast:blueberries" className="h-5 w-5" />, shelfLife: 14, iconName: 'fluent-emoji-high-contrast:blueberries' },
  grapes: { value: 'grapes', label: 'Grapes', icon: <Icon icon="noto:grapes" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:grapes' },
  kiwi: { value: 'kiwi', label: 'Kiwi', icon: <Icon icon="noto:kiwi-fruit" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:kiwi-fruit' },
  mangoes: { value: 'mangoes', label: 'Mangoes', icon: <Icon icon="noto:mango" className="h-5 w-5" />, shelfLife: 5, iconName: 'noto:mango' },
  oranges: { value: 'oranges', label: 'Oranges', icon: <Icon icon="noto:tangerine" className="h-5 w-5" />, shelfLife: 14, iconName: 'noto:tangerine' },
  peaches: { value: 'peaches', label: 'Peaches', icon: <Icon icon="streamline-emojis:peach" className="h-5 w-5" />, shelfLife: 5, iconName: 'streamline-emojis:peach' },
  pears: { value: 'pears', label: 'Pears', icon: <Icon icon="noto:pear" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:pear' },
  pineapple: { value: 'pineapple', label: 'Pineapple', icon: <Icon icon="noto:pineapple" className="h-5 w-5" />, shelfLife: 5, iconName: 'noto:pineapple' },
  plums: { value: 'plums', label: 'Plums', icon: <Icon icon="streamline-emojis:plum" className="h-5 w-5" />, shelfLife: 5, iconName: 'streamline-emojis:plum' },
  raisins: { value: 'raisins', label: 'Raisins', icon: <Icon icon="noto:grapes" className="h-5 w-5" />, shelfLife: 180, iconName: 'noto:grapes' },
  raspberries: { value: 'raspberries', label: 'Raspberries', icon: <Icon icon="streamline-emojis:strawberry" className="h-5 w-5" />, shelfLife: 3, iconName: 'streamline-emojis:strawberry' },
  strawberries: { value: 'strawberries', label: 'Strawberries', icon: <Icon icon="noto:strawberry" className="h-5 w-5" />, shelfLife: 5, iconName: 'noto:strawberry' },
  watermelon: { value: 'watermelon', label: 'Watermelon', icon: <Icon icon="noto:watermelon" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:watermelon' },
  
  // Vegetables
  asparagus: { value: 'asparagus', label: 'Asparagus', icon: <Icon icon="streamline-emojis:asparagus" className="h-5 w-5" />, shelfLife: 5, iconName: 'streamline-emojis:asparagus' },
  avocados: { value: 'avocados', label: 'Avocados', icon: <Icon icon="noto:avocado" className="h-5 w-5" />, shelfLife: 5, iconName: 'noto:avocado' },
  basil: { value: 'basil', label: 'Basil', icon: <Icon icon="noto:herb" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:herb' },
  bellPepper: { value: 'bellPepper', label: 'Bell Pepper', icon: <Icon icon="noto:bell-pepper" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:bell-pepper' },
  broccoli: { value: 'broccoli', label: 'Broccoli', icon: <Icon icon="noto:broccoli" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:broccoli' },
  carrots: { value: 'carrots', label: 'Carrots', icon: <Icon icon="noto:carrot" className="h-5 w-5" />, shelfLife: 14, iconName: 'noto:carrot' },
  cauliflower: { value: 'cauliflower', label: 'Cauliflower', icon: <Icon icon="streamline-emojis:cauliflower" className="h-5 w-5" />, shelfLife: 7, iconName: 'streamline-emojis:cauliflower' },
  corn: { value: 'corn', label: 'Corn', icon: <Icon icon="noto:ear-of-corn" className="h-5 w-5" />, shelfLife: 5, iconName: 'noto:ear-of-corn' },
  cucumbers: { value: 'cucumbers', label: 'Cucumbers', icon: <Icon icon="noto:cucumber" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:cucumber' },
  garlic: { value: 'garlic', label: 'Garlic', icon: <Icon icon="noto:garlic" className="h-5 w-5" />, shelfLife: 30, iconName: 'noto:garlic' },
  greenBeans: { value: 'greenBeans', label: 'Green Beans', icon: <Icon icon="streamline-emojis:green-beans" className="h-5 w-5" />, shelfLife: 7, iconName: 'streamline-emojis:green-beans' },
  kale: { value: 'kale', label: 'Kale', icon: <Icon icon="noto:leafy-green" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:leafy-green' },
  lettuce: { value: 'lettuce', label: 'Lettuce', icon: <Icon icon="noto:leafy-green" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:leafy-green' },
  mushrooms: { value: 'mushrooms', label: 'Mushrooms', icon: <Icon icon="noto:mushroom" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:mushroom' },
  olives: { value: 'olives', label: 'Olives', icon: <Icon icon="streamline-emojis:olive" className="h-5 w-5" />, shelfLife: 30, iconName: 'streamline-emojis:olive' },
  onions: { value: 'onions', label: 'Onions', icon: <Icon icon="streamline-emojis:onion" className="h-5 w-5" />, shelfLife: 30, iconName: 'streamline-emojis:onion' },
  peas: { value: 'peas', label: 'Peas', icon: <Icon icon="noto:pea-pod" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:pea-pod' },
  potatoes: { value: 'potatoes', label: 'Potatoes', icon: <Icon icon="noto:potato" className="h-5 w-5" />, shelfLife: 21, iconName: 'noto:potato' },
  spinach: { value: 'spinach', label: 'Spinach', icon: <Icon icon="noto:leafy-green" className="h-5 w-5" />, shelfLife: 5, iconName: 'noto:leafy-green' },
  tomatoes: { value: 'tomatoes', label: 'Tomatoes', icon: <Icon icon="noto:tomato" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:tomato' },
  
  // Meat and Poultry
  bacon: { value: 'bacon', label: 'Bacon', icon: <Icon icon="noto:bacon" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:bacon' },
  beef: { value: 'beef', label: 'Beef', icon: <Icon icon="noto:cut-of-meat" className="h-5 w-5" />, shelfLife: 3, iconName: 'noto:cut-of-meat' },
  chicken: { value: 'chicken', label: 'Chicken', icon: <Icon icon="noto:poultry-leg" className="h-5 w-5" />, shelfLife: 2, iconName: 'noto:poultry-leg' },
  ham: { value: 'ham', label: 'Ham', icon: <Icon icon="streamline-emojis:ham" className="h-5 w-5" />, shelfLife: 7, iconName: 'streamline-emojis:ham' },
  lamb: { value: 'lamb', label: 'Lamb', icon: <Icon icon="noto:cut-of-meat" className="h-5 w-5" />, shelfLife: 3, iconName: 'noto:cut-of-meat' },
  pork: { value: 'pork', label: 'Pork', icon: <Icon icon="noto:cut-of-meat" className="h-5 w-5" />, shelfLife: 3, iconName: 'noto:cut-of-meat' },
  prosciutto: { value: 'prosciutto', label: 'Prosciutto', icon: <Icon icon="streamline-emojis:ham" className="h-5 w-5" />, shelfLife: 7, iconName: 'streamline-emojis:ham' },
  sausages: { value: 'sausages', label: 'Sausages', icon: <Icon icon="fluent-emoji-high-contrast:hot-dog" className="h-5 w-5" />, shelfLife: 7, iconName: 'fluent-emoji-high-contrast:hot-dog' },
  steaks: { value: 'steaks', label: 'Steaks', icon: <Icon icon="noto:cut-of-meat" className="h-5 w-5" />, shelfLife: 3, iconName: 'noto:cut-of-meat' },
  turkey: { value: 'turkey', label: 'Turkey', icon: <Icon icon="noto:turkey" className="h-5 w-5" />, shelfLife: 3, iconName: 'noto:turkey' },
  
  // Seafood
  crab: { value: 'crab', label: 'Crab', icon: <Icon icon="noto:crab" className="h-5 w-5" />, shelfLife: 2, iconName: 'noto:crab' },
  fish: { value: 'fish', label: 'Fish', icon: <Icon icon="noto:fish" className="h-5 w-5" />, shelfLife: 2, iconName: 'noto:fish' },
  lobster: { value: 'lobster', label: 'Lobster', icon: <Icon icon="noto:lobster" className="h-5 w-5" />, shelfLife: 2, iconName: 'noto:lobster' },
  scallops: { value: 'scallops', label: 'Scallops', icon: <Icon icon="noto:oyster" className="h-5 w-5" />, shelfLife: 2, iconName: 'noto:oyster' },
  shrimp: { value: 'shrimp', label: 'Shrimp', icon: <Icon icon="noto:shrimp" className="h-5 w-5" />, shelfLife: 2, iconName: 'noto:shrimp' },
  tuna: { value: 'tuna', label: 'Tuna', icon: <Icon icon="noto:fish" className="h-5 w-5" />, shelfLife: 2, iconName: 'noto:fish' },
  
  // Baked Goods
  bagels: { value: 'bagels', label: 'Bagels', icon: <Icon icon="noto:bagel" className="h-5 w-5" />, shelfLife: 5, iconName: 'noto:bagel' },
  biscotti: { value: 'biscotti', label: 'Biscotti', icon: <Icon icon="noto:cookie" className="h-5 w-5" />, shelfLife: 14, iconName: 'noto:cookie' },
  bread: { value: 'bread', label: 'Bread', icon: <Icon icon="noto:bread" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:bread' },
  cake: { value: 'cake', label: 'Cake', icon: <Icon icon="noto:shortcake" className="h-5 w-5" />, shelfLife: 5, iconName: 'noto:shortcake' },
  cookies: { value: 'cookies', label: 'Cookies', icon: <Icon icon="noto:cookie" className="h-5 w-5" />, shelfLife: 14, iconName: 'noto:cookie' },
  crackers: { value: 'crackers', label: 'Crackers', icon: <Icon icon="noto:cracker" className="h-5 w-5" />, shelfLife: 14, iconName: 'noto:cracker' },
  muffins: { value: 'muffins', label: 'Muffins', icon: <Icon icon="noto:cupcake" className="h-5 w-5" />, shelfLife: 5, iconName: 'noto:cupcake' },
  pretzels: { value: 'pretzels', label: 'Pretzels', icon: <Icon icon="noto:pretzel" className="h-5 w-5" />, shelfLife: 14, iconName: 'noto:pretzel' },
  scones: { value: 'scones', label: 'Scones', icon: <Icon icon="noto:croissant" className="h-5 w-5" />, shelfLife: 5, iconName: 'noto:croissant' },
  tortillas: { value: 'tortillas', label: 'Tortillas', icon: <Icon icon="noto:flatbread" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:flatbread' },
  
  // Prepared Foods and Others
  appleJuice: { value: 'appleJuice', label: 'Apple Juice', icon: <Icon icon="noto:beverage-box" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:beverage-box' },
  beans: { value: 'beans', label: 'Beans', icon: <Icon icon="streamline-emojis:beans" className="h-5 w-5" />, shelfLife: 5, iconName: 'streamline-emojis:beans' },
  cashews: { value: 'cashews', label: 'Cashews', icon: <Icon icon="noto:peanuts" className="h-5 w-5" />, shelfLife: 30, iconName: 'noto:peanuts' },
  cereals: { value: 'cereals', label: 'Cereals', icon: <Icon icon="noto:sheaf-of-rice" className="h-5 w-5" />, shelfLife: 90, iconName: 'noto:sheaf-of-rice' },
  chips: { value: 'chips', label: 'Chips', icon: <Icon icon="streamline-emojis:potato-chips" className="h-5 w-5" />, shelfLife: 14, iconName: 'streamline-emojis:potato-chips' },
  coffee: { value: 'coffee', label: 'Coffee', icon: <Icon icon="noto:hot-beverage" className="h-5 w-5" />, shelfLife: 14, iconName: 'noto:hot-beverage' },
  eggs: { value: 'eggs', label: 'Eggs', icon: <Icon icon="noto:egg" className="h-5 w-5" />, shelfLife: 28, iconName: 'noto:egg' },
  granola: { value: 'granola', label: 'Granola', icon: <Icon icon="noto:bowl-with-spoon" className="h-5 w-5" />, shelfLife: 30, iconName: 'noto:bowl-with-spoon' },
  iceCream: { value: 'iceCream', label: 'Ice Cream', icon: <Icon icon="noto:soft-ice-cream" className="h-5 w-5" />, shelfLife: 90, iconName: 'noto:soft-ice-cream' },
  oliveOil: { value: 'oliveOil', label: 'Olive Oil', icon: <Icon icon="noto:oil-drum" className="h-5 w-5" />, shelfLife: 365, iconName: 'noto:oil-drum' },
  orangeJuice: { value: 'orangeJuice', label: 'Orange Juice', icon: <Icon icon="noto:beverage-box" className="h-5 w-5" />, shelfLife: 7, iconName: 'noto:beverage-box' },
  pasta: { value: 'pasta', label: 'Pasta', icon: <Icon icon="noto:spaghetti" className="h-5 w-5" />, shelfLife: 5, iconName: 'noto:spaghetti' },
  pecans: { value: 'pecans', label: 'Pecans', icon: <Icon icon="noto:peanuts" className="h-5 w-5" />, shelfLife: 30, iconName: 'noto:peanuts' },
  pizza: { value: 'pizza', label: 'Pizza', icon: <Icon icon="noto:pizza" className="h-5 w-5" />, shelfLife: 4, iconName: 'noto:pizza' },
  popcorn: { value: 'popcorn', label: 'Popcorn', icon: <Icon icon="noto:popcorn" className="h-5 w-5" />, shelfLife: 14, iconName: 'noto:popcorn' },
  redWine: { value: 'redWine', label: 'Red Wine', icon: <Icon icon="noto:wine-glass" className="h-5 w-5" />, shelfLife: 5, iconName: 'noto:wine-glass' },
  rice: { value: 'rice', label: 'Rice', icon: <Icon icon="noto:cooked-rice" className="h-5 w-5" />, shelfLife: 5, iconName: 'noto:cooked-rice' },
  soda: { value: 'soda', label: 'Soda', icon: <Icon icon="noto:cup-with-straw" className="h-5 w-5" />, shelfLife: 3, iconName: 'noto:cup-with-straw' },
  tomatoSauce: { value: 'tomatoSauce', label: 'Tomato Sauce', icon: <Icon icon="noto:pot-of-food" className="h-5 w-5" />, shelfLife: 5, iconName: 'noto:pot-of-food' },
  vinegars: { value: 'vinegars', label: 'Vinegars', icon: <Icon icon="noto:jar" className="h-5 w-5" />, shelfLife: 365, iconName: 'noto:jar' },
  walnuts: { value: 'walnuts', label: 'Walnuts', icon: <Icon icon="noto:peanuts" className="h-5 w-5" />, shelfLife: 30, iconName: 'noto:peanuts' },
  water: { value: 'water', label: 'Water', icon: <Icon icon="noto:potable-water" className="h-5 w-5" />, shelfLife: 365, iconName: 'noto:potable-water' },
  whiteWine: { value: 'whiteWine', label: 'White Wine', icon: <Icon icon="noto:wine-glass" className="h-5 w-5" />, shelfLife: 5, iconName: 'noto:wine-glass' },
  almonds: { value: 'almonds', label: 'Almonds', icon: <Icon icon="noto:peanuts" className="h-5 w-5" />, shelfLife: 30, iconName: 'noto:peanuts' },
  // Add the new Water Filter product
  waterFilter: { value: 'waterFilter', label: 'Water Filter', icon: <Icon icon="noto:filter" className="h-5 w-5" />, shelfLife: 30, iconName: 'noto:filter' },
};

// Default selected icons (initial state) - first 9 items alphabetically sorted
export const DEFAULT_SELECTED_ICONS = [
  'almondMilk', 'almonds', 'appleJuice', 'apples', 'apricots', 
  'asparagus', 'avocados', 'bacon', 'bagels'
];
