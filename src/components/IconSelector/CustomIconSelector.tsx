
import React from 'react';
import { Button } from '@/components/ui/button';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FoodIconOption } from '@/types/iconTypes';

interface CustomIconSelectorProps {
  icons: FoodIconOption[];
  selectedIcon: string;
  onSelect: (iconName: string) => void;
  className?: string;
}

const CustomIconSelector: React.FC<CustomIconSelectorProps> = ({
  icons,
  selectedIcon,
  onSelect,
  className
}) => {
  // Helper to render an icon from the Lucide library by name
  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName.charAt(0).toUpperCase() + iconName.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase())];
    
    if (IconComponent) {
      return <IconComponent className="h-5 w-5" />;
    }
    
    return <div className="h-5 w-5 flex items-center justify-center">?</div>;
  };

  return (
    <ScrollArea className="h-32 w-full">
      <div className={cn("grid grid-cols-4 gap-2 p-1", className)}>
        {icons.map((icon) => (
          <Button
            key={icon.name}
            type="button"
            variant={selectedIcon === icon.icon ? "default" : "outline"}
            size="sm"
            className="p-2 h-10"
            onClick={() => onSelect(icon.icon)}
          >
            {renderIcon(icon.icon)}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CustomIconSelector;
