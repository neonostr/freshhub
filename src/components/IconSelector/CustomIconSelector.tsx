
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FoodIconOption, IconSelectorProps } from '@/types/iconTypes';

const CustomIconSelector: React.FC<IconSelectorProps> = ({
  icons,
  selectedIcon,
  onSelect,
  className
}) => {
  return (
    <ScrollArea className={cn("h-40 w-full", className)}>
      <div className="grid grid-cols-4 gap-2 p-1">
        {icons.map((icon) => (
          <Button
            key={icon.value}
            type="button"
            variant={selectedIcon === icon.value ? "default" : "outline"}
            size="sm"
            className="p-2 h-10 flex items-center justify-center"
            onClick={() => onSelect(icon.value)}
            data-icon={icon.value}
            data-state={selectedIcon === icon.value ? "active" : "inactive"}
          >
            <span className="text-sm font-medium">{icon.name.charAt(0).toUpperCase()}</span>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CustomIconSelector;
