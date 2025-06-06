
import React, { useEffect } from 'react';
import { useItems } from '@/context/ItemsContext';
import { Trash2, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const SwipeTutorial: React.FC = () => {
  const { dismissTutorial } = useItems();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      startAnimation();
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const startAnimation = () => {
    const demoCard = document.getElementById('swipe-demo-card');
    if (demoCard) {
      // Animate swipe left
      setTimeout(() => {
        demoCard.style.transform = 'translateX(-100px)';
      }, 500);
      
      // Return to original position
      setTimeout(() => {
        demoCard.style.transform = 'translateX(0)';
      }, 2000);
      
      // Repeat animation once more
      setTimeout(() => {
        demoCard.style.transform = 'translateX(-100px)';
      }, 3000);
      
      setTimeout(() => {
        demoCard.style.transform = 'translateX(0)';
      }, 4500);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80" onClick={dismissTutorial}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-4/5 mx-auto max-w-sm" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-semibold text-xl mb-4 text-center">Swipe to Delete</h3>
        
        <div className="relative overflow-hidden rounded-lg mb-6">
          {/* Always render the card first, then the delete background behind it */}
          <div 
            id="swipe-demo-card" 
            className="bg-white p-4 rounded-lg border shadow-sm transition-transform duration-500 relative z-10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gray-100 rounded-full flex items-center justify-center w-9 h-9">
                  <ChevronRight className="h-5 w-5" />
                </div>
                <h3 className="font-medium">Item Name</h3>
              </div>
              <div>
                <span className="text-xs px-2 py-1 rounded-full bg-fresh-green text-white">Fresh</span>
              </div>
            </div>
          </div>

          {/* Delete background that shows through as card moves */}
          <div className="absolute inset-0 flex items-center justify-end bg-destructive rounded-lg" style={{ zIndex: 5 }}>
            <div className="flex items-center justify-center w-16 pr-4">
              <Trash2 className="text-white" size={24} />
            </div>
          </div>
        </div>
        
        <p className="text-center text-gray-600 mb-6">
          Swipe items <strong>from right to left</strong> to delete them
        </p>
        
        <div className="flex justify-center">
          <Button onClick={dismissTutorial}>Got it</Button>
        </div>
      </div>
    </div>
  );
};

export default SwipeTutorial;
