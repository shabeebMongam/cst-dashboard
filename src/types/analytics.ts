export interface TrafficStats {
  totalVisits: {
    current: number;
    previous: number;
  };
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: string;
  dailyVisits: {
    date: string;
    visits: number;
  }[];
}
