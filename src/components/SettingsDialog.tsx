
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useHandedness } from '@/context/HandednessContext';
import FreshnessExplanation from './FreshnessExplanation';
import VersionDisplay from './VersionDisplay';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  compactView: boolean;
  onCompactViewChange: (value: boolean) => void;
  headerVisible: boolean;
  onHeaderVisibleChange: (value: boolean) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onOpenChange,
  compactView,
  onCompactViewChange,
  headerVisible,
  onHeaderVisibleChange
}) => {
  const { handedness, toggleHandedness } = useHandedness();

  const toggleCompactView = () => {
    onCompactViewChange(!compactView);
  };

  const toggleHeaderVisible = () => {
    onHeaderVisibleChange(!headerVisible);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Preferences</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="compact-view">Compact View</Label>
                <div className="text-xs text-muted-foreground">
                  Show items in a compact grid
                </div>
              </div>
              <Switch 
                id="compact-view" 
                checked={compactView} 
                onCheckedChange={toggleCompactView}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="hide-header">Hide Header</Label>
                <div className="text-xs text-muted-foreground">
                  Hide the app header to save space
                </div>
              </div>
              <Switch 
                id="hide-header" 
                checked={!headerVisible} 
                onCheckedChange={() => toggleHeaderVisible()}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="left-handed">Left-handed Mode</Label>
                <div className="text-xs text-muted-foreground">
                  Move buttons to the left side
                </div>
              </div>
              <Switch 
                id="left-handed" 
                checked={handedness === 'left'} 
                onCheckedChange={toggleHandedness}
              />
            </div>
          </div>
          
          <FreshnessExplanation />
          
          <VersionDisplay />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
