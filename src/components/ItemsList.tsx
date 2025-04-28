
import React from 'react';
import { useItems } from '@/context/ItemsContext';
import ItemCard from './ItemCard';
import { calculateFreshnessLevel } from '@/utils/itemUtils';

const ItemsList: React.FC = () => {
  const { items } = useItems();
  
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="text-4xl mb-2">🥛</div>
        <h3 className="text-xl font-medium mb-2">No items yet</h3>
        <p className="text-gray-500">
          Add your first item by clicking the + button below
        </p>
      </div>
    );
  }
  
  // Sort items by freshness level (expired items first)
  const sortedItems = [...items].sort((a, b) => {
    const freshnessOrder = { expired: 0, warning: 1, good: 2, fresh: 3 };
    return freshnessOrder[calculateFreshnessLevel(a)] - freshnessOrder[calculateFreshnessLevel(b)];
  });

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {sortedItems.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemsList;
