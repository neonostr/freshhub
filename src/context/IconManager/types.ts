
import { IconOption } from '@/data/productData';
import { IconOptionExtended } from '@/types/iconTypes';
import { ReactNode } from 'react';

export interface IconManagerContextType {
  availableIcons: IconOption[];
  allIcons: Record<string, IconOption | IconOptionExtended>;
  toggleIcon: (iconValue: string) => void;
  isIconSelected: (iconValue: string) => boolean;
  updateIconShelfLife: (iconValue: string, days: number) => void;
  addCustomProduct: (product: IconOptionExtended) => void;
  updateProductName: (iconValue: string, newName: string) => void;
  deleteCustomProduct: (iconValue: string) => void;
  isCustomProduct: (iconValue: string) => boolean;
  customProducts: Record<string, IconOptionExtended>;
}

export interface IconManagerProviderProps {
  children: ReactNode;
}
