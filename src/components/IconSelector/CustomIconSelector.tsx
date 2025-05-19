
import React from 'react';
import { Button } from '@/components/ui/button';
import * as TablerIcons from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FoodIconOption, IconSelectorProps } from '@/types/iconTypes';

const CustomIconSelector: React.FC<IconSelectorProps> = ({
  icons,
  selectedIcon,
  onSelect,
  className
}) => {
  // Helper to render an icon from the Tabler library by name
  const renderIcon = (iconName: string) => {
    // Convert kebab-case to PascalCase with Icon prefix for Tabler icon names
    const pascalCase = iconName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
    
    const iconComponentName = `Icon${pascalCase}`;
    
    // Get the component from TablerIcons
    const IconComponent = (TablerIcons as Record<string, React.ComponentType<any>>)[iconComponentName];
    
    if (IconComponent) {
      return <IconComponent size={20} stroke={1.5} />;
    }
    
    // Fallback rendering if icon not found
    return <TablerIcons.IconQuestionMark size={20} stroke={1.5} />;
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
            data-icon={icon.icon}
            data-state={selectedIcon === icon.icon ? "active" : "inactive"}
          >
            {renderIcon(icon.icon)}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CustomIconSelector;
