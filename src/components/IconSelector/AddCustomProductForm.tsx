
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { IconOption } from '@/data/productData';
import { FoodIconOption } from '@/types/iconTypes';

interface AddCustomProductFormProps {
  availableIcons: FoodIconOption[];
  onAdd: (product: IconOption) => void;
  onCancel: () => void;
  initialValues?: {
    name: string;
    shelfLife: number;
  };
  isEditing?: boolean;
}

const AddCustomProductForm: React.FC<AddCustomProductFormProps> = ({
  onAdd,
  onCancel,
  initialValues,
  isEditing = false
}) => {
  const [productName, setProductName] = useState(initialValues?.name || '');
  const [shelfLife, setShelfLife] = useState(initialValues?.shelfLife?.toString() || '7');

  // Generate a unique ID for the new product
  const generateUniqueId = () => {
    return 'custom_' + Math.random().toString(36).substring(2, 15);
  };

  const handleSubmit = () => {
    if (!productName.trim()) {
      toast({
        title: "Name required",
        description: "Please provide a name for the product",
        variant: "destructive",
      });
      return;
    }
    
    const numValue = parseInt(shelfLife, 10);
    if (isNaN(numValue) || numValue <= 0) {
      toast({
        title: "Invalid shelf life",
        description: "Please provide a valid shelf life (days)",
        variant: "destructive",
      });
      return;
    }
    
    // Use existing ID if editing, or generate a new one
    const productId = isEditing ? initialValues!.name : generateUniqueId();
    
    // Create a new custom product without an icon
    const newProduct: IconOption = {
      value: productId,
      label: productName.trim(),
      shelfLife: numValue
    };
    
    onAdd(newProduct);
  };

  return (
    <div className="bg-muted/50 p-4 rounded-md flex flex-col h-full">
      <h3 className="text-sm font-medium mb-3">
        {isEditing ? 'Edit Product' : 'Add New Product'}
      </h3>
      
      <div className="space-y-3 flex-grow">
        <div>
          <Label htmlFor="new-product-name">Product Name</Label>
          <Input
            id="new-product-name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g., Homemade Jam"
          />
        </div>
        
        <div>
          <Label htmlFor="new-product-shelf-life">Shelf Life (days)</Label>
          <Input
            id="new-product-shelf-life"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            min="1"
            value={shelfLife}
            onChange={(e) => setShelfLife(e.target.value)}
          />
        </div>
      </div>
      
      {/* No buttons here - they will be provided by the parent component */}
    </div>
  );
};

export default AddCustomProductForm;
