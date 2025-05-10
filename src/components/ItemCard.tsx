
import React, { useRef, useState, useEffect } from 'react';
import { Item, FreshnessLevel } from '@/types/item';
import { calculateFreshnessLevel, formatOpenedDate, formatTimeOpen } from '@/utils/itemUtils';
import { Calendar, Clock, RotateCcw } from "lucide-react";
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
  
  const SWIPE_THRESHOLD = 100; // px needed to trigger delete
  
  const freshnessLevel = calculateFreshnessLevel(item);
  
  // Handle touch events for swipe-to-delete
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    
    // Limit swipe range and add resistance as it gets further
    const resistance = 0.5;
    const limitedDiff = Math.sign(diff) * Math.min(Math.abs(diff), 200);
    const resistedDiff = limitedDiff * resistance;
    
    setSwipeOffset(resistedDiff);
  };

  const handleTouchEnd = () => {
    if (Math.abs(swipeOffset) > SWIPE_THRESHOLD) {
      // Animation before delete
      const direction = swipeOffset > 0 ? 1 : -1;
      setSwipeOffset(direction * 1000);
      setTimeout(() => {
        deleteItem(item.id);
      }, 300);
    } else {
      // Reset position if threshold not met
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

  // Calculate swipe indicator opacity and position
  const swipeIndicatorStyle = {
    opacity: Math.abs(swipeOffset) / 100,
    transform: `translateX(${swipeOffset < 0 ? '10px' : '-10px'})`,
  };

  // Reset card position when not relevant
  useEffect(() => {
    if (!isSwiping && Math.abs(swipeOffset) <= SWIPE_THRESHOLD) {
      setSwipeOffset(0);
    }
  }, [isSwiping, swipeOffset]);

  // Determine card transform style based on swipe
  const cardStyle = {
    transform: `translateX(${swipeOffset}px)`,
    transition: isSwiping ? 'none' : 'transform 0.3s ease',
  };

  return (
    <Card 
      ref={cardRef}
      className={`overflow-hidden transition-all hover:shadow-md ${isExpandable ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
      style={cardStyle}
      {...(isMobile ? {
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd
      } : {})}
    >
      <div className={`h-2 ${getFreshnessColor(freshnessLevel)}`} />
      <CardContent className={`p-4 transition-all duration-300 ease-in-out ${isExpandable ? 'expandable-card' : ''} ${isMobile ? 'relative' : ''}`}>
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
            
            {/* Reset icon for mobile */}
            {isMobile && (
              <button 
                onClick={handleResetTap}
                className="text-fresh-green p-1 rounded-full hover:bg-gray-100"
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
              className="flex-1 text-fresh-green border-fresh-green hover:bg-fresh-green/10"
              onClick={(e) => { preventPropagation(e); resetItem(item.id); }}
            >
              Reset
            </Button>
          </div>
        )}
        
        {/* Swipe delete indicators - shown during swipe */}
        {isMobile && (
          <>
            <div 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-destructive"
              style={{...swipeIndicatorStyle, opacity: swipeOffset > 0 ? Math.abs(swipeOffset) / 100 : 0}}
            >
              Delete
            </div>
            <div 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive"
              style={{...swipeIndicatorStyle, opacity: swipeOffset < 0 ? Math.abs(swipeOffset) / 100 : 0}}
            >
              Delete
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ItemCard;
