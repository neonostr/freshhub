
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Settings, Plus, Check, X } from 'lucide-react';
import { useIconManager } from '@/context/IconManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import ProductsList from './IconSelector/ProductsList';
import ShelfLifeList from './IconSelector/ShelfLifeList';
import AddCustomProductForm from './IconSelector/AddCustomProductForm';
import CustomProductsList from './IconSelector/CustomProductsList';
import { FoodIconOption, EditableProductProps, IconOptionExtended } from '@/types/iconTypes';
import { IconOption, ALL_ICONS } from '@/data/productData';
import * as LucideIcons from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useHandedness } from '@/context/HandednessContext';
import { useHeaderVisibilityStore } from '@/pages/Index';
import { Switch } from '@/components/ui/switch';

const IconManagerDialog: React.FC = () => {
  const {
    toast
  } = useToast();
  const {
    toggleIcon,
    isIconSelected,
    allIcons,
    updateIconShelfLife,
    addCustomProduct,
    updateProductName,
    deleteCustomProduct,
    isCustomProduct,
    customProducts
  } = useIconManager();

  // Get handedness from context
  const {
    handedness,
    setHandedness
  } = useHandedness();

  // Get header visibility state - directly from the store
  const {
    hideHeader,
    setHideHeader
  } = useHeaderVisibilityStore();

  // States for UI management
  const [editingProduct, setEditingProduct] = useState<EditableProductProps | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState('');
  const [currentTab, setCurrentTab] = useState('selection'); // Track the active tab

  // Get sorted icons list by label
  const sortedIcons = Object.values(allIcons).filter(icon => !isCustomProduct(icon.value)).sort((a, b) => a.label.localeCompare(b.label));

  // Helper function to safely render icons
  const renderIcon = (icon: React.ReactNode): React.ReactNode => {
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon as React.ReactElement, {
        size: 20
      });
    }

    // If it's not a valid element, return a fallback
    return <div className="h-5 w-5 flex items-center justify-center text-xs">?</div>;
  };

  // Shelf life management functions
  const [editingValues, setEditingValues] = useState<Record<string, string>>({});
  const handleShelfLifeFocus = (iconValue: string) => {
    // Save current value as string when focusing
    setEditingValues(prev => ({
      ...prev,
      [iconValue]: allIcons[iconValue].shelfLife.toString()
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
        const newValues = {
          ...prev
        };
        delete newValues[iconValue];
        return newValues;
      });
    }
  };

  // Helper function to get display value for shelf life input
  const getDisplayValue = (iconValue: string) => {
    return editingValues[iconValue] !== undefined ? editingValues[iconValue] : allIcons[iconValue].shelfLife.toString();
  };

  // Start editing a custom product
  const startEditingProduct = (product: IconOption & {
    iconName?: string;
  }) => {
    // Get the icon name from the product
    let iconName = product.iconName || '';

    // If no iconName is stored, try to extract it from the icon element
    if (!iconName && React.isValidElement(product.icon)) {
      const iconType = product.icon.type as {
        displayName?: string;
      };
      if (iconType && iconType.displayName) {
        iconName = iconType.displayName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      }
    }

    // If we still don't have a valid icon name, use a default
    if (!iconName) {
      iconName = 'apple'; // Default icon
    }
    console.log(`Editing product with icon: ${iconName}`);
    setEditingProduct({
      productId: product.value,
      name: product.label,
      icon: iconName,
      shelfLife: product.shelfLife
    });
  };

  // Confirm delete custom product
  const confirmDelete = (iconValue: string) => {
    setProductToDelete(iconValue);
    setDeleteDialogOpen(true);
  };

  // Delete custom product
  const handleDeleteProduct = () => {
    if (productToDelete) {
      const productName = allIcons[productToDelete]?.label;
      deleteCustomProduct(productToDelete);
      toast({
        title: "Product deleted",
        description: `"${productName}" has been removed along with any tracked items using it.`
      });
      setDeleteDialogOpen(false);
      setProductToDelete('');
    }
  };

  // Handle saving edited product
  const handleSaveProduct = (product: IconOption, iconName: string) => {
    console.log(`Saving product with icon name: ${iconName}`);

    // Ensure we're passing the iconName correctly
    if (editingProduct) {
      // Update the product in the custom products store
      updateProductName(editingProduct.productId, product.label);
    }

    // Pass both the complete product (with iconName) and the iconName separately
    addCustomProduct({
      ...product,
      iconName: iconName
    } as IconOptionExtended, iconName);
    setEditingProduct(null);
  };

  // Handle adding a new custom product
  const handleAddCustomProduct = (newProduct: IconOption, iconName: string) => {
    console.log(`Adding new product with icon name: ${iconName}`);

    // Ensure that the iconName is correctly stored with the product
    addCustomProduct({
      ...newProduct,
      iconName: iconName
    } as IconOptionExtended, iconName);
    setIsAddingProduct(false);
  };

  // Extract icons from ALL_ICONS to use for custom products
  const foodIcons: FoodIconOption[] = Object.entries(ALL_ICONS).map(([key, iconData]) => {
    // Extract icon name from component
    let iconName = '';
    if (React.isValidElement(iconData.icon)) {
      const iconType = iconData.icon.type as {
        displayName?: string;
      };
      if (iconType && iconType.displayName) {
        iconName = iconType.displayName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      }
    }

    // Use default if extraction failed
    if (!iconName) {
      // Try to derive from the key if possible
      const match = key.match(/[a-zA-Z]+/);
      iconName = match ? match[0].toLowerCase() : 'apple';
    }
    return {
      name: iconData.label,
      icon: iconName
    };
  }).filter((icon, index, self) =>
  // Remove duplicates based on icon name
  index === self.findIndex(t => t.icon === icon.icon)).sort((a, b) => a.name.localeCompare(b.name));

  // Function to properly collect icon selection from the form
  const collectFormData = () => {
    const nameInput = document.getElementById('new-product-name') as HTMLInputElement;
    const shelfLifeInput = document.getElementById('new-product-shelf-life') as HTMLInputElement;
    if (nameInput && shelfLifeInput) {
      const name = nameInput.value;
      const shelfLife = parseInt(shelfLifeInput.value, 10);
      if (!name.trim()) {
        toast({
          title: "Name required",
          description: "Please provide a name for the product",
          variant: "destructive"
        });
        return null;
      }
      if (isNaN(shelfLife) || shelfLife <= 0) {
        toast({
          title: "Invalid shelf life",
          description: "Please provide a valid shelf life (days)",
          variant: "destructive"
        });
        return null;
      }

      // Get selected icon from CustomIconSelector component
      // This relies on the component properly tracking its state
      // and adding data-icon attribute to selected buttons
      const activeButton = document.querySelector('[data-state="active"][data-icon]');
      const iconName = activeButton?.getAttribute('data-icon') || 'apple';
      console.log(`Selected icon from DOM: ${iconName}`);
      return {
        name,
        shelfLife,
        iconName
      };
    }
    return null;
  };
  return <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-6 z-10 rounded-full h-14 w-14 p-0 shadow-lg" size="icon" variant="outline" style={{
          right: handedness === 'left' ? "1.5rem" : "auto",
          left: handedness === 'right' ? "1.5rem" : "auto"
        }}>
            <Settings className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Products</DialogTitle>
            <DialogDescription>
              Customize your products, shelf life settings and add custom items.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col h-[500px]">
            <Tabs defaultValue="selection" className="w-full h-full flex flex-col" value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="selection">Products</TabsTrigger>
                <TabsTrigger value="shelfLife">Shelf Life</TabsTrigger>
                <TabsTrigger value="custom">Custom</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-hidden mt-4">
                <TabsContent value="selection" className="h-full flex flex-col m-0 data-[state=active]:flex data-[state=inactive]:hidden">
                  <ProductsList icons={sortedIcons as IconOption[]} isIconSelected={isIconSelected} toggleIcon={toggleIcon} renderIcon={renderIcon} />
                </TabsContent>
                
                <TabsContent value="shelfLife" className="h-full flex flex-col m-0 data-[state=active]:flex data-[state=inactive]:hidden">
                  <ShelfLifeList icons={Object.values(allIcons).filter(icon => isIconSelected(icon.value)).sort((a, b) => a.label.localeCompare(b.label)) as IconOption[]} isCustomProduct={isCustomProduct} editingValues={editingValues} handleShelfLifeFocus={handleShelfLifeFocus} handleShelfLifeChange={handleShelfLifeChange} handleShelfLifeBlur={handleShelfLifeBlur} getDisplayValue={getDisplayValue} renderIcon={renderIcon} />
                </TabsContent>
                
                <TabsContent value="custom" className="h-full flex flex-col m-0 data-[state=active]:flex data-[state=inactive]:hidden overflow-hidden">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-muted-foreground">
                      Add your own custom products or edit existing ones.
                    </p>
                    
                    {!isAddingProduct && !editingProduct && <Button size="sm" variant="outline" onClick={() => setIsAddingProduct(true)}>
                        <span className="flex items-center gap-1">+&nbsp;New Product</span>
                      </Button>}
                  </div>
                  
                  <div className="flex-grow overflow-y-auto">
                    {isAddingProduct ? <AddCustomProductForm availableIcons={foodIcons} onAdd={handleAddCustomProduct} onCancel={() => setIsAddingProduct(false)} /> : editingProduct ? <AddCustomProductForm availableIcons={foodIcons} onAdd={handleSaveProduct} onCancel={() => setEditingProduct(null)} initialValues={{
                    name: editingProduct.name,
                    iconName: editingProduct.icon,
                    shelfLife: editingProduct.shelfLife
                  }} isEditing={true} /> : <CustomProductsList products={Object.values(customProducts).sort((a, b) => a.label.localeCompare(b.label)) as IconOption[]} editingProduct={null} startEditingProduct={startEditingProduct} saveProductChanges={() => {}} cancelEditingProduct={() => {}} confirmDelete={confirmDelete} renderIcon={renderIcon} onAddNewClick={() => setIsAddingProduct(true)} isAdding={isAddingProduct} updateEditingField={() => {}} availableIcons={foodIcons} editingIcon={''} setEditingIcon={() => {}} />}
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="h-full flex flex-col m-0 data-[state=active]:flex data-[state=inactive]:hidden">
                  <div className="space-y-6 overflow-y-auto p-1">
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">About Fresh Tracker</h3>
                      <div className="bg-muted/50 p-4 rounded-md">
                        <p className="text-sm mb-2">
                          Fresh Tracker helps you monitor how long your perishable items have been open.
                        </p>
                        <ul className="text-sm space-y-2 list-disc pl-5">
                          <li><strong>100% Private:</strong> Your data never leaves your device</li>
                          <li><strong>Works Offline:</strong> No internet connection required</li>
                          <li><strong>No Tracking:</strong> No analytics or data collection</li>
                          <li><strong>Free:</strong> No paid features or subscriptions</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-2 border-t">
                      <h3 className="text-lg font-medium">Preferences</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Handedness</label>
                          <div className="flex gap-2">
                            <Button variant={handedness === 'right' ? "default" : "outline"} onClick={() => setHandedness('right')} className="flex-1" size="sm">
                              Right-handed
                            </Button>
                            <Button variant={handedness === 'left' ? "default" : "outline"} onClick={() => setHandedness('left')} className="flex-1" size="sm">
                              Left-handed
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Controls the position of buttons for easier access
                          </p>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <label htmlFor="hide-header" className="text-sm font-medium block">Hide Header</label>
                              <p className="text-xs text-muted-foreground">Hide the title and description permanently to display more items</p>
                            </div>
                            <Switch id="hide-header" checked={hideHeader} onCheckedChange={setHideHeader} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
          
          {/* Action buttons for different states */}
          {currentTab === 'selection' && <DialogClose asChild>
              <Button type="button" className="mt-4 w-full">
                <Check className="mr-1 h-4 w-4" /> Done
              </Button>
            </DialogClose>}
          
          {currentTab === 'shelfLife' && <DialogClose asChild>
              <Button type="button" className="mt-4 w-full">
                <Check className="mr-1 h-4 w-4" /> Done
              </Button>
            </DialogClose>}
          
          {currentTab === 'custom' && isAddingProduct && <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddingProduct(false)} className="w-1/3">
                <X className="mr-1 h-4 w-4" /> Cancel
              </Button>
              <Button onClick={() => {
            const nameInput = document.getElementById('new-product-name') as HTMLInputElement;
            const shelfLifeInput = document.getElementById('new-product-shelf-life') as HTMLInputElement;
            if (nameInput && shelfLifeInput) {
              const name = nameInput.value;
              const shelfLife = parseInt(shelfLifeInput.value, 10);
              if (!name.trim()) {
                toast({
                  title: "Name required",
                  description: "Please provide a name for the product",
                  variant: "destructive"
                });
                return;
              }
              if (isNaN(shelfLife) || shelfLife <= 0) {
                toast({
                  title: "Invalid shelf life",
                  description: "Please provide a valid shelf life (days)",
                  variant: "destructive"
                });
                return;
              }
              const productId = 'custom_' + Math.random().toString(36).substring(2, 15);

              // Get selected icon from CustomIconSelector component
              // This relies on the component properly tracking its state
              // and adding data-icon attribute to selected buttons
              const activeButton = document.querySelector('[data-state="active"][data-icon]');
              const iconName = activeButton?.getAttribute('data-icon') || 'apple';
              console.log(`Selected icon from DOM: ${iconName}`);

              // Create React element for the icon
              const pascalCaseName = iconName.charAt(0).toUpperCase() + iconName.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase());
              const IconComponent = (LucideIcons as any)[pascalCaseName];
              let iconElement;
              if (IconComponent) {
                iconElement = React.createElement(IconComponent, {
                  className: "h-5 w-5"
                });
              } else {
                iconElement = <div className="h-5 w-5 flex items-center justify-center">?</div>;
              }

              // Create a new custom product
              const newProduct: IconOption = {
                value: productId,
                label: name.trim(),
                icon: iconElement,
                shelfLife: shelfLife
              };
              handleAddCustomProduct(newProduct, iconName);
            }
          }} className="w-2/3">
                <Plus className="mr-1 h-4 w-4" /> Add Product
              </Button>
            </div>}
          
          {currentTab === 'custom' && editingProduct && <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => setEditingProduct(null)} className="w-1/3">
                <X className="mr-1 h-4 w-4" /> Cancel
              </Button>
              <Button onClick={() => {
            const nameInput = document.getElementById('new-product-name') as HTMLInputElement;
            const shelfLifeInput = document.getElementById('new-product-shelf-life') as HTMLInputElement;
            if (nameInput && shelfLifeInput) {
              const name = nameInput.value;
              const shelfLife = parseInt(shelfLifeInput.value, 10);
              if (!name.trim()) {
                toast({
                  title: "Name required",
                  description: "Please provide a name for the product",
                  variant: "destructive"
                });
                return;
              }
              if (isNaN(shelfLife) || shelfLife <= 0) {
                toast({
                  title: "Invalid shelf life",
                  description: "Please provide a valid shelf life (days)",
                  variant: "destructive"
                });
                return;
              }

              // Get selected icon from the active button
              const activeButton = document.querySelector('[data-state="active"][data-icon]');
              const iconName = activeButton?.getAttribute('data-icon') || editingProduct.icon;
              console.log(`Editing with icon name: ${iconName}`);

              // Create React element for the icon
              const pascalCaseName = iconName.charAt(0).toUpperCase() + iconName.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase());
              const IconComponent = (LucideIcons as any)[pascalCaseName];
              let iconElement;
              if (IconComponent) {
                iconElement = React.createElement(IconComponent, {
                  className: "h-5 w-5"
                });
              } else {
                iconElement = <div className="h-5 w-5 flex items-center justify-center">?</div>;
              }

              // Create an updated product
              const updatedProduct: IconOption = {
                value: editingProduct.productId,
                label: name.trim(),
                icon: iconElement,
                shelfLife: shelfLife
              };
              handleSaveProduct(updatedProduct, iconName);
            }
          }} className="w-2/3">
                <Check className="mr-1 h-4 w-4" /> Save
              </Button>
            </div>}
          
          {currentTab === 'custom' && !isAddingProduct && !editingProduct && <DialogClose asChild>
              <Button type="button" className="mt-4 w-full">
                <Check className="mr-1 h-4 w-4" /> Done
              </Button>
            </DialogClose>}
          
          {currentTab === 'settings' && <DialogClose asChild>
              <Button type="button" className="mt-4 w-full">
                <Check className="mr-1 h-4 w-4" /> Done
              </Button>
            </DialogClose>}
        </DialogContent>
      </Dialog>
      
      {/* Confirmation dialog for deleting custom products */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Custom Product?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this product from your collection.
              Any items currently tracked with this product will also be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>;
};

export default IconManagerDialog;
