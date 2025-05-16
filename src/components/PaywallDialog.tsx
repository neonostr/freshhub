
import React, { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { generateInvoice, verifyPayment, generateQRCode } from '@/services/coinosService';
import { useToast } from '@/hooks/use-toast';
import { usePayment } from '@/context/PaymentContext';
import { Bitcoin, QrCode, Copy, Check } from 'lucide-react';

interface PaywallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type PaymentStatus = 'initial' | 'generating' | 'ready' | 'verifying' | 'success';

const PaywallDialog: React.FC<PaywallDialogProps> = ({ open, onOpenChange }) => {
  const [invoice, setInvoice] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('initial');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { setHasPaid } = usePayment();
  
  // Clear state when dialog closes
  useEffect(() => {
    if (!open) {
      setPaymentStatus('initial');
      setInvoice('');
      setCopied(false);
    }
  }, [open]);
  
  // Set up payment verification polling
  useEffect(() => {
    let interval: number | undefined;
    
    if (paymentStatus === 'verifying' && invoice) {
      interval = window.setInterval(async () => {
        try {
          const isPaid = await verifyPayment(invoice);
          if (isPaid) {
            setPaymentStatus('success');
            setHasPaid(true);
            clearInterval(interval);
            
            toast({
              title: "Payment successful!",
              description: "Thank you for your support! You now have full access.",
            });
            
            // Close dialog after showing success for a moment
            setTimeout(() => {
              onOpenChange(false);
            }, 3000);
          }
        } catch (error) {
          console.error('Payment verification error:', error);
        }
      }, 2000); // Poll every 2 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [paymentStatus, invoice, setHasPaid, toast, onOpenChange]);
  
  // Set a timeout for the invoice
  useEffect(() => {
    let timeout: number | undefined;
    
    if (paymentStatus === 'ready' || paymentStatus === 'verifying') {
      // 5 minute timeout
      timeout = window.setTimeout(() => {
        if (paymentStatus !== 'success') {
          setPaymentStatus('initial');
          setInvoice('');
          toast({
            title: "Invoice expired",
            description: "The payment request has expired. Please generate a new one.",
            variant: "destructive",
          });
        }
      }, 5 * 60 * 1000);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [paymentStatus, toast]);
  
  const handleGenerateInvoice = async () => {
    setPaymentStatus('generating');
    setIsGenerating(true);
    
    try {
      const generatedInvoice = await generateInvoice();
      setInvoice(generatedInvoice);
      setPaymentStatus('ready');
      // Automatically start verifying after invoice is generated
      setPaymentStatus('verifying');
      setIsVerifying(true);
    } catch (error) {
      console.error('Error generating invoice:', error);
      toast({
        title: "Error",
        description: "Failed to generate payment request. Please try again.",
        variant: "destructive",
      });
      setPaymentStatus('initial');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(invoice).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast({
          title: "Copied!",
          description: "Invoice copied to clipboard",
        });
      },
      (err) => {
        console.error('Could not copy invoice:', err);
      }
    );
  };
  
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl flex items-center gap-2">
            <Bitcoin className="h-5 w-5 text-yellow-500" />
            Upgrade to Full Access
          </AlertDialogTitle>
          <AlertDialogDescription>
            {paymentStatus === 'initial' && (
              <div className="text-center py-4">
                <p className="mb-4">You've reached the limit of 3 active items in the free version.</p>
                <p className="mb-4">Get unlimited items with a one-time payment of <span className="font-bold">2,100 sats</span> via Bitcoin Lightning Network.</p>
              </div>
            )}
            
            {(paymentStatus === 'generating' || paymentStatus === 'ready' || paymentStatus === 'verifying') && (
              <div className="flex flex-col items-center py-4">
                {paymentStatus === 'generating' ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <div className="h-12 w-12 border-4 border-t-primary rounded-full animate-spin"></div>
                    <p className="mt-4">Generating invoice...</p>
                  </div>
                ) : (
                  <>
                    <div className="bg-white p-4 rounded-lg shadow-inner mb-4">
                      {generateQRCode(invoice)}
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 w-full">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2"
                        onClick={copyToClipboard}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? 'Copied!' : 'Copy Invoice'}
                      </Button>
                    </div>
                    
                    <p className="text-sm text-center mt-4">
                      Scan with your Lightning wallet or copy the invoice to pay
                    </p>
                    
                    {paymentStatus === 'verifying' && (
                      <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
                        <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                        Waiting for payment...
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
            
            {paymentStatus === 'success' && (
              <div className="text-center py-6">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-green-600 mb-2">Thank You!</h3>
                <p>Your payment was successful. You now have full access to Freshify!</p>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          {paymentStatus === 'initial' && (
            <>
              <AlertDialogCancel>Not Now</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleGenerateInvoice}
                disabled={isGenerating}
                className="flex items-center gap-2"
              >
                <QrCode className="h-4 w-4" />
                Generate Invoice
              </AlertDialogAction>
            </>
          )}
          
          {(paymentStatus === 'ready' || paymentStatus === 'verifying') && (
            <AlertDialogCancel>Close</AlertDialogCancel>
          )}
          
          {paymentStatus === 'success' && (
            <AlertDialogAction onClick={() => onOpenChange(false)}>
              Continue
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PaywallDialog;
