import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PWAInstallInstructions from '@/components/PWAInstallInstructions';
import { usePWA } from '@/hooks/usePWA';
import { setCameFromLanding } from '@/lib/pwa';

const Landing = () => {
  const [showPWAInstructions, setShowPWAInstructions] = useState(false);
  const { isInstallable, promptInstall, isRunningAsPwa } = usePWA();

  // Redirect to app if already running as PWA
  useEffect(() => {
    if (isRunningAsPwa) {
      window.location.href = '/app';
    }
  }, [isRunningAsPwa]);

  const handleGetStarted = () => {
    // Set flag that user came from landing page
    setCameFromLanding();
    // Navigate to main app
    window.location.href = '/app';
  };

  const handleInstallApp = async () => {
    if (isInstallable) {
      const success = await promptInstall();
      if (!success) {
        setShowPWAInstructions(true);
      }
    } else {
      setShowPWAInstructions(true);
    }
  };

  // Don't render anything if running as PWA (will redirect)
  if (isRunningAsPwa) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Main Welcome Section */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome to <span className="underline decoration-[#49DE80]">FreshHub</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            All your shelf life in one spot
          </p>
        </div>
      

        {/* Get Started Button */}
        <Button 
          onClick={handleGetStarted}
          size="lg"
          className="w-full"
        >
          Get Started
        </Button>

        {/* Get the App Section */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Get the App
          </h2>
          <p className="text-sm text-muted-foreground">
            Install FreshHub on your device for the best experience
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={handleInstallApp}
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
      </div>

      {/* PWA Install Instructions Dialog */}
      <PWAInstallInstructions
        isOpen={showPWAInstructions}
        onClose={() => setShowPWAInstructions(false)}
      />

      <footer className="fixed bottom-6 left-0 w-full flex justify-center z-50">
        <span className="text-xs text-muted-foreground">
          Developed by{' '}
          <a
            href="https://njump.me/npub1lyqkzmcq5cl5l8rcs82gwxsrmu75emnjj84067kuhm48e9w93cns2hhj2g"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline focus:underline hover:text-primary transition-colors"
          >
            Neo
          </a>
        </span>
      </footer>
    </div>
  );
};

export default Landing;
