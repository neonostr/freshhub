
import React from 'react';
import { Item } from '@/types/item';
import { calculateFreshnessLevel } from '@/utils/itemUtils';
import { Card, CardContent } from '@/components/ui/card';
import { useItems } from '@/context/ItemsContext';
import { useIsMobile } from '@/hooks/use-mobile';

// Import our newly created components
import ItemIcon from './ItemIcon';
import FreshnessBadge, { getFreshnessColor } from './FreshnessBadge';
import ItemDetails from './ItemDetails';
import CardActions from './CardActions';
import SwipeableCard from './SwipeableCard';

interface ItemCardProps {
  item: Item;
  isCompact?: boolean;
  onClick?: () => void;
  isExpandable?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ 
  item, 
  isCompact = false, 
  onClick,
  isExpandable = false
}) => {
  const { deleteItem, resetItem } = useItems();
  const isMobile = useIsMobile();
  const freshnessLevel = calculateFreshnessLevel(item);
  
  const handleCardClick = (e: React.MouseEvent) => {
    // Only handle clicks on the card itself, not on buttons
    if (isExpandable && 
        e.target instanceof Element && 
        !e.target.closest('button')) {
      onClick?.();
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    if (e) e.stopPropagation();
    deleteItem(item.id);
  };

  const handleReset = (e: React.MouseEvent) => {
    if (e) e.stopPropagation();
    resetItem(item.id);
  };

  // Card content that's shared between mobile and desktop
  const cardContent = (
    <Card 
      className={`relative overflow-hidden transition-all hover:shadow-md ${isExpandable ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
    >
      <div className={`h-2 ${getFreshnessColor(freshnessLevel)}`} />
      <CardContent className={`p-4 transition-all duration-300 ease-in-out ${isExpandable ? 'expandable-card' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <ItemIcon iconId={item.icon} />
            <h3 className="font-medium text-lg">{item.name}</h3>
          </div>
          <div className="flex items-center gap-2">
            <FreshnessBadge level={freshnessLevel} />
            
            {/* Mobile-specific reset button handled by CardActions */}
            {isMobile && <CardActions onDelete={handleDelete} onReset={handleReset} isCompact={true} />}
          </div>
        </div>
        
        {/* Item details (date opened, time open) */}
        <ItemDetails openedDate={item.openedDate} isCompact={isCompact} />
        
        {/* Desktop-specific action buttons */}
        <CardActions onDelete={handleDelete} onReset={handleReset} isCompact={isCompact} />
      </CardContent>
    </Card>
  );

  // On mobile, wrap the card with swipeable behavior
  if (isMobile) {
    return (
      <SwipeableCard onDelete={() => deleteItem(item.id)}>
        {cardContent}
      </SwipeableCard>
    );
  }

  // On desktop, just return the card
  return cardContent;
};

export default ItemCard;
