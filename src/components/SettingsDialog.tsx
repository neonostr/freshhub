
import React from 'react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription 
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useHandedness, type Handedness } from '@/context/HandednessContext';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onOpenChange }) => {
  const { handedness, setHandedness, hideHeader, setHideHeader } = useHandedness();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your app experience
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* About section */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">About Fresh Tracker</h3>
            <p className="text-sm text-muted-foreground">
              Fresh Tracker helps you keep track of perishable items. 
              The app is 100% private, works offline, and contains no tracking or analytics.
              Your data never leaves your device and is stored locally.
            </p>
          </div>
          
          {/* Handedness preference */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Handedness</h3>
            <p className="text-sm text-muted-foreground">
              Choose your dominant hand to optimize button placement
            </p>
            
            <RadioGroup 
              value={handedness} 
              onValueChange={(value) => setHandedness(value as Handedness)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="right" id="right" />
                <Label htmlFor="right">Right-handed</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="left" id="left" />
                <Label htmlFor="left">Left-handed</Label>
              </div>
            </RadioGroup>
          </div>

          {/* UI Preferences */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">UI Preferences</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="hide-header">Hide header</Label>
                <p className="text-sm text-muted-foreground">
                  Hide app title and description to show more items
                </p>
              </div>
              <Switch 
                id="hide-header"
                checked={hideHeader}
                onCheckedChange={setHideHeader}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
