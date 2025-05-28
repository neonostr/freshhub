import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Settings, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area";
import { ALL_ICONS, useIconManager } from '@/context/IconManager';
import { IconOption } from '@/data/productData';
import ShelfLifeList from './ShelfLifeList';
import CustomProductsList from './CustomProductsList';
import AddCustomProductForm from './AddCustomProductForm';
import { toast } from 'sonner';

interface IconManagerDialogProps {
  // No props needed for now
}

const IconManagerDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [showAddForm, setShowAddForm] = useState(false);
  const { availableIcons, allIcons, toggleIcon, isIconSelected } = useIconManager();
  const [selectedBuiltInProducts, setSelectedBuiltInProducts] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Initialize selectedBuiltInProducts based on availableIcons on mount
    const initialSelection: Record<string, boolean> = {};
    Object.keys(ALL_ICONS).forEach(key => {
      initialSelection[key] = isIconSelected(key);
    });
    setSelectedBuiltInProducts(initialSelection);
  }, [isIconSelected]);

  const handleBuiltInProductToggle = (iconValue: string) => {
    // Toggle the icon using the context
    toggleIcon(iconValue);

    // Update the local state for immediate UI feedback
    setSelectedBuiltInProducts(prev => ({
      ...prev,
      [iconValue]: !prev[iconValue]
    }));
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 right-4 z-50"
            data-manage-products-trigger
          >
            <Settings className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Manage Products</DialogTitle>
            <DialogDescription>
              Choose which products appear in your add menu and customize their shelf life.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="shelf-life">Shelf Life</TabsTrigger>
              <TabsTrigger value="custom">Custom Products</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="mt-6 overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Built-in Products</h3>
                  <div className="text-sm text-gray-500">
                    {Object.keys(selectedBuiltInProducts).filter(key => selectedBuiltInProducts[key]).length} of {Object.keys(ALL_ICONS).length} selected
                  </div>
                </div>
                
                <ScrollArea className="h-[400px]">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {Object.entries(ALL_ICONS).map(([key, icon]) => (
                      <div
                        key={key}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedBuiltInProducts[key] 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleBuiltInProductToggle(key)}
                      >
                        <div className="text-center">
                          <div className="text-sm font-medium truncate">{icon.label}</div>
                          <div className="text-xs text-gray-500 mt-1">{icon.shelfLife} days</div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Add Custom Products button */}
                    <div
                      className="p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer transition-colors hover:border-gray-400 flex flex-col items-center justify-center min-h-[80px]"
                      onClick={() => setActiveTab('custom')}
                    >
                      <Plus className="h-6 w-6 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500 text-center">Add Custom Products</span>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
            
            <TabsContent value="shelf-life" className="mt-6 overflow-hidden">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Customize Shelf Life</h3>
                <p className="text-sm text-gray-600">
                  Adjust the default shelf life for any product. This will affect all future items you add.
                </p>
                
                <ScrollArea className="h-[400px]">
                  <ShelfLifeList />
                </ScrollArea>
              </div>
            </TabsContent>
            
            <TabsContent value="custom" className="mt-6 overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Custom Products</h3>
                  <Button onClick={() => setShowAddForm(true)} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
                
                {showAddForm && (
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <AddCustomProductForm
                      onCancel={() => setShowAddForm(false)}
                      onSuccess={() => {
                        setShowAddForm(false);
                        toast.success("Custom product added successfully!");
                      }}
                    />
                  </div>
                )}
                
                <ScrollArea className="h-[350px]">
                  <CustomProductsList />
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IconManagerDialog;
