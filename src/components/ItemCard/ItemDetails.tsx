
import React from 'react';
import { Calendar, Clock } from "lucide-react";
import { formatOpenedDate, formatTimeOpen } from '@/utils/itemUtils';

interface ItemDetailsProps {
  openedDate: string;
  isCompact?: boolean;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ openedDate, isCompact = false }) => {
  if (isCompact) return null;
  
  return (
    <div className="space-y-2 text-sm text-gray-500 mt-3 card-details">
      <div className="flex items-center">
        <Calendar className="h-4 w-4 mr-2" />
        <span>Opened: {formatOpenedDate(openedDate)}</span>
      </div>
      <div className="flex items-center">
        <Clock className="h-4 w-4 mr-2" />
        <span>Open {formatTimeOpen(openedDate)}</span>
      </div>
    </div>
  );
};

export default ItemDetails;
