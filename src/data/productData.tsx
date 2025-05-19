
import React from 'react';

// Define text-based icon component to replace lucide icons
const TextIcon = ({ text, className = "h-5 w-5" }: { text: string; className?: string }) => (
  <div className={`flex items-center justify-center ${className} bg-primary/10 text-primary rounded-full font-medium text-xs`}>
    {text.charAt(0).toUpperCase()}
  </div>
);

export type IconOption = {
  value: string;
  label: string;
  icon: React.ReactElement;
  shelfLife: number; // Default shelf life in days
};

// Define all possible icons with new products and shelf life data
export const ALL_ICONS: Record<string, IconOption> = {
  // Dairy products
  almondMilk: { value: 'almondMilk', label: 'Almond Milk', icon: <TextIcon text="AM" />, shelfLife: 7 },
  cashewMilk: { value: 'cashewMilk', label: 'Cashew Milk', icon: <TextIcon text="CM" />, shelfLife: 7 },
  butter: { value: 'butter', label: 'Butter', icon: <TextIcon text="Bu" />, shelfLife: 14 },
  cheese: { value: 'cheese', label: 'Cheese', icon: <TextIcon text="Ch" />, shelfLife: 14 },
  coconutMilk: { value: 'coconutMilk', label: 'Coconut Milk', icon: <TextIcon text="CM" />, shelfLife: 7 },
  cream: { value: 'cream', label: 'Cream', icon: <TextIcon text="Cr" />, shelfLife: 7 },
  milk: { value: 'milk', label: 'Milk', icon: <TextIcon text="Mi" />, shelfLife: 7 },
  oatMilk: { value: 'oatMilk', label: 'Oat Milk', icon: <TextIcon text="OM" />, shelfLife: 7 },
  sourCream: { value: 'sourCream', label: 'Sour Cream', icon: <TextIcon text="SC" />, shelfLife: 14 },
  soyMilk: { value: 'soyMilk', label: 'Soy Milk', icon: <TextIcon text="SM" />, shelfLife: 7 },
  buttermilk: { value: 'buttermilk', label: 'Buttermilk', icon: <TextIcon text="BM" />, shelfLife: 7 },
  kefir: { value: 'kefir', label: 'Kefir', icon: <TextIcon text="Ke" />, shelfLife: 10 },
  yogurt: { value: 'yogurt', label: 'Yogurt', icon: <TextIcon text="Yo" />, shelfLife: 14 },
  
  // Fruits
  apples: { value: 'apples', label: 'Apples', icon: <TextIcon text="Ap" />, shelfLife: 14 },
  apricots: { value: 'apricots', label: 'Apricots', icon: <TextIcon text="Ap" />, shelfLife: 5 },
  blackberries: { value: 'blackberries', label: 'Blackberries', icon: <TextIcon text="Bb" />, shelfLife: 3 },
  blueberries: { value: 'blueberries', label: 'Blueberries', icon: <TextIcon text="Bl" />, shelfLife: 5 },
  cherries: { value: 'cherries', label: 'Cherries', icon: <TextIcon text="Ch" />, shelfLife: 5 },
  coconuts: { value: 'coconuts', label: 'Coconuts', icon: <TextIcon text="Co" />, shelfLife: 14 },
  cranberries: { value: 'cranberries', label: 'Cranberries', icon: <TextIcon text="Cr" />, shelfLife: 14 },
  grapes: { value: 'grapes', label: 'Grapes', icon: <TextIcon text="Gr" />, shelfLife: 7 },
  kiwi: { value: 'kiwi', label: 'Kiwi', icon: <TextIcon text="Ki" />, shelfLife: 7 },
  mangoes: { value: 'mangoes', label: 'Mangoes', icon: <TextIcon text="Ma" />, shelfLife: 5 },
  oranges: { value: 'oranges', label: 'Oranges', icon: <TextIcon text="Or" />, shelfLife: 14 },
  peaches: { value: 'peaches', label: 'Peaches', icon: <TextIcon text="Pe" />, shelfLife: 5 },
  pears: { value: 'pears', label: 'Pears', icon: <TextIcon text="Pe" />, shelfLife: 7 },
  pineapple: { value: 'pineapple', label: 'Pineapple', icon: <TextIcon text="Pi" />, shelfLife: 5 },
  plums: { value: 'plums', label: 'Plums', icon: <TextIcon text="Pl" />, shelfLife: 5 },
  raisins: { value: 'raisins', label: 'Raisins', icon: <TextIcon text="Ra" />, shelfLife: 180 },
  raspberries: { value: 'raspberries', label: 'Raspberries', icon: <TextIcon text="Ra" />, shelfLife: 3 },
  strawberries: { value: 'strawberries', label: 'Strawberries', icon: <TextIcon text="St" />, shelfLife: 5 },
  watermelon: { value: 'watermelon', label: 'Watermelon', icon: <TextIcon text="Wm" />, shelfLife: 7 },
  banana: { value: 'banana', label: 'Banana', icon: <TextIcon text="Ba" />, shelfLife: 5 },
  
  // Vegetables
  asparagus: { value: 'asparagus', label: 'Asparagus', icon: <TextIcon text="As" />, shelfLife: 5 },
  avocados: { value: 'avocados', label: 'Avocados', icon: <TextIcon text="Av" />, shelfLife: 5 },
  basil: { value: 'basil', label: 'Basil', icon: <TextIcon text="Ba" />, shelfLife: 7 },
  bellPepper: { value: 'bellPepper', label: 'Bell Pepper', icon: <TextIcon text="BP" />, shelfLife: 7 },
  broccoli: { value: 'broccoli', label: 'Broccoli', icon: <TextIcon text="Br" />, shelfLife: 7 },
  carrots: { value: 'carrots', label: 'Carrots', icon: <TextIcon text="Ca" />, shelfLife: 14 },
  cauliflower: { value: 'cauliflower', label: 'Cauliflower', icon: <TextIcon text="Cf" />, shelfLife: 7 },
  corn: { value: 'corn', label: 'Corn', icon: <TextIcon text="Co" />, shelfLife: 5 },
  cucumbers: { value: 'cucumbers', label: 'Cucumbers', icon: <TextIcon text="Cu" />, shelfLife: 7 },
  garlic: { value: 'garlic', label: 'Garlic', icon: <TextIcon text="Ga" />, shelfLife: 30 },
  greenBeans: { value: 'greenBeans', label: 'Green Beans', icon: <TextIcon text="GB" />, shelfLife: 7 },
  kale: { value: 'kale', label: 'Kale', icon: <TextIcon text="Ka" />, shelfLife: 7 },
  lettuce: { value: 'lettuce', label: 'Lettuce', icon: <TextIcon text="Le" />, shelfLife: 7 },
  mushrooms: { value: 'mushrooms', label: 'Mushrooms', icon: <TextIcon text="Mu" />, shelfLife: 7 },
  olives: { value: 'olives', label: 'Olives', icon: <TextIcon text="Ol" />, shelfLife: 30 },
  onions: { value: 'onions', label: 'Onions', icon: <TextIcon text="On" />, shelfLife: 30 },
  peas: { value: 'peas', label: 'Peas', icon: <TextIcon text="Pe" />, shelfLife: 7 },
  potatoes: { value: 'potatoes', label: 'Potatoes', icon: <TextIcon text="Po" />, shelfLife: 21 },
  spinach: { value: 'spinach', label: 'Spinach', icon: <TextIcon text="Sp" />, shelfLife: 5 },
  tomatoes: { value: 'tomatoes', label: 'Tomatoes', icon: <TextIcon text="To" />, shelfLife: 7 },
  
  // Meat and Poultry
  bacon: { value: 'bacon', label: 'Bacon', icon: <TextIcon text="Ba" />, shelfLife: 7 },
  beef: { value: 'beef', label: 'Beef', icon: <TextIcon text="Be" />, shelfLife: 3 },
  chicken: { value: 'chicken', label: 'Chicken', icon: <TextIcon text="Ch" />, shelfLife: 2 },
  ham: { value: 'ham', label: 'Ham', icon: <TextIcon text="Ha" />, shelfLife: 7 },
  lamb: { value: 'lamb', label: 'Lamb', icon: <TextIcon text="La" />, shelfLife: 3 },
  pork: { value: 'pork', label: 'Pork', icon: <TextIcon text="Po" />, shelfLife: 3 },
  prosciutto: { value: 'prosciutto', label: 'Prosciutto', icon: <TextIcon text="Pr" />, shelfLife: 7 },
  sausages: { value: 'sausages', label: 'Sausages', icon: <TextIcon text="Sa" />, shelfLife: 7 },
  steaks: { value: 'steaks', label: 'Steaks', icon: <TextIcon text="St" />, shelfLife: 3 },
  turkey: { value: 'turkey', label: 'Turkey', icon: <TextIcon text="Tu" />, shelfLife: 3 },
  
  // Seafood
  crab: { value: 'crab', label: 'Crab', icon: <TextIcon text="Cr" />, shelfLife: 2 },
  fish: { value: 'fish', label: 'Fish', icon: <TextIcon text="Fi" />, shelfLife: 2 },
  lobster: { value: 'lobster', label: 'Lobster', icon: <TextIcon text="Lo" />, shelfLife: 2 },
  scallops: { value: 'scallops', label: 'Scallops', icon: <TextIcon text="Sc" />, shelfLife: 2 },
  shrimp: { value: 'shrimp', label: 'Shrimp', icon: <TextIcon text="Sh" />, shelfLife: 2 },
  tuna: { value: 'tuna', label: 'Tuna', icon: <TextIcon text="Tu" />, shelfLife: 2 },
  
  // Baked Goods
  bagels: { value: 'bagels', label: 'Bagels', icon: <TextIcon text="Ba" />, shelfLife: 5 },
  biscotti: { value: 'biscotti', label: 'Biscotti', icon: <TextIcon text="Bi" />, shelfLife: 14 },
  bread: { value: 'bread', label: 'Bread', icon: <TextIcon text="Br" />, shelfLife: 7 },
  cake: { value: 'cake', label: 'Cake', icon: <TextIcon text="Ca" />, shelfLife: 5 },
  cookies: { value: 'cookies', label: 'Cookies', icon: <TextIcon text="Co" />, shelfLife: 14 },
  crackers: { value: 'crackers', label: 'Crackers', icon: <TextIcon text="Cr" />, shelfLife: 14 },
  muffins: { value: 'muffins', label: 'Muffins', icon: <TextIcon text="Mu" />, shelfLife: 5 },
  pretzels: { value: 'pretzels', label: 'Pretzels', icon: <TextIcon text="Pr" />, shelfLife: 14 },
  scones: { value: 'scones', label: 'Scones', icon: <TextIcon text="Sc" />, shelfLife: 5 },
  tortillas: { value: 'tortillas', label: 'Tortillas', icon: <TextIcon text="To" />, shelfLife: 7 },
  
  // Prepared Foods and Others
  appleJuice: { value: 'appleJuice', label: 'Apple Juice', icon: <TextIcon text="AJ" />, shelfLife: 7 },
  beans: { value: 'beans', label: 'Beans', icon: <TextIcon text="Be" />, shelfLife: 5 },
  cashews: { value: 'cashews', label: 'Cashews', icon: <TextIcon text="Ca" />, shelfLife: 30 },
  cereals: { value: 'cereals', label: 'Cereals', icon: <TextIcon text="Ce" />, shelfLife: 90 },
  chips: { value: 'chips', label: 'Chips', icon: <TextIcon text="Ch" />, shelfLife: 14 },
  coffee: { value: 'coffee', label: 'Coffee', icon: <TextIcon text="Co" />, shelfLife: 14 },
  eggs: { value: 'eggs', label: 'Eggs', icon: <TextIcon text="Eg" />, shelfLife: 28 },
  granola: { value: 'granola', label: 'Granola', icon: <TextIcon text="Gr" />, shelfLife: 30 },
  iceCream: { value: 'iceCream', label: 'Ice Cream', icon: <TextIcon text="IC" />, shelfLife: 90 },
  oliveOil: { value: 'oliveOil', label: 'Olive Oil', icon: <TextIcon text="OO" />, shelfLife: 365 },
  orangeJuice: { value: 'orangeJuice', label: 'Orange Juice', icon: <TextIcon text="OJ" />, shelfLife: 7 },
  pasta: { value: 'pasta', label: 'Pasta', icon: <TextIcon text="Pa" />, shelfLife: 5 },
  pecans: { value: 'pecans', label: 'Pecans', icon: <TextIcon text="Pe" />, shelfLife: 30 },
  pizza: { value: 'pizza', label: 'Pizza', icon: <TextIcon text="Pi" />, shelfLife: 4 },
  popcorn: { value: 'popcorn', label: 'Popcorn', icon: <TextIcon text="Po" />, shelfLife: 14 },
  redWine: { value: 'redWine', label: 'Red Wine', icon: <TextIcon text="RW" />, shelfLife: 5 },
  rice: { value: 'rice', label: 'Rice', icon: <TextIcon text="Ri" />, shelfLife: 5 },
  soda: { value: 'soda', label: 'Soda', icon: <TextIcon text="So" />, shelfLife: 3 },
  tomatoSauce: { value: 'tomatoSauce', label: 'Tomato Sauce', icon: <TextIcon text="TS" />, shelfLife: 5 },
  vinegars: { value: 'vinegars', label: 'Vinegars', icon: <TextIcon text="Vi" />, shelfLife: 365 },
  walnuts: { value: 'walnuts', label: 'Walnuts', icon: <TextIcon text="Wa" />, shelfLife: 30 },
  water: { value: 'water', label: 'Water', icon: <TextIcon text="Wa" />, shelfLife: 365 },
  whiteWine: { value: 'whiteWine', label: 'White Wine', icon: <TextIcon text="WW" />, shelfLife: 5 },
  almonds: { value: 'almonds', label: 'Almonds', icon: <TextIcon text="Al" />, shelfLife: 30 },
  waterFilter: { value: 'waterFilter', label: 'Water Filter', icon: <TextIcon text="WF" />, shelfLife: 30 },
};

// Default selected icons (initial state) - first 9 items alphabetically sorted
export const DEFAULT_SELECTED_ICONS = [
  'almondMilk', 'almonds', 'appleJuice', 'apples', 'apricots', 
  'asparagus', 'avocados', 'bacon', 'bagels'
];
