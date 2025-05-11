
import React, { useRef, useState, useEffect } from 'react';
import { Item, FreshnessLevel } from '@/types/item';
import { calculateFreshnessLevel, formatOpenedDate, formatTimeOpen } from '@/utils/itemUtils';
import { Calendar, Clock, RotateCcw, Trash2 } from "lucide-react";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useItems } from '@/context/ItemsContext';
import { useIconManager } from '@/context/IconManager';
import * as LucideIcons from 'lucide-react';
import { IconOptionExtended } from '@/types/iconTypes';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  
  const SWIPE_THRESHOLD = 80; // px needed to trigger delete
  
  const freshnessLevel = calculateFreshnessLevel(item);
  
  // Handle touch events for swipe-to-delete (right-to-left only)
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    
    // Only allow swiping left (negative diff) for delete
    // Prevent right swipe by setting offset to 0 for positive diff
    if (diff < 0) {
      // Allow full swipe left with slight resistance
      setSwipeOffset(diff * 0.8);
    } else {
      setSwipeOffset(0); // Prevent right swiping
    }
  };

  const handleTouchEnd = () => {
    if (swipeOffset < -SWIPE_THRESHOLD) {
      // Animation before delete
      setSwipeOffset(-1000);
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
  
  const renderIcon = () => {
    // Try to get the icon from our icon manager
    if (item.icon in allIcons) {
      const iconData = allIcons[item.icon];
      
      // For custom products, we need to create the icon from the stored name
      // Check if iconData is of type IconOptionExtended (which has iconName)
      if ('iconName' in iconData && (iconData as IconOptionExtended).iconName) {
        // Get icon name from the iconData object
        const iconName = (iconData as IconOptionExtended).iconName;
        
        // Convert to PascalCase for Lucide component lookup
        const pascalCaseName = iconName.charAt(0).toUpperCase() + 
          iconName.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase());
        
        // Get the component from Lucide
        const IconComponent = (LucideIcons as any)[pascalCaseName];
        if (IconComponent) {
          return <IconComponent size={20} />;
        }
      }
      
      // If it's not a custom product or we couldn't find the icon by name
      if (React.isValidElement(iconData.icon)) {
        return React.cloneElement(iconData.icon as React.ReactElement, { size: 20 });
      }
    }
    
    // If the icon isn't found, show the item name in a styled div
    return <div className="flex items-center justify-center w-5 h-5">{item.name.charAt(0)}</div>;
  };
  
  const getFreshnessColor = (level: FreshnessLevel): string => {
    switch (level) {
      case 'fresh': return 'bg-fresh-green text-white';
      case 'good': return 'bg-fresh-yellow text-black';
      case 'warning': return 'bg-fresh-orange text-black';
      case 'expired': return 'bg-fresh-red text-white';
    }
  };
  
  const getFreshnessText = (level: FreshnessLevel): string => {
    switch (level) {
      case 'fresh': return 'Fresh';
      case 'good': return 'Good';
      case 'warning': return 'Use soon';
      case 'expired': return 'Expired';
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
  // Start showing trash icon very early (at 10% of threshold)
  const deleteIndicatorOpacity = Math.min(Math.abs(swipeOffset) / (SWIPE_THRESHOLD * 0.1), 1);

  // Reset card position when not relevant
  useEffect(() => {
    if (!isSwiping && Math.abs(swipeOffset) <= SWIPE_THRESHOLD) {
      setSwipeOffset(0);
    }
  }, [isSwiping, swipeOffset]);

  // Determine card transform style based on swipe
  const cardStyle = {
    transform: `translateX(${swipeOffset}px)`,
    transition: isSwiping ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
  };

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Delete background - shown during swipe */}
      {isMobile && (
        <div className="absolute inset-0 flex items-center justify-end bg-destructive rounded-lg">
          <div className="flex items-center justify-center w-full pr-8">
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
        className={`relative overflow-hidden transition-all hover:shadow-md ${isExpandable ? 'cursor-pointer' : ''}`}
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
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gray-100 rounded-full flex items-center justify-center w-9 h-9">
                {renderIcon()}
              </div>
              <h3 className="font-medium text-lg">{item.name}</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${getFreshnessColor(freshnessLevel)}`}>
                {getFreshnessText(freshnessLevel)}
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
