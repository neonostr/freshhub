
import React from 'react';
import { FreshnessLevel } from '@/types/item';

interface FreshnessBadgeProps {
  level: FreshnessLevel;
}

export const getFreshnessColor = (level: FreshnessLevel): string => {
  switch (level) {
    case 'fresh': return 'bg-fresh-green text-white';
    case 'good': return 'bg-fresh-yellow text-black';
    case 'warning': return 'bg-fresh-orange text-black';
    case 'expired': return 'bg-fresh-red text-white';
  }
};

export const getFreshnessText = (level: FreshnessLevel): string => {
  switch (level) {
    case 'fresh': return 'Fresh';
    case 'good': return 'Good';
    case 'warning': return 'Use soon';
    case 'expired': return 'Expired';
  }
};

const FreshnessBadge: React.FC<FreshnessBadgeProps> = ({ level }) => {
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${getFreshnessColor(level)}`}>
      {getFreshnessText(level)}
    </span>
  );
};

export default FreshnessBadge;
