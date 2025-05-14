// Map legacy Lucide icon names to Iconify icon names
export const iconMapping: Record<string, string> = {
  // Fruits
  'apple': 'noto:red-apple',
  'cherry': 'noto:cherries',
  'grape': 'noto:grapes',
  'citrus': 'noto:tangerine',
  
  // Vegetables
  'carrot': 'noto:carrot',
  'salad': 'noto:leafy-green',
  
  // Dairy
  'milk': 'noto:glass-of-milk',
  
  // Meat
  'beef': 'noto:cut-of-meat',
  'drumstick': 'noto:poultry-leg',
  'ham': 'streamline-emojis:ham',
  
  // Seafood
  'fish': 'noto:fish',
  'shell': 'noto:oyster',
  
  // Baked Goods
  'cake': 'noto:shortcake',
  'cookie': 'noto:cookie',
  
  // Drinks
  'coffee': 'noto:hot-beverage',
  'wine': 'noto:wine-glass',
  'beaker': 'noto:beverage-box',
  
  // Other Foods
  'sandwich': 'noto:sandwich',
  'pizza': 'noto:pizza',
  'ice-cream': 'noto:soft-ice-cream',
  'egg': 'noto:egg',
  'popcorn': 'noto:popcorn',
  'bean': 'streamline-emojis:beans',
  'soup': 'noto:pot-of-food',
  
  // Miscellaneous
  'circle': 'noto:hollow-red-circle',
  'circle-dot': 'noto:white-circle',
  'circle-dashed': 'noto:dotted-circle',
  'aperture': 'noto:bullseye',
  'layers': 'noto:card-file-box',
  'snowflake': 'noto:snowflake',
  'filter': 'noto:filter',
  'utensils': 'noto:fork-and-knife',
};

// Get an Iconify equivalent for a Lucide icon
export const getIconifyEquivalent = (lucideIconName: string): string => {
  return iconMapping[lucideIconName.toLowerCase()] || 'noto:question-mark';
};

// Check if an icon name is an Iconify icon (contains a colon)
export const isIconifyIcon = (iconName: string): boolean => {
  return iconName.includes(':');
};
