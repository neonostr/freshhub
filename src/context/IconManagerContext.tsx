
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Milk, Coffee, Apple, Egg, Banana, Trash, Box, Cookie, Pizza, 
  Bottle, Beer, Sandwich, Beef, Fish, Cake, Carrot, Cherry, Drumstick,
  Croissant, Salad, IceCream, LucideIcon
} from "lucide-react";

export type IconOption = {
  value: string;
  label: string;
  icon: React.ReactElement;
  categories?: string[];
  defaultCategory?: string;
};

// Define all possible icons
export const ALL_ICONS: Record<string, IconOption> = {
  milk: { value: 'milk', label: 'Milk', icon: <Milk className="h-5 w-5" />, defaultCategory: 'dairy' },
  coffee: { value: 'coffee', label: 'Coffee', icon: <Coffee className="h-5 w-5" />, defaultCategory: 'coffee' },
  apple: { value: 'apple', label: 'Apple', icon: <Apple className="h-5 w-5" />, defaultCategory: 'produce' },
  egg: { value: 'egg', label: 'Egg', icon: <Egg className="h-5 w-5" />, defaultCategory: 'dairy' },
  banana: { value: 'banana', label: 'Banana', icon: <Banana className="h-5 w-5" />, defaultCategory: 'produce' },
  trash: { value: 'trash', label: 'Trash', icon: <Trash className="h-5 w-5" />, defaultCategory: 'other' },
  box: { value: 'box', label: 'Generic', icon: <Box className="h-5 w-5" />, defaultCategory: 'other' },
  cookie: { value: 'cookie', label: 'Cookie', icon: <Cookie className="h-5 w-5" />, defaultCategory: 'bakery' },
  pizza: { value: 'pizza', label: 'Pizza', icon: <Pizza className="h-5 w-5" />, defaultCategory: 'ready-meals' },
  beer: { value: 'beer', label: 'Beer', icon: <Beer className="h-5 w-5" />, defaultCategory: 'drinks' },
  sandwich: { value: 'sandwich', label: 'Sandwich', icon: <Sandwich className="h-5 w-5" />, defaultCategory: 'ready-meals' },
  beef: { value: 'beef', label: 'Beef', icon: <Beef className="h-5 w-5" />, defaultCategory: 'meat' },
  fish: { value: 'fish', label: 'Fish', icon: <Fish className="h-5 w-5" />, defaultCategory: 'seafood' },
  cake: { value: 'cake', label: 'Cake', icon: <Cake className="h-5 w-5" />, defaultCategory: 'bakery' },
  carrot: { value: 'carrot', label: 'Carrot', icon: <Carrot className="h-5 w-5" />, defaultCategory: 'produce' },
  cherry: { value: 'cherry', label: 'Cherry', icon: <Cherry className="h-5 w-5" />, defaultCategory: 'produce' },
  drumstick: { value: 'drumstick', label: 'Chicken', icon: <Drumstick className="h-5 w-5" />, defaultCategory: 'meat' },
  croissant: { value: 'croissant', label: 'Croissant', icon: <Croissant className="h-5 w-5" />, defaultCategory: 'bakery' },
  salad: { value: 'salad', label: 'Salad', icon: <Salad className="h-5 w-5" />, defaultCategory: 'produce' },
  iceCream: { value: 'iceCream', label: 'Ice Cream', icon: <IceCream className="h-5 w-5" />, defaultCategory: 'dairy' },
};

// Define all possible categories with shelf life
export const ALL_CATEGORIES = [
  { value: 'dairy', label: 'Dairy (7 days)' },
  { value: 'condiments', label: 'Condiments (30 days)' },
  { value: 'coffee', label: 'Coffee & Tea (14 days)' },
  { value: 'produce', label: 'Fruits & Vegetables (5 days)' },
  { value: 'bakery', label: 'Bakery (5 days)' },
  { value: 'ready-meals', label: 'Ready Meals (3 days)' },
  { value: 'snacks', label: 'Snacks (14 days)' },
  { value: 'meat', label: 'Meat (3 days)' },
  { value: 'seafood', label: 'Seafood (2 days)' },
  { value: 'drinks', label: 'Drinks (5 days)' },
  { value: 'other', label: 'Other (7 days)' },
];

// Default selected icons (initial state)
const DEFAULT_SELECTED_ICONS = ['milk', 'coffee', 'apple', 'egg', 'banana', 'trash', 'box', 'cookie', 'pizza'];

interface IconManagerContextType {
  availableIcons: IconOption[];
  allIcons: Record<string, IconOption>;
  toggleIcon: (iconValue: string) => void;
  isIconSelected: (iconValue: string) => boolean;
  categories: { value: string; label: string }[];
}

const IconManagerContext = createContext<IconManagerContextType | undefined>(undefined);

export const IconManagerProvider = ({ children }: { children: ReactNode }) => {
  const [selectedIconValues, setSelectedIconValues] = useState<string[]>(() => {
    const saved = localStorage.getItem('freshTrackerSelectedIcons');
    return saved ? JSON.parse(saved) : DEFAULT_SELECTED_ICONS;
  });
  
  // Update available icons based on selected values
  const availableIcons = selectedIconValues.map(value => ALL_ICONS[value]).filter(Boolean);
  
  useEffect(() => {
    localStorage.setItem('freshTrackerSelectedIcons', JSON.stringify(selectedIconValues));
  }, [selectedIconValues]);

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

  return (
    <IconManagerContext.Provider value={{ 
      availableIcons, 
      allIcons: ALL_ICONS,
      toggleIcon, 
      isIconSelected,
      categories: ALL_CATEGORIES
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
