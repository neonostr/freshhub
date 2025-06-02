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
import FilterNotificationDialog from './FilterNotificationDialog';

const AddItemDialog: React.FC = () => {
  const { items, addItem } = useItems();
  const { availableIcons, allIcons } = useIconManager();
  const { handedness } = useHandedness();
  const { checkCanAddItems } = useSubscription();
  const [open, setOpen] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [showFilterNotification, setShowFilterNotification] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [customDuration, setCustomDuration] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationData, setNotificationData] = useState<{
    itemName: string;
    itemShelfLife: number;
    currentFilter: number;
  }>({
    itemName: '',
    itemShelfLife: 0,
    currentFilter: 0
  });
  const [dontShowFilterNotification, setDontShowFilterNotification] = useState(localStorage.getItem('dontShowFilterNotification') === 'true');

  // Debug logging for component state
  useEffect(() => {
    console.log("AddItemDialog state:", {
      open,
      selectedIcon,
      customDuration,
      isSubmitting,
      availableIconsCount: availableIcons.length,
      itemsCount: items.length
    });
  }, [open, selectedIcon, customDuration, isSubmitting, availableIcons.length, items.length]);

  // Set initial selected icon when dialog opens
  useEffect(() => {
    if (open && availableIcons.length > 0 && !selectedIcon) {
      console.log("AddItemDialog: Setting initial icon", availableIcons[0].value);
      setSelectedIcon(availableIcons[0].value);
    }
  }, [open, availableIcons, selectedIcon]);
  const handleOpenChange = (newOpen: boolean) => {
    try {
      console.log("AddItemDialog: handleOpenChange called with:", newOpen);

      // Check if user can add more items before opening the dialog
      if (newOpen && !checkCanAddItems(items.length)) {
        console.log("AddItemDialog: Item limit reached, showing upgrade dialog");
        setShowUpgradeDialog(true);
        return;
      }
      console.log("AddItemDialog: Setting open to:", newOpen);
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
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("AddItemDialog: handleSubmit called");
      console.log("AddItemDialog: Current state at submit:", {
        isSubmitting,
        selectedIcon,
        customDuration,
        availableIconsLength: availableIcons.length
      });
      if (isSubmitting) {
        console.log("AddItemDialog: Preventing double submission");
        return;
      }
      console.log("AddItemDialog: Setting isSubmitting to true");
      setIsSubmitting(true);
      if (!selectedIcon) {
        console.error("AddItemDialog: No icon selected");
        setIsSubmitting(false);
        return;
      }

      // Get the product name from the selected icon
      const selectedProduct = allIcons[selectedIcon];
      if (!selectedProduct) {
        console.error("AddItemDialog: Selected product not found", selectedIcon);
        setIsSubmitting(false);
        return;
      }
      const productName = selectedProduct?.label || '';
      console.log(`AddItemDialog: Adding item "${productName}" with icon "${selectedIcon}"`);

      // Parse custom duration if provided
      let parsedCustomDuration: number | undefined = undefined;
      if (customDuration && customDuration.trim() !== '') {
        parsedCustomDuration = parseInt(customDuration, 10);
        if (isNaN(parsedCustomDuration) || parsedCustomDuration <= 0) {
          console.error("AddItemDialog: Invalid custom duration", customDuration);
          setIsSubmitting(false);
          return;
        }
        console.log(`AddItemDialog: Using custom duration: ${parsedCustomDuration} days`);
      } else {
        console.log("AddItemDialog: No custom duration provided, using default shelf life");
      }

      // Get the effective shelf life for filter check
      const effectiveShelfLife = parsedCustomDuration || selectedProduct.shelfLife;
      console.log("AddItemDialog: About to call addItem with:", {
        name: productName,
        icon: selectedIcon,
        customDuration: parsedCustomDuration
      });

      // Add the item with the selected icon and optional custom duration
      await addItem({
        name: productName,
        icon: selectedIcon,
        customDuration: parsedCustomDuration
      });
      console.log("AddItemDialog: addItem completed successfully");

      // Check if we need to show the filter notification
      const currentFilter = parseInt(localStorage.getItem('currentFilterDays') || '365');
      const shouldShowNotification = !dontShowFilterNotification && effectiveShelfLife > currentFilter;
      if (shouldShowNotification) {
        setNotificationData({
          itemName: productName,
          itemShelfLife: effectiveShelfLife,
          currentFilter: currentFilter
        });
        setShowFilterNotification(true);
      }

      // Add a longer delay to ensure all state updates are complete
      await new Promise(resolve => setTimeout(resolve, 300));

      // Reset form state and close dialog
      console.log("AddItemDialog: Item added successfully, resetting form");
      setSelectedIcon(availableIcons[0]?.value || '');
      setCustomDuration('');
      setIsSubmitting(false);
      setOpen(false);
      console.log("AddItemDialog: Form reset completed");
    } catch (error) {
      console.error("AddItemDialog: Error adding item:", error);
      setIsSubmitting(false);
    }
  };
  const handleIconSelect = (iconValue: string) => {
    console.log(`AddItemDialog: Selected icon changed to "${iconValue}"`);
    setSelectedIcon(iconValue);
  };
  const handleResetFilter = () => {
    // Dispatch an event to reset the filter in ItemsList
    window.dispatchEvent(new CustomEvent('reset-freshness-filter'));
  };
  const handleDontShowAgainChange = (value: boolean) => {
    setDontShowFilterNotification(value);
    localStorage.setItem('dontShowFilterNotification', value.toString());
  };
  const handleOpenManageProducts = () => {
    // Close the add item dialog
    setOpen(false);
    // Trigger the manage products dialog to open
    setTimeout(() => {
      const manageButton = document.querySelector('[data-manage-products-trigger]') as HTMLButtonElement;
      if (manageButton) {
        manageButton.click();
      }
    }, 100);
  };

  // Debug logging for render
  console.log("AddItemDialog: Rendering with state:", {
    open,
    selectedIcon,
    isSubmitting,
    availableIconsCount: availableIcons.length
  });

  // Add button positioning - rightmost position
  const getAddButtonStyle = () => {
    const { handedness } = useHandedness();
    return {
      position: 'fixed' as const,
      zIndex: 50,
      bottom: `calc(env(safe-area-inset-bottom) + 1.5rem)`,
      [handedness === 'right' ? 'right' : 'left']: '1.5rem', // Closest position on the same side as other buttons
      width: '3.5rem',
      height: '3.5rem',
      borderRadius: '50%',
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
    };
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button 
            style={getAddButtonStyle()}
            size="icon"
            onClick={() => console.log("AddItemDialog: Plus button clicked")}
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
                  {availableIcons.map(icon => <Button key={icon.value} type="button" variant={selectedIcon === icon.value ? "default" : "outline"} className="flex items-center justify-center h-20 py-2" onClick={() => handleIconSelect(icon.value)}>
                      <span className="text-sm text-center truncate max-w-full px-1">{icon.label}</span>
                    </Button>)}
                  
                  {/* Add More button with just + icon */}
                  <Button type="button" variant="outline" onClick={handleOpenManageProducts} className="flex items-center justify-center h-20">
                    <Plus className="h-6 w-6" />
                  </Button>
                </div>
              </ScrollArea>
            </div>
            
            {/* Custom shelf life */}
            <div className="space-y-2">
              <Label htmlFor="customDuration">
                Custom Shelf Life (days, optional)
              </Label>
              <Input id="customDuration" type="number" inputMode="numeric" min="1" placeholder={`Default: ${allIcons[selectedIcon]?.shelfLife || 7} days`} value={customDuration} onChange={e => {
              console.log("AddItemDialog: Custom duration changed to:", e.target.value);
              setCustomDuration(e.target.value);
            }} />
            </div>
            
            <Button type="submit" className="w-full" disabled={isSubmitting || !selectedIcon}>
              {isSubmitting ? "Adding..." : "Add Product"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      
      <PremiumUpgradeDialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog} />
      
      <FilterNotificationDialog 
        open={showFilterNotification} 
        onOpenChange={setShowFilterNotification} 
        onResetFilter={handleResetFilter} 
        itemName={notificationData.itemName} 
        itemShelfLife={notificationData.itemShelfLife} 
        currentFilter={notificationData.currentFilter} 
        dontShowAgain={dontShowFilterNotification} 
        setDontShowAgain={handleDontShowAgainChange} 
      />
    </>
  );
};

export default AddItemDialog;
