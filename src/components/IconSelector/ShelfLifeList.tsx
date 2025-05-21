
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
            <div key={icon.value} className="flex items-center justify-between">
              <div className="font-medium text-base">
                {icon.label}
              </div>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="1"
                    value={getDisplayValue(icon.value)}
                    onChange={(e) => handleShelfLifeChange(icon.value, e.target.value)}
                    onFocus={() => handleShelfLifeFocus(icon.value)}
                    onBlur={() => handleShelfLifeBlur(icon.value)}
                    className="w-20 text-center pr-8"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                    <span className="text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6-6 6 6"/>
                        <path d="m6 15 6 6 6-6"/>
                      </svg>
                    </span>
                  </div>
                </div>
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
