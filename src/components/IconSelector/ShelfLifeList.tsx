
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IconOption } from '@/data/productData';

interface ShelfLifeListProps {
  icons: IconOption[];
  isCustomProduct: (value: string) => boolean;
  editingValues: Record<string, string>;
  handleShelfLifeFocus: (value: string) => void;
  handleShelfLifeChange: (value: string, newValue: string) => void;
  handleShelfLifeBlur: (value: string) => void;
  getDisplayValue: (value: string) => string;
}

const ShelfLifeList: React.FC<ShelfLifeListProps> = ({
  icons,
  isCustomProduct,
  editingValues,
  handleShelfLifeFocus,
  handleShelfLifeChange,
  handleShelfLifeBlur,
  getDisplayValue
}) => {
  return (
    <>
      <p className="text-sm text-muted-foreground mb-4">
        Customize the shelf life (in days) for each selected product.
      </p>
      
      <ScrollArea className="flex-1">
        <div className="space-y-4">
          {icons.map((icon) => (
            <div key={icon.value} className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label>
                  {icon.label}
                </Label>
              </div>
              
              <div className="flex-1 flex items-center gap-2">
                <Input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min="1"
                  value={getDisplayValue(icon.value)}
                  onChange={(e) => handleShelfLifeChange(icon.value, e.target.value)}
                  onFocus={() => handleShelfLifeFocus(icon.value)}
                  onBlur={() => handleShelfLifeBlur(icon.value)}
                  className="w-20"
                />
                <span className="text-sm">days</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default ShelfLifeList;
