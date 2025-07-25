import React, { useState, useEffect } from 'react';
import { useItems } from '@/context/ItemsContext';
import ItemCard from './ItemCard';
import { calculateDaysUntilExpiry, calculateMaxFreshnessDays } from '@/utils/itemUtils';
import { Slider } from '@/components/ui/slider';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import FloatingButtons from './FloatingButtons';
import { useHeaderVisibilityStore } from '@/pages/Index';

type SortOption = 'freshness' | 'alphabetical';
type SortDirection = 'asc' | 'desc';

const ItemsList: React.FC = () => {
  const { items } = useItems();
   const { hideHeader, setHideHeader } = useHeaderVisibilityStore();
  const [sortOption, setSortOption] = useState<SortOption>('freshness');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [maxFreshnessDays, setMaxFreshnessDays] = useState<number>(365);

  // Load filter from localStorage or default to showing all
  const [filterDays, setFilterDays] = useState<number>(() => {
    const saved = localStorage.getItem('currentFilterDays');
    return saved ? parseInt(saved) : 365;
  });

  // Track if filter is set to "show all" (at maximum)
  const [isShowingAll, setIsShowingAll] = useState<boolean>(() => {
    const saved = localStorage.getItem('currentFilterDays');
    return !saved || parseInt(saved) >= 365;
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCompactMode, setIsCompactMode] = useState(false);
  const [expandedItemIds, setExpandedItemIds] = useState<string[]>([]);
  const isMobile = useIsMobile();

  // Force re-render when data changes
  const [forceUpdate, setForceUpdate] = useState(0);

  // Listen for toggle freshness filter event
  useEffect(() => {
    const handleToggleFilter = () => {
      setIsDrawerOpen(true);
    };
    window.addEventListener('toggle-freshness-filter', handleToggleFilter);
    return () => {
      window.removeEventListener('toggle-freshness-filter', handleToggleFilter);
    };
  }, []);

  // Listen for compact mode toggle event
  useEffect(() => {
    const handleToggleCompactMode = () => {
      setIsCompactMode(prev => !prev);
      setExpandedItemIds([]);
    };
    window.addEventListener('toggle-compact-mode', handleToggleCompactMode);
    return () => {
      window.removeEventListener('toggle-compact-mode', handleToggleCompactMode);
    };
  }, [hideHeader, setHideHeader]);

  // Save filter value to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('currentFilterDays', filterDays.toString());
    setIsShowingAll(filterDays >= maxFreshnessDays);
  }, [filterDays, maxFreshnessDays]);

  // Calculate max freshness days and update when items change or shelf life updates occur
  useEffect(() => {
    if (items.length > 0) {
      const maxDays = calculateMaxFreshnessDays(items);
      if (maxDays !== maxFreshnessDays) {
        const previousMaxDays = maxFreshnessDays;
        setMaxFreshnessDays(maxDays);
        if (isShowingAll && maxDays > previousMaxDays) {
          setFilterDays(maxDays);
        } else if (!isShowingAll && filterDays > maxDays) {
          setFilterDays(maxDays);
        }
      }
    }
  }, [items, forceUpdate, isShowingAll, filterDays, maxFreshnessDays]);

  // Listen for shelf life changes, product updates, and filter reset events
  useEffect(() => {
    const handleShelfLifeUpdated = () => setForceUpdate(prev => prev + 1);
    const handleProductUpdated = () => setForceUpdate(prev => prev + 1);
    const handleResetFilter = () => setFilterDays(maxFreshnessDays);

    window.addEventListener('shelf-life-updated', handleShelfLifeUpdated);
    window.addEventListener('custom-product-updated', handleProductUpdated);
    window.addEventListener('reset-freshness-filter', handleResetFilter);

    window.addEventListener('storage', (event) => {
      if (
        event.key === 'freshTrackerCustomShelfLife' ||
        event.key === 'freshTrackerCustomProducts' ||
        event.key === 'freshItems'
      ) {
        setForceUpdate(prev => prev + 1);
      }
    });

    return () => {
      window.removeEventListener('shelf-life-updated', handleShelfLifeUpdated);
      window.removeEventListener('custom-product-updated', handleProductUpdated);
      window.removeEventListener('reset-freshness-filter', handleResetFilter);
    };
  }, [maxFreshnessDays]);

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
      return sortDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
  });

  const toggleSortDirection = () => {
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const toggleItemExpanded = (itemId: string) => {
    setExpandedItemIds(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const getGridClass = () => {
    if (!isCompactMode) {
      return "grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
    }
    if (isMobile) {
      return "grid gap-2 grid-cols-1";
    }
    return "desktop-compact-grid";
  };

  return (
    <div className="w-full">
      {items.length === 0 ? (
        <div className="flex flex-col justify-center items-center text-center min-h-[50vh] py-12">
          <div className="text-4xl mb-2">🥛</div>
          <h3 className="text-xl font-medium mb-2">Your list is empty</h3>
          <p className="text-gray-500">
            Click + to add your first item
          </p>
        </div>
      ) : (
        <div className={`${getGridClass()} ${hideHeader ? "pt-2" : ""}`}>
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
      )}

      <FloatingButtons
        onFilterClick={() => setIsDrawerOpen(true)}
        onCompactModeClick={() => {}} // This is no longer used since we use events
        isCompactMode={isCompactMode}
      />

      {/* Filter drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent side="bottom" className="z-50">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="font-medium">Filter by freshness</span>
              <span className="text-sm text-gray-500">
                {filterDays === maxFreshnessDays
                  ? 'Show all'
                  : `Up to ${filterDays} days`}
              </span>
            </div>

            <div style={{ touchAction: 'pan-x' }}>
              <Slider
                value={[Math.min(filterDays, maxFreshnessDays)]}
                min={1}
                max={maxFreshnessDays || 365}
                step={1}
                onValueChange={([value]) => {
                  setFilterDays(value);
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Sort by</span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={sortOption === 'freshness' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortOption('freshness')}
                  className="flex-1"
                >
                  Freshness
                </Button>

                <Button
                  variant={sortOption === 'alphabetical' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortOption('alphabetical')}
                  className="flex-1"
                >
                  A-Z
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleSortDirection}
                >
                  {sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                </Button>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ItemsList;
