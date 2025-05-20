
export type IconOption = {
  value: string;
  label: string;
  shelfLife: number; // Default shelf life in days
};

// Define all possible icons with new products and shelf life data
export const ALL_ICONS: Record<string, IconOption> = {
  // Dairy products
  almondMilk: { value: 'almondMilk', label: 'Almond Milk', shelfLife: 7 },
  cashewMilk: { value: 'cashewMilk', label: 'Cashew Milk', shelfLife: 7 },
  butter: { value: 'butter', label: 'Butter', shelfLife: 14 },
  cheese: { value: 'cheese', label: 'Cheese', shelfLife: 14 },
  coconutMilk: { value: 'coconutMilk', label: 'Coconut Milk', shelfLife: 7 },
  cream: { value: 'cream', label: 'Cream', shelfLife: 7 },
  milk: { value: 'milk', label: 'Milk', shelfLife: 7 },
  oatMilk: { value: 'oatMilk', label: 'Oat Milk', shelfLife: 7 },
  sourCream: { value: 'sourCream', label: 'Sour Cream', shelfLife: 14 },
  soyMilk: { value: 'soyMilk', label: 'Soy Milk', shelfLife: 7 },
  buttermilk: { value: 'buttermilk', label: 'Buttermilk', shelfLife: 7 },
  kefir: { value: 'kefir', label: 'Kefir', shelfLife: 10 },
  yogurt: { value: 'yogurt', label: 'Yogurt', shelfLife: 14 },
  
  // Fruits
  apples: { value: 'apples', label: 'Apples', shelfLife: 14 },
  apricots: { value: 'apricots', label: 'Apricots', shelfLife: 5 },
  blackberries: { value: 'blackberries', label: 'Blackberries', shelfLife: 3 },
  blueberries: { value: 'blueberries', label: 'Blueberries', shelfLife: 5 },
  cherries: { value: 'cherries', label: 'Cherries', shelfLife: 5 },
  coconuts: { value: 'coconuts', label: 'Coconuts', shelfLife: 14 },
  cranberries: { value: 'cranberries', label: 'Cranberries', shelfLife: 14 },
  grapes: { value: 'grapes', label: 'Grapes', shelfLife: 7 },
  kiwi: { value: 'kiwi', label: 'Kiwi', shelfLife: 7 },
  mangoes: { value: 'mangoes', label: 'Mangoes', shelfLife: 5 },
  oranges: { value: 'oranges', label: 'Oranges', shelfLife: 14 },
  peaches: { value: 'peaches', label: 'Peaches', shelfLife: 5 },
  pears: { value: 'pears', label: 'Pears', shelfLife: 7 },
  pineapple: { value: 'pineapple', label: 'Pineapple', shelfLife: 5 },
  plums: { value: 'plums', label: 'Plums', shelfLife: 5 },
  raisins: { value: 'raisins', label: 'Raisins', shelfLife: 180 },
  raspberries: { value: 'raspberries', label: 'Raspberries', shelfLife: 3 },
  strawberries: { value: 'strawberries', label: 'Strawberries', shelfLife: 5 },
  watermelon: { value: 'watermelon', label: 'Watermelon', shelfLife: 7 },
  
  // Vegetables
  asparagus: { value: 'asparagus', label: 'Asparagus', shelfLife: 5 },
  avocados: { value: 'avocados', label: 'Avocados', shelfLife: 5 },
  basil: { value: 'basil', label: 'Basil', shelfLife: 7 },
  bellPepper: { value: 'bellPepper', label: 'Bell Pepper', shelfLife: 7 },
  broccoli: { value: 'broccoli', label: 'Broccoli', shelfLife: 7 },
  carrots: { value: 'carrots', label: 'Carrots', shelfLife: 14 },
  cauliflower: { value: 'cauliflower', label: 'Cauliflower', shelfLife: 7 },
  corn: { value: 'corn', label: 'Corn', shelfLife: 5 },
  cucumbers: { value: 'cucumbers', label: 'Cucumbers', shelfLife: 7 },
  garlic: { value: 'garlic', label: 'Garlic', shelfLife: 30 },
  greenBeans: { value: 'greenBeans', label: 'Green Beans', shelfLife: 7 },
  kale: { value: 'kale', label: 'Kale', shelfLife: 7 },
  lettuce: { value: 'lettuce', label: 'Lettuce', shelfLife: 7 },
  mushrooms: { value: 'mushrooms', label: 'Mushrooms', shelfLife: 7 },
  olives: { value: 'olives', label: 'Olives', shelfLife: 30 },
  onions: { value: 'onions', label: 'Onions', shelfLife: 30 },
  peas: { value: 'peas', label: 'Peas', shelfLife: 7 },
  potatoes: { value: 'potatoes', label: 'Potatoes', shelfLife: 21 },
  spinach: { value: 'spinach', label: 'Spinach', shelfLife: 5 },
  tomatoes: { value: 'tomatoes', label: 'Tomatoes', shelfLife: 7 },
  
  // Meat and Poultry
  bacon: { value: 'bacon', label: 'Bacon', shelfLife: 7 },
  beef: { value: 'beef', label: 'Beef', shelfLife: 3 },
  chicken: { value: 'chicken', label: 'Chicken', shelfLife: 2 },
  ham: { value: 'ham', label: 'Ham', shelfLife: 7 },
  lamb: { value: 'lamb', label: 'Lamb', shelfLife: 3 },
  pork: { value: 'pork', label: 'Pork', shelfLife: 3 },
  prosciutto: { value: 'prosciutto', label: 'Prosciutto', shelfLife: 7 },
  sausages: { value: 'sausages', label: 'Sausages', shelfLife: 7 },
  steaks: { value: 'steaks', label: 'Steaks', shelfLife: 3 },
  turkey: { value: 'turkey', label: 'Turkey', shelfLife: 3 },
  
  // Seafood
  crab: { value: 'crab', label: 'Crab', shelfLife: 2 },
  fish: { value: 'fish', label: 'Fish', shelfLife: 2 },
  lobster: { value: 'lobster', label: 'Lobster', shelfLife: 2 },
  scallops: { value: 'scallops', label: 'Scallops', shelfLife: 2 },
  shrimp: { value: 'shrimp', label: 'Shrimp', shelfLife: 2 },
  tuna: { value: 'tuna', label: 'Tuna', shelfLife: 2 },
  
  // Baked Goods
  bagels: { value: 'bagels', label: 'Bagels', shelfLife: 5 },
  biscotti: { value: 'biscotti', label: 'Biscotti', shelfLife: 14 },
  bread: { value: 'bread', label: 'Bread', shelfLife: 7 },
  cake: { value: 'cake', label: 'Cake', shelfLife: 5 },
  cookies: { value: 'cookies', label: 'Cookies', shelfLife: 14 },
  crackers: { value: 'crackers', label: 'Crackers', shelfLife: 14 },
  muffins: { value: 'muffins', label: 'Muffins', shelfLife: 5 },
  pretzels: { value: 'pretzels', label: 'Pretzels', shelfLife: 14 },
  scones: { value: 'scones', label: 'Scones', shelfLife: 5 },
  tortillas: { value: 'tortillas', label: 'Tortillas', shelfLife: 7 },
  
  // Prepared Foods and Others
  appleJuice: { value: 'appleJuice', label: 'Apple Juice', shelfLife: 7 },
  beans: { value: 'beans', label: 'Beans', shelfLife: 5 },
  cashews: { value: 'cashews', label: 'Cashews', shelfLife: 30 },
  cereals: { value: 'cereals', label: 'Cereals', shelfLife: 90 },
  chips: { value: 'chips', label: 'Chips', shelfLife: 14 },
  coffee: { value: 'coffee', label: 'Coffee', shelfLife: 14 },
  eggs: { value: 'eggs', label: 'Eggs', shelfLife: 28 },
  granola: { value: 'granola', label: 'Granola', shelfLife: 30 },
  iceCream: { value: 'iceCream', label: 'Ice Cream', shelfLife: 90 },
  oliveOil: { value: 'oliveOil', label: 'Olive Oil', shelfLife: 365 },
  orangeJuice: { value: 'orangeJuice', label: 'Orange Juice', shelfLife: 7 },
  pasta: { value: 'pasta', label: 'Pasta', shelfLife: 5 },
  pecans: { value: 'pecans', label: 'Pecans', shelfLife: 30 },
  pizza: { value: 'pizza', label: 'Pizza', shelfLife: 4 },
  popcorn: { value: 'popcorn', label: 'Popcorn', shelfLife: 14 },
  redWine: { value: 'redWine', label: 'Red Wine', shelfLife: 5 },
  rice: { value: 'rice', label: 'Rice', shelfLife: 5 },
  soda: { value: 'soda', label: 'Soda', shelfLife: 3 },
  tomatoSauce: { value: 'tomatoSauce', label: 'Tomato Sauce', shelfLife: 5 },
  vinegars: { value: 'vinegars', label: 'Vinegars', shelfLife: 365 },
  walnuts: { value: 'walnuts', label: 'Walnuts', shelfLife: 30 },
  water: { value: 'water', label: 'Water', shelfLife: 365 },
  whiteWine: { value: 'whiteWine', label: 'White Wine', shelfLife: 5 },
  almonds: { value: 'almonds', label: 'Almonds', shelfLife: 30 },
  waterFilter: { value: 'waterFilter', label: 'Water Filter', shelfLife: 30 },
};

// Default selected icons (initial state) - first 9 items alphabetically sorted
export const DEFAULT_SELECTED_ICONS = [
  'almondMilk', 'almonds', 'appleJuice', 'apples', 'apricots', 
  'asparagus', 'avocados', 'bacon', 'bagels'
];
