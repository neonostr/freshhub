
import React, { useState, useEffect } from 'react';
import { useItems } from '@/context/ItemsContext';
import ItemCard from './ItemCard';
import { calculateFreshnessLevel, calculateDaysUntilExpiry } from '@/utils/itemUtils';
import { Slider } from '@/components/ui/slider';
import { SortAsc, Filter, ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Item } from '@/types/item';

type SortOption = 'freshness' | 'alphabetical';
type SortDirection = 'asc' | 'desc';

const ItemsList: React.FC = () => {
  const { items } = useItems();
  const [sortOption, setSortOption] = useState<SortOption>('freshness');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [maxFreshnessDays, setMaxFreshnessDays] = useState<number>(365); // Start with a large value
  const [filterDays, setFilterDays] = useState<number>(365); // Default to show all

  // Determine the maximum days across all items for the filter slider
  useEffect(() => {
    if (items.length > 0) {
      const maxDays = Math.max(...items.map(item => calculateDaysUntilExpiry(item)));
      setMaxFreshnessDays(maxDays > 0 ? maxDays : 365);
      setFilterDays(maxDays > 0 ? maxDays : 365);
    }
  }, [items]);

  // Filter items based on the current freshness filter
  const filteredItems = items.filter(item => {
    const daysUntilExpiry = calculateDaysUntilExpiry(item);
    return daysUntilExpiry <= filterDays;
  });

  // Sort items based on the current sort option and direction
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOption === 'freshness') {
      const aFreshness = calculateDaysUntilExpiry(a);
      const bFreshness = calculateDaysUntilExpiry(b);
      return sortDirection === 'asc' ? aFreshness - bFreshness : bFreshness - aFreshness;
    } else {
      // Alphabetical sorting
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
  });

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  // Toggle sort option
  const toggleSortOption = () => {
    setSortOption(prev => prev === 'freshness' ? 'alphabetical' : 'freshness');
  };

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <span className="text-sm font-medium">Filter by freshness</span>
          </div>
          <span className="text-xs text-gray-500">
            {filterDays === maxFreshnessDays ? 'Show all' : `Up to ${filterDays} days`}
          </span>
        </div>
        <Slider 
          value={[filterDays]}
          min={1}
          max={maxFreshnessDays}
          step={1}
          onValueChange={([value]) => setFilterDays(value)}
          className="w-full"
        />
      </div>
      
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          size="sm"
          onClick={toggleSortOption}
          className="text-xs flex items-center gap-1"
        >
          <SortAsc size={14} />
          Sort by: {sortOption === 'freshness' ? 'Freshness' : 'A-Z'}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSortDirection}
          className="text-xs"
        >
          {sortDirection === 'asc' 
            ? <ArrowUp size={14} /> 
            : <ArrowDown size={14} />
          }
        </Button>
      </div>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {sortedItems.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ItemsList;
