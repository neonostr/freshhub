
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Milk, Coffee, Apple, Egg, Banana, Trash, Plus, Box, Bottle, Cookie, Pizza, Sandwich, Beef } from "lucide-react";
import { useItems } from '@/context/ItemsContext';
import { getCategoryForIcon } from '@/utils/itemUtils';

// Expanded icons list with 9 total options including a generic one
const icons = [
  { value: 'milk', label: 'Milk', icon: <Milk className="h-5 w-5" /> },
  { value: 'coffee', label: 'Coffee', icon: <Coffee className="h-5 w-5" /> },
  { value: 'apple', label: 'Apple', icon: <Apple className="h-5 w-5" /> },
  { value: 'egg', label: 'Egg', icon: <Egg className="h-5 w-5" /> },
  { value: 'banana', label: 'Banana', icon: <Banana className="h-5 w-5" /> },
  { value: 'bottle', label: 'Bottle', icon: <Bottle className="h-5 w-5" /> },
  { value: 'cookie', label: 'Cookie', icon: <Cookie className="h-5 w-5" /> },
  { value: 'pizza', label: 'Pizza', icon: <Pizza className="h-5 w-5" /> },
  { value: 'box', label: 'Generic', icon: <Box className="h-5 w-5" /> },
];

// Categories with shelf life in days shown
const categories = [
  { value: 'dairy', label: 'Dairy (7 days)' },
  { value: 'condiments', label: 'Condiments (30 days)' },
  { value: 'coffee', label: 'Coffee & Tea (14 days)' },
  { value: 'produce', label: 'Fruits & Vegetables (5 days)' },
  { value: 'bakery', label: 'Bakery (5 days)' },
  { value: 'ready-meals', label: 'Ready Meals (3 days)' },
  { value: 'snacks', label: 'Snacks (14 days)' },
  { value: 'other', label: 'Other (7 days)' },
];

const AddItemDialog: React.FC = () => {
  const { addItem } = useItems();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('milk');
  const [category, setCategory] = useState('dairy');
  const [customDuration, setCustomDuration] = useState<string>('');
  const [isNameFieldFocused, setIsNameFieldFocused] = useState(false);

  // Update name and category when icon is selected
  useEffect(() => {
    if (!isNameFieldFocused) {
      setName(icons.find(icon => icon.value === selectedIcon)?.label || '');
    }
    
    // Set appropriate category based on icon
    const suggestedCategory = getCategoryForIcon(selectedIcon);
    setCategory(suggestedCategory);
  }, [selectedIcon, isNameFieldFocused]);

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

  const handleIconSelect = (iconValue: string) => {
    setSelectedIcon(iconValue);
    setIsNameFieldFocused(false);
  };

  const handleNameFocus = () => {
    setIsNameFieldFocused(true);
    setName('');
  };

  const handleNameBlur = () => {
    setIsNameFieldFocused(false);
    if (name.trim() === '') {
      setName(icons.find(icon => icon.value === selectedIcon)?.label || '');
    }
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
          {/* Icon selection moved to the top */}
          <div className="space-y-2">
            <Label>Choose an Icon</Label>
            <div className="grid grid-cols-3 gap-2">
              {icons.map((icon) => (
                <Button
                  key={icon.value}
                  type="button"
                  variant={selectedIcon === icon.value ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-20 py-2"
                  onClick={() => handleIconSelect(icon.value)}
                >
                  {icon.icon}
                  <span className="text-xs mt-1">{icon.label}</span>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Item name field */}
          <div className="space-y-2">
            <Label htmlFor="name">Item Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              onFocus={handleNameFocus}
              onBlur={handleNameBlur}
              placeholder="e.g., Milk, Coffee, Sauce"
              required 
            />
          </div>
          
          {/* Category selection */}
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
          
          {/* Custom shelf life */}
          <div className="space-y-2">
            <Label htmlFor="customDuration">
              Custom Shelf Life (days, optional)
            </Label>
            <Input
              id="customDuration"
              type="number"
              inputMode="numeric"
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
