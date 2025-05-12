
import React, { useState, useEffect } from 'react';
import { useItems } from '@/context/ItemsContext';
import ItemCard from './ItemCard';
import { calculateFreshnessLevel, calculateDaysUntilExpiry } from '@/utils/itemUtils';
import { Slider } from '@/components/ui/slider';
import { Filter, ArrowDown, ArrowUp, Minimize, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose, DrawerOverlay } from '@/components/ui/drawer';
import { Item } from '@/types/item';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHandedness, type Handedness } from '@/context/HandednessContext';

type SortOption = 'freshness' | 'alphabetical';
type SortDirection = 'asc' | 'desc';

const ItemsList: React.FC = () => {
  const { items } = useItems();
  const [sortOption, setSortOption] = useState<SortOption>('freshness');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [maxFreshnessDays, setMaxFreshnessDays] = useState<number>(365); // Start with a large value
  const [filterDays, setFilterDays] = useState<number>(365); // Default to show all
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCompactMode, setIsCompactMode] = useState(false);
  const [expandedItemIds, setExpandedItemIds] = useState<string[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { handedness } = useHandedness();
  
  // Force re-render when shelf life settings change
  const [forceUpdate, setForceUpdate] = useState(0);

  // Listen for shelf life changes
  useEffect(() => {
    const handleShelfLifeUpdated = () => {
      // Force a re-render by incrementing the counter
      setForceUpdate(prev => prev + 1);
    };
    
    window.addEventListener('shelf-life-updated', handleShelfLifeUpdated);
    
    return () => {
      window.removeEventListener('shelf-life-updated', handleShelfLifeUpdated);
    };
  }, []);

  // Determine the maximum days across all items for the filter slider
  useEffect(() => {
    if (items.length > 0) {
      const maxDays = Math.max(...items.map(item => calculateDaysUntilExpiry(item)));
      setMaxFreshnessDays(maxDays > 0 ? maxDays : 365);
      setFilterDays(maxDays > 0 ? maxDays : 365);
    }
  }, [items, forceUpdate]); // Added forceUpdate to trigger recalculation

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
      return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
  });

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  // Toggle compact mode
  const toggleCompactMode = () => {
    setIsCompactMode(prev => !prev);
    setExpandedItemIds([]); // Reset expanded items when toggling mode

    // If enabled, hide the header
    const header = document.getElementById('app-header');
    if (header) {
      if (!isCompactMode) {
        header.style.display = 'none';
      } else {
        header.style.display = 'block';
      }
    }
  };

  // Toggle expanded/collapsed state for an item
  const toggleItemExpanded = (itemId: string) => {
    setExpandedItemIds(prev => prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]);
  };

  // Get the button position based on handedness
  const getButtonPosition = (position: number) => {
    return {
      right: handedness === 'right' ? `${position}rem` : "auto",
      left: handedness === 'left' ? `${position}rem` : "auto"
    };
  };

  if (items.length === 0) {
    return <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="text-4xl mb-2">🥛</div>
      <h3 className="text-xl font-medium mb-2">No items yet</h3>
      <p className="text-gray-500">
        Add your first item by clicking the + button below
      </p>
    </div>;
  }

  // Determine proper grid class based on compact mode, device type, and screen size
  const getGridClass = () => {
    if (!isCompactMode) {
      return "grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"; // Normal grid
    }
    if (isMobile) {
      return "grid gap-2 grid-cols-1"; // Single column on mobile in compact mode
    }

    // For desktop in compact mode, use grid-cols-3
    return "desktop-compact-grid";
  };

  return (
    <div className="space-y-6 relative pb-16">
      <div className={getGridClass()}>
        {sortedItems.map(item => (
          <ItemCard
            key={item.id}
            item={item}
            isCompact={isCompactMode && !expandedItemIds.includes(item.id)}
            onClick={() => toggleItemExpanded(item.id)}
            isExpandable={isCompactMode}
          />
        ))}
      </div>

      {/* Bottom floating buttons - positioned based on handedness */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button
            className="fixed bottom-6 z-10 shadow-lg rounded-full h-14 w-14 p-0"
            size="icon"
            variant="default"
            style={getButtonPosition(6)}
          >
            <Filter className="h-6 w-6" />
          </Button>
        </DrawerTrigger>

        <DrawerContent side="bottom" className="z-50 px-[21px] py-[34px]">
          <div className="px-4">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="font-medium">Filter by freshness</span>
                <span className="text-sm text-gray-500">
                  {filterDays === maxFreshnessDays ? 'Show all' : `Up to ${filterDays} days`}
                </span>
              </div>
              
              <Slider value={[filterDays]} min={1} max={maxFreshnessDays} step={1} onValueChange={([value]) => setFilterDays(value)} className="w-full" />
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Sort by</span>
                </div>
                
                <div className="flex gap-2">
                  <Button variant={sortOption === 'freshness' ? "default" : "outline"} size="sm" onClick={() => setSortOption('freshness')} className="flex-1">
                    Freshness
                  </Button>
                  
                  <Button variant={sortOption === 'alphabetical' ? "default" : "outline"} size="sm" onClick={() => setSortOption('alphabetical')} className="flex-1">
                    A-Z
                  </Button>
                  
                  <Button variant="outline" size="sm" onClick={toggleSortDirection}>
                    {sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Compact mode toggle button - always visible */}
      <Button
        className="fixed bottom-6 z-10 shadow-lg rounded-full h-14 w-14 p-0"
        size="icon"
        variant={isCompactMode ? "secondary" : "default"}
        style={getButtonPosition(10.5)}
        onClick={toggleCompactMode}
      >
        {isCompactMode ? <Maximize className="h-6 w-6" /> : <Minimize className="h-6 w-6" />}
      </Button>
    </div>
  );
};

export default ItemsList;
