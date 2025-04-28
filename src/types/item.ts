
export interface Item {
  id: string;
  name: string;
  icon: string;
  openedDate: string;
  category: string;
  customDuration?: number; // in days, for custom shelf life
}

export type FreshnessLevel = 'fresh' | 'good' | 'warning' | 'expired';
