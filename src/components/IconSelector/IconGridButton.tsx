
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface IconGridButtonProps {
  value: string;
  label: string;
  icon: React.ReactNode; // Still keep this for compatibility
  isSelected?: boolean;
  onClick: () => void;
  className?: string;
  renderIcon?: (icon: React.ReactNode) => React.ReactNode; // Make optional
}

const IconGridButton: React.FC<IconGridButtonProps> = ({
  value,
  label,
  isSelected = false,
  onClick,
  className,
}) => {
  return (
    <Button
      key={value}
      type="button"
      variant={isSelected ? "default" : "outline"}
      className={cn("h-20 py-2", className)}
      onClick={onClick}
    >
      <span className="text-xs text-center truncate w-full px-1">{label}</span>
    </Button>
  );
};

export default IconGridButton;
