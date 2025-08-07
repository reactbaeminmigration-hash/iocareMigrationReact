import { Outlet } from 'react-router-dom';
import { AppInitializer } from './AppInitializer';
import { LoadingSpinner } from './shared/components/LoadingSpinner/LoadingSpinner';
import { useLoadingStore } from './shared/stores/loadingStore';

export const App = () => {
  const { isLoading } = useLoadingStore();

  return (
    <>
      <AppInitializer>
        {isLoading && <LoadingSpinner />}
        <Outlet></Outlet>
      </AppInitializer>
    </>
  );
};
