
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { TabsContent } from '@/components/ui/tabs';
import { useHandedness } from '@/context/HandednessContext';
import { useHeaderVisibilityStore } from '@/pages/Index';
import { useSubscription } from '@/context/SubscriptionContext';
import { Crown, Bitcoin } from 'lucide-react';

interface SettingsTabProps {
  onUpgradeClick?: () => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ onUpgradeClick }) => {
  const { handedness, setHandedness } = useHandedness();
  const { hideHeader, setHideHeader } = useHeaderVisibilityStore();
  const { status } = useSubscription();
  const isPremium = status === 'premium';

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

            {/* Upgrade Section - only show for non-premium users */}
            {!isPremium && (
              <div className="border rounded-lg p-4 bg-yellow-50 border-yellow-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100">
                    <Crown className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Upgrade to Premium</h4>
                    <p className="text-sm text-gray-600">Unlock unlimited items and custom products</p>
                  </div>
                </div>
                
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li>• Track unlimited items</li>
                  <li>• Create custom products</li>
                  <li>• One-time payment, no subscription</li>
                  <li>• All features, forever</li>
                </ul>

                <p className="text-sm text-gray-600 mb-4">
                  Pay <span className="font-semibold text-gray-700">21 sats</span> (test price) one-time fee.
                </p>

                <Button
                  onClick={onUpgradeClick}
                  className="w-full text-sm font-bold flex items-center justify-center gap-2"
                  size="sm"
                >
                  <Bitcoin className="w-4 h-4" />
                  Upgrade Now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default SettingsTab;
