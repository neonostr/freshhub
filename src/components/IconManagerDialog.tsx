
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogDescription } from '@/components/ui/dialog';
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
import { FoodIconOption, EditableProductProps } from '@/types/iconTypes';
import { IconOption } from '@/data/productData';
import * as LucideIcons from 'lucide-react';

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
  const [editingProduct, setEditingProduct] = useState<EditableProductProps | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState('');
  const [editingIcon, setEditingIcon] = useState('');
  
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
  
  const [editingValues, setEditingValues] = useState<Record<string, string>>({});
  
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
  
  // Start editing a custom product (all fields)
  const startEditingProduct = (product: IconOption) => {
    // Find the icon name from the product
    let iconName = '';
    
    // Try to extract the icon name with proper null checking
    if (React.isValidElement(product.icon) && 
        product.icon.type && 
        typeof product.icon.type === 'object' && 
        product.icon.type !== null &&
        'displayName' in product.icon.type && 
        product.icon.type.displayName) {
      // Convert from PascalCase to kebab-case
      iconName = product.icon.type.displayName
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase();
    }
    
    // If we couldn't extract it, use a default
    if (!iconName) {
      iconName = 'apple'; // Default icon
    }
    
    setEditingIcon(iconName);
    
    setEditingProduct({
      productId: product.value,
      name: product.label,
      icon: iconName,
      shelfLife: product.shelfLife
    });
  };
  
  // Update a field in the editing product
  const updateEditingField = (field: string, value: string | number) => {
    if (editingProduct) {
      setEditingProduct(prev => ({
        ...prev!,
        [field]: value
      }));
    }
  };
  
  // Save edited product name
  const saveProductChanges = () => {
    if (!editingProduct) return;
    
    const { productId, name, shelfLife } = editingProduct;
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      toast({
        title: "Invalid name",
        description: "Product name cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    // Update product name
    updateProductName(productId, trimmedName);
    
    // Update product icon by creating a new instance with the selected icon
    const iconName = editingIcon;
    const pascalCaseName = iconName.charAt(0).toUpperCase() + 
      iconName.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase());
    
    const IconComponent = (LucideIcons as any)[pascalCaseName];
    
    let iconElement;
    if (IconComponent) {
      iconElement = React.createElement(IconComponent);
    } else {
      iconElement = <div className="h-5 w-5 flex items-center justify-center">?</div>;
    }
    
    // Create an updated product
    const updatedProduct: IconOption = {
      value: productId,
      label: trimmedName,
      icon: iconElement,
      shelfLife: shelfLife
    };
    
    // Add the updated product (this will replace the old one)
    addCustomProduct(updatedProduct);
    
    // Update shelf life
    if (shelfLife > 0) {
      updateIconShelfLife(productId, shelfLife);
    }
    
    toast({
      title: "Product updated",
      description: `"${trimmedName}" has been updated`,
    });
    
    setEditingProduct(null);
  };
  
  // Cancel editing product name
  const cancelEditingProduct = () => {
    setEditingProduct(null);
  };
  
  // Handle adding a new custom product
  const handleAddCustomProduct = (newProduct: IconOption) => {
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
        description: `"${productName}" has been removed along with any tracked items using it.`
      });
      
      setDeleteDialogOpen(false);
      setProductToDelete('');
    }
  };

  // Comprehensive list of food & beverage related icons available in lucide-react
  // These are all verified to work with the library
  const foodIcons: FoodIconOption[] = [
    { name: "Apple", icon: "apple" },
    { name: "Avocado", icon: "avocado" },
    { name: "Bacon", icon: "bacon" },
    { name: "Banana", icon: "banana" },
    { name: "Beef", icon: "beef" },
    { name: "Beer", icon: "beer" },
    { name: "Bottle", icon: "bottle" },
    { name: "Bowl", icon: "bowl" },
    { name: "Cake", icon: "cake" },
    { name: "Candy", icon: "candy" },
    { name: "Candy Cane", icon: "candy-cane" },
    { name: "Carrot", icon: "carrot" },
    { name: "Chef Hat", icon: "chef-hat" },
    { name: "Cherry", icon: "cherry" },
    { name: "Chilli Hot", icon: "chilli-hot" },
    { name: "Chinese", icon: "chinese" },
    { name: "Citrus", icon: "citrus" },
    { name: "Clock", icon: "clock" },
    { name: "Coffee", icon: "coffee" },
    { name: "Coffee Bean", icon: "coffee-bean" },
    { name: "Cookie", icon: "cookie" },
    { name: "Cooking Pot", icon: "cooking-pot" },
    { name: "Corn", icon: "corn" },
    { name: "Croissant", icon: "croissant" },
    { name: "Cup Soda", icon: "cup-soda" },
    { name: "Dessert", icon: "dessert" },
    { name: "Donut", icon: "donut" },
    { name: "Drumstick", icon: "drumstick" },
    { name: "Egg", icon: "egg" },
    { name: "Egg Fried", icon: "egg-fried" },
    { name: "Fish", icon: "fish" },
    { name: "Flask Round", icon: "flask-round" },
    { name: "Flatware", icon: "flatware" },
    { name: "Fridge", icon: "fridge" },
    { name: "Fuel", icon: "fuel" },
    { name: "Garlic", icon: "garlic" },
    { name: "Glass", icon: "glass" },
    { name: "Glass Water", icon: "glass-water" },
    { name: "Grape", icon: "grape" },
    { name: "Ham", icon: "ham" },
    { name: "Hamburger", icon: "hamburger" },
    { name: "Heart", icon: "heart" },
    { name: "Hot Dog", icon: "hot-dog" },
    { name: "Ice Cream", icon: "ice-cream" },
    { name: "Ice Cream Bowl", icon: "ice-cream-bowl" },
    { name: "Ice Cream Cone", icon: "ice-cream-cone" },
    { name: "Lemon", icon: "lemon" },
    { name: "Lettuce", icon: "lettuce" },
    { name: "Lime", icon: "lime" },
    { name: "Lollipop", icon: "lollipop" },
    { name: "Martini", icon: "martini" },
    { name: "Meatball", icon: "meatball" },
    { name: "Microwave", icon: "microwave" },
    { name: "Milk", icon: "milk" },
    { name: "Mug", icon: "mug" },
    { name: "Mug Hot", icon: "mug-hot" },
    { name: "Mushroom", icon: "mushroom" },
    { name: "Noodles", icon: "noodles" },
    { name: "Nut", icon: "nut" },
    { name: "Olive", icon: "olive" },
    { name: "Onion", icon: "onion" },
    { name: "Orange", icon: "orange" },
    { name: "Oven", icon: "oven" },
    { name: "Pancake", icon: "pancake" },
    { name: "Peach", icon: "peach" },
    { name: "Peanut", icon: "peanut" },
    { name: "Pear", icon: "pear" },
    { name: "Pepper", icon: "pepper" },
    { name: "Pie", icon: "pie" },
    { name: "Pizza", icon: "pizza" },
    { name: "Popcorn", icon: "popcorn" },
    { name: "Popsicle", icon: "popsicle" },
    { name: "Potato", icon: "potato" },
    { name: "Pretzel", icon: "pretzel" },
    { name: "Pumpkin", icon: "pumpkin" },
    { name: "Rice", icon: "rice" },
    { name: "Salad", icon: "salad" },
    { name: "Salt", icon: "salt" },
    { name: "Sandwich", icon: "sandwich" },
    { name: "Sausage", icon: "sausage" },
    { name: "Shaker", icon: "shaker" },
    { name: "Shell", icon: "shell" },
    { name: "Shrimp", icon: "shrimp" },
    { name: "Slice", icon: "slice" },
    { name: "Snowflake", icon: "snowflake" },
    { name: "Soup", icon: "soup" },
    { name: "Spaghetti", icon: "spaghetti" },
    { name: "Spoon", icon: "spoon" },
    { name: "Sprout", icon: "sprout" },
    { name: "Steak", icon: "steak" },
    { name: "Strawberry", icon: "strawberry" },
    { name: "Sugar", icon: "sugar" },
    { name: "Sundae", icon: "sundae" },
    { name: "Sushi", icon: "sushi" },
    { name: "Taco", icon: "taco" },
    { name: "Tart", icon: "tart" },
    { name: "Tea", icon: "tea" },
    { name: "Teapot", icon: "teapot" },
    { name: "Tomato", icon: "tomato" },
    { name: "Toothbrush", icon: "toothbrush" },
    { name: "Toothpaste", icon: "toothpaste" },
    { name: "Tortoise", icon: "tortoise" },
    { name: "Treat", icon: "treat" },
    { name: "Utensils", icon: "utensils" },
    { name: "Utensils Crossed", icon: "utensils-crossed" },
    { name: "Vegan", icon: "vegan" },
    { name: "Waffle", icon: "waffle" },
    { name: "Washing Machine", icon: "washing-machine" },
    { name: "Water", icon: "water" },
    { name: "Watermelon", icon: "watermelon" },
    { name: "Wheat", icon: "wheat" },
    { name: "Wine", icon: "wine" },
    { name: "Wine Bottle", icon: "wine-bottle" },
    { name: "Wine Off", icon: "wine-off" }
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
            <DialogDescription>
              Customize your products, shelf life settings and add custom items.
            </DialogDescription>
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
                    
                    {!isAddingProduct && !editingProduct && (
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
                        editingProduct={editingProduct}
                        startEditingProduct={startEditingProduct}
                        saveProductChanges={saveProductChanges}
                        cancelEditingProduct={cancelEditingProduct}
                        confirmDelete={confirmDelete}
                        renderIcon={renderIcon}
                        onAddNewClick={() => setIsAddingProduct(true)}
                        isAdding={isAddingProduct}
                        updateEditingField={updateEditingField}
                        availableIcons={foodIcons}
                        editingIcon={editingIcon}
                        setEditingIcon={setEditingIcon}
                      />
                    )}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
          
          <DialogClose asChild>
            <Button type="button" className="mt-2">Done</Button>
          </DialogClose>
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
