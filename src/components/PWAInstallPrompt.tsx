
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Smartphone, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const PWAInstallPrompt = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the prompt
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed === 'true') return;

    // Check if app is already running as PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        (window.navigator as any).standalone ||
                        document.referrer.includes('android-app://');

    if (isStandalone) return;

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show our custom prompt after a short delay
      setTimeout(() => setIsOpen(true), 2000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For browsers that don't support beforeinstallprompt, show after delay
    const timer = setTimeout(() => {
      if (!deferredPrompt) {
        setIsOpen(true);
      }
    }, 3000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, [deferredPrompt]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      setIsInstalling(true);
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        
        if (choiceResult.outcome === 'accepted') {
          setShowSuccessMessage(true);
          setTimeout(() => {
            setIsOpen(false);
            setShowSuccessMessage(false);
          }, 3000);
        }
        
        setDeferredPrompt(null);
      } catch (error) {
        console.error('Error during installation:', error);
      } finally {
        setIsInstalling(false);
      }
    } else {
      // Fallback for browsers without install prompt support
      setShowSuccessMessage(true);
      setTimeout(() => {
        setIsOpen(false);
        setShowSuccessMessage(false);
      }, 3000);
    }
  };

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('pwa-install-dismissed', 'true');
    }
    setIsOpen(false);
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
            {showSuccessMessage ? (
              <div className="text-center py-4">
                <p className="text-green-600 font-medium mb-2">✓ Installation started!</p>
                <p className="text-sm text-gray-600">
                  You can now close this tab, go to your home screen, and open Freshify from there!
                </p>
              </div>
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
        
        {!showSuccessMessage && (
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
                disabled={isInstalling}
              >
                {isInstalling ? 'Installing...' : 'Install App'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PWAInstallPrompt;
