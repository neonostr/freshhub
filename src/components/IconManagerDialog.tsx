
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Settings, Edit, Trash2, Plus, Check, X } from 'lucide-react';
import { useIconManager, ALL_ICONS } from '@/context/IconManagerContext';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IconOption } from '@/data/productData';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const IconManagerDialog: React.FC = () => {
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
  
  const [editingValues, setEditingValues] = useState<Record<string, string>>({});
  const [editingName, setEditingName] = useState<Record<string, string>>({});
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductShelfLife, setNewProductShelfLife] = useState('7');
  const [selectedIcon, setSelectedIcon] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState('');
  
  // Get sorted icons list by label
  const sortedIcons = Object.values(ALL_ICONS).sort((a, b) => a.label.localeCompare(b.label));
  
  // Helper function to safely render icons
  const renderIcon = (icon: React.ReactElement) => {
    return React.cloneElement(icon, { className: "h-5 w-5" });
  };
  
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
  
  // Start editing product name
  const startEditingName = (iconValue: string) => {
    setEditingName({
      [iconValue]: allIcons[iconValue].label
    });
  };
  
  // Save edited product name
  const saveProductName = (iconValue: string) => {
    const newName = editingName[iconValue]?.trim();
    if (newName && newName !== allIcons[iconValue].label) {
      updateProductName(iconValue, newName);
      toast({
        title: "Product renamed",
        description: `Product has been renamed to "${newName}"`,
      });
    }
    setEditingName({});
  };
  
  // Cancel editing product name
  const cancelEditingName = () => {
    setEditingName({});
  };
  
  // Generate a unique ID for new custom product
  const generateUniqueId = () => {
    return 'custom_' + Math.random().toString(36).substring(2, 15);
  };
  
  // Add new custom product
  const handleAddCustomProduct = () => {
    if (!newProductName.trim()) {
      toast({
        title: "Name required",
        description: "Please provide a name for the product",
        variant: "destructive",
      });
      return;
    }
    
    const numValue = parseInt(newProductShelfLife, 10);
    if (isNaN(numValue) || numValue <= 0) {
      toast({
        title: "Invalid shelf life",
        description: "Please provide a valid shelf life (days)",
        variant: "destructive",
      });
      return;
    }
    
    const productId = generateUniqueId();
    
    // Create a new custom product
    const newProduct: IconOption = {
      value: productId,
      label: newProductName.trim(),
      icon: <div className="font-medium text-sm">{newProductName.trim().charAt(0).toUpperCase()}</div>,
      shelfLife: numValue
    };
    
    addCustomProduct(newProduct);
    
    toast({
      title: "Product added",
      description: `"${newProductName.trim()}" has been added to your products`,
    });
    
    // Reset form
    setNewProductName('');
    setNewProductShelfLife('7');
    setIsAddingProduct(false);
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
        description: `"${productName}" has been removed from your products`,
      });
      
      setDeleteDialogOpen(false);
      setProductToDelete('');
    }
  };
  
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="absolute top-6 right-6 rounded-full">
            <Settings className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Products</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="selection" className="w-full">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="selection">Products</TabsTrigger>
              <TabsTrigger value="shelfLife">Shelf Life</TabsTrigger>
              <TabsTrigger value="custom">Custom Products</TabsTrigger>
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
                          const atLeastOneLeft = Object.keys(allIcons).some(
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
                      {renderIcon(icon.icon)}
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
                  {Object.values(allIcons)
                    .filter(icon => isIconSelected(icon.value))
                    .sort((a, b) => a.label.localeCompare(b.label))
                    .map((icon) => (
                      <div key={icon.value} className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-muted rounded-md">
                            {renderIcon(icon.icon)}
                          </div>
                          <Label className={cn(isCustomProduct(icon.value) ? "font-semibold" : "")}>
                            {icon.label}
                          </Label>
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
            
            <TabsContent value="custom" className="py-4">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-muted-foreground">
                  Add your own custom products or edit existing ones.
                </p>
                
                {!isAddingProduct && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setIsAddingProduct(true)}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    New Product
                  </Button>
                )}
              </div>
              
              {isAddingProduct && (
                <div className="bg-muted/50 p-4 rounded-md mb-4">
                  <h3 className="text-sm font-medium mb-3">Add New Product</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="new-product-name">Product Name</Label>
                      <Input
                        id="new-product-name"
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                        placeholder="e.g., Homemade Jam"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="new-product-shelf-life">Shelf Life (days)</Label>
                      <Input
                        id="new-product-shelf-life"
                        type="number"
                        min="1"
                        value={newProductShelfLife}
                        onChange={(e) => setNewProductShelfLife(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsAddingProduct(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        size="sm"
                        onClick={handleAddCustomProduct}
                      >
                        Add Product
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              <ScrollArea className="h-[320px] pr-4">
                {Object.values(customProducts).length > 0 ? (
                  <div className="space-y-4">
                    {Object.values(customProducts)
                      .sort((a, b) => a.label.localeCompare(b.label))
                      .map((product) => (
                        <div key={product.value} className="flex items-center gap-2 border p-3 rounded-md">
                          <div className="p-2 bg-muted rounded-md">
                            {typeof product.icon === 'object' && React.isValidElement(product.icon) 
                              ? renderIcon(product.icon)
                              : <div className="w-5 h-5 flex items-center justify-center">{product.label.charAt(0).toUpperCase()}</div>}
                          </div>
                          
                          {editingName[product.value] !== undefined ? (
                            <div className="flex-1 flex items-center gap-2">
                              <Input
                                value={editingName[product.value]}
                                onChange={(e) => setEditingName(prev => ({ 
                                  ...prev, 
                                  [product.value]: e.target.value 
                                }))}
                                className="flex-1"
                                autoFocus
                              />
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => saveProductName(product.value)}
                                className="h-8 w-8 p-0"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={cancelEditingName}
                                className="h-8 w-8 p-0"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex-1 flex items-center justify-between">
                              <span className="font-medium">{product.label}</span>
                              <span className="text-sm text-muted-foreground">
                                {product.shelfLife} days
                              </span>
                            </div>
                          )}
                          
                          {editingName[product.value] === undefined && (
                            <div className="flex items-center gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => startEditingName(product.value)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => confirmDelete(product.value)}
                                className="h-8 w-8 p-0 text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 text-center">
                    <p className="text-sm text-muted-foreground">
                      You haven't created any custom products yet.
                    </p>
                    {!isAddingProduct && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => setIsAddingProduct(true)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Custom Product
                      </Button>
                    )}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
          
          <DialogClose asChild>
            <Button type="button">Done</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      
      {/* Confirmation dialog for deleting custom products */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Custom Product?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the product from your collection.
              Any items using this product will still exist but may display incorrectly.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProduct}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default IconManagerDialog;
