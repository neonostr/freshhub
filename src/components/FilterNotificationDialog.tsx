
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterNotificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onResetFilter: () => void;
  itemName: string;
  itemShelfLife: number;
  currentFilter: number;
  dontShowAgain: boolean;
  setDontShowAgain: (value: boolean) => void;
}

const FilterNotificationDialog: React.FC<FilterNotificationDialogProps> = ({
  open,
  onOpenChange,
  onResetFilter,
  itemName,
  itemShelfLife,
  currentFilter,
  dontShowAgain,
  setDontShowAgain,
}) => {
  const handleResetFilter = () => {
    onResetFilter();
    onOpenChange(false);
  };

  const handleKeepFilter = () => {
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Item Added Successfully</AlertDialogTitle>
          <AlertDialogDescription>
            "{itemName}" has been added to your tracker with a {itemShelfLife}-day shelf life, 
            but it's not currently visible because your filter is set to show items with up to {currentFilter} days.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="flex items-center space-x-2 my-4">
          <Checkbox
            id="dont-show-again"
            checked={dontShowAgain}
            onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
          />
          <label
            htmlFor="dont-show-again"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Don't show this information again
          </label>
        </div>
        
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-2">
          <AlertDialogCancel onClick={handleKeepFilter} className="flex-1 sm:flex-none">
            Keep Current Filter
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleResetFilter} className="flex-1 sm:flex-none">
            Reset Filter to Show All Items
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FilterNotificationDialog;
