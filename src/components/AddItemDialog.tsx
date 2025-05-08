
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from "lucide-react";
import { useItems } from '@/context/ItemsContext';
import { useIconManager } from '@/context/IconManagerContext';
import { ScrollArea } from "@/components/ui/scroll-area";

const AddItemDialog: React.FC = () => {
  const { addItem } = useItems();
  const { availableIcons, allIcons } = useIconManager();
  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [customDuration, setCustomDuration] = useState<string>('');

  // Set initial selected icon when dialog opens
  useEffect(() => {
    if (open && availableIcons.length > 0 && !selectedIcon) {
      setSelectedIcon(availableIcons[0].value);
    }
  }, [open, availableIcons, selectedIcon]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedIcon) return;
    
    // Get the product name from the selected icon
    const selectedProduct = allIcons[selectedIcon];
    const productName = selectedProduct?.label || '';
    
    addItem({
      name: productName,
      icon: selectedIcon,
      customDuration: customDuration ? parseInt(customDuration, 10) : undefined,
    });
    
    setSelectedIcon(availableIcons[0]?.value || '');
    setCustomDuration('');
    setOpen(false);
  };

  const handleIconSelect = (iconValue: string) => {
    setSelectedIcon(iconValue);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 rounded-full w-14 h-14" size="icon">
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Icon selection at the top */}
          <div className="space-y-2">
            <Label>Choose a Product</Label>
            <ScrollArea className="h-[200px]">
              <div className="grid grid-cols-3 gap-2">
                {availableIcons.map((icon) => (
                  <Button
                    key={icon.value}
                    type="button"
                    variant={selectedIcon === icon.value ? "default" : "outline"}
                    className="flex flex-col items-center justify-center h-20 py-2"
                    onClick={() => handleIconSelect(icon.value)}
                  >
                    {icon.icon}
                    <span className="text-xs mt-1">{icon.label}</span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Custom shelf life */}
          <div className="space-y-2">
            <Label htmlFor="customDuration">
              Custom Shelf Life (days, optional)
            </Label>
            <Input
              id="customDuration"
              type="number"
              inputMode="numeric"
              min="1"
              placeholder={`Default: ${allIcons[selectedIcon]?.shelfLife || 7} days`}
              value={customDuration}
              onChange={(e) => setCustomDuration(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full">
            Add Product
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
