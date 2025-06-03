import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Item, FreshnessLevel } from '@/types/item';
import { calculateFreshnessLevel, formatOpenedDate, formatTimeOpen, calculateDaysUntilExpiry } from '@/utils/itemUtils';
import { Calendar, Clock, RotateCcw, Trash2 } from "lucide-react";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useItems } from '@/context/ItemsContext';
import { useIconManager } from '@/context/IconManager';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHandedness } from '@/context/HandednessContext';

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
  const { allIcons } = useIconManager();
  const { handedness } = useHandedness();
  const isMobile = useIsMobile();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  
  const SWIPE_THRESHOLD = 80; // px needed to trigger delete
  
  // Memoize the freshness level to prevent unnecessary recalculations
  const freshnessLevel = useMemo(() => calculateFreshnessLevel(item), [item]);
  
  // Calculate days until expiry
  const daysLeft = useMemo(() => calculateDaysUntilExpiry(item), [item]);
  
  // Determine swipe direction based on handedness
  const isRightHanded = handedness === 'right';
  
  // Handle touch events for swipe-to-delete (direction depends on handedness)
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  // UPDATED: Less sensitive swipe logic
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    // Ignore very small horizontal swipes (e.g., less than 10px)
    if (Math.abs(diff) < 10) {
      setSwipeOffset(0);
      return;
    }
    
    // For right-handed: swipe left (negative diff)
    // For left-handed: swipe right (positive diff)
    if ((isRightHanded && diff < 0) || (!isRightHanded && diff > 0)) {
      // Allow swipe with slight resistance
      setSwipeOffset(diff * 0.8);
    } else {
      setSwipeOffset(0); // Prevent swiping in the opposite direction
    }
  };

  const handleTouchEnd = () => {
    const thresholdToMeet = isRightHanded 
      ? -SWIPE_THRESHOLD  // For right-handed users, swipe left (negative)
      : SWIPE_THRESHOLD;  // For left-handed users, swipe right (positive)
      
    const shouldDelete = isRightHanded 
      ? swipeOffset < thresholdToMeet 
      : swipeOffset > thresholdToMeet;
      
    if (shouldDelete) {
      // Animation before delete
      setSwipeOffset(isRightHanded ? -1000 : 1000);
      setTimeout(() => {
        deleteItem(item.id);
      }, 300);
    } else {
      // Spring back animation
      setSwipeOffset(0);
    }
    setIsSwiping(false);
  };

  // Handle reset tap for mobile
  const handleResetTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetItem(item.id);
  };
  
  const getFreshnessColor = (level: FreshnessLevel): string => {
    switch (level) {
      case 'fresh': return 'bg-fresh-green text-black';
      case 'good': return 'bg-fresh-yellow text-black';
      case 'warning': return 'bg-fresh-orange text-black';
      case 'expired': return 'bg-fresh-red text-white';
    }
  };
  
  const getDaysLeftDisplay = (): string => {
    if (daysLeft <= 0) {
      return 'Expired';
    } else {
      return `${daysLeft} day${daysLeft !== 1 ? 's' : ''}`;
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Only handle clicks on the card itself, not on buttons
    if (isExpandable && 
        e.target instanceof Element && 
        !e.target.closest('button')) {
      onClick?.();
    }
  };

  const preventPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Calculate delete indicator visibility based on swipe distance
  // Start showing trash icon after a more intentional swipe (20% of threshold)
  const absSwipeOffset = Math.abs(swipeOffset);
  const deleteIndicatorOpacity = Math.min(absSwipeOffset / (SWIPE_THRESHOLD * 0.2), 1);

  // Reset card position when not relevant
  useEffect(() => {
    if (!isSwiping && absSwipeOffset <= SWIPE_THRESHOLD) {
      setSwipeOffset(0);
    }
  }, [isSwiping, absSwipeOffset]);

  // Determine card transform style based on swipe
  const cardStyle = {
    transform: `translateX(${swipeOffset}px)`,
    transition: isSwiping ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
  };

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Delete background - shown during swipe */}
      {isMobile && (
        <div className={`absolute inset-0 flex items-center ${isRightHanded ? 'justify-end' : 'justify-start'} bg-destructive rounded-lg`}>
          <div className={`flex items-center justify-center w-16 ${isRightHanded ? 'pr-4' : 'pl-4'}`}>
            <Trash2 
              className="text-white" 
              size={24} 
              style={{ opacity: deleteIndicatorOpacity }}
            />
          </div>
        </div>
      )}
      
      <Card 
        ref={cardRef}
        className={`relative overflow-hidden transition-all hover:shadow-md ${isExpandable ? 'cursor-pointer' : ''} ${isSwiping ? 'border-transparent' : 'border border-gray-200'}`}
        onClick={handleCardClick}
        style={cardStyle}
        {...(isMobile ? {
          onTouchStart: handleTouchStart,
          onTouchMove: handleTouchMove,
          onTouchEnd: handleTouchEnd
        } : {})}
      >
        <div className={`h-2 ${getFreshnessColor(freshnessLevel)}`} />
        <CardContent className={`p-4 transition-all duration-300 ease-in-out ${isExpandable ? 'expandable-card' : ''}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-lg">{item.name}</h3>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${getFreshnessColor(freshnessLevel)}`}>
                {getDaysLeftDisplay()}
              </span>
              
              {/* Reset icon for mobile in primary signal color */}
              {isMobile && (
                <button 
                  onClick={handleResetTap}
                  className="text-primary p-1 rounded-full hover:bg-gray-100"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          
          {!isCompact && (
            <div className="space-y-2 text-sm text-gray-500 mt-3 card-details">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Opened: {formatOpenedDate(item.openedDate)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Open {formatTimeOpen(item.openedDate)}</span>
              </div>
            </div>
          )}
          
          {/* Show buttons only on desktop */}
          {!isCompact && !isMobile && (
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ItemCard;