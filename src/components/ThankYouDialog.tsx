
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, Share2 } from 'lucide-react';

interface ThankYouDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ThankYouDialog: React.FC<ThankYouDialogProps> = ({ open, onOpenChange }) => {
  const handleShare = async () => {
    const appUrl = window.location.origin;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Freshify - Know when it\'s been open too long',
          text: 'Check out this awesome app for tracking food freshness!',
          url: appUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying to clipboard
      try {
        await navigator.clipboard.writeText(appUrl);
        alert('App link copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-center">
            <Heart className="h-6 w-6 text-red-500" />
            Thank You!
          </DialogTitle>
          <DialogDescription className="text-center">
            Welcome to Freshify Premium! You now have unlimited access to all features including unlimited items and custom products.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Love the app? Share it with friends and family!
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={handleShare}
              className="flex-1"
              variant="default"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Freshify
            </Button>
            
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1"
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThankYouDialog;
