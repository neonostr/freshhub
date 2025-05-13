
import React, { useState, useRef, useEffect } from 'react';
import { Trash2 } from "lucide-react";
import { useHandedness } from '@/context/HandednessContext';

interface SwipeableCardProps {
  onDelete: () => void;
  children: React.ReactNode;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({ onDelete, children }) => {
  const { handedness } = useHandedness();
  const isRightHanded = handedness === 'right';
  
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  
  const SWIPE_THRESHOLD = 80; // px needed to trigger delete
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    
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
        onDelete();
      }, 300);
    } else {
      // Spring back animation
      setSwipeOffset(0);
    }
    setIsSwiping(false);
  };
  
  // Calculate delete indicator visibility based on swipe distance
  // Start showing trash icon very early (just after swipe begins, at 5% of threshold)
  const absSwipeOffset = Math.abs(swipeOffset);
  const deleteIndicatorOpacity = Math.min(absSwipeOffset / (SWIPE_THRESHOLD * 0.05), 1);

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
      <div className={`absolute inset-0 flex items-center ${isRightHanded ? 'justify-end' : 'justify-start'} bg-destructive rounded-lg`}>
        <div className={`flex items-center justify-center w-16 ${isRightHanded ? 'pr-4' : 'pl-4'}`}>
          <Trash2 
            className="text-white" 
            size={24} 
            style={{ opacity: deleteIndicatorOpacity }}
          />
        </div>
      </div>

      {/* Card with swipe behavior */}
      <div 
        style={cardStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};

export default SwipeableCard;
