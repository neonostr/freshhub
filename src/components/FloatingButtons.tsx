
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Minimize, Maximize, Settings } from 'lucide-react';
import { useHandedness } from '@/context/HandednessContext';

interface FloatingButtonsProps {
  onFilterClick: () => void;
  onCompactModeClick: () => void;
  isCompactMode: boolean;
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({
  onFilterClick,
  onCompactModeClick,
  isCompactMode
}) => {
  const { handedness } = useHandedness();
  
  // Base position styles
  const baseButtonStyle = {
    position: 'fixed' as const,
    zIndex: 50,
    bottom: `calc(env(safe-area-inset-bottom) + 1.5rem)`,
    width: '3.5rem',
    height: '3.5rem',
    borderRadius: '50%',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
  };

  // Position styles based on handedness
  const addButtonStyle = {
    ...baseButtonStyle,
    [handedness === 'right' ? 'right' : 'left']: '1.5rem', // Closest position
  };

  const filterButtonStyle = {
    ...baseButtonStyle,
    [handedness === 'right' ? 'right' : 'left']: '6rem', // Middle position
  };

  const compactButtonStyle = {
    ...baseButtonStyle,
    [handedness === 'right' ? 'right' : 'left']: '10.5rem', // Far position
  };

  const settingsButtonStyle = {
    ...baseButtonStyle,
    [handedness === 'right' ? 'left' : 'right']: '1.5rem', // Opposite side
  };

  const handleFilterClick = () => {
    onFilterClick();
  };

  const handleSettingsClick = () => {
    const manageButton = document.querySelector('[data-manage-products-trigger]') as HTMLButtonElement;
    if (manageButton) {
      manageButton.click();
    }
  };

  return (
    <>
      {/* Add Button */}
      <Button
        style={addButtonStyle}
        size="icon"
        variant="default"
        onClick={() => {
          // Trigger the add item dialog
          const addButton = document.querySelector('[data-add-item-trigger]') as HTMLButtonElement;
          if (addButton) {
            addButton.click();
          }
        }}
      >
        <span className="text-2xl">+</span>
      </Button>

      {/* Filter Button */}
      <Button
        style={filterButtonStyle}
        size="icon"
        variant="default"
        onClick={handleFilterClick}
      >
        <Filter className="h-6 w-6" />
      </Button>

      {/* Compact Mode Button */}
      <Button
        style={compactButtonStyle}
        size="icon"
        variant="default"
        onClick={onCompactModeClick}
      >
        {isCompactMode ? <Maximize className="h-6 w-6" /> : <Minimize className="h-6 w-6" />}
      </Button>

      {/* Settings Button - positioned on opposite side */}
      <Button
        style={settingsButtonStyle}
        size="icon"
        variant="outline"
        onClick={handleSettingsClick}
      >
        <Settings className="h-6 w-6" />
      </Button>
    </>
  );
};

export default FloatingButtons;
