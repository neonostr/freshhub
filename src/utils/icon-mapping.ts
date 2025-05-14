// Map legacy Lucide icon names to Iconify icon names with flat black & white style
export const iconMapping: Record<string, string> = {
  // Fruits
  'apple': 'tabler:apple',
  'cherry': 'tabler:cherry',
  'grape': 'tabler:grape',
  'citrus': 'tabler:lemon',
  
  // Vegetables
  'carrot': 'tabler:carrot',
  'salad': 'tabler:salad',
  
  // Dairy
  'milk': 'tabler:milk',
  
  // Meat
  'beef': 'tabler:meat',
  'drumstick': 'tabler:bone',
  'ham': 'tabler:meat',
  
  // Seafood
  'fish': 'tabler:fish',
  'shell': 'tabler:seeding',
  
  // Baked Goods
  'cake': 'tabler:cake',
  'cookie': 'tabler:cookie',
  
  // Drinks
  'coffee': 'tabler:coffee',
  'wine': 'tabler:bottle',
  'beaker': 'tabler:glass',
  
  // Other Foods
  'sandwich': 'tabler:bread',
  'pizza': 'tabler:pizza',
  'ice-cream': 'tabler:ice-cream',
  'egg': 'tabler:egg',
  'popcorn': 'tabler:soup',
  'bean': 'tabler:bean',
  'soup': 'tabler:soup',
  
  // Miscellaneous
  'circle': 'tabler:circle',
  'circle-dot': 'tabler:circle-dot',
  'circle-dashed': 'tabler:circle-dashed',
  'aperture': 'tabler:aperture',
  'layers': 'tabler:layers',
  'snowflake': 'tabler:snowflake',
  'filter': 'tabler:filter',
  'utensils': 'tabler:tools-kitchen',
};

// Get an Iconify equivalent for a Lucide icon
export const getIconifyEquivalent = (lucideIconName: string): string => {
  return iconMapping[lucideIconName.toLowerCase()] || 'tabler:question-mark';
};

// Check if an icon name is an Iconify icon (contains a colon)
export const isIconifyIcon = (iconName: string): boolean => {
  return iconName.includes(':');
};
