
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Smartphone, Monitor, Share, Plus, ArrowDown } from 'lucide-react';

interface PWAInstallPromptProps {}

const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop'>('desktop');

  // Detect if app is running as PWA
  const isPWA = () => {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://')
    );
  };

  // Detect platform
  const detectPlatform = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      return 'ios';
    } else if (/android/.test(userAgent)) {
      return 'android';
    } else {
      return 'desktop';
    }
  };

  useEffect(() => {
    const hasShownPrompt = localStorage.getItem('pwa-prompt-dismissed');
    const shouldShow = !isPWA() && !hasShownPrompt;
    
    if (shouldShow) {
      // Show prompt after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
        setPlatform(detectPlatform());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    if (dontShowAgain) {
      localStorage.setItem('pwa-prompt-dismissed', 'true');
    }
    setIsVisible(false);
    setShowInstructions(false);
  };

  const handleInstallNow = () => {
    setShowInstructions(true);
  };

  const renderInstructions = () => {
    switch (platform) {
      case 'ios':
        return (
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <Smartphone className="h-8 w-8" />
              <span className="text-lg font-semibold">iOS Installation</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium">Tap the</span>
                    <Share className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-600">Share</span>
                    <span className="font-medium">button in Safari</span>
                  </div>
                  <p className="text-sm text-gray-600">Located at the bottom of your screen in Safari</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium">Scroll down and tap</span>
                    <Plus className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-600">"Add to Home Screen"</span>
                  </div>
                  <p className="text-sm text-gray-600">Look for this option in the share menu</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="font-medium">Tap</span>
                    <span className="font-semibold text-blue-600 mx-1">"Add"</span>
                    <span className="font-medium">to confirm</span>
                  </div>
                  <p className="text-sm text-gray-600">The app will appear on your home screen</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'android':
        return (
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <Smartphone className="h-8 w-8" />
              <span className="text-lg font-semibold">Android Installation</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="font-medium">Tap the</span>
                    <span className="font-semibold text-green-600 mx-1">three dots menu</span>
                    <span className="font-medium">in Chrome</span>
                  </div>
                  <p className="text-sm text-gray-600">Usually located in the top-right corner</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium">Tap</span>
                    <span className="font-semibold text-green-600">"Add to Home screen"</span>
                  </div>
                  <p className="text-sm text-gray-600">Or look for "Install app" option</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="font-medium">Tap</span>
                    <span className="font-semibold text-green-600 mx-1">"Add"</span>
                    <span className="font-medium">to confirm</span>
                  </div>
                  <p className="text-sm text-gray-600">The app will appear on your home screen</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'desktop':
        return (
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-center space-x-2 text-purple-600">
              <Monitor className="h-8 w-8" />
              <span className="text-lg font-semibold">Desktop Installation</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg border">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="font-medium">Look for a</span>
                    <span className="font-semibold text-purple-600 mx-1">"Install Freshify"</span>
                    <span className="font-medium">popup or notification</span>
                  </div>
                  <p className="text-sm text-gray-600">Your browser may automatically show an install prompt</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg border">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="font-medium">Or use</span>
                    <span className="font-semibold text-purple-600 mx-1">browser menu</span>
                    <span className="font-medium">→ "Install Freshify"</span>
                  </div>
                  <p className="text-sm text-gray-600">Chrome: Three dots menu → "Install Freshify"<br />Edge: Three dots menu → "Apps" → "Install this site as an app"</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg border">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="font-medium">Click</span>
                    <span className="font-semibold text-purple-600 mx-1">"Install"</span>
                    <span className="font-medium">when prompted</span>
                  </div>
                  <p className="text-sm text-gray-600">The app will open in its own window</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isVisible) return null;

  return (
    <Dialog open={isVisible} onOpenChange={() => {}}>
      <DialogContent className="max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg sm:text-xl">
              {showInstructions ? 'Installation Guide' : 'Get the Best Experience'}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDismiss}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        {!showInstructions ? (
          <div className="space-y-4">
            <DialogDescription className="text-center text-sm sm:text-base">
              For optimal experience, offline capability, and faster loading, we recommend using Freshify as a{' '}
              <a 
                href="https://what-is-a-pwa.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline text-blue-600 hover:text-blue-800 font-medium"
              >
                PWA
              </a>{' '}
              app.
            </DialogDescription>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="dont-show-again"
                checked={dontShowAgain}
                onCheckedChange={(checked) => setDontShowAgain(checked === true)}
              />
              <label 
                htmlFor="dont-show-again" 
                className="text-sm text-gray-600 cursor-pointer"
              >
                Don't remind me again
              </label>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleDismiss} className="flex-1">
                Maybe Later
              </Button>
              <Button onClick={handleInstallNow} className="flex-1">
                Install Now
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {renderInstructions()}
            <Button onClick={handleDismiss} className="w-full mt-6">
              Got it!
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PWAInstallPrompt;
