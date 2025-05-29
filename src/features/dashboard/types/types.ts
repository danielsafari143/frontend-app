export interface MetricCard {
    title: string;
    value: string | number;
    change: string;
    trend: 'up' | 'down';
    icon: React.ReactNode;
    subtitle: string;
  }
  
  export interface RecentActivity {
    type: string;
    title: string;
    description: string;
    date: string;
    status?: 'success' | 'warning' | 'error';
  }