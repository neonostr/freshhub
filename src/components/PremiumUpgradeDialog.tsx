import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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
    <div className="flex flex-col items-center space-y-4 w-full">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mb-2">
        <Bitcoin className="w-7 h-7 text-yellow-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 text-center">Upgrade to Premium</h2>
      <p className="text-base text-gray-500 mb-2 text-center">
        Unlock unlimited items and custom products.<br />
        Pay <span className="font-semibold text-gray-700">21 sats</span> (test price) one-time fee.
      </p>
      <ul className="text-sm text-gray-500 space-y-1 mb-4 text-left mx-auto max-w-xs">
        <li>• Track unlimited items</li>
        <li>• Create custom products</li>
        <li>• One-time payment, no subscription</li>
        <li>• All features, forever</li>
      </ul>
      <Button
        onClick={handleGenerateInvoice}
        className="w-full text-base font-bold flex items-center justify-center gap-2"
        style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating invoice...
          </>
        ) : (
          <>
            <Bitcoin className="w-5 h-5" />
            Generate Bitcoin Lightning Invoice
          </>
        )}
      </Button>
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mt-4 w-full text-center">
          {error}
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