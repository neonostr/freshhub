
import React from 'react';

export interface FoodIconOption {
  name: string;
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
  shelfLife: number;
}

// Make IconOptionExtended compatible with IconOption
export interface IconOptionExtended {
  value: string;
  label: string;
  shelfLife: number;
}
