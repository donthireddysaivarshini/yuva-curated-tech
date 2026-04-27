// src/hooks/useHomeData.ts
import { useState, useEffect } from 'react';
import { storeService } from '@/services/api';

export const useHomeData = () => {
  const [data, setData] = useState({
    new_arrivals: [], best_sellers: [], trending: [], best_deals: [], categories: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storeService.getHomeData().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  return { data, loading };
};