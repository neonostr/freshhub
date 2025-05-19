
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { IconOption } from '@/data/productData';
import { EditableProductProps } from '@/types/iconTypes';
import CustomIconSelector from './CustomIconSelector';

interface CustomProductsListProps {
  products: IconOption[];
  editingProduct: EditableProductProps | null;
  startEditingProduct: (product: IconOption) => void;
  saveProductChanges: () => void;
  cancelEditingProduct: () => void;
  confirmDelete: (value: string) => void;
  renderIcon?: (icon: React.ReactNode) => React.ReactNode;
  onAddNewClick: () => void;
  isAdding: boolean;
  updateEditingField: (field: string, value: string | number) => void;
  availableIcons: { name: string, icon: string }[];
  editingIcon: string;
  setEditingIcon: (iconName: string) => void;
}

const CustomProductsList: React.FC<CustomProductsListProps> = ({
  products,
  editingProduct,
  startEditingProduct,
  saveProductChanges,
  cancelEditingProduct,
  confirmDelete,
  onAddNewClick,
  isAdding,
  updateEditingField,
  availableIcons,
  editingIcon,
  setEditingIcon
}) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-center">
        <p className="text-sm text-muted-foreground">
          You haven't created any custom products yet.
        </p>
        {!isAdding && (
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={onAddNewClick}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Custom Product
          </Button>
        )}
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.value} className="flex items-center gap-2 border p-3 rounded-md">            
            {editingProduct && editingProduct.productId === product.value ? (
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Name:</label>
                  <Input
                    value={editingProduct.name}
                    onChange={(e) => updateEditingField('name', e.target.value)}
                    className="flex-1"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Category:</label>
                  <CustomIconSelector
                    icons={availableIcons}
                    selectedIcon={editingIcon}
                    onSelect={setEditingIcon}
                    className="h-24 border rounded-md"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Shelf Life:</label>
                  <Input
                    type="number"
                    min="1"
                    value={editingProduct.shelfLife}
                    onChange={(e) => updateEditingField('shelfLife', parseInt(e.target.value) || 1)}
                    className="w-20"
                  />
                  <span className="text-sm">days</span>
                </div>
                
                <div className="flex justify-end gap-2 mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={cancelEditingProduct}
                  >
                    <X className="h-4 w-4 mr-1" /> Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={saveProductChanges}
                  >
                    <Check className="h-4 w-4 mr-1" /> Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-between">
                <span className="font-medium">{product.label}</span>
                <span className="text-sm text-muted-foreground">
                  {product.shelfLife} days
                </span>
              </div>
            )}
            
            {(!editingProduct || editingProduct.productId !== product.value) && (
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => startEditingProduct(product)}
                  className="h-10 w-10 p-0" // Increased size for easier touch
                >
                  <Edit className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => confirmDelete(product.value)}
                  className="h-10 w-10 p-0 text-destructive" // Increased size for easier touch
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CustomProductsList;
