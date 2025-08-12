import { useEffect } from 'react';
import { useLoadingStore } from '../../../shared/stores/loadingStore';
import { LayoutHeader } from '@/shared/components/Layout/LayoutHeader';

export const AirHomePage = () => {
  const { setLoading } = useLoadingStore();
  // useEffect(() => {
  //   setLoading(true);
  // }, []);

  return <LayoutHeader />;
};
