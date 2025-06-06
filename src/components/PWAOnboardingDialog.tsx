
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface PWAOnboardingDialogProps {
  open: boolean;
  onClose: () => void;
  onInstallClick: () => void;
}

const PWAOnboardingDialog: React.FC<PWAOnboardingDialogProps> = ({ open, onClose, onInstallClick }) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Install FreshHub as an App</DialogTitle>
        <DialogDescription>
          Maximize your experience by installing FreshHub as a App.<br /><br />
          <span>
            Ensure safe data storage, immune to browser history and cache resets.
          </span>
        </DialogDescription>
      </DialogHeader>
      <div className="flex justify-center mt-6">
        <Button onClick={onInstallClick} className="w-full">
          Install App
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);

export default PWAOnboardingDialog;
