
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { usePWA } from '@/hooks/usePWA';

interface PWAInstallBannerProps {
  onLearnHow?: () => void;
}

const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({ onLearnHow }) => {
  const { showInstallBanner, isInstallable, promptInstall, dismissBanner } = usePWA();

  console.log('PWAInstallBanner render - showInstallBanner:', showInstallBanner);

  if (!showInstallBanner) {
    return null;
  }

  const handleInstallClick = async () => {
    const success = await promptInstall();
    if (!success && onLearnHow) {
      onLearnHow();
    }
  };

  const handleLearnHowClick = () => {
    if (onLearnHow) {
      onLearnHow();
    }
  };

  return (
    <Card className="fixed left-4 right-4 z-99999 border bg-card shadow-lg" style={{
      bottom: `calc(env(safe-area-inset-bottom, 0px) + 6rem)` // Position above floating buttons
    }}>
      <div className="flex items-center justify-between p-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-card-foreground">
            Install FreshHub
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Get the full app experience on your device
          </p>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          {isInstallable ? (
            <Button
              size="sm"
              onClick={handleInstallClick}
              className="whitespace-nowrap"
            >
              Install
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={handleLearnHowClick}
              className="whitespace-nowrap"
            >
              Learn How
            </Button>
          )}
          
          <Button
            size="sm"
            variant="ghost"
            onClick={dismissBanner}
            className="p-1 h-auto"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PWAInstallBanner;
