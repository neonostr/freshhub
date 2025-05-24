import React, { useState, useEffect, useRef } from 'react';
import { useItems } from '@/context/ItemsContext';
import ItemCard from './ItemCard';
import { calculateFreshnessLevel, calculateDaysUntilExpiry, calculateMaxFreshnessDays } from '@/utils/itemUtils';
import { Slider } from '@/components/ui/slider';
import { Filter, ArrowDown, ArrowUp, Minimize, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose, DrawerOverlay } from '@/components/ui/drawer';
import { Item } from '@/types/item';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHandedness, type Handedness } from '@/context/HandednessContext';
import { useHeaderVisibilityStore } from '@/pages/Index';

type SortOption = 'freshness' | 'alphabetical';
type SortDirection = 'asc' | 'desc';

const ItemsList: React.FC = () => {
  const { items } = useItems();
  const [sortOption, setSortOption] = useState<SortOption>('freshness');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [maxFreshnessDays, setMaxFreshnessDays] = useState<number>(365);
  
  // Load filter from localStorage or default to showing all
  const [filterDays, setFilterDays] = useState<number>(() => {
    const saved = localStorage.getItem('currentFilterDays');
    return saved ? parseInt(saved) : 365;
  });
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCompactMode, setIsCompactMode] = useState(false);
  const [expandedItemIds, setExpandedItemIds] = useState<string[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const isMobile = useIsMobile();
  const { handedness } = useHandedness();
  const { hideHeader, setHideHeader } = useHeaderVisibilityStore();
  const listContainerRef = useRef<HTMLDivElement>(null);
  
  // Force re-render when data changes
  const [forceUpdate, setForceUpdate] = useState(0);

  // Save filter value to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('currentFilterDays', filterDays.toString());
  }, [filterDays]);

  // Calculate max freshness days and update when items change or shelf life updates occur
  useEffect(() => {
    if (items.length > 0) {
      const maxDays = calculateMaxFreshnessDays(items);
      
      // Only update if the value has actually changed to prevent slider issues
      if (maxDays !== maxFreshnessDays) {
        setMaxFreshnessDays(maxDays);
        
        // If the filterDays is beyond our new max, adjust it
        if (filterDays > maxDays) {
          setFilterDays(maxDays);
        }
      }
    }
  }, [items, forceUpdate]);

  // Listen for shelf life changes, product updates, and filter reset events
  useEffect(() => {
    const handleShelfLifeUpdated = () => {
      console.log("Shelf life updated, recalculating freshness values");
      // Force a re-render by incrementing the counter
      setForceUpdate(prev => prev + 1);
    };
    
    const handleProductUpdated = () => {
      console.log("Product updated, recalculating freshness values");
      // Force a re-render when products are updated
      setForceUpdate(prev => prev + 1);
    };
    
    const handleResetFilter = () => {
      console.log("Resetting freshness filter to show all items");
      setFilterDays(maxFreshnessDays);
    };
    
    window.addEventListener('shelf-life-updated', handleShelfLifeUpdated);
    window.addEventListener('custom-product-updated', handleProductUpdated);
    window.addEventListener('reset-freshness-filter', handleResetFilter);
    
    // Custom event for storage changes to handle PWA cache issues
    window.addEventListener('storage', (event) => {
      if (event.key === 'freshTrackerCustomShelfLife' || 
          event.key === 'freshTrackerCustomProducts' ||
          event.key === 'freshItems') {
        console.log(`Storage '${event.key}' changed, forcing UI update`);
        setForceUpdate(prev => prev + 1);
      }
    });
    
    return () => {
      window.removeEventListener('shelf-life-updated', handleShelfLifeUpdated);
      window.removeEventListener('custom-product-updated', handleProductUpdated);
      window.removeEventListener('reset-freshness-filter', handleResetFilter);
    };
  }, [maxFreshnessDays]);

  // Check if scrolling should be enabled based on content vs container height
  useEffect(() => {
    const checkScrollNeeded = () => {
      if (listContainerRef.current) {
        const container = listContainerRef.current;
        const contentHeight = container.scrollHeight;
        const containerHeight = container.clientHeight;
        const windowHeight = window.innerHeight;
        
        // Consider some buffer (20px) to avoid borderline cases
        const shouldScroll = contentHeight > containerHeight || contentHeight > windowHeight - 150;
        console.log(`Content height: ${contentHeight}, Container height: ${containerHeight}, Window height: ${windowHeight}, Should scroll: ${shouldScroll}`);
        setScrollEnabled(shouldScroll);
      }
    };
    
    // Check on mount, when items change, or on window resize
    checkScrollNeeded();
    
    // Add resize listener
    window.addEventListener('resize', checkScrollNeeded);
    
    // Remove listener on cleanup
    return () => window.removeEventListener('resize', checkScrollNeeded);
  }, [items, isCompactMode, hideHeader, forceUpdate]);

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

    // Update header visibility when toggling compact mode
    if (!isCompactMode) {
      setHideHeader(true);
    } else {
      setHideHeader(false);
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

  // Calculate classes for the outer container based on scroll need
  const containerClass = scrollEnabled 
    ? "space-y-6 relative pb-16 overflow-y-auto" 
    : "space-y-6 relative pb-16 overflow-y-hidden";

  return (
    <div 
      ref={listContainerRef} 
      className={containerClass} 
      style={scrollEnabled ? {} : { height: 'auto' }}
    >
      <div className={getGridClass()}>
        {sortedItems.map(item => (
          <ItemCard
            key={`${item.id}-${forceUpdate}`}
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
              
              <Slider 
                value={[Math.min(filterDays, maxFreshnessDays)]} 
                min={1} 
                max={maxFreshnessDays || 365}  // Ensure we always have a valid max
                step={1} 
                onValueChange={([value]) => {
                  console.log(`Changing filter days to ${value} (max: ${maxFreshnessDays})`);
                  setFilterDays(value);
                }} 
                className="w-full" 
              />
              
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

      {/* Compact mode toggle button - using default variant */}
      <Button
        className="fixed bottom-6 z-10 shadow-lg rounded-full h-14 w-14 p-0"
        size="icon"
        variant="default"
        style={getButtonPosition(10.5)}
        onClick={toggleCompactMode}
      >
        {isCompactMode ? <Maximize className="h-6 w-6" /> : <Minimize className="h-6 w-6" />}
      </Button>
    </div>
  );
};

export default ItemsList;
