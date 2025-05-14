
import React, { useEffect, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import IconGridButton from './IconGridButton';
import { IconOption } from '@/data/productData';
import { NEW_PRODUCT_LIST } from '@/utils/productMigration';

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
  const [migrationInfo, setMigrationInfo] = useState<string | null>(null);
  
  // Check if migration has recently happened
  useEffect(() => {
    const checkMigration = () => {
      // Check if migration just happened based on localStorage
      const migrationTimestamp = localStorage.getItem('freshTrackerMigrationTimestamp');
      if (migrationTimestamp) {
        const timeElapsed = Date.now() - parseInt(migrationTimestamp);
        // Show migration message if it happened in the last hour
        if (timeElapsed < 3600000) {
          setMigrationInfo('Products have been updated to the new list');
          // Clear after showing
          setTimeout(() => {
            localStorage.removeItem('freshTrackerMigrationTimestamp');
            setMigrationInfo(null);
          }, 5000);
        }
      }
    };
    
    checkMigration();
  }, []);

  return (
    <>
      <p className="text-sm text-muted-foreground mb-4">
        Select the products you want available when adding new products.
        You must select at least one product.
        {migrationInfo && (
          <span className="block mt-2 text-green-600 font-medium">{migrationInfo}</span>
        )}
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
