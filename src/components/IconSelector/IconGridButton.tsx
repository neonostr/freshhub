
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface IconGridButtonProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  isSelected?: boolean;
  onClick: () => void;
  className?: string;
  renderIcon: (icon: React.ReactNode) => React.ReactNode;
}

const IconGridButton: React.FC<IconGridButtonProps> = ({
  value,
  label,
  icon,
  isSelected = false,
  onClick,
  className,
  renderIcon
}) => {
  return (
    <Button
      key={value}
      type="button"
      variant={isSelected ? "default" : "outline"}
      className={cn("flex flex-col items-center justify-center h-20 py-2", className)}
      onClick={onClick}
    >
      <div className="food-icon-wrapper">
        {renderIcon(icon)}
      </div>
      <span className="text-xs mt-1 text-center truncate w-full px-1">{label}</span>
    </Button>
  );
};

export default IconGridButton;
