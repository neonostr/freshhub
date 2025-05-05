
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useIconManager, ALL_ICONS } from '@/context/IconManagerContext';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const IconManagerDialog: React.FC = () => {
  const { toggleIcon, isIconSelected, allIcons, updateIconShelfLife } = useIconManager();
  const [editingValues, setEditingValues] = useState<Record<string, string>>({});
  
  // Get sorted icons list by label
  const sortedIcons = Object.values(ALL_ICONS).sort((a, b) => a.label.localeCompare(b.label));
  
  const handleShelfLifeFocus = (iconValue: string) => {
    // Save current value as string when focusing
    setEditingValues(prev => ({
      ...prev,
      [iconValue]: ''
    }));
  };
  
  const handleShelfLifeChange = (iconValue: string, value: string) => {
    setEditingValues(prev => ({
      ...prev,
      [iconValue]: value
    }));
    
    // Update if valid number
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue > 0) {
      updateIconShelfLife(iconValue, numValue);
    }
  };
  
  const handleShelfLifeBlur = (iconValue: string) => {
    // If empty or invalid, restore to current value from allIcons
    const currentValue = editingValues[iconValue];
    const numValue = parseInt(currentValue, 10);
    
    if (currentValue === '' || isNaN(numValue) || numValue <= 0) {
      // Clear the editing state for this field
      setEditingValues(prev => {
        const newValues = {...prev};
        delete newValues[iconValue];
        return newValues;
      });
    }
  };
  
  // Helper function to get display value for shelf life input
  const getDisplayValue = (iconValue: string) => {
    return editingValues[iconValue] !== undefined 
      ? editingValues[iconValue] 
      : allIcons[iconValue].shelfLife.toString();
  };
  
  // Get first letter of product
  const getInitial = (label: string) => {
    return label.charAt(0).toUpperCase();
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="absolute top-6 right-6 rounded-full">
          ⚙️
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Products</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="selection" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="selection">Product Selection</TabsTrigger>
            <TabsTrigger value="shelfLife">Shelf Life</TabsTrigger>
          </TabsList>
          
          <TabsContent value="selection" className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Select the products you want available when adding new products.
              You must select at least one product.
            </p>
            
            <ScrollArea className="h-[400px] pr-4">
              <div className="grid grid-cols-3 gap-2">
                {sortedIcons.map((icon) => (
                  <Button
                    key={icon.value}
                    type="button"
                    variant={isIconSelected(icon.value) ? "default" : "outline"}
                    className="flex flex-col items-center justify-center h-20 py-2"
                    onClick={() => {
                      // Prevent deselecting if it's the last selected icon
                      if (isIconSelected(icon.value)) {
                        const atLeastOneLeft = Object.keys(ALL_ICONS).some(
                          key => key !== icon.value && isIconSelected(key)
                        );
                        if (atLeastOneLeft) {
                          toggleIcon(icon.value);
                        }
                      } else {
                        toggleIcon(icon.value);
                      }
                    }}
                  >
                    <div className="flex items-center justify-center h-8 w-8 bg-gray-100 rounded-full mb-1">
                      <span className="font-medium">{getInitial(icon.label)}</span>
                    </div>
                    <span className="text-xs mt-1">{icon.label}</span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="shelfLife" className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Customize the shelf life (in days) for each selected product.
            </p>
            
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {sortedIcons
                  .filter(icon => isIconSelected(icon.value))
                  .map((icon) => (
                    <div key={icon.value} className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center h-8 w-8 bg-muted rounded-full">
                          <span className="font-medium">{getInitial(icon.label)}</span>
                        </div>
                        <Label>{icon.label}</Label>
                      </div>
                      
                      <div className="flex-1 flex items-center gap-2">
                        <Input
                          type="number"
                          min="1"
                          inputMode="numeric"
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
          </TabsContent>
        </Tabs>
        
        <DialogClose asChild>
          <Button type="button">Done</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default IconManagerDialog;
