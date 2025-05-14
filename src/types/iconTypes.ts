
import React from 'react';

export interface FoodIconOption {
  name: string;
  icon: string; // Icon reference, can be Lucide name or Iconify identifier (e.g., "noto:apple")
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
  icon: string; // Icon reference, can be Lucide name or Iconify identifier
  shelfLife: number;
}

// Make IconOptionExtended compatible with IconOption
export interface IconOptionExtended {
  value: string;
  label: string;
  icon: React.ReactElement; // Keep as ReactElement for consistency with IconOption
  shelfLife: number;
  iconName?: string; // Optional iconName property - can be Lucide name or Iconify identifier
}
