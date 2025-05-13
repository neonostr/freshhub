
import React, { useState } from 'react';
import { RotateCcw } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Item } from '@/types/item';
import { useItems } from '@/context/ItemsContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

interface CardActionsProps {
  item: Item;
  isCompact?: boolean;
  preventPropagation: (e: React.MouseEvent) => void;
}

const CardActions: React.FC<CardActionsProps> = ({ 
  item, 
  isCompact = false,
  preventPropagation
}) => {
  const { deleteItem, resetItem } = useItems();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Handle reset tap for mobile with animation
  const handleResetTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Set refreshing state to true to trigger animation
    setIsRefreshing(true);
    
    // Show toast notification
    toast({
      title: "Item Reset",
      description: `${item.name} freshness timer has been reset.`,
    });
    
    // Reset the item
    resetItem(item.id);
    
    // Reset animation state after a short delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 700); // Animation duration
  };

  // Show buttons only on desktop
  if (!isCompact && !isMobile) {
    return (
      <div className="flex justify-between mt-4 gap-2 card-actions">
        <Button 
          variant="outline" 
          size="sm"
          className="flex-1"
          onClick={(e) => { preventPropagation(e); deleteItem(item.id); }}
        >
          Remove
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 text-primary border-primary hover:bg-primary/10"
          onClick={(e) => { preventPropagation(e); resetItem(item.id); }}
        >
          Reset
        </Button>
      </div>
    );
  }

  // Only show reset icon for mobile
  if (isMobile) {
    return (
      <button 
        onClick={handleResetTap}
        className={`text-primary p-1 rounded-full hover:bg-gray-100 ${isRefreshing ? 'animate-spin' : ''}`}
      >
        <RotateCcw className="h-4 w-4" />
      </button>
    );
  }

  return null;
};

export default CardActions;
