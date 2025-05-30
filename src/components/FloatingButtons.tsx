
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Minimize, Maximize } from 'lucide-react';

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
  // Consistent positioning with the settings button in Index.tsx
  const filterButtonStyle = {
    position: 'fixed' as const,
    zIndex: 50,
    bottom: `calc(env(safe-area-inset-bottom) + 1.5rem)`,
    right: '6rem', // Middle position
    width: '3.5rem',
    height: '3.5rem',
    borderRadius: '50%',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
  };

  const compactButtonStyle = {
    position: 'fixed' as const,
    zIndex: 50,
    bottom: `calc(env(safe-area-inset-bottom) + 1.5rem)`,
    right: '10.5rem', // Rightmost position
    width: '3.5rem',
    height: '3.5rem',
    borderRadius: '50%',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
  };

  return (
    <>
      {/* Filter Button */}
      <Button
        style={filterButtonStyle}
        size="icon"
        variant="default"
        onClick={onFilterClick}
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
    </>
  );
};

export default FloatingButtons;
