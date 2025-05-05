
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import CustomIconSelector from './CustomIconSelector';
import { IconOption } from '@/data/productData';

interface IconSelectorOption {
  name: string;
  component: React.ReactElement;
}

interface AddCustomProductFormProps {
  availableIcons: IconSelectorOption[];
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
  const [selectedIcon, setSelectedIcon] = useState(availableIcons[0]?.name || '');

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
    
    // Find the selected icon component
    const iconObj = availableIcons.find(icon => icon.name === selectedIcon);
    
    // Create a new custom product with the selected icon
    const newProduct: IconOption = {
      value: productId,
      label: productName.trim(),
      icon: iconObj ? iconObj.component : <div>?</div>,
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
