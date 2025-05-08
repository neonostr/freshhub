
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { IconOption } from '@/data/productData';
import { EditableProductProps } from '@/types/iconTypes';

interface CustomProductsListProps {
  products: IconOption[];
  editingProduct: EditableProductProps | null;
  startEditingProduct: (product: IconOption) => void;
  saveProductChanges: () => void;
  cancelEditingProduct: () => void;
  confirmDelete: (value: string) => void;
  renderIcon: (icon: React.ReactNode) => React.ReactNode;
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
  renderIcon,
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
            <div className="p-2 bg-muted rounded-md">
              {renderIcon(product.icon)}
            </div>
            
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
                
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Icon:</label>
                  <ScrollArea className="h-24 w-full border rounded-md">
                    <div className="grid grid-cols-5 gap-1 p-1">
                      {availableIcons.map((icon) => (
                        <Button
                          key={icon.icon}
                          type="button"
                          size="sm"
                          variant={editingIcon === icon.icon ? "default" : "outline"}
                          className="h-8 w-8 p-0"
                          onClick={() => setEditingIcon(icon.icon)}
                        >
                          {renderIcon(icon.icon)}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
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
    </ScrollArea>
  );
};

export default CustomProductsList;
