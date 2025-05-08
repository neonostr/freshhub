
import React from 'react';
import { Button } from '@/components/ui/button';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FoodIconOption, IconSelectorProps } from '@/types/iconTypes';

const CustomIconSelector: React.FC<IconSelectorProps> = ({
  icons,
  selectedIcon,
  onSelect,
  className
}) => {
  // Helper to render an icon from the Lucide library by name
  const renderIcon = (iconName: string) => {
    const pascalCaseName = iconName.charAt(0).toUpperCase() + 
      iconName.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase());
    
    const IconComponent = (LucideIcons as any)[pascalCaseName];
    
    if (IconComponent) {
      return <IconComponent size={20} />;
    }
    
    return <div className="h-5 w-5 flex items-center justify-center">?</div>;
  };

  return (
    <ScrollArea className={cn("h-40 w-full", className)}>
      <div className="grid grid-cols-4 gap-2 p-1">
        {icons.map((icon) => (
          <Button
            key={icon.icon}
            type="button"
            variant={selectedIcon === icon.icon ? "default" : "outline"}
            size="sm"
            className="p-2 h-10"
            onClick={() => onSelect(icon.icon)}
            data-icon={icon.icon} // Add data attribute for icon name
          >
            {renderIcon(icon.icon)}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CustomIconSelector;
