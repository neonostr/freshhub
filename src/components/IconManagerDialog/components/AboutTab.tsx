
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Download } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

interface AboutTabProps {
  onInstallApp: () => void;
}

const AboutTab: React.FC<AboutTabProps> = ({ onInstallApp }) => {
  const { isRunningAsPwa } = usePWA();

  return (
    <TabsContent value="about" className="h-full flex flex-col m-0 data-[state=active]:flex data-[state=inactive]:hidden">
      <div className="space-y-6 overflow-y-auto p-1">
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Understanding Freshness Labels</h3>
          <div className="bg-muted/50 p-4 rounded-md">
            <p className="text-sm mb-3">
              Fresh Tracker shows the number of days until an item expires:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold rounded-full bg-fresh-green text-black w-16 text-center">3+ days</span>
                <p className="text-sm">Item has 3 or more days until expiry</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold rounded-full bg-fresh-yellow text-black w-16 text-center">2-3 days</span>
                <p className="text-sm">Item has 2-3 days until expiry</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold rounded-full bg-fresh-orange text-black w-16 text-center">0-1 days</span>
                <p className="text-sm">Item has 0-1 days until expiry</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold rounded-full bg-fresh-red text-white w-16 text-center">Expired</span>
                <p className="text-sm">Item has expired (0 or negative days left)</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-lg font-medium">About Fresh Tracker</h3>
          <div className="bg-muted/50 p-4 rounded-md">
            <p className="text-sm mb-2">
              Fresh Tracker helps you monitor how long your perishable items have been open.
            </p>
            <ul className="text-sm space-y-2 list-disc pl-5">
              <li><strong>100% Private:</strong> Your data never leaves your device</li>
              <li><strong>Works Offline:</strong> No internet connection required</li>
              <li><strong>No Tracking:</strong> No analytics or data collection</li>
              <li><strong>Premium Features:</strong> Unlock custom products and track unlimited items with a premium subscription</li>
            </ul>
          </div>
        </div>

        {!isRunningAsPwa && (
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Get the App
            </h2>
            <p className="text-sm text-muted-foreground">
              Install FreshHub on your device for the best experience
            </p>
            
            <div className="space-y-3">
              <Button 
                onClick={onInstallApp}
                variant="outline"
                className="w-full"
              >
              <Download className="w-5 h-5" />
                Install App
              </Button>
              
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                  <span>Persistent data storage</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                  <span>Native app-like experience</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                  <span>Faster loading and offline access</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                  <span>Quick access from your home screen</span>
                </div>
              </div>
            </div>
          </Card>
        )}
        
        <div className="pt-4 text-center">
          <p className="text-xs text-muted-foreground">Version 1.0.0</p>
        </div>
      </div>
    </TabsContent>
  );
};

export default AboutTab;
