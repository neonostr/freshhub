
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IconPlus } from "@tabler/icons-react";
import { useItems } from '@/context/ItemsContext';
import { useIconManager } from '@/context/IconManager';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useHandedness } from '@/context/HandednessContext';
import { useSubscription } from '@/context/SubscriptionContext';
import PremiumUpgradeDialog from './PremiumUpgradeDialog';

const AddItemDialog: React.FC = () => {
  const { items, addItem } = useItems();
  const { availableIcons, allIcons } = useIconManager();
  const { handedness } = useHandedness();
  const { checkCanAddItems } = useSubscription();
  const [open, setOpen] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [customDuration, setCustomDuration] = useState<string>('');

  // Set initial selected icon when dialog opens
  useEffect(() => {
    if (open && availableIcons.length > 0 && !selectedIcon) {
      setSelectedIcon(availableIcons[0].value);
    }
  }, [open, availableIcons, selectedIcon]);

  const handleOpenChange = (newOpen: boolean) => {
    // Check if user can add more items before opening the dialog
    if (newOpen && !checkCanAddItems(items.length)) {
      setShowUpgradeDialog(true);
      return;
    }
    
    setOpen(newOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedIcon) return;
    
    // Get the product name from the selected icon
    const selectedProduct = allIcons[selectedIcon];
    const productName = selectedProduct?.label || '';
    
    // Parse custom duration if provided
    const parsedCustomDuration = customDuration ? parseInt(customDuration, 10) : undefined;
    
    // Add the item with the selected icon and optional custom duration
    addItem({
      name: productName,
      icon: selectedIcon,
      customDuration: parsedCustomDuration,
    });
    
    // Reset form state
    setSelectedIcon(availableIcons[0]?.value || '');
    setCustomDuration('');
    setOpen(false);
  };

  const handleIconSelect = (iconValue: string) => {
    setSelectedIcon(iconValue);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button 
            className="fixed bottom-6 rounded-full w-14 h-14 shadow-lg z-10" 
            size="icon"
            style={{
              right: handedness === 'right' ? "1.5rem" : "auto",
              left: handedness === 'left' ? "1.5rem" : "auto"
            }}
          >
            <IconPlus className="h-6 w-6" stroke={1.5} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Product selection at the top */}
            <div className="space-y-2">
              <Label>Choose a Product</Label>
              <ScrollArea className="h-[200px]">
                <div className="grid grid-cols-2 gap-2">
                  {availableIcons.map((icon) => (
                    <Button
                      key={icon.value}
                      type="button"
                      variant={selectedIcon === icon.value ? "default" : "outline"}
                      className="h-12 py-2"
                      onClick={() => handleIconSelect(icon.value)}
                    >
                      <span className="text-xs overflow-hidden text-ellipsis max-w-full px-1">{icon.label}</span>
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
      
      <PremiumUpgradeDialog 
        open={showUpgradeDialog} 
        onOpenChange={setShowUpgradeDialog} 
      />
    </>
  );
};

export default AddItemDialog;
