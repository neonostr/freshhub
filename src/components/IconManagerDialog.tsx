import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Settings, Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { useIconManager } from '@/context/IconManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import ProductsList from './IconSelector/ProductsList';
import ShelfLifeList from './IconSelector/ShelfLifeList';
import AddCustomProductForm from './IconSelector/AddCustomProductForm';
import CustomProductsList from './IconSelector/CustomProductsList';
import { EditableProductProps, IconOptionExtended } from '@/types/iconTypes';
import { IconOption, ALL_ICONS } from '@/data/productData';
import { useToast } from '@/hooks/use-toast';
import { useHandedness } from '@/context/HandednessContext';
import { useHeaderVisibilityStore } from '@/pages/Index';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useSubscription } from '@/context/SubscriptionContext';
import PremiumUpgradeDialog from './PremiumUpgradeDialog';

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

  const { status } = useSubscription();
  const isPremium = status === 'premium';

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
  const [premiumDialogOpen, setPremiumDialogOpen] = useState(false);

  // Get sorted icons list by label
  const sortedIcons = Object.values(allIcons).filter(icon => !isCustomProduct(icon.value)).sort((a, b) => a.label.localeCompare(b.label));

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
  const startEditingProduct = (product: IconOption) => {
    // Check if user is premium before allowing edit
    if (!isPremium) {
      setPremiumDialogOpen(true);
      return;
    }

    setEditingProduct({
      productId: product.value,
      name: product.label,
      shelfLife: product.shelfLife
    });
  };

  // Confirm delete custom product
  const confirmDelete = (iconValue: string) => {
    // Check if user is premium before allowing delete
    if (!isPremium) {
      setPremiumDialogOpen(true);
      return;
    }
    
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

  // Handle updating edited product fields
  const updateEditingField = (field: string, value: string | number) => {
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        [field]: value
      });
    }
  };

  // Handle saving edited product
  const handleSaveProductChanges = () => {
    if (editingProduct) {
      // First update the name if it changed
      updateProductName(editingProduct.productId, editingProduct.name);
      
      // Then add/update the product in the custom products store
      addCustomProduct({
        value: editingProduct.productId,
        label: editingProduct.name,
        shelfLife: editingProduct.shelfLife
      });
      
      // Reset editing state
      setEditingProduct(null);
    }
  };

  // Handle adding a new custom product
  const handleAddCustomProduct = (newProduct: IconOption) => {
    // Add the product to the custom products
    addCustomProduct({
      ...newProduct
    });
    setIsAddingProduct(false);
  };

  // Check subscription and show upgrade dialog if needed for adding products
  const handleAddCustomProductClick = () => {
    if (!isPremium) {
      setPremiumDialogOpen(true);
      return;
    }
    setIsAddingProduct(true);
  };

  // Navigate to custom products tab
  const handleNavigateToCustomProducts = () => {
    setCurrentTab('custom');
    if (!isPremium) {
      setPremiumDialogOpen(true);
      return;
    }
    setIsAddingProduct(true);
  };

  // Extract basic product types from ALL_ICONS for custom products
  const foodProductTypes = Object.values(ALL_ICONS)
    .map(product => ({
      name: product.label,
      value: product.value
    }))
    .slice(0, 20);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            className="fixed bottom-6 z-10 rounded-full h-14 w-14 p-0 shadow-lg" 
            size="icon" 
            variant="outline"
            style={{
              right: handedness === 'left' ? "1.5rem" : "auto",
              left: handedness === 'right' ? "1.5rem" : "auto"
            }}
            data-manage-products-trigger
          >
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
                {/* Product selection tab */}
                <TabsContent value="selection" className="h-full flex flex-col m-0 data-[state=active]:flex data-[state=inactive]:hidden">
                  <p className="text-sm text-muted-foreground mb-4">
                    Select the products you want available when adding new products.
                    You must select at least one product.
                  </p>
                  
                  <div className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="grid grid-cols-3 gap-2">
                        {sortedIcons.map((icon) => (
                          <Button
                            key={icon.value}
                            type="button"
                            variant={isIconSelected(icon.value) ? "default" : "outline"}
                            className="flex items-center justify-center h-20 py-2"
                            onClick={() => {
                              // Prevent deselecting if it's the last selected icon
                              if (isIconSelected(icon.value)) {
                                const atLeastOneLeft = sortedIcons.some(
                                  item => item.value !== icon.value && isIconSelected(item.value)
                                );
                                if (atLeastOneLeft) {
                                  toggleIcon(icon.value);
                                }
                              } else {
                                toggleIcon(icon.value);
                              }
                            }}
                          >
                            <span className="text-sm text-center truncate max-w-full px-1">{icon.label}</span>
                          </Button>
                        ))}
                        
                        {/* Add Custom Products button at the end */}
                        <Button
                          type="button"
                          variant="outline"
                          className="flex flex-col items-center justify-center h-20 py-2 border-dashed"
                          onClick={handleNavigateToCustomProducts}
                        >
                          <Plus className="h-5 w-5 mb-1" />
                          <span className="text-xs text-center">Add Custom Products</span>
                        </Button>
                      </div>
                    </ScrollArea>
                  </div>
                </TabsContent>
                
                {/* Shelf life tab */}
                <TabsContent value="shelfLife" className="h-full flex flex-col m-0 data-[state=active]:flex data-[state=inactive]:hidden">
                  <ShelfLifeList 
                    icons={Object.values(allIcons).filter(icon => isIconSelected(icon.value)).sort((a, b) => a.label.localeCompare(b.label)) as IconOption[]} 
                    isCustomProduct={isCustomProduct} 
                    editingValues={editingValues} 
                    handleShelfLifeFocus={handleShelfLifeFocus} 
                    handleShelfLifeChange={handleShelfLifeChange} 
                    handleShelfLifeBlur={handleShelfLifeBlur} 
                    getDisplayValue={getDisplayValue} 
                  />
                </TabsContent>
                
                {/* Custom products tab */}
                <TabsContent value="custom" className="h-full flex flex-col m-0 data-[state=active]:flex data-[state=inactive]:hidden overflow-hidden">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-muted-foreground">
                      {isPremium ? "Add your own custom products or edit existing ones." : "Upgrade to Premium to create custom products."}
                    </p>
                    
                    {!isAddingProduct && !editingProduct && (
                      <Button size="sm" variant="outline" onClick={handleAddCustomProductClick}>
                        <span className="flex items-center gap-1">+&nbsp;New Product</span>
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex-grow overflow-y-auto">
                    {isAddingProduct ? (
                      <AddCustomProductForm 
                        availableIcons={foodProductTypes} 
                        onAdd={handleAddCustomProduct} 
                        onCancel={() => setIsAddingProduct(false)} 
                      />
                    ) : editingProduct ? (
                      <AddCustomProductForm 
                        availableIcons={foodProductTypes}
                        onAdd={(product) => {
                          addCustomProduct({
                            value: editingProduct.productId,
                            label: product.label,
                            shelfLife: product.shelfLife
                          });
                          setEditingProduct(null);
                        }}
                        onCancel={() => setEditingProduct(null)} 
                        initialValues={{
                          name: editingProduct.name,
                          shelfLife: editingProduct.shelfLife
                        }} 
                        isEditing={true} 
                      />
                    ) : (
                      <CustomProductsList 
                        products={Object.values(customProducts).sort((a, b) => a.label.localeCompare(b.label)) as IconOption[]} 
                        editingProduct={editingProduct}
                        startEditingProduct={startEditingProduct}
                        saveProductChanges={handleSaveProductChanges}
                        cancelEditingProduct={() => setEditingProduct(null)}
                        confirmDelete={confirmDelete}
                        onAddNewClick={handleAddCustomProductClick}
                        isAdding={isAddingProduct}
                        updateEditingField={updateEditingField}
                      />
                    )}
                  </div>
                </TabsContent>
                
                {/* Settings tab with updated About section */}
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
                          <li><strong>Premium Features:</strong> Unlock custom products and track unlimited items with a premium subscription</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">Understanding Freshness Labels</h3>
                      <div className="bg-muted/50 p-4 rounded-md">
                        <p className="text-sm mb-3">
                          Fresh Tracker shows the number of days until an item expires:
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold rounded-full bg-fresh-green text-black w-16 text-center">3+ days</span>
                            <p className="text-sm">Item has 3 or more days until expiry</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold rounded-full bg-fresh-yellow text-black w-16 text-center">2-3 days</span>
                            <p className="text-sm">Item has 2-3 days until expiry</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold rounded-full bg-fresh-orange text-black w-16 text-center">0-1 days</span>
                            <p className="text-sm">Item has 0-1 days until expiry</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold rounded-full bg-fresh-red text-white w-16 text-center">Expired</span>
                            <p className="text-sm">Item has expired (0 or negative days left)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3 pt-2">
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
                    
                    {/* Add version display at the bottom */}
                    <div className="pt-4 text-center">
                      <p className="text-xs text-muted-foreground">Version 1.0.0</p>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
          
          {/* Action buttons for different states */}
          {currentTab === 'selection' && (
            <DialogClose asChild>
              <Button type="button" className="mt-4 w-full">
                <Check className="mr-1 h-4 w-4" /> Done
              </Button>
            </DialogClose>
          )}
          
          {currentTab === 'shelfLife' && (
            <DialogClose asChild>
              <Button type="button" className="mt-4 w-full">
                <Check className="mr-1 h-4 w-4" /> Done
              </Button>
            </DialogClose>
          )}
          
          {currentTab === 'custom' && isAddingProduct && (
            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddingProduct(false)} className="w-1/3">
                <X className="mr-1 h-4 w-4" /> Cancel
              </Button>
              <Button 
                onClick={() => {
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
                    
                    // Create a new custom product
                    const newProduct: IconOption = {
                      value: productId,
                      label: name.trim(),
                      shelfLife: shelfLife
                    };
                    
                    handleAddCustomProduct(newProduct);
                  }
                }} 
                className="w-2/3"
              >
                <Plus className="mr-1 h-4 w-4" /> Add Product
              </Button>
            </div>
          )}
          
          {currentTab === 'custom' && editingProduct && (
            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => setEditingProduct(null)} className="w-1/3">
                <X className="mr-1 h-4 w-4" /> Cancel
              </Button>
              <Button 
                onClick={() => {
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
                    
                    // Create an updated product
                    const updatedProduct: IconOption = {
                      value: editingProduct.productId,
                      label: name.trim(),
                      shelfLife: shelfLife
                    };
                    
                    addCustomProduct(updatedProduct);
                    setEditingProduct(null);
                  }
                }} 
                className="w-2/3"
              >
                <Check className="mr-1 h-4 w-4" /> Save
              </Button>
            </div>
          )}
          
          {currentTab === 'custom' && !isAddingProduct && !editingProduct && (
            <DialogClose asChild>
              <Button type="button" className="mt-4 w-full">
                <Check className="mr-1 h-4 w-4" /> Done
              </Button>
            </DialogClose>
          )}
          
          {currentTab === 'settings' && (
            <DialogClose asChild>
              <Button type="button" className="mt-4 w-full">
                <Check className="mr-1 h-4 w-4" /> Done
              </Button>
            </DialogClose>
          )}
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
      
      {/* Premium upgrade dialog */}
      <PremiumUpgradeDialog 
        open={premiumDialogOpen}
        onOpenChange={setPremiumDialogOpen}
      />
    </>
  );
};

export default IconManagerDialog;
