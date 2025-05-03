
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Milk, Coffee, Apple, Egg, Banana, Trash, Box, Cookie, Pizza, 
  Beer, Sandwich, Beef, Fish, Cake, Carrot, Cherry, Drumstick,
  Croissant, Salad, IceCream, LucideIcon
} from "lucide-react";

export type IconOption = {
  value: string;
  label: string;
  icon: React.ReactElement;
  shelfLife: number; // Default shelf life in days
};

// Define all possible icons
export const ALL_ICONS: Record<string, IconOption> = {
  milk: { value: 'milk', label: 'Milk', icon: <Milk className="h-5 w-5" />, shelfLife: 7 },
  coffee: { value: 'coffee', label: 'Coffee', icon: <Coffee className="h-5 w-5" />, shelfLife: 14 },
  apple: { value: 'apple', label: 'Apple', icon: <Apple className="h-5 w-5" />, shelfLife: 5 },
  egg: { value: 'egg', label: 'Egg', icon: <Egg className="h-5 w-5" />, shelfLife: 14 },
  banana: { value: 'banana', label: 'Banana', icon: <Banana className="h-5 w-5" />, shelfLife: 5 },
  trash: { value: 'trash', label: 'Trash', icon: <Trash className="h-5 w-5" />, shelfLife: 7 },
  box: { value: 'box', label: 'Generic', icon: <Box className="h-5 w-5" />, shelfLife: 7 },
  cookie: { value: 'cookie', label: 'Cookie', icon: <Cookie className="h-5 w-5" />, shelfLife: 5 },
  pizza: { value: 'pizza', label: 'Pizza', icon: <Pizza className="h-5 w-5" />, shelfLife: 3 },
  beer: { value: 'beer', label: 'Beer', icon: <Beer className="h-5 w-5" />, shelfLife: 5 },
  sandwich: { value: 'sandwich', label: 'Sandwich', icon: <Sandwich className="h-5 w-5" />, shelfLife: 3 },
  beef: { value: 'beef', label: 'Beef', icon: <Beef className="h-5 w-5" />, shelfLife: 3 },
  fish: { value: 'fish', label: 'Fish', icon: <Fish className="h-5 w-5" />, shelfLife: 2 },
  cake: { value: 'cake', label: 'Cake', icon: <Cake className="h-5 w-5" />, shelfLife: 5 },
  carrot: { value: 'carrot', label: 'Carrot', icon: <Carrot className="h-5 w-5" />, shelfLife: 5 },
  cherry: { value: 'cherry', label: 'Cherry', icon: <Cherry className="h-5 w-5" />, shelfLife: 5 },
  drumstick: { value: 'drumstick', label: 'Chicken', icon: <Drumstick className="h-5 w-5" />, shelfLife: 3 },
  croissant: { value: 'croissant', label: 'Croissant', icon: <Croissant className="h-5 w-5" />, shelfLife: 5 },
  salad: { value: 'salad', label: 'Salad', icon: <Salad className="h-5 w-5" />, shelfLife: 5 },
  iceCream: { value: 'iceCream', label: 'Ice Cream', icon: <IceCream className="h-5 w-5" />, shelfLife: 7 },
};

// Default selected icons (initial state)
const DEFAULT_SELECTED_ICONS = ['milk', 'coffee', 'apple', 'egg', 'banana', 'trash', 'box', 'cookie', 'pizza'];

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
  
  // Update available icons based on selected values
  const availableIcons = selectedIconValues.map(value => iconsWithCustomShelfLife[value]).filter(Boolean);
  
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
