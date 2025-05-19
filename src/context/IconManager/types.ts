
import { IconOption } from '@/data/productData';
import { IconOptionExtended, FoodIconOption } from '@/types/iconTypes';
import { ReactNode } from 'react';

export interface IconManagerContextType {
  availableIcons: IconOption[];
  allIcons: Record<string, IconOption | IconOptionExtended>;
  toggleIcon: (iconValue: string) => void;
  isIconSelected: (iconValue: string) => boolean;
  updateIconShelfLife: (iconValue: string, days: number) => void;
  addCustomProduct: (product: IconOptionExtended, iconName: string) => void;
  updateProductName: (iconValue: string, newName: string) => void;
  deleteCustomProduct: (iconValue: string) => void;
  isCustomProduct: (iconValue: string) => boolean;
  customProducts: Record<string, IconOptionExtended>;
  getAllAvailableIcons: () => FoodIconOption[];  // Add this function to the interface
}

export interface IconManagerProviderProps {
  children: ReactNode;
}
