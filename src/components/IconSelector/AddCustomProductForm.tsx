
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import CustomIconSelector from './CustomIconSelector';
import { IconOption } from '@/data/productData';

interface FoodIconOption {
  name: string;
  icon: string;
}

interface AddCustomProductFormProps {
  availableIcons: FoodIconOption[];
  onAdd: (product: IconOption) => void;
  onCancel: () => void;
}

const AddCustomProductForm: React.FC<AddCustomProductFormProps> = ({
  availableIcons,
  onAdd,
  onCancel
}) => {
  const [productName, setProductName] = useState('');
  const [shelfLife, setShelfLife] = useState('7');
  const [selectedIcon, setSelectedIcon] = useState(availableIcons[0]?.icon || '');

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
    
    const productId = generateUniqueId();
    
    // Create React element for the icon from the selected icon name
    const iconName = selectedIcon;
    const createIconComponent = (iconName: string) => {
      // Get icon component from Lucide
      const LucideIcons = require('lucide-react');
      const pascalCaseName = iconName.charAt(0).toUpperCase() + 
        iconName.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase());
      
      const IconComponent = LucideIcons[pascalCaseName];
      
      if (IconComponent) {
        return React.createElement(IconComponent, { className: "h-5 w-5" });
      }
      
      return <div className="h-5 w-5 flex items-center justify-center">?</div>;
    };
    
    // Create a new custom product with the selected icon
    const newProduct: IconOption = {
      value: productId,
      label: productName.trim(),
      icon: createIconComponent(iconName),
      shelfLife: numValue
    };
    
    onAdd(newProduct);
    
    toast({
      title: "Product added",
      description: `"${productName.trim()}" has been added to your products`,
    });
  };

  return (
    <div className="bg-muted/50 p-4 rounded-md mb-4">
      <h3 className="text-sm font-medium mb-3">Add New Product</h3>
      
      <div className="space-y-3">
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
          <Label htmlFor="new-product-icon">Icon</Label>
          <CustomIconSelector
            icons={availableIcons}
            selectedIcon={selectedIcon}
            onSelect={setSelectedIcon}
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
        
        <div className="flex justify-end gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            size="sm"
            onClick={handleSubmit}
          >
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCustomProductForm;
