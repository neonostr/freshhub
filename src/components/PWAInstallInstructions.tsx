
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { usePWA } from '@/hooks/usePWA';
import { detectPlatform, type Platform } from '@/lib/pwa';

interface PWAInstallInstructionsProps {
  isOpen: boolean;
  onClose: () => void;
}

const PWAInstallInstructions: React.FC<PWAInstallInstructionsProps> = ({
  isOpen,
  onClose,
}) => {
  const { isInstallable, promptInstall } = usePWA();
  const platform = detectPlatform();

  const handleInstallClick = async () => {
    const success = await promptInstall();
    if (success) {
      onClose();
    }
  };

  const renderPlatformInstructions = (platform: Platform) => {
    switch (platform) {
      case 'ios-safari':
        return (
          <div className="space-y-4">
            <Badge variant="secondary" className="mb-4">
              iOS Safari
            </Badge>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-sm">Tap the Share button</h4>
                  <p className="text-sm text-muted-foreground">
                    Look for the share icon at the bottom of your screen
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-sm">Select "Add to Home Screen"</h4>
                  <p className="text-sm text-muted-foreground">
                    Scroll down and tap "Add to Home Screen"
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-sm">Confirm installation</h4>
                  <p className="text-sm text-muted-foreground">
                    Tap "Add" in the top-right corner
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'android-chrome':
        return (
          <div className="space-y-4">
            <Badge variant="secondary" className="mb-4">
              Android Chrome
            </Badge>
            {isInstallable ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Great! Your browser supports automatic installation.
                </p>
                <Button onClick={handleInstallClick} className="w-full">
                  Install FreshHub
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Open the menu</h4>
                    <p className="text-sm text-muted-foreground">
                      Tap the three dots (⋮) in the corner
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Select "Add to Home screen"</h4>
                    <p className="text-sm text-muted-foreground">
                      Look for the option in the dropdown menu
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Confirm installation</h4>
                    <p className="text-sm text-muted-foreground">
                      Tap "Add" to install the app
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'desktop-chrome':
        return (
          <div className="space-y-4">
            <Badge variant="secondary" className="mb-4">
              Desktop Browser
            </Badge>
            {isInstallable ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Your browser supports automatic installation.
                </p>
                <Button onClick={handleInstallClick} className="w-full">
                  Install FreshHub
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Look for the install icon</h4>
                    <p className="text-sm text-muted-foreground">
                      Check the address bar for an install icon
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Alternative: Use the menu</h4>
                    <p className="text-sm text-muted-foreground">
                      Click the three dots (⋮) → "Install FreshHub"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'desktop-other':
      default:
        return (
          <div className="space-y-4">
            <Badge variant="secondary" className="mb-4">
              Desktop Browser
            </Badge>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                To get the best app-like experience, try one of these options:
              </p>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-sm">Use Chrome, Edge or Safari</h4>
                  <p className="text-sm text-muted-foreground">
                    These browsers support PWA installation
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-sm">Create a bookmark</h4>
                  <p className="text-sm text-muted-foreground">
                    Add this page to your bookmarks for quick access
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Install FreshHub</DialogTitle>
          <DialogDescription>
            Get the full app experience by installing FreshHub on your device
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {renderPlatformInstructions(platform)}

          <div className="border-t pt-4">
            <h4 className="font-medium text-sm mb-3">Why install?</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                <span>Faster loading and offline access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                <span>Native app-like experience</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                <span>Quick access from your home screen</span>
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PWAInstallInstructions;
