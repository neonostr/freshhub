import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useIconManager } from '@/context/IconManager';
import { EditableProductProps } from '@/types/iconTypes';
import { IconOption } from '@/data/productData';
import { useToast } from '@/hooks/use-toast';
import { useSubscription } from '@/context/SubscriptionContext';
import PremiumUpgradeDialog from './PremiumUpgradeDialog';
import PWAInstallInstructions from './PWAInstallInstructions';
import { usePWA } from '@/hooks/usePWA';

// Import new components
import { useDialogState } from './IconManagerDialog/hooks/useDialogState';
import { useShelfLifeManagement } from './IconManagerDialog/hooks/useShelfLifeManagement';
import ProductSelectionTab from './IconManagerDialog/components/ProductSelectionTab';
import ShelfLifeTab from './IconManagerDialog/components/ShelfLifeTab';
import CustomProductsTab from './IconManagerDialog/components/CustomProductsTab';
import SettingsTab from './IconManagerDialog/components/SettingsTab';
import AboutTab from './IconManagerDialog/components/AboutTab';
import DialogActions from './IconManagerDialog/components/DialogActions';

const IconManagerDialog: React.FC = () => {
  const { toast } = useToast();
  const {
    allIcons,
    addCustomProduct,
    updateProductName,
    deleteCustomProduct,
  } = useIconManager();
  const { status } = useSubscription();
  const isPremium = status === 'premium';

  // PWA hook for install functionality
  const { isInstallable, promptInstall } = usePWA();

  // Custom hooks for state management
  const dialogState = useDialogState();
  const shelfLifeState = useShelfLifeManagement();

  // Listen for settings button click events
  React.useEffect(() => {
    const handleSettingsClick = (event: Event) => {
      dialogState.setIsOpen(true);
      if ((event as CustomEvent).detail && (event as CustomEvent).detail.tab) {
        dialogState.setCurrentTab((event as CustomEvent).detail.tab);
      }
    };

    window.addEventListener('open-settings-dialog', handleSettingsClick);
    return () => {
      window.removeEventListener('open-settings-dialog', handleSettingsClick);
    };
  }, [dialogState]);

  // Start editing a custom product
  const startEditingProduct = (product: IconOption) => {
    if (!isPremium) {
      dialogState.setPremiumDialogOpen(true);
      return;
    }
    dialogState.setEditingProduct({
      productId: product.value,
      name: product.label,
      shelfLife: product.shelfLife
    });
  };

  // Confirm delete custom product
  const confirmDelete = (iconValue: string) => {
    if (!isPremium) {
      dialogState.setPremiumDialogOpen(true);
      return;
    }
    dialogState.setProductToDelete(iconValue);
    dialogState.setDeleteDialogOpen(true);
  };

  // Delete custom product
  const handleDeleteProduct = () => {
    if (dialogState.productToDelete) {
      const productName = allIcons[dialogState.productToDelete]?.label;
      deleteCustomProduct(dialogState.productToDelete);
      toast({
        title: "Product deleted",
        description: `"${productName}" has been removed along with any tracked items using it.`
      });
      dialogState.setDeleteDialogOpen(false);
      dialogState.setProductToDelete('');
    }
  };

  // Handle updating edited product fields
  const updateEditingField = (field: string, value: string | number) => {
    if (dialogState.editingProduct) {
      dialogState.setEditingProduct({
        ...dialogState.editingProduct,
        [field]: value
      });
    }
  };

  // Handle saving edited product changes
  const handleSaveProductChanges = () => {
    if (dialogState.editingProduct) {
      updateProductName(dialogState.editingProduct.productId, dialogState.editingProduct.name);
      addCustomProduct({
        value: dialogState.editingProduct.productId,
        label: dialogState.editingProduct.name,
        shelfLife: dialogState.editingProduct.shelfLife
      });
      dialogState.setEditingProduct(null);
    }
  };

  // Handle adding a new custom product
  const handleAddCustomProduct = (newProduct: IconOption) => {
    addCustomProduct({ ...newProduct });
    dialogState.setIsAddingProduct(false);
  };

  // Navigate to custom products tab
  const handleNavigateToCustomProducts = () => {
    dialogState.setCurrentTab('custom');
    if (!isPremium) {
      dialogState.setPremiumDialogOpen(true);
      return;
    }
    dialogState.setIsAddingProduct(true);
  };

  // Handle install app button click
  const handleInstallApp = async () => {
    if (isInstallable) {
      const success = await promptInstall();
      if (!success) {
        dialogState.setShowPWAInstructions(true);
      }
    } else {
      dialogState.setShowPWAInstructions(true);
    }
  };

  // Handle upgrade click from settings tab
  const handleUpgradeFromSettings = () => {
    dialogState.setPremiumDialogOpen(true);
  };

  return (
    <>
      <Dialog open={dialogState.isOpen} onOpenChange={dialogState.setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Products</DialogTitle>
            <DialogDescription>
              Customize your products, shelf life settings and add custom items.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col h-[500px]">
            <Tabs 
              defaultValue="selection" 
              className="w-full h-full flex flex-col" 
              value={dialogState.currentTab} 
              onValueChange={dialogState.setCurrentTab}
            >
              <TabsList className="grid grid-cols-5">
                <TabsTrigger value="selection">Products</TabsTrigger>
                <TabsTrigger value="shelfLife">Shelf Life</TabsTrigger>
                <TabsTrigger value="custom">Custom</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-hidden mt-4">
                <ProductSelectionTab 
                  onNavigateToCustomProducts={handleNavigateToCustomProducts}
                />
                
                <ShelfLifeTab 
                  editingValues={shelfLifeState.editingValues}
                  handleShelfLifeFocus={shelfLifeState.handleShelfLifeFocus}
                  handleShelfLifeChange={shelfLifeState.handleShelfLifeChange}
                  handleShelfLifeBlur={shelfLifeState.handleShelfLifeBlur}
                  getDisplayValue={shelfLifeState.getDisplayValue}
                />
                
                <CustomProductsTab 
                  editingProduct={dialogState.editingProduct}
                  setEditingProduct={dialogState.setEditingProduct}
                  isAddingProduct={dialogState.isAddingProduct}
                  setIsAddingProduct={dialogState.setIsAddingProduct}
                  setPremiumDialogOpen={dialogState.setPremiumDialogOpen}
                  handleAddCustomProduct={handleAddCustomProduct}
                  startEditingProduct={startEditingProduct}
                  handleSaveProductChanges={handleSaveProductChanges}
                  confirmDelete={confirmDelete}
                  updateEditingField={updateEditingField}
                />
                
                <SettingsTab onUpgradeClick={handleUpgradeFromSettings} />
                
                <AboutTab onInstallApp={handleInstallApp} />
              </div>
              
              <DialogActions 
                currentTab={dialogState.currentTab}
                isAddingProduct={dialogState.isAddingProduct}
                editingProduct={dialogState.editingProduct}
                onClose={() => dialogState.setIsOpen(false)}
                onCancelAdding={() => dialogState.setIsAddingProduct(false)}
                onAddProduct={handleAddCustomProduct}
                onSaveEdit={(product) => {
                  addCustomProduct(product);
                  dialogState.setEditingProduct(null);
                }}
                onCancelEdit={() => dialogState.setEditingProduct(null)}
              />
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Confirmation dialog for deleting custom products */}
      <AlertDialog open={dialogState.deleteDialogOpen} onOpenChange={dialogState.setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Custom Product?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this product from your collection.
              Any items currently tracked with this product will also be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => dialogState.setDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Premium upgrade dialog */}
      <PremiumUpgradeDialog open={dialogState.premiumDialogOpen} onOpenChange={dialogState.setPremiumDialogOpen} />
      
      {/* PWA Install Instructions Dialog */}
      <PWAInstallInstructions
        isOpen={dialogState.showPWAInstructions}
        onClose={() => dialogState.setShowPWAInstructions(false)}
      />
    </>
  );
};

export default IconManagerDialog;
