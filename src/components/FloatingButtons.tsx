
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
  
  // Base position styles with proper PWA support using safe-area-inset
  const baseButtonStyle = {
    position: 'fixed' as const,
    zIndex: 50,
    bottom: `calc(env(safe-area-inset-bottom, 0px) + 1.5rem)`,
    width: '3.5rem',
    height: '3.5rem',
    borderRadius: '50%',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
  };

  // Position styles based on handedness
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
    [handedness === 'right' ? 'left' : 'right']: `calc(env(safe-area-inset-left, 0px) + env(safe-area-inset-right, 0px) + 1.5rem)`, // Opposite side with safe area
  };

  const handleFilterClick = () => {
    window.dispatchEvent(new CustomEvent('toggle-freshness-filter'));
  };

  const handleCompactModeClick = () => {
    window.dispatchEvent(new CustomEvent('toggle-compact-mode'));
  };

  const handleSettingsClick = () => {
    window.dispatchEvent(new CustomEvent('open-settings-dialog'));
  };

  return (
    <>
      {/* Filter Button */}
      <Button
        style={filterButtonStyle}
        size="icon"
        variant="default"
        onClick={handleFilterClick}
        aria-label="Toggle freshness filter"
      >
        <Filter className="h-6 w-6" />
      </Button>

      {/* Compact Mode Button */}
      <Button
        style={compactButtonStyle}
        size="icon"
        variant="default"
        onClick={handleCompactModeClick}
        aria-label={isCompactMode ? "Exit compact mode" : "Enter compact mode"}
      >
        {isCompactMode ? <Maximize className="h-6 w-6" /> : <Minimize className="h-6 w-6" />}
      </Button>

      {/* Settings Button */}
      <Button
        style={settingsButtonStyle}
        size="icon"
        variant="outline"
        onClick={handleSettingsClick}
        aria-label="Open settings"
        data-settings-button="true"
      >
        <Settings className="h-6 w-6" />
      </Button>
    </>
  );
};

export default FloatingButtons;
