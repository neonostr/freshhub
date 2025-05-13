
import React from 'react';
import { RotateCcw } from "lucide-react";
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface CardActionsProps {
  onDelete: (e: React.MouseEvent) => void;
  onReset: (e: React.MouseEvent) => void;
  isCompact?: boolean;
}

const CardActions: React.FC<CardActionsProps> = ({ onDelete, onReset, isCompact = false }) => {
  const isMobile = useIsMobile();
  
  // Don't render actions if compact or not on desktop
  if (isCompact || isMobile) {
    // For mobile, only show the reset button
    if (isMobile) {
      return (
        <button 
          onClick={onReset}
          className="text-primary p-1 rounded-full hover:bg-gray-100"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      );
    }
    return null;
  }
  
  const preventPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="flex justify-between mt-4 gap-2 card-actions">
      <Button 
        variant="outline" 
        size="sm"
        className="flex-1"
        onClick={(e) => { preventPropagation(e); onDelete(e); }}
      >
        Remove
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex-1 text-primary border-primary hover:bg-primary/10"
        onClick={(e) => { preventPropagation(e); onReset(e); }}
      >
        Reset
      </Button>
    </div>
  );
};

export default CardActions;
