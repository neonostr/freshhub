
import React from 'react';
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
    // For mobile, we previously had a reset button here,
    // but it's redundant so we're removing it
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
