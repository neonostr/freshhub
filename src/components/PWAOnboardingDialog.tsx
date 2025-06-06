
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
        <DialogTitle>Install as App</DialogTitle>
        <DialogDescription>
          For the best experience, we recommend installing FreshHub as an app (PWA).<br /><br />
          <span>
            This ensures your data is stored securely and is not affected by browser history or cache clearing.
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
