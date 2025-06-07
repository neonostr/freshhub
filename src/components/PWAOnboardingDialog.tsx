import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const PWAOnboardingDialog = ({ open, onClose, onInstallClick }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <Card className="p-8 max-w-md w-full text-center border border-gray-200 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          Get the App
        </h2>
        <p className="text-sm text-muted-foreground">
          Install FreshHub on your device for the best experience
        </p>
        <div className="space-y-3">
          <Button
            onClick={onInstallClick}
            className="w-full bg-[#0E1527] text-white flex items-center justify-center gap-2 font-bold text-base py-3 rounded-xl hover:bg-[#1a2236]"
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
        <button
          className="mt-4 text-xs text-gray-400 hover:text-gray-600 w-full"
          onClick={onClose}
        >
          No, thank you
        </button>
      </Card>
    </div>
  );
};

export default PWAOnboardingDialog;