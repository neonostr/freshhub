
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
