
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from "lucide-react";
import { useItems } from '@/context/ItemsContext';
import { useIconManager } from '@/context/IconManager';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useHandedness } from '@/context/HandednessContext';
import { useSubscription } from '@/context/SubscriptionContext';
import PremiumUpgradeDialog from './PremiumUpgradeDialog';
import { useToast } from "@/hooks/use-toast";

const AddItemDialog: React.FC = () => {
  const { items, addItem } = useItems();
  const { availableIcons, allIcons } = useIconManager();
  const { handedness } = useHandedness();
  const { checkCanAddItems } = useSubscription();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [customDuration, setCustomDuration] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set initial selected icon when dialog opens
  useEffect(() => {
    if (open && availableIcons.length > 0 && !selectedIcon) {
      console.log("AddItemDialog: Setting initial icon", availableIcons[0].value);
      setSelectedIcon(availableIcons[0].value);
    }
  }, [open, availableIcons, selectedIcon]);

  const handleOpenChange = (newOpen: boolean) => {
    try {
      // Check if user can add more items before opening the dialog
      if (newOpen && !checkCanAddItems(items.length)) {
        console.log("AddItemDialog: Item limit reached, showing upgrade dialog");
        setShowUpgradeDialog(true);
        return;
      }
      
      setOpen(newOpen);
      
      // Reset form when dialog is closed
      if (!newOpen) {
        console.log("AddItemDialog: Dialog closed, resetting form");
        setSelectedIcon('');
        setCustomDuration('');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("AddItemDialog: Error handling dialog open change:", error);
      toast({
        title: "Error",
        description: "An error occurred while opening the dialog",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isSubmitting) {
        console.log("AddItemDialog: Preventing double submission");
        return;
      }
      
      setIsSubmitting(true);
      
      if (!selectedIcon) {
        console.error("AddItemDialog: No icon selected");
        toast({
          title: "Error",
          description: "Please select a product",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      // Get the product name from the selected icon
      const selectedProduct = allIcons[selectedIcon];
      if (!selectedProduct) {
        console.error("AddItemDialog: Selected product not found", selectedIcon);
        toast({
          title: "Error",
          description: "Selected product not found",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      const productName = selectedProduct?.label || '';
      console.log(`AddItemDialog: Adding item "${productName}" with icon "${selectedIcon}"`);
      
      // Parse custom duration if provided
      let parsedCustomDuration: number | undefined = undefined;
      if (customDuration) {
        parsedCustomDuration = parseInt(customDuration, 10);
        if (isNaN(parsedCustomDuration) || parsedCustomDuration <= 0) {
          console.error("AddItemDialog: Invalid custom duration", customDuration);
          toast({
            title: "Error",
            description: "Please enter a valid shelf life (positive number)",
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }
        console.log(`AddItemDialog: Using custom duration: ${parsedCustomDuration} days`);
      }
      
      // Add the item with the selected icon and optional custom duration
      addItem({
        name: productName,
        icon: selectedIcon,
        customDuration: parsedCustomDuration,
      });
      
      // Reset form state and close dialog
      console.log("AddItemDialog: Item added successfully, resetting form");
      setSelectedIcon(availableIcons[0]?.value || '');
      setCustomDuration('');
      setIsSubmitting(false);
      setOpen(false);
      
      // Show success toast
      toast({
        title: "Success",
        description: `Added ${productName}`,
      });
    } catch (error) {
      console.error("AddItemDialog: Error adding item:", error);
      toast({
        title: "Error",
        description: "Failed to add item",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  const handleIconSelect = (iconValue: string) => {
    console.log(`AddItemDialog: Selected icon changed to "${iconValue}"`);
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
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Select a product and customize its shelf life if needed.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Product selection at the top */}
            <div className="space-y-2">
              <Label>Choose a Product</Label>
              <ScrollArea className="h-[200px]">
                <div className="grid grid-cols-3 gap-2">
                  {availableIcons.map((icon) => (
                    <Button
                      key={icon.value}
                      type="button"
                      variant={selectedIcon === icon.value ? "default" : "outline"}
                      className="flex items-center justify-center h-20 py-2"
                      onClick={() => handleIconSelect(icon.value)}
                    >
                      <span className="text-sm text-center truncate max-w-full px-1">{icon.label}</span>
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
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting || !selectedIcon}
            >
              {isSubmitting ? "Adding..." : "Add Product"}
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
