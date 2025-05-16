
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PaymentContextType {
  hasPaid: boolean;
  setHasPaid: (value: boolean) => void;
  checkPaymentStatus: () => boolean;
  resetPaymentState: () => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [hasPaid, setHasPaid] = useState<boolean>(false);

  // Load payment status from localStorage on mount
  useEffect(() => {
    const savedPaymentStatus = localStorage.getItem('freshifyPaymentStatus');
    if (savedPaymentStatus === 'paid') {
      setHasPaid(true);
    }
  }, []);

  // Save payment status to localStorage when it changes
  useEffect(() => {
    if (hasPaid) {
      localStorage.setItem('freshifyPaymentStatus', 'paid');
    }
  }, [hasPaid]);

  const checkPaymentStatus = (): boolean => {
    return hasPaid;
  };

  const resetPaymentState = () => {
    setHasPaid(false);
    localStorage.removeItem('freshifyPaymentStatus');
  };

  return (
    <PaymentContext.Provider 
      value={{ 
        hasPaid, 
        setHasPaid, 
        checkPaymentStatus,
        resetPaymentState
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = (): PaymentContextType => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};
