
import React from 'react';

export interface FoodIconOption {
  name: string;
  icon: string;
}

export interface IconSelectorProps {
  icons: FoodIconOption[];
  selectedIcon: string;
  onSelect: (iconName: string) => void;
  className?: string;
}

export interface EditableProductProps {
  productId: string;
  name: string;
  icon: string;
  shelfLife: number;
}

// Update the IconOption interface (imported from productData.ts) to include iconName
export interface IconOptionExtended {
  value: string;
  label: string;
  icon: React.ReactNode; // Changed from ReactElement to ReactNode for more flexibility
  shelfLife: number;
  iconName?: string;
}
