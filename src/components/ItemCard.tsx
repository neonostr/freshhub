
import React from 'react';
import { Item, FreshnessLevel } from '@/types/item';
import { calculateFreshnessLevel, formatOpenedDate, formatTimeOpen } from '@/utils/itemUtils';
import { Milk, Coffee, Apple, Egg, Banana, Trash, Calendar, Clock } from "lucide-react";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useItems } from '@/context/ItemsContext';

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const { deleteItem, resetItem } = useItems();
  
  const freshnessLevel = calculateFreshnessLevel(item);
  
  const getIconComponent = () => {
    switch (item.icon) {
      case 'milk': return <Milk />;
      case 'coffee': return <Coffee />;
      case 'apple': return <Apple />;
      case 'egg': return <Egg />;
      case 'banana': return <Banana />;
      case 'trash': return <Trash />;
      default: return <Apple />;
    }
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

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className={`h-2 ${getFreshnessColor(freshnessLevel)}`} />
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gray-100 rounded-full">
              {getIconComponent()}
            </div>
            <h3 className="font-medium text-lg">{item.name}</h3>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${getFreshnessColor(freshnessLevel)}`}>
            {getFreshnessText(freshnessLevel)}
          </span>
        </div>
        
        <div className="space-y-2 text-sm text-gray-500 mt-3">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Opened: {formatOpenedDate(item.openedDate)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>Open {formatTimeOpen(item.openedDate)}</span>
          </div>
        </div>
        
        <div className="flex justify-between mt-4 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => resetItem(item.id)}
          >
            Reset
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            className="flex-1"
            onClick={() => deleteItem(item.id)}
          >
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
