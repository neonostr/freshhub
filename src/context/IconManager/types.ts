
import { IconOption } from '@/data/productData';
import { ReactNode } from 'react';

export interface IconManagerContextType {
  availableIcons: IconOption[];
  allIcons: Record<string, IconOption & { iconName?: string }>;
  toggleIcon: (iconValue: string) => void;
  isIconSelected: (iconValue: string) => boolean;
  updateIconShelfLife: (iconValue: string, days: number) => void;
  addCustomProduct: (product: IconOption, iconName: string) => void;
  updateProductName: (iconValue: string, newName: string) => void;
  deleteCustomProduct: (iconValue: string) => void;
  isCustomProduct: (iconValue: string) => boolean;
  customProducts: Record<string, IconOption & { iconName?: string }>;
}

export interface IconManagerProviderProps {
  children: ReactNode;
}
