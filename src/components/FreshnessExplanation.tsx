
import React from 'react';
import FreshnessLabel from './FreshnessLabel';

const FreshnessExplanation = () => {
  return (
    <div className="rounded-lg bg-muted/50 p-4 space-y-4">
      <h3 className="text-lg font-semibold">Understanding Freshness Labels</h3>
      
      <p className="text-muted-foreground">
        Fresh Tracker uses color-coded labels to indicate the status of your items:
      </p>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <FreshnessLabel level="fresh" />
          <span>Item is within the first 60% of its shelf life</span>
        </div>
        
        <div className="flex items-center gap-3">
          <FreshnessLabel level="good" />
          <span>Item is between 60% and 90% through its shelf life</span>
        </div>
        
        <div className="flex items-center gap-3">
          <FreshnessLabel level="warning" />
          <span>Item is between 90% and 100% of its shelf life</span>
        </div>
        
        <div className="flex items-center gap-3">
          <FreshnessLabel level="expired" />
          <span>Item has exceeded its recommended shelf life</span>
        </div>
      </div>
    </div>
  );
};

export default FreshnessExplanation;
