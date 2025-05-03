
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useIconManager, ALL_ICONS } from '@/context/IconManagerContext';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const IconManagerDialog: React.FC = () => {
  const { toggleIcon, isIconSelected, allIcons, updateIconShelfLife } = useIconManager();
  const [shelfLifeValues, setShelfLifeValues] = useState<Record<string, string>>({});
  
  // Get sorted icons list by label
  const sortedIcons = Object.values(ALL_ICONS).sort((a, b) => a.label.localeCompare(b.label));
  
  const handleShelfLifeChange = (iconValue: string, value: string) => {
    setShelfLifeValues(prev => ({
      ...prev,
      [iconValue]: value
    }));
  };
  
  const handleShelfLifeSubmit = (iconValue: string) => {
    const value = shelfLifeValues[iconValue];
    if (value && !isNaN(Number(value))) {
      updateIconShelfLife(iconValue, Number(value));
    }
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="absolute top-6 right-6 rounded-full">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Icons</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="selection" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="selection">Icon Selection</TabsTrigger>
            <TabsTrigger value="shelfLife">Shelf Life</TabsTrigger>
          </TabsList>
          
          <TabsContent value="selection" className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Select the icons you want available when adding new items.
              You must select at least one icon.
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
                    {icon.icon}
                    <span className="text-xs mt-1">{icon.label}</span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="shelfLife" className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Customize the shelf life (in days) for each selected icon.
            </p>
            
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {sortedIcons
                  .filter(icon => isIconSelected(icon.value))
                  .map((icon) => (
                    <div key={icon.value} className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-muted rounded-md">
                          {icon.icon}
                        </div>
                        <Label>{icon.label}</Label>
                      </div>
                      
                      <div className="flex-1 flex items-center gap-2">
                        <Input
                          type="number"
                          min="1"
                          value={shelfLifeValues[icon.value] ?? allIcons[icon.value].shelfLife}
                          onChange={(e) => handleShelfLifeChange(icon.value, e.target.value)}
                          className="w-20"
                        />
                        <span className="text-sm">days</span>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShelfLifeSubmit(icon.value)}
                        >
                          Update
                        </Button>
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
