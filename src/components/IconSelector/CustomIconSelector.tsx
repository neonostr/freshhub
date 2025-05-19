
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
            key={icon.icon}
            type="button"
            variant={selectedIcon === icon.icon ? "default" : "outline"}
            size="sm"
            className="h-10"
            onClick={() => onSelect(icon.icon)}
            data-icon={icon.icon}
            data-state={selectedIcon === icon.icon ? "active" : "inactive"}
          >
            {icon.displayName || icon.name}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CustomIconSelector;
