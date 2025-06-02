
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useSubscription } from '@/context/SubscriptionContext';
import { generateInvoice, checkPaymentStatus, formatInvoice } from '@/services/lightningPaymentService';
import QRCodeDisplay from './QRCodeDisplay';
import ThankYouDialog from './ThankYouDialog';
import { Bitcoin, Copy, Check, Loader2 } from 'lucide-react';

interface PremiumUpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PremiumUpgradeDialog: React.FC<PremiumUpgradeDialogProps> = ({ open, onOpenChange }) => {
  const [invoice, setInvoice] = useState('');
  const [verifyUrl, setVerifyUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const { setPremium } = useSubscription();
  
  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setInvoice('');
      setVerifyUrl('');
      setIsLoading(false);
      setIsVerifying(false);
      setError(null);
      setIsCopied(false);
    }
  }, [open]);
  
  // Handle invoice generation
  const handleGenerateInvoice = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const invoiceData = await generateInvoice();
      setInvoice(invoiceData.pr);
      setVerifyUrl(invoiceData.verify || '');
      
      if (invoiceData.verify) {
        startPaymentVerification(invoiceData.verify);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate invoice');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Start payment verification polling
  const startPaymentVerification = (url: string) => {
    setIsVerifying(true);
    let attempts = 0;
    const maxAttempts = 150; // 5 minutes (150 * 2 seconds)
    
    const verificationInterval = setInterval(async () => {
      attempts++;
      
      try {
        const isPaid = await checkPaymentStatus(url);
        
        if (isPaid) {
          clearInterval(verificationInterval);
          setIsVerifying(false);
          setPremium();
          onOpenChange(false);
          setShowThankYou(true);
          return;
        }
        
        if (attempts >= maxAttempts) {
          clearInterval(verificationInterval);
          setIsVerifying(false);
          setError('Payment verification timed out. Please try again or contact support.');
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    }, 2000); // Check every 2 seconds
    
    // Clean up interval when component unmounts or dialog closes
    return () => {
      clearInterval(verificationInterval);
    };
  };
  
  // Handle copy to clipboard
  const handleCopyInvoice = async () => {
    try {
      await navigator.clipboard.writeText(invoice);
      setIsCopied(true);
      // Reset the copied state after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy invoice:', error);
    }
  };
  
  // Cleanup on unmount
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    
    if (isVerifying && verifyUrl) {
      cleanup = startPaymentVerification(verifyUrl);
    }
    
    return () => {
      if (cleanup) cleanup();
    };
  }, []);
  
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bitcoin className="h-5 w-5" />
              Upgrade to Premium
            </DialogTitle>
            <DialogDescription>
              Upgrade to Premium for unlimited items and custom products. Pay 21 sats (test price) one-time fee.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            {!invoice ? (
              <Button
                onClick={handleGenerateInvoice}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating invoice...
                  </>
                ) : (
                  <>
                    <Bitcoin className="mr-2 h-4 w-4" />
                    Generate Bitcoin Lightning Invoice
                  </>
                )}
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="font-medium mb-1">Scan QR Code to Pay</h3>
                  <p className="text-sm text-gray-500">
                    {isVerifying ? "Waiting for payment..." : "Pay 21 sats to upgrade"}
                  </p>
                </div>
                
                <QRCodeDisplay value={invoice} />
                
                <div className="flex justify-between items-center border rounded-md p-2 bg-muted/50">
                  <div className="text-sm font-mono truncate max-w-[200px]">
                    {formatInvoice(invoice)}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleCopyInvoice}
                  >
                    {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                
                {isVerifying && (
                  <div className="flex items-center justify-center gap-2 text-amber-600">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Waiting for payment confirmation...</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <ThankYouDialog 
        open={showThankYou} 
        onOpenChange={setShowThankYou} 
      />
    </>
  );
};

export default PremiumUpgradeDialog;
