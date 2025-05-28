
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
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <Smartphone className="h-8 w-8" />
              <span className="text-lg font-semibold">iOS Installation</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div className="flex items-center space-x-2">
                  <span>Tap the</span>
                  <Share className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">Share</span>
                  <span>button in Safari</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div className="flex items-center space-x-2">
                  <span>Scroll down and tap</span>
                  <Plus className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">"Add to Home Screen"</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <span>Tap <span className="font-semibold">"Add"</span> to confirm</span>
              </div>
            </div>
          </div>
        );

      case 'android':
        return (
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <Smartphone className="h-8 w-8" />
              <span className="text-lg font-semibold">Android Installation</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <span>Tap the <span className="font-semibold">three dots menu</span> in Chrome</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div className="flex items-center space-x-2">
                  <span>Tap</span>
                  <Plus className="h-5 w-5 text-green-600" />
                  <span className="font-semibold">"Add to Home screen"</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <span>Tap <span className="font-semibold">"Add"</span> to confirm</span>
              </div>
            </div>
          </div>
        );

      case 'desktop':
        return (
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-purple-600">
              <Monitor className="h-8 w-8" />
              <span className="text-lg font-semibold">Desktop Installation</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <span>Look for the <span className="font-semibold">install icon</span> in your browser's address bar</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <span>Or use <span className="font-semibold">browser menu</span> → "Install Freshify"</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <span>Click <span className="font-semibold">"Install"</span> when prompted</span>
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>
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
            <DialogDescription className="text-center">
              For optimal experience, offline capability, and faster loading, we recommend using Freshify as a{' '}
              <a 
                href="https://what-is-a-pwa.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline text-blue-600 hover:text-blue-800"
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
          <div className="space-y-4">
            {renderInstructions()}
            <Button onClick={handleDismiss} className="w-full">
              Got it!
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PWAInstallPrompt;
