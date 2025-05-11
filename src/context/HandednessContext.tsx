
import { createContext, useContext, useEffect } from 'react';
import { create } from 'zustand';

type Handedness = 'right' | 'left';

// Create a Zustand store to manage handedness state
interface HandednessState {
  handedness: Handedness;
  setHandedness: (handedness: Handedness) => void;
}

export const useHandedness = create<HandednessState>((set) => ({
  handedness: 'right', // Default to right-handed
  setHandedness: (handedness) => {
    // Save to localStorage
    localStorage.setItem('handedness', handedness);
    set({ handedness });
  },
}));

// Initialize handedness from localStorage if available
const initializeHandedness = () => {
  const savedHandedness = localStorage.getItem('handedness') as Handedness;
  if (savedHandedness && (savedHandedness === 'left' || savedHandedness === 'right')) {
    useHandedness.getState().setHandedness(savedHandedness);
  }
};

// Handedness provider component
export const HandednessProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    initializeHandedness();
  }, []);

  return children;
};
