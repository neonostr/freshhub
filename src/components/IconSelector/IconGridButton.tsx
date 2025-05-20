
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
  // Get first letter for display
  const firstLetter = label.charAt(0).toUpperCase();
  
  return (
    <Button
      key={value}
      type="button"
      variant={isSelected ? "default" : "outline"}
      className={cn("flex flex-col items-center justify-center h-20 py-2", className)}
      onClick={onClick}
    >
      <div className="font-bold text-lg mb-1">{firstLetter}</div>
      <span className="text-xs mt-1 text-center truncate w-full px-1">{label}</span>
    </Button>
  );
};

export default IconGridButton;
