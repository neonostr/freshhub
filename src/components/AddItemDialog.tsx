import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Milk, Coffee, Apple, Egg, Banana, Trash, Plus } from "lucide-react";
import { useItems } from '@/context/ItemsContext';

const icons = [
  { value: 'milk', label: 'Milk', icon: <Milk className="h-5 w-5" /> },
  { value: 'coffee', label: 'Coffee', icon: <Coffee className="h-5 w-5" /> },
  { value: 'apple', label: 'Apple', icon: <Apple className="h-5 w-5" /> },
  { value: 'egg', label: 'Egg', icon: <Egg className="h-5 w-5" /> },
  { value: 'banana', label: 'Banana', icon: <Banana className="h-5 w-5" /> },
  { value: 'trash', label: 'Trash', icon: <Trash className="h-5 w-5" /> },
];

const categories = [
  { value: 'dairy', label: 'Dairy' },
  { value: 'condiments', label: 'Condiments' },
  { value: 'coffee', label: 'Coffee & Tea' },
  { value: 'produce', label: 'Fruits & Vegetables' },
  { value: 'bakery', label: 'Bakery' },
  { value: 'other', label: 'Other' },
];

const AddItemDialog: React.FC = () => {
  const { addItem } = useItems();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('milk');
  const [category, setCategory] = useState('dairy');
  const [customDuration, setCustomDuration] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;
    
    addItem({
      name: name.trim(),
      icon: selectedIcon,
      category,
      customDuration: customDuration ? parseInt(customDuration, 10) : undefined,
    });
    
    setName('');
    setSelectedIcon('milk');
    setCategory('dairy');
    setCustomDuration('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 rounded-full w-14 h-14" size="icon">
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Item Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g., Milk, Coffee, Sauce" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label>Choose an Icon</Label>
            <div className="grid grid-cols-3 gap-2">
              {icons.map((icon) => (
                <Button
                  key={icon.value}
                  type="button"
                  variant={selectedIcon === icon.value ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-20 py-2"
                  onClick={() => setSelectedIcon(icon.value)}
                >
                  {icon.icon}
                  <span className="text-xs mt-1">{icon.label}</span>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="customDuration">
              Custom Shelf Life (days, optional)
            </Label>
            <Input
              id="customDuration"
              type="number"
              min="1"
              placeholder="Leave empty for default"
              value={customDuration}
              onChange={(e) => setCustomDuration(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full">
            Add Item
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
