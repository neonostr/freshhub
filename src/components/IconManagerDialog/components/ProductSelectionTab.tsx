
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TabsContent } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import { useIconManager } from '@/context/IconManager';

interface ProductSelectionTabProps {
  onNavigateToCustomProducts: () => void;
}

const ProductSelectionTab: React.FC<ProductSelectionTabProps> = ({
  onNavigateToCustomProducts,
}) => {
  const { allIcons, isCustomProduct, toggleIcon, isIconSelected } = useIconManager();

  const sortedIcons = Object.values(allIcons)
    .filter(icon => !isCustomProduct(icon.value))
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <TabsContent value="selection" className="h-full flex flex-col m-0 data-[state=active]:flex data-[state=inactive]:hidden">
      <p className="text-sm text-muted-foreground mb-4">
        Select the products you want available when adding new products.
        You must select at least one product.
      </p>
      
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="grid grid-cols-3 gap-2">
            {sortedIcons.map(icon => (
              <Button 
                key={icon.value} 
                type="button" 
                variant={isIconSelected(icon.value) ? "default" : "outline"} 
                className="flex items-center justify-center h-20 py-2" 
                onClick={() => {
                  if (isIconSelected(icon.value)) {
                    const atLeastOneLeft = sortedIcons.some(item => 
                      item.value !== icon.value && isIconSelected(item.value)
                    );
                    if (atLeastOneLeft) {
                      toggleIcon(icon.value);
                    }
                  } else {
                    toggleIcon(icon.value);
                  }
                }}
              >
                <span className="text-sm text-center truncate max-w-full px-1">
                  {icon.label}
                </span>
              </Button>
            ))}
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={onNavigateToCustomProducts} 
              className="flex items-center justify-center h-20"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        </ScrollArea>
      </div>
    </TabsContent>
  );
};

export default ProductSelectionTab;
