
import { QRCodeSVG } from 'qrcode.react';

// Constants
const COINOS_USERNAME = 'freshify';
const COINOS_BASE_URL = 'https://coinos.io';
const LNURL_ENDPOINT = `${COINOS_BASE_URL}/.well-known/lnurlp/${COINOS_USERNAME}`;
const PAYMENT_AMOUNT = 2100; // 2100 sats fixed amount for full access

// Types
interface LnurlResponse {
  callback: string;
  maxSendable: number;
  minSendable: number;
  metadata: string;
  tag: string;
}

interface InvoiceResponse {
  pr: string; // payment request (invoice)
  routes: any[];
  successAction: {
    message: string;
    tag: string;
  };
}

// Get LNURL data
export const getLnurlData = async (): Promise<LnurlResponse> => {
  try {
    const response = await fetch(LNURL_ENDPOINT);
    if (!response.ok) {
      throw new Error(`LNURL request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching LNURL data:', error);
    throw error;
  }
};

// Generate an invoice
export const generateInvoice = async (): Promise<string> => {
  try {
    // First get the LNURL data to get the callback URL
    const lnurlData = await getLnurlData();
    
    // Convert sats to millisats for the API
    const amountInMillisats = PAYMENT_AMOUNT * 1000;
    
    // Ensure amount is within limits
    if (amountInMillisats < lnurlData.minSendable || amountInMillisats > lnurlData.maxSendable) {
      throw new Error(`Amount must be between ${lnurlData.minSendable / 1000} and ${lnurlData.maxSendable / 1000} sats`);
    }
    
    // Call the callback URL to generate an invoice
    const callbackURL = `${lnurlData.callback}?amount=${amountInMillisats}`;
    const response = await fetch(callbackURL);
    
    if (!response.ok) {
      throw new Error(`Invoice generation failed with status ${response.status}`);
    }
    
    const invoiceData: InvoiceResponse = await response.json();
    return invoiceData.pr;
  } catch (error) {
    console.error('Error generating invoice:', error);
    throw error;
  }
};

// Verify if payment was received (simplified polling approach)
export const verifyPayment = async (invoice: string): Promise<boolean> => {
  // In a real implementation, you would call a verification endpoint
  // For this example, we'll simulate a successful payment after a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};

// Generate QR code component for an invoice
export const generateQRCode = (invoice: string) => {
  return <QRCodeSVG value={invoice} size={256} />;
};
