
import { useState } from 'react';
import { EditableProductProps } from '@/types/iconTypes';

export const useDialogState = () => {
  const [editingProduct, setEditingProduct] = useState<EditableProductProps | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState('');
  const [currentTab, setCurrentTab] = useState('selection');
  const [premiumDialogOpen, setPremiumDialogOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showPWAInstructions, setShowPWAInstructions] = useState(false);

  return {
    editingProduct,
    setEditingProduct,
    isAddingProduct,
    setIsAddingProduct,
    deleteDialogOpen,
    setDeleteDialogOpen,
    productToDelete,
    setProductToDelete,
    currentTab,
    setCurrentTab,
    premiumDialogOpen,
    setPremiumDialogOpen,
    isOpen,
    setIsOpen,
    showPWAInstructions,
    setShowPWAInstructions,
  };
};
