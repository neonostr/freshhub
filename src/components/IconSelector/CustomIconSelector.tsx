
import React from 'react';
import { Button } from '@/components/ui/button';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FoodIconOption, IconSelectorProps } from '@/types/iconTypes';
import { Icon } from '@iconify/react';
import { useToast } from '@/hooks/use-toast';

const CustomIconSelector: React.FC<IconSelectorProps> = ({
  icons,
  selectedIcon,
  onSelect,
  className
}) => {
  const { toast } = useToast();
  
  // Helper to render an icon - supports both Lucide and Iconify icons
  const renderIcon = (iconName: string) => {
    // Check if this is an Iconify icon (contains a colon)
    if (iconName.includes(':')) {
      try {
        return <Icon icon={iconName} width={20} height={20} className="text-foreground" />;
      } catch (error) {
        console.warn(`Failed to render Iconify icon: ${iconName}`, error);
        // Fallback to question mark for failed Iconify icons
        return (
          <div className="h-5 w-5 flex items-center justify-center text-xs">?</div>
        );
      }
    }
    
    // Otherwise try to render a Lucide icon (for backward compatibility)
    
    // Convert kebab-case to PascalCase for Lucide icon names
    const pascalCaseName = iconName.charAt(0).toUpperCase() + 
      iconName.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase());
    
    // Specific mappings for food items that don't have dedicated icons
    const iconMappings: Record<string, string> = {
      'bread': 'Cookie', // Better than Bed for bread
      'bagels': 'Circle', // Circle shape for bagels
      'tortillas': 'CircleDot', // Flat round shape
      'pretzels': 'CircleDashed', // Twisted shape suggestion
      'bowl': 'CircleOff',
      'pumpkin': 'CircleDot',
      'watermelon': 'Cherry', // Use Cherry instead for watermelon
      'water-filter': 'Filter', // Use Filter for water filter
    };
    
    // Check if we have a special mapping for this icon
    const mappedName = iconMappings[iconName] || pascalCaseName;
    
    // Cast to unknown first, then to the specific type we need
    const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<any>>)[mappedName];
    
    if (IconComponent) {
      return React.createElement(IconComponent, { size: 20 });
    }
    
    // Fallback rendering if icon not found
    return (
      <div className="h-5 w-5 flex items-center justify-center text-xs">?</div>
    );
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
