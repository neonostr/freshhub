
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SubscriptionStatus = 'free' | 'premium';

interface SubscriptionState {
  status: SubscriptionStatus;
  setPremium: () => void;
  itemLimit: number;
  checkCanAddItems: (currentCount: number) => boolean;
}

const SubscriptionContext = createContext<SubscriptionState | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<SubscriptionStatus>('free');
  
  // Check if user has premium status in localStorage
  useEffect(() => {
    const savedStatus = localStorage.getItem('freshifySubscriptionStatus');
    if (savedStatus === 'premium') {
      setStatus('premium');
    }
  }, []);
  
  // Set premium status and save to localStorage
  const setPremium = () => {
    setStatus('premium');
    localStorage.setItem('freshifySubscriptionStatus', 'premium');
  };
  
  // Item limit based on subscription status
  const itemLimit = status === 'premium' ? Infinity : 3;
  
  // Check if user can add more items
  const checkCanAddItems = (currentCount: number): boolean => {
    return currentCount < itemLimit;
  };
  
  return (
    <SubscriptionContext.Provider 
      value={{ 
        status, 
        setPremium, 
        itemLimit,
        checkCanAddItems
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = (): SubscriptionState => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
