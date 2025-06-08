import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useSubscription } from '@/context/SubscriptionContext';
import { usePWA } from '@/hooks/usePWA';
import { generateInvoice, checkPaymentStatus, formatInvoice } from '@/services/lightningPaymentService';
import QRCodeDisplay from './QRCodeDisplay';
import ThankYouDialog from './ThankYouDialog';
import { Bitcoin, Copy, Check, Loader2, Download } from 'lucide-react';

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
  const { isRunningAsPwa, isInstallable, promptInstall } = usePWA();

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

  // Handle install app button
  const handleInstallApp = async () => {
    if (isInstallable) {
      await promptInstall();
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md min-h-[420px] max-h-[90vh] overflow-y-auto flex flex-col justify-center">
          <div className="flex flex-col items-center w-full h-full justify-center py-2">
            {/* PWA Reminder */}
            {!isRunningAsPwa && (
              <div className="w-full bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg px-4 py-2 mb-4 flex items-center gap-2">
                <Download className="w-4 h-4 text-yellow-500" />
                <span>
                  For best experience and to save your license, please{' '}
                  <button
                    className="underline font-semibold hover:text-yellow-600"
                    onClick={handleInstallApp}
                  >
                    install FreshHub as an app
                  </button>{' '}
                  first.
                </span>
              </div>
            )}

            {/* Bitcoin Icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mb-2 mt-2">
              <Bitcoin className="w-7 h-7 text-yellow-500" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">Upgrade to Premium</h2>

            {/* Description */}
            <p className="text-base text-gray-500 mb-2 text-center">
              Unlock unlimited items and custom products.<br />
              Pay <span className="font-semibold text-gray-700">21 sats</span> (test price) one-time fee.
            </p>

            {/* Features */}
            <ul className="text-sm text-gray-500 space-y-1 mb-4 text-left mx-auto max-w-xs">
              <li>• Track unlimited items</li>
              <li>• Create custom products</li>
              <li>• One-time payment, no subscription</li>
              <li>• All features, forever</li>
            </ul>

            {/* License Info */}
            <div className="text-xs text-gray-400 mb-4 text-center max-w-xs">
              <span>
                <strong>Note:</strong> Your premium unlock is tied to this device and installation. We never track you, so if you delete the app, you’ll need to unlock again.
              </span>
            </div>

            {/* Invoice/Payment Section */}
            {!invoice ? (
              <Button
                onClick={handleGenerateInvoice}
                className="w-full text-base font-bold flex items-center justify-center gap-2 py-4"
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
            ) : (
              <div className="w-full flex flex-col items-center space-y-4">
                <div className="text-center">
                  <h3 className="font-medium mb-1">Scan QR Code to Pay</h3>
                  <p className="text-sm text-gray-500">
                    {isVerifying ? "Waiting for payment..." : "Pay 21 sats to upgrade"}
                  </p>
                </div>
                <QRCodeDisplay value={invoice} />
                <div className="flex justify-between items-center border rounded-md p-2 bg-muted/50 w-full">
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

            {/* Error Message */}
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