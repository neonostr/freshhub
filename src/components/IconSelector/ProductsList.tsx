
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import IconGridButton from './IconGridButton';
import { IconOption } from '@/data/productData';

interface ProductsListProps {
  icons: IconOption[];
  isIconSelected: (value: string) => boolean;
  toggleIcon: (value: string) => void;
  renderIcon: (icon: React.ReactNode) => React.ReactNode;
}

const ProductsList: React.FC<ProductsListProps> = ({
  icons,
  isIconSelected,
  toggleIcon,
  renderIcon
}) => {
  return (
    <>
      <p className="text-sm text-muted-foreground mb-4">
        Select the products you want available when adding new products.
        You must select at least one product.
      </p>
      
      <ScrollArea className="flex-1">
        <div className="grid grid-cols-3 gap-2">
          {icons.map((icon) => (
            <IconGridButton
              key={icon.value}
              value={icon.value}
              label={icon.label}
              icon={icon.icon}
              isSelected={isIconSelected(icon.value)}
              onClick={() => {
                // Prevent deselecting if it's the last selected icon
                if (isIconSelected(icon.value)) {
                  const atLeastOneLeft = icons.some(
                    item => item.value !== icon.value && isIconSelected(item.value)
                  );
                  if (atLeastOneLeft) {
                    toggleIcon(icon.value);
                  }
                } else {
                  toggleIcon(icon.value);
                }
              }}
              renderIcon={renderIcon}
            />
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default ProductsList;
