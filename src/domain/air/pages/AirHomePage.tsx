import { useEffect } from 'react';
import { useLoadingStore } from '../../../shared/stores/loadingStore';

export const AirHomePage = () => {
  const { setLoading } = useLoadingStore();
  useEffect(() => {
    setLoading(true);
  }, []);

  return <div>AirHomePage</div>;
};
