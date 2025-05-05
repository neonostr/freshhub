
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Settings, Edit, Trash2, Plus, Check, X, 
  Milk, Apple, Carrot, Cherry, Coffee, Cookie, Egg, Fish, 
  Wine, Banana, Beef, Cake, Beer, Salad, Drumstick, Pizza, 
  IceCream, Sandwich, Package, Utensils, Beaker, Bean, Grape, Ham, Soup
} from 'lucide-react';
import { useIconManager, ALL_ICONS } from '@/context/IconManagerContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconOption } from '@/data/productData';
import { toast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import ProductsList from './IconSelector/ProductsList';
import ShelfLifeList from './IconSelector/ShelfLifeList';
import AddCustomProductForm from './IconSelector/AddCustomProductForm';
import CustomProductsList from './IconSelector/CustomProductsList';

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
  
  // States for UI management
  const [editingValues, setEditingValues] = useState<Record<string, string>>({});
  const [editingName, setEditingName] = useState<Record<string, string>>({});
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState('');
  
  // Get sorted icons list by label
  const sortedIcons = Object.values(ALL_ICONS).sort((a, b) => a.label.localeCompare(b.label));
  
  // Available food/beverage related icons for custom products
  const availableCustomIcons = [
    { name: 'Apple', component: <Apple /> },
    { name: 'Banana', component: <Banana /> },
    { name: 'Beef', component: <Beef /> },
    { name: 'Beer', component: <Beer /> },
    { name: 'Cake', component: <Cake /> },
    { name: 'Carrot', component: <Carrot /> },
    { name: 'Cherry', component: <Cherry /> },
    { name: 'Coffee', component: <Coffee /> },
    { name: 'Cookie', component: <Cookie /> },
    { name: 'Drumstick', component: <Drumstick /> },
    { name: 'Egg', component: <Egg /> },
    { name: 'Fish', component: <Fish /> },
    { name: 'Grape', component: <Grape /> },
    { name: 'Ham', component: <Ham /> },
    { name: 'IceCream', component: <IceCream /> },
    { name: 'Milk', component: <Milk /> },
    { name: 'Pizza', component: <Pizza /> },
    { name: 'Salad', component: <Salad /> },
    { name: 'Sandwich', component: <Sandwich /> },
    { name: 'Soup', component: <Soup /> },
    { name: 'Wine', component: <Wine /> },
    { name: 'Bean', component: <Bean /> },
    { name: 'Utensils', component: <Utensils /> },
    { name: 'Beaker', component: <Beaker /> }
  ];
  
  // Helper function to safely render icons
  const renderIcon = (icon: React.ReactNode): React.ReactNode => {
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, { className: "h-5 w-5" });
    }
    
    // If it's not a valid element, return a fallback
    return <div className="h-5 w-5 flex items-center justify-center text-xs">?</div>;
  };
  
  // Shelf life management functions
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
  
  // Update the editing name state
  const updateEditingName = (iconValue: string, name: string) => {
    setEditingName(prev => ({ 
      ...prev, 
      [iconValue]: name 
    }));
  };
  
  // Cancel editing product name
  const cancelEditingName = () => {
    setEditingName({});
  };
  
  // Handle adding a new custom product
  const handleAddCustomProduct = (newProduct: IconOption) => {
    addCustomProduct(newProduct);
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
          
          <div className="flex flex-col h-[500px]">
            <Tabs defaultValue="selection" className="w-full h-full flex flex-col">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="selection">Products</TabsTrigger>
                <TabsTrigger value="shelfLife">Shelf Life</TabsTrigger>
                <TabsTrigger value="custom">Custom Products</TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-hidden mt-4">
                <TabsContent value="selection" className="h-full flex flex-col m-0 data-[state=active]:flex data-[state=inactive]:hidden">
                  <ProductsList 
                    icons={sortedIcons}
                    isIconSelected={isIconSelected}
                    toggleIcon={toggleIcon}
                    renderIcon={renderIcon}
                  />
                </TabsContent>
                
                <TabsContent value="shelfLife" className="h-full flex flex-col m-0 data-[state=active]:flex data-[state=inactive]:hidden">
                  <ShelfLifeList 
                    icons={Object.values(allIcons)
                      .filter(icon => isIconSelected(icon.value))
                      .sort((a, b) => a.label.localeCompare(b.label))}
                    isCustomProduct={isCustomProduct}
                    editingValues={editingValues}
                    handleShelfLifeFocus={handleShelfLifeFocus}
                    handleShelfLifeChange={handleShelfLifeChange}
                    handleShelfLifeBlur={handleShelfLifeBlur}
                    getDisplayValue={getDisplayValue}
                    renderIcon={renderIcon}
                  />
                </TabsContent>
                
                <TabsContent value="custom" className="h-full flex flex-col m-0 data-[state=active]:flex data-[state=inactive]:hidden">
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
                    <AddCustomProductForm 
                      availableIcons={availableCustomIcons}
                      onAdd={handleAddCustomProduct}
                      onCancel={() => setIsAddingProduct(false)}
                    />
                  )}
                  
                  <CustomProductsList 
                    products={Object.values(customProducts)
                      .sort((a, b) => a.label.localeCompare(b.label))}
                    editingName={editingName}
                    startEditingName={startEditingName}
                    saveProductName={saveProductName}
                    cancelEditingName={cancelEditingName}
                    confirmDelete={confirmDelete}
                    renderIcon={renderIcon}
                    onAddNewClick={() => setIsAddingProduct(true)}
                    isAdding={isAddingProduct}
                    updateEditingName={updateEditingName}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
          
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
