
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { TabsContent } from '@/components/ui/tabs';
import { useHandedness } from '@/context/HandednessContext';
import { useHeaderVisibilityStore } from '@/pages/Index';

const SettingsTab: React.FC = () => {
  const { handedness, setHandedness } = useHandedness();
  const { hideHeader, setHideHeader } = useHeaderVisibilityStore();

  return (
    <TabsContent value="settings" className="h-full flex flex-col m-0 data-[state=active]:flex data-[state=inactive]:hidden">
      <div className="space-y-6 overflow-y-auto p-1">
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Preferences</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Handedness</label>
              <div className="flex gap-2">
                <Button 
                  variant={handedness === 'right' ? "default" : "outline"} 
                  onClick={() => setHandedness('right')} 
                  className="flex-1" 
                  size="sm"
                >
                  Right-handed
                </Button>
                <Button 
                  variant={handedness === 'left' ? "default" : "outline"} 
                  onClick={() => setHandedness('left')} 
                  className="flex-1" 
                  size="sm"
                >
                  Left-handed
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Controls the position of buttons for easier access
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="hide-header" className="text-sm font-medium block">Hide Header</label>
                  <p className="text-xs text-muted-foreground">Hide the title and description permanently to display more items</p>
                </div>
                <Switch 
                  id="hide-header" 
                  checked={hideHeader} 
                  onCheckedChange={setHideHeader} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default SettingsTab;
