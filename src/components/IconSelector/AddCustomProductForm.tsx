
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import CustomIconSelector from './CustomIconSelector';
import { IconOption } from '@/data/productData';
import { FoodIconOption } from '@/types/iconTypes';

interface AddCustomProductFormProps {
  availableIcons: FoodIconOption[];
  onAdd: (product: IconOption, iconName: string) => void;
  onCancel: () => void;
  initialValues?: {
    name: string;
    iconName: string;
    shelfLife: number;
  };
  isEditing?: boolean;
}

const AddCustomProductForm: React.FC<AddCustomProductFormProps> = ({
  availableIcons,
  onAdd,
  onCancel,
  initialValues,
  isEditing = false
}) => {
  const [productName, setProductName] = useState(initialValues?.name || '');
  const [shelfLife, setShelfLife] = useState(initialValues?.shelfLife?.toString() || '7');
  // Initialize with the correct initial icon name
  const [selectedIcon, setSelectedIcon] = useState(initialValues?.iconName || availableIcons[0]?.icon || 'food');

  // Set initial selected icon value
  useEffect(() => {
    if (initialValues?.iconName) {
      setSelectedIcon(initialValues.iconName);
      console.log('Initial icon set from initialValues:', initialValues.iconName);
    } else if (availableIcons.length > 0) {
      setSelectedIcon(availableIcons[0].icon);
      console.log('Initial icon set to first available:', availableIcons[0].icon);
    }
  }, [initialValues, availableIcons]);

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
    
    // Make sure we have a valid category
    if (!selectedIcon) {
      toast({
        title: "Category required",
        description: "Please select a category for the product",
        variant: "destructive",
      });
      return;
    }
    
    console.log('Selected category for submission:', selectedIcon);
    
    // Use existing ID if editing, or generate a new one
    const productId = isEditing ? initialValues!.name : generateUniqueId();
    
    // Create a placeholder element for compatibility
    const placeholderElement = <div className="h-5 w-5" />;
    
    // Create a new custom product with the selected icon
    const newProduct: IconOption = {
      value: productId,
      label: productName.trim(),
      icon: placeholderElement,
      shelfLife: numValue
    };
    
    // Pass both the product and the icon name
    onAdd(newProduct, selectedIcon);
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
          <Label htmlFor="new-product-category">Category</Label>
          <CustomIconSelector
            icons={availableIcons}
            selectedIcon={selectedIcon}
            onSelect={(icon) => {
              console.log('Category selected:', icon);
              setSelectedIcon(icon);
            }}
            className="h-40" // Updated to match 4 rows of icons
          />
        </div>
        
        <div>
          <Label htmlFor="new-product-shelf-life">Shelf Life (days)</Label>
          <Input
            id="new-product-shelf-life"
            type="number"
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
