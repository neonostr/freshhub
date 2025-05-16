
import React from 'react';
import { useInstallPrompt } from '@/context/InstallPromptContext';
import { Button } from '@/components/ui/button';
import { Info, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

export const InstallBanner: React.FC = () => {
  const { 
    showInstallPrompt, 
    promptInstall, 
    isPlatformIOS, 
    dismissPrompt
  } = useInstallPrompt();

  if (!showInstallPrompt) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 p-4 z-50 animate-in slide-in-from-bottom-5", 
      "transition-all duration-300 ease-in-out"
    )}>
      <Alert variant="default" className="border-primary/20 bg-white/95 dark:bg-gray-900/95 shadow-lg">
        <div className="flex items-start">
          <Info className="h-5 w-5 mr-2 text-primary" />
          <div className="grow">
            <AlertTitle className="font-medium mb-1">
              Add to Home Screen
            </AlertTitle>
            
            <AlertDescription className="text-sm">
              {isPlatformIOS ? (
                <>
                  Install this app on your device: tap <span className="inline-block">
                    <svg className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="currentColor" />
                    </svg>
                  </span> then "Add to Home Screen"
                </>
              ) : (
                "Install this app on your device for quick and easy access when you're on the go."
              )}
            </AlertDescription>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {!isPlatformIOS && (
                <Button 
                  size="sm" 
                  onClick={promptInstall}
                  className="gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L8 8M12 4L16 8M12 4V16M6 12H18M5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Install App
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={dismissPrompt}>
                <span className="mr-1">Later</span>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Alert>
    </div>
  );
};
