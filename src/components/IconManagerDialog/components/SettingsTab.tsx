
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { TabsContent } from '@/components/ui/tabs';
import { useHandedness } from '@/context/HandednessContext';
import { useHeaderVisibilityStore } from '@/pages/Index';
import { useSubscription } from '@/context/SubscriptionContext';
import { Crown, Bitcoin, Heart, Share2 } from 'lucide-react';

interface SettingsTabProps {
  onUpgradeClick?: () => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ onUpgradeClick }) => {
  const { handedness, setHandedness } = useHandedness();
  const { hideHeader, setHideHeader } = useHeaderVisibilityStore();
  const { status } = useSubscription();
  const isPremium = status === 'premium';

  const handleShare = async () => {
    const landingPageUrl = window.location.origin;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'FreshHub - All your shelf life in one spot',
          text: 'Check out this awesome app for tracking food freshness!',
          url: landingPageUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying to clipboard
      try {
        await navigator.clipboard.writeText(landingPageUrl);
        alert('App link copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }
  };

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

            {/* Premium Status Section */}
            {!isPremium ? (
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
                  Pay <span className="font-semibold text-gray-700">2100 sats</span> one-time fee.
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
            ) : (
              <div className="space-y-4">
                <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                      <Heart className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Premium User</h4>
                      <p className="text-sm text-gray-600">Thank you for your support!</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    You now have access to all premium features including unlimited items and custom products. 
                    We appreciate your support in helping us keep FreshHub ad-free and privacy-focused.
                  </p>
                </div>

                <div className="bg-muted/50 p-4 rounded-md">
                  <p className="text-sm mb-3 font-medium">
                    Love FreshHub? Share it with friends and family!
                  </p>
                  <Button 
                    onClick={handleShare}
                    variant="outline"
                    className="w-full"
                    size="sm"
                  >
                    <Share2 className="w-4 h-4" />
                    Share App
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default SettingsTab;
