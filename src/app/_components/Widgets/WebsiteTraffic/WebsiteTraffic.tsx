'use client';

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';

const data = {
  totalVisits: {
    current: 25430,
    previous: 21200,
  },
  pageViews: 89750,
  bounceRate: 42.3,
  avgSessionDuration: '2m 45s',
  dailyVisits: [
    { date: 'Jan', visits: 1200 },
    { date: 'Feb', visits: 1800 },
    { date: 'Mar', visits: 1600 },
    { date: 'Apr', visits: 2100 },
    { date: 'May', visits: 1900 },
    { date: 'Jun', visits: 2400 },
    { date: 'Jul', visits: 2200 },
    { date: 'Aug', visits: 2200 },
    { date: 'Sep', visits: 2200 },
    { date: 'Oct', visits: 2200 },
    { date: 'Nov', visits: 2200 },
    { date: 'Dec', visits: 2200 },
  ],
};

const WebsiteTraffic: React.FC = () => {
  const visitChange = useMemo(() => {
    return ((data.totalVisits.current - data.totalVisits.previous) / data.totalVisits.previous) * 100;
  }, [data.totalVisits.current, data.totalVisits.previous]);

  const isPositiveChange = visitChange > 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Website Traffic</CardTitle>
      </CardHeader>
      <CardContent className=' border mx-5 mb-5 rounded-lg p-3'>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 px-5 pb-5">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground" aria-label="Total visits statistics">Total Visits</p>
            <div className="flex items-center">
              <span className="text-2xl font-bold">{data.totalVisits.current.toLocaleString()}</span>
              <span className={`ml-2 flex items-center text-sm ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>
                {isPositiveChange ? 
                  <ArrowUpIcon role="img" aria-label="Increase" /> : 
                  <ArrowDownIcon role="img" aria-label="Decrease" />
                }
                {Math.abs(visitChange).toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Page Views</p>
            <p className="text-2xl font-bold">{data.pageViews.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Bounce Rate</p>
            <p className="text-2xl font-bold">{data.bounceRate}%</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Avg. Session Duration</p>
            <p className="text-2xl font-bold">{data.avgSessionDuration}</p>
          </div>
        </div>
        <div className="h-[30vh] min-h-[200px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.dailyVisits}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="visits" 
                stroke="#0ea5e9" 
                strokeWidth={2} 
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebsiteTraffic;