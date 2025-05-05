
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { IconOption } from '@/data/productData';

interface CustomProductsListProps {
  products: IconOption[];
  editingName: Record<string, string>;
  startEditingName: (value: string) => void;
  saveProductName: (value: string) => void;
  cancelEditingName: () => void;
  confirmDelete: (value: string) => void;
  renderIcon: (icon: React.ReactNode) => React.ReactNode;
  onAddNewClick: () => void;
  isAdding: boolean;
  updateEditingName: (value: string, name: string) => void;
}

const CustomProductsList: React.FC<CustomProductsListProps> = ({
  products,
  editingName,
  startEditingName,
  saveProductName,
  cancelEditingName,
  confirmDelete,
  renderIcon,
  onAddNewClick,
  isAdding,
  updateEditingName
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
            
            {editingName[product.value] !== undefined ? (
              <div className="flex-1 flex items-center gap-2">
                <Input
                  value={editingName[product.value]}
                  onChange={(e) => updateEditingName(product.value, e.target.value)}
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
    </ScrollArea>
  );
};

export default CustomProductsList;
