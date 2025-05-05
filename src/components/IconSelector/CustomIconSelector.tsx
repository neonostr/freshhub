
import React from 'react';
import { Button } from '@/components/ui/button';

interface IconOption {
  name: string;
  component: React.ReactElement;
}

interface CustomIconSelectorProps {
  icons: IconOption[];
  selectedIcon: string;
  onSelect: (iconName: string) => void;
}

const CustomIconSelector: React.FC<CustomIconSelectorProps> = ({
  icons,
  selectedIcon,
  onSelect
}) => {
  return (
    <div className="grid grid-cols-4 gap-2 mt-2 max-h-32 overflow-y-auto p-1">
      {icons.map((icon) => (
        <Button
          key={icon.name}
          type="button"
          variant={selectedIcon === icon.name ? "default" : "outline"}
          size="sm"
          className="p-2 h-10"
          onClick={() => onSelect(icon.name)}
        >
          {React.cloneElement(icon.component, { className: "h-5 w-5" })}
        </Button>
      ))}
    </div>
  );
};

export default CustomIconSelector;
