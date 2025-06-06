
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { useIconManager } from '@/context/IconManager';
import ShelfLifeList from '@/components/IconSelector/ShelfLifeList';
import { IconOption } from '@/data/productData';

interface ShelfLifeTabProps {
  editingValues: Record<string, string>;
  handleShelfLifeFocus: (iconValue: string) => void;
  handleShelfLifeChange: (iconValue: string, value: string) => void;
  handleShelfLifeBlur: (iconValue: string) => void;
  getDisplayValue: (iconValue: string) => string;
}

const ShelfLifeTab: React.FC<ShelfLifeTabProps> = ({
  editingValues,
  handleShelfLifeFocus,
  handleShelfLifeChange,
  handleShelfLifeBlur,
  getDisplayValue,
}) => {
  const { allIcons, isIconSelected, isCustomProduct } = useIconManager();

  const selectedIcons = Object.values(allIcons)
    .filter(icon => isIconSelected(icon.value))
    .sort((a, b) => a.label.localeCompare(b.label)) as IconOption[];

  return (
    <TabsContent value="shelfLife" className="h-full flex flex-col m-0 data-[state=active]:flex data-[state=inactive]:hidden">
      <ShelfLifeList 
        icons={selectedIcons}
        isCustomProduct={isCustomProduct} 
        editingValues={editingValues} 
        handleShelfLifeFocus={handleShelfLifeFocus} 
        handleShelfLifeChange={handleShelfLifeChange} 
        handleShelfLifeBlur={handleShelfLifeBlur} 
        getDisplayValue={getDisplayValue} 
      />
    </TabsContent>
  );
};

export default ShelfLifeTab;
