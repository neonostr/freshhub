
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useIconManager } from '@/context/IconManagerContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import ProductsList from './IconSelector/ProductsList';
import ShelfLifeList from './IconSelector/ShelfLifeList';
import AddCustomProductForm from './IconSelector/AddCustomProductForm';
import CustomProductsList from './IconSelector/CustomProductsList';
import { FoodIconOption } from '@/types/iconTypes';

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
  const sortedIcons = Object.values(allIcons)
    .filter(icon => !isCustomProduct(icon.value))
    .sort((a, b) => a.label.localeCompare(b.label));
  
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
  const handleAddCustomProduct = (newProduct: any) => {
    addCustomProduct(newProduct);
    setIsAddingProduct(false);
    toast({
      title: "Product added",
      description: `"${newProduct.label}" has been added to your products`,
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
        description: `"${productName}" has been removed from your products`,
      });
      
      setDeleteDialogOpen(false);
      setProductToDelete('');
    }
  };

  // Food/beverage related icon options
  const foodIcons: FoodIconOption[] = [
    { name: "Apple", icon: "apple" },
    { name: "Banana", icon: "banana" },
    { name: "Beer", icon: "beer" },
    { name: "Cake", icon: "cake" },
    { name: "Carrot", icon: "carrot" },
    { name: "Cherry", icon: "cherry" },
    { name: "Coffee", icon: "coffee" },
    { name: "Cookie", icon: "cookie" },
    { name: "Egg", icon: "egg" },
    { name: "Fish", icon: "fish" },
    { name: "Grape", icon: "grape" },
    { name: "Ham", icon: "ham" },
    { name: "Ice Cream", icon: "ice-cream-bowl" },
    { name: "Milk", icon: "milk" },
    { name: "Pizza", icon: "pizza" },
    { name: "Salad", icon: "salad" },
    { name: "Sandwich", icon: "sandwich" },
    { name: "Soup", icon: "soup" },
    { name: "Wine", icon: "wine" },
    { name: "Bacon", icon: "bacon" },
    { name: "Beef", icon: "beef" },
    { name: "Bread", icon: "bread" },
    { name: "Candy", icon: "candy" },
    { name: "Candy Cane", icon: "candy-cane" },
    { name: "Cheese", icon: "cheese" },
    { name: "Chili", icon: "chili" },
    { name: "Citrus", icon: "citrus" },
    { name: "Cooking Pot", icon: "cooking-pot" },
    { name: "Croissant", icon: "croissant" },
    { name: "Cup Soda", icon: "cup-soda" },
    { name: "Dessert", icon: "dessert" },
    { name: "Donut", icon: "donut" },
    { name: "Egg Fried", icon: "egg-fried" },
    { name: "Flour", icon: "flour" },
    { name: "Fruit", icon: "fruit" },
    { name: "Ginger", icon: "ginger" },
    { name: "Ice Cream Cone", icon: "ice-cream-cone" },
    { name: "Kebab", icon: "kebab" },
    { name: "Lemon", icon: "lemon" },
    { name: "Lobster", icon: "lobster" },
    { name: "Lollipop", icon: "lollipop" },
    { name: "Martini", icon: "martini" },
    { name: "Meat", icon: "meat" },
    { name: "Nut", icon: "nut" },
    { name: "Olive", icon: "olive" },
    { name: "Orange", icon: "orange" },
    { name: "Oyster", icon: "oyster" },
    { name: "Pasta", icon: "pasta" },
    { name: "Pear", icon: "pear" },
    { name: "Pepper", icon: "pepper" },
    { name: "Pineapple", icon: "pineapple" },
    { name: "Popcorn", icon: "popcorn" },
    { name: "Popsicle", icon: "popsicle" },
    { name: "Potato", icon: "potato" },
    { name: "Rice", icon: "rice" },
    { name: "Sauce", icon: "sauce" },
    { name: "Shrimp", icon: "shrimp" },
    { name: "Spaghetti", icon: "spaghetti" },
    { name: "Sprout", icon: "sprout" },
    { name: "Steak", icon: "steak" },
    { name: "Strawberry", icon: "strawberry" },
    { name: "Sushi", icon: "sushi" },
    { name: "Sweet Potato", icon: "sweet-potato" },
    { name: "Tea", icon: "tea" },
    { name: "Tomato", icon: "tomato" },
    { name: "Turkey", icon: "turkey" },
    { name: "Utensils", icon: "utensils" },
    { name: "Utensils Crossed", icon: "utensils-crossed" },
    { name: "Vegan", icon: "vegan" },
    { name: "Waffle", icon: "waffle" },
    { name: "Watermelon", icon: "watermelon" },
    { name: "Wheat", icon: "wheat" },
    { name: "Whiskey", icon: "whiskey" },
    { name: "Yogurt", icon: "yogurt" },
    { name: "Almond", icon: "almond" },
    { name: "Avocado", icon: "avocado" },
    { name: "Baguette", icon: "baguette" },
    { name: "Bean", icon: "bean" },
    { name: "Biscuit", icon: "biscuit" },
    { name: "Blueberry", icon: "blueberry" },
    { name: "Broccoli", icon: "broccoli" },
    { name: "Butter", icon: "butter" },
    { name: "Cabbage", icon: "cabbage" },
    { name: "Champagne", icon: "champagne" },
    { name: "Chocolate", icon: "chocolate" },
    { name: "Cinnamon", icon: "cinnamon" },
    { name: "Coconut", icon: "coconut" },
    { name: "Corn", icon: "corn" },
    { name: "Cucumber", icon: "cucumber" },
    { name: "Drumstick", icon: "drumstick" },
    { name: "Eggplant", icon: "eggplant" },
    { name: "Garlic", icon: "garlic" },
    { name: "Honey", icon: "honey" },
    { name: "Hot Dog", icon: "hotdog" },
    { name: "Ice", icon: "ice" },
    { name: "Jam", icon: "jam" },
    { name: "Leafy Green", icon: "leafy-green" },
    { name: "Mango", icon: "mango" },
    { name: "Mushroom", icon: "mushroom" },
    { name: "Noodles", icon: "noodles" },
    { name: "Onion", icon: "onion" },
    { name: "Peach", icon: "peach" }
  ];
  
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
                
                <TabsContent value="custom" className="h-full flex flex-col m-0 data-[state=active]:flex data-[state=inactive]:hidden overflow-hidden">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-muted-foreground">
                      Add your own custom products or edit existing ones.
                    </p>
                    
                    {!isAddingProduct && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setIsAddingProduct(true)}
                      >
                        <span className="flex items-center gap-1">+&nbsp;New Product</span>
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex-1 overflow-y-auto pb-4">
                    {isAddingProduct ? (
                      <AddCustomProductForm 
                        availableIcons={foodIcons}
                        onAdd={handleAddCustomProduct}
                        onCancel={() => setIsAddingProduct(false)}
                      />
                    ) : (
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
                    )}
                  </div>
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
