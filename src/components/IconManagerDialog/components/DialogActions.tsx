
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { IconOption } from '@/data/productData';
import { EditableProductProps } from '@/types/iconTypes';

interface DialogActionsProps {
  currentTab: string;
  isAddingProduct: boolean;
  editingProduct: EditableProductProps | null;
  onClose: () => void;
  onCancelAdding: () => void;
  onAddProduct: (product: IconOption) => void;
  onSaveEdit: (product: IconOption) => void;
  onCancelEdit: () => void;
}

const DialogActions: React.FC<DialogActionsProps> = ({
  currentTab,
  isAddingProduct,
  editingProduct,
  onClose,
  onCancelAdding,
  onAddProduct,
  onSaveEdit,
  onCancelEdit,
}) => {
  const { toast } = useToast();

  const handleAddProduct = () => {
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
      const newProduct: IconOption = {
        value: productId,
        label: name.trim(),
        shelfLife: shelfLife
      };
      
      onAddProduct(newProduct);
    }
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;
    
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
      
      const updatedProduct: IconOption = {
        value: editingProduct.productId,
        label: name.trim(),
        shelfLife: shelfLife
      };
      
      onSaveEdit(updatedProduct);
    }
  };

  // Regular tabs (selection, shelfLife, settings, about) and non-editing custom tab
  if (['selection', 'shelfLife', 'settings', 'about'].includes(currentTab) || 
      (currentTab === 'custom' && !isAddingProduct && !editingProduct)) {
    return (
      <Button type="button" className="mt-4 w-full" onClick={onClose}>
        <Check className="mr-1 h-4 w-4" /> Done
      </Button>
    );
  }

  // Custom tab - adding product
  if (currentTab === 'custom' && isAddingProduct) {
    return (
      <div className="flex gap-2 mt-4">
        <Button variant="outline" onClick={onCancelAdding} className="w-1/3">
          <X className="mr-1 h-4 w-4" /> Cancel
        </Button>
        <Button onClick={handleAddProduct} className="w-2/3">
          <Plus className="mr-1 h-4 w-4" /> Add Product
        </Button>
      </div>
    );
  }

  // Custom tab - editing product
  if (currentTab === 'custom' && editingProduct) {
    return (
      <div className="flex gap-2 mt-4">
        <Button variant="outline" onClick={onCancelEdit} className="w-1/3">
          <X className="mr-1 h-4 w-4" /> Cancel
        </Button>
        <Button onClick={handleSaveEdit} className="w-2/3">
          <Check className="mr-1 h-4 w-4" /> Save
        </Button>
      </div>
    );
  }

  return null;
};

export default DialogActions;
