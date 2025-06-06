
import React from 'react';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { useIconManager } from '@/context/IconManager';
import { useSubscription } from '@/context/SubscriptionContext';
import AddCustomProductForm from '@/components/IconSelector/AddCustomProductForm';
import CustomProductsList from '@/components/IconSelector/CustomProductsList';
import { EditableProductProps } from '@/types/iconTypes';
import { IconOption, ALL_ICONS } from '@/data/productData';

interface CustomProductsTabProps {
  editingProduct: EditableProductProps | null;
  setEditingProduct: (product: EditableProductProps | null) => void;
  isAddingProduct: boolean;
  setIsAddingProduct: (isAdding: boolean) => void;
  setPremiumDialogOpen: (open: boolean) => void;
  handleAddCustomProduct: (product: IconOption) => void;
  startEditingProduct: (product: IconOption) => void;
  handleSaveProductChanges: () => void;
  confirmDelete: (iconValue: string) => void;
  updateEditingField: (field: string, value: string | number) => void;
}

const CustomProductsTab: React.FC<CustomProductsTabProps> = ({
  editingProduct,
  setEditingProduct,
  isAddingProduct,
  setIsAddingProduct,
  setPremiumDialogOpen,
  handleAddCustomProduct,
  startEditingProduct,
  handleSaveProductChanges,
  confirmDelete,
  updateEditingField,
}) => {
  const { customProducts, addCustomProduct } = useIconManager();
  const { status } = useSubscription();
  const isPremium = status === 'premium';

  const handleAddCustomProductClick = () => {
    if (!isPremium) {
      setPremiumDialogOpen(true);
      return;
    }
    setIsAddingProduct(true);
  };

  const foodProductTypes = Object.values(ALL_ICONS).map(product => ({
    name: product.label,
    value: product.value
  })).slice(0, 20);

  return (
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
            onAdd={product => {
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
  );
};

export default CustomProductsTab;
