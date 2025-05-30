
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Minimize, Maximize } from 'lucide-react';
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

  // Reduced spacing by 80% - from 5rem to 1rem between buttons
  const getButtonStyle = (buttonIndex: number) => {
    const basePosition = 1.5;
    const buttonSpacing = 1; // Reduced from 5 to 1 (80% reduction)
    const position = basePosition + (buttonIndex * buttonSpacing);
    
    return {
      position: 'fixed' as const,
      zIndex: 50,
      bottom: `calc(env(safe-area-inset-bottom) + 1.5rem)`,
      right: `${position}rem`, // Always align to right regardless of handedness
      width: '3.5rem',
      height: '3.5rem',
      borderRadius: '50%',
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
    };
  };

  return (
    <>
      {/* Filter Button - Position 2 (rightmost) */}
      <Button
        style={getButtonStyle(2)}
        size="icon"
        variant="default"
        onClick={onFilterClick}
      >
        <Filter className="h-6 w-6" />
      </Button>

      {/* Compact Mode Button - Position 1 (middle) */}
      <Button
        style={getButtonStyle(1)}
        size="icon"
        variant="default"
        onClick={onCompactModeClick}
      >
        {isCompactMode ? <Maximize className="h-6 w-6" /> : <Minimize className="h-6 w-6" />}
      </Button>
    </>
  );
};

export default FloatingButtons;
