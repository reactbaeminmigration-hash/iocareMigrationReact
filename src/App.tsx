import { QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { AppInitializer } from './AppInitializer';
import qureyClient from './core/api/queryClient';
import { LoadingSpinner } from './shared/components/LoadingSpinner/LoadingSpinner';
import { useLoadingStore } from './shared/stores/loadingStore';

export const App = () => {
  const { isLoading } = useLoadingStore();
  // const { t, i18n } = useTranslation();

  // const changeLanguage = (lang: Language) => {
  //   i18n.changeLanguage(lang);
  // };

  return (
    <>
      <QueryClientProvider client={qureyClient}>
        <AppInitializer>
          {isLoading && <LoadingSpinner />}
          <Outlet></Outlet>
        </AppInitializer>
      </QueryClientProvider>
    </>
  );
};
