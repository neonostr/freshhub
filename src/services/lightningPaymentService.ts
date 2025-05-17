
import { toast } from "@/hooks/use-toast";

const COINOS_BASE_URL = 'https://coinos.io';
const USERNAME = 'freshify';
const PAYMENT_AMOUNT_SATS = 2100;

interface LnurlData {
  callback: string;
  maxSendable: number;
  minSendable: number;
  metadata: string;
}

interface InvoiceData {
  pr: string;           // Payment request (invoice)
  successAction?: {
    tag: string;
    message?: string;
  };
  verify?: string;      // URL to verify payment status
  routes: any[];
}

export async function getLnurlData(): Promise<LnurlData> {
  try {
    const response = await fetch(`${COINOS_BASE_URL}/.well-known/lnurlp/${USERNAME}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch LNURL data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching LNURL data:', error);
    throw error;
  }
}

export async function generateInvoice(): Promise<InvoiceData> {
  try {
    // First get the LNURL data to get the callback URL
    const lnurlData = await getLnurlData();
    
    // Check if amount is within allowed range
    if (PAYMENT_AMOUNT_SATS * 1000 < lnurlData.minSendable || PAYMENT_AMOUNT_SATS * 1000 > lnurlData.maxSendable) {
      throw new Error(`Amount must be between ${lnurlData.minSendable / 1000} and ${lnurlData.maxSendable / 1000} sats`);
    }
    
    // Convert sats to millisats for the API
    const amountMsat = PAYMENT_AMOUNT_SATS * 1000;
    
    // Call the callback URL with the amount
    const callbackUrl = `${lnurlData.callback}?amount=${amountMsat}`;
    const response = await fetch(callbackUrl);
    
    if (!response.ok) {
      throw new Error('Failed to generate invoice');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error generating invoice:', error);
    throw error;
  }
}

export async function checkPaymentStatus(verifyUrl: string): Promise<boolean> {
  try {
    const response = await fetch(verifyUrl);
    
    if (!response.ok) {
      return false;
    }
    
    const data = await response.json();
    return data.settled || data.paid || false;
  } catch (error) {
    console.error('Error checking payment status:', error);
    return false;
  }
}

// Helper to format invoice for display
export function formatInvoice(invoice: string): string {
  if (!invoice || invoice.length < 20) return invoice;
  
  return `${invoice.substring(0, 10)}...${invoice.substring(invoice.length - 10)}`;
}

// Helper to copy invoice to clipboard
export async function copyInvoiceToClipboard(invoice: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(invoice);
    toast({
      title: "Copied to clipboard",
      description: "Lightning invoice copied to clipboard"
    });
  } catch (error) {
    console.error('Failed to copy invoice:', error);
    toast({
      title: "Failed to copy",
      description: "Could not copy invoice to clipboard",
      variant: "destructive"
    });
  }
}
