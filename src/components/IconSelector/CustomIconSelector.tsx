
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
    // Convert kebab-case to PascalCase for Lucide icon names
    const pascalCaseName = iconName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    
    // Specific mappings for food items that don't have dedicated icons
    const iconMappings: Record<string, string> = {
      'bread': 'Cookie', // Better than Bed for bread
      'bagels': 'Circle', // Circle shape for bagels
      'tortillas': 'CircleDot', // Flat round shape
      'pretzels': 'CircleDashed', // Twisted shape suggestion
      'bowl': 'CircleOff',
      'pumpkin': 'CircleDot',
      'watermelon': 'Watermelon', // Use dedicated watermelon icon
      'water-filter': 'Filter', // Use Filter for water filter
    };
    
    // Check if we have a special mapping for this icon
    const mappedName = iconMappings[iconName] || pascalCaseName;
    
    // Cast to unknown first, then to the specific type we need
    const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<any>>)[mappedName];
    
    if (IconComponent) {
      return React.createElement(IconComponent, { size: 20 });
    }
    
    // Log the missing icon to help with debugging
    console.warn(`Icon not found: ${iconName} (mapped to ${mappedName})`);
    
    // Fallback rendering if icon not found
    return React.createElement('div', {
      className: "h-5 w-5 flex items-center justify-center text-muted-foreground"
    }, '?');
  };

  return (
    <ScrollArea className={cn("h-40 w-full", className)}>
      <div className="grid grid-cols-5 gap-2 p-1">
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
