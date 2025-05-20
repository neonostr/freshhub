
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface IconGridButtonProps {
  value: string;
  label: string;
  isSelected?: boolean;
  onClick: () => void;
  className?: string;
}

const IconGridButton: React.FC<IconGridButtonProps> = ({
  value,
  label,
  isSelected = false,
  onClick,
  className
}) => {
  return (
    <Button
      key={value}
      type="button"
      variant={isSelected ? "default" : "outline"}
      className={cn("flex items-center justify-center h-20 py-2", className)}
      onClick={onClick}
    >
      <span className="text-sm text-center truncate w-full px-1">{label}</span>
    </Button>
  );
};

export default IconGridButton;
