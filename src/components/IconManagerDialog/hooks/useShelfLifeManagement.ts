
import { useState } from 'react';
import { useIconManager } from '@/context/IconManager';

export const useShelfLifeManagement = () => {
  const { allIcons, updateIconShelfLife } = useIconManager();
  const [editingValues, setEditingValues] = useState<Record<string, string>>({});

  const handleShelfLifeFocus = (iconValue: string) => {
    setEditingValues(prev => ({
      ...prev,
      [iconValue]: allIcons[iconValue].shelfLife.toString()
    }));
  };

  const handleShelfLifeChange = (iconValue: string, value: string) => {
    setEditingValues(prev => ({
      ...prev,
      [iconValue]: value
    }));

    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue > 0) {
      updateIconShelfLife(iconValue, numValue);
    }
  };

  const handleShelfLifeBlur = (iconValue: string) => {
    const currentValue = editingValues[iconValue];
    const numValue = parseInt(currentValue, 10);
    if (currentValue === '' || isNaN(numValue) || numValue <= 0) {
      setEditingValues(prev => {
        const newValues = { ...prev };
        delete newValues[iconValue];
        return newValues;
      });
    }
  };

  const getDisplayValue = (iconValue: string) => {
    return editingValues[iconValue] !== undefined 
      ? editingValues[iconValue] 
      : allIcons[iconValue].shelfLife.toString();
  };

  return {
    editingValues,
    handleShelfLifeFocus,
    handleShelfLifeChange,
    handleShelfLifeBlur,
    getDisplayValue,
  };
};
