
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// Define payment status type to include all possible states
type PaymentStatus = 'ready' | 'verifying' | 'success' | 'failed';

interface PaywallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaymentComplete: () => void;
}

const PaywallDialog: React.FC<PaywallDialogProps> = ({ open, onOpenChange, onPaymentComplete }) => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('ready');

  // Reset payment status when dialog opens
  useEffect(() => {
    if (open) {
      setPaymentStatus('ready');
    }
  }, [open]);

  // Simulate payment verification
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    
    if (open && paymentStatus === 'verifying') {
      timer = setTimeout(() => {
        // Fixed TypeScript error - correctly checking if status is "verifying"
        setPaymentStatus('success');
        onPaymentComplete();
        // Close dialog after payment is successful
        setTimeout(() => onOpenChange(false), 1500);
      }, 2000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [open, paymentStatus, onOpenChange, onPaymentComplete]);

  const handleStartPayment = () => {
    setPaymentStatus('verifying');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Upgrade to Premium</h2>
          
          {paymentStatus === 'ready' && (
            <div className="space-y-4">
              <p className="text-center">Get unlimited access to all features with Premium</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Track unlimited items</li>
                <li>Custom shelf life settings</li>
                <li>Advanced statistics</li>
                <li>Priority support</li>
              </ul>
              <div className="mt-4">
                <Button 
                  className="w-full" 
                  onClick={handleStartPayment}
                >
                  Continue for $5/month
                </Button>
              </div>
            </div>
          )}
          
          {paymentStatus === 'verifying' && (
            <div className="text-center p-4">
              <div className="animate-pulse">Verifying payment...</div>
            </div>
          )}
          
          {paymentStatus === 'success' && (
            <div className="text-center p-4 space-y-4">
              <div className="text-green-500 font-bold text-xl">Payment Successful!</div>
              <p>Thank you for upgrading to Premium!</p>
            </div>
          )}
          
          {paymentStatus === 'failed' && (
            <div className="text-center p-4 space-y-4">
              <div className="text-red-500 font-bold text-xl">Payment Failed</div>
              <p>There was an error processing your payment. Please try again.</p>
              <Button onClick={() => setPaymentStatus('ready')}>Try Again</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaywallDialog;
