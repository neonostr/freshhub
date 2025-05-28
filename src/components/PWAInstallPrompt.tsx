
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Smartphone, X, Share, MoreVertical, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const PWAInstallPrompt = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop' | 'unknown'>('unknown');

  useEffect(() => {
    // Check if user has already dismissed the prompt
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed === 'true') return;

    // Check if app is already running as PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        (window.navigator as any).standalone ||
                        document.referrer.includes('android-app://');

    if (isStandalone) return;

    // Detect platform
    const userAgent = navigator.userAgent.toLowerCase();
    let detectedPlatform: 'ios' | 'android' | 'desktop' | 'unknown' = 'unknown';
    
    if (/iphone|ipad|ipod/.test(userAgent)) {
      detectedPlatform = 'ios';
    } else if (/android/.test(userAgent)) {
      detectedPlatform = 'android';
    } else if (/windows|mac|linux/.test(userAgent)) {
      detectedPlatform = 'desktop';
    }
    
    setPlatform(detectedPlatform);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Show prompt after a short delay
    setTimeout(() => setIsOpen(true), 2000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        
        if (choiceResult.outcome === 'accepted') {
          setIsOpen(false);
        }
        
        setDeferredPrompt(null);
      } catch (error) {
        console.error('Error during installation:', error);
        setShowInstructions(true);
      }
    } else {
      setShowInstructions(true);
    }
  };

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('pwa-install-dismissed', 'true');
    }
    setIsOpen(false);
  };

  const renderInstructions = () => {
    switch (platform) {
      case 'ios':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-semibold mb-3">Install on iOS:</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">1</div>
                  <div className="flex items-center gap-2">
                    <span>Tap the</span>
                    <Share className="w-4 h-4" />
                    <span>share button in Safari</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">2</div>
                  <div className="flex items-center gap-2">
                    <span>Scroll down and tap</span>
                    <div className="px-2 py-1 bg-gray-200 rounded text-xs">"Add to Home Screen"</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">3</div>
                  <span>Tap "Add" to install Freshify</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'android':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-semibold mb-3">Install on Android:</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold">1</div>
                  <div className="flex items-center gap-2">
                    <span>Tap the</span>
                    <MoreVertical className="w-4 h-4" />
                    <span>menu button in Chrome</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold">2</div>
                  <div className="flex items-center gap-2">
                    <span>Tap</span>
                    <div className="px-2 py-1 bg-gray-200 rounded text-xs">"Add to Home screen"</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold">3</div>
                  <span>Tap "Add" to install Freshify</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'desktop':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-semibold mb-3">Install on Desktop:</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white font-bold">1</div>
                  <div className="flex items-center gap-2">
                    <span>Look for the</span>
                    <Download className="w-4 h-4" />
                    <span>install icon in your browser's address bar</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white font-bold">2</div>
                  <span>Click it and follow the prompts to install</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Look for an "Add to Home Screen" or "Install" option in your browser's menu to install Freshify as an app.
            </p>
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-left">Freshify is better as an app!</DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={handleClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <DialogDescription className="text-left space-y-2">
            {showInstructions ? (
              renderInstructions()
            ) : (
              <>
                <p>Freshify works best as a Progressive Web App (PWA). You'll get:</p>
                <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                  <li>Faster loading and better performance</li>
                  <li>Work offline when needed</li>
                  <li>Native app-like experience</li>
                  <li>Easy access from your home screen</li>
                </ul>
                <p className="text-sm">Just one click to install!</p>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        
        {!showInstructions ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="dont-show-again"
                checked={dontShowAgain}
                onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
              />
              <label htmlFor="dont-show-again" className="text-sm text-gray-600">
                Don't show me this again
              </label>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Maybe Later
              </Button>
              <Button 
                onClick={handleInstall} 
                className="flex-1 bg-green-500 hover:bg-green-600"
              >
                Install App
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="dont-show-again"
                checked={dontShowAgain}
                onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
              />
              <label htmlFor="dont-show-again" className="text-sm text-gray-600">
                Don't show me this again
              </label>
            </div>
            
            <Button onClick={handleClose} className="w-full">
              Got it!
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PWAInstallPrompt;
