
import { createContext, useContext, useEffect, ReactNode } from 'react';
import { create } from 'zustand';

// Export the type so it can be imported elsewhere
export type Handedness = 'right' | 'left';

// Create a Zustand store to manage handedness state and UI preferences
interface HandednessState {
  handedness: Handedness;
  setHandedness: (handedness: Handedness) => void;
  hideHeader: boolean;
  setHideHeader: (hideHeader: boolean) => void;
}

export const useHandednessStore = create<HandednessState>((set) => ({
  handedness: 'right', // Default to right-handed
  hideHeader: false, // Default to showing the header
  setHandedness: (handedness) => {
    // Save to localStorage
    localStorage.setItem('handedness', handedness);
    set({ handedness });
  },
  setHideHeader: (hideHeader) => {
    // Save to localStorage
    localStorage.setItem('hideHeader', hideHeader.toString());
    set({ hideHeader });
  }
}));

// Create a context for components that don't have direct access to zustand
const HandednessContext = createContext<HandednessState | undefined>(undefined);

// Handedness provider component
export const HandednessProvider = ({ children }: { children: ReactNode }) => {
  // Initialize preferences from localStorage if available
  useEffect(() => {
    // Load handedness preference
    const savedHandedness = localStorage.getItem('handedness') as Handedness | null;
    if (savedHandedness && (savedHandedness === 'left' || savedHandedness === 'right')) {
      useHandednessStore.getState().setHandedness(savedHandedness);
    }
    
    // Load header visibility preference
    const hideHeader = localStorage.getItem('hideHeader');
    if (hideHeader !== null) {
      useHandednessStore.getState().setHideHeader(hideHeader === 'true');
    }
  }, []);
  
  // Get the current state from the store
  const { handedness, setHandedness, hideHeader, setHideHeader } = useHandednessStore();

  return (
    <HandednessContext.Provider value={{ handedness, setHandedness, hideHeader, setHideHeader }}>
      {children}
    </HandednessContext.Provider>
  );
};

// Hook for using handedness context
export const useHandedness = (): HandednessState => {
  const context = useContext(HandednessContext);
  if (!context) {
    throw new Error('useHandedness must be used within a HandednessProvider');
  }
  return context;
};
