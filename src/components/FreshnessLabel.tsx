
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { FreshnessLevel } from '@/types/item';

interface FreshnessLabelProps {
  level: FreshnessLevel;
  className?: string;
}

export const getFreshnessText = (level: FreshnessLevel): string => {
  switch (level) {
    case 'fresh':
      return 'Fresh';
    case 'good':
      return 'Use Soon';
    case 'warning':
      return 'Use Now';
    case 'expired':
      return 'Expired';
    default:
      return '';
  }
};

export const getFreshnessColor = (level: FreshnessLevel): string => {
  switch (level) {
    case 'fresh':
      return 'bg-green-400 hover:bg-green-400';
    case 'good':
      return 'bg-yellow-300 hover:bg-yellow-300';
    case 'warning':
      return 'bg-orange-400 hover:bg-orange-400';
    case 'expired':
      return 'bg-red-400 hover:bg-red-400';
    default:
      return '';
  }
};

const FreshnessLabel = ({ level, className }: FreshnessLabelProps) => {
  const text = getFreshnessText(level);
  const colorClass = getFreshnessColor(level);

  return (
    <Badge 
      variant="outline" 
      className={cn('font-medium border-0 text-black', colorClass, className)}
    >
      {text}
    </Badge>
  );
};

export default FreshnessLabel;
