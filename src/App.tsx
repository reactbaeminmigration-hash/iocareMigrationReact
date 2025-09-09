import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet } from 'react-router-dom';
import { DataSyncManager } from './app/components/DataSyncManager';
import { NavigationLoadingIndicator } from './app/components/NavigationLoadingIndicator';
import { AppInitializer } from './AppInitializer';
import queryClient from './core/api/queryClient';
import { ErrorPopup } from './shared/components/ErrorPopup/ErrorPopup';
import { GlobalPopup } from './shared/components/GlobalPopup/GlobalPopup';
import { LoadingSpinner } from './shared/components/LoadingSpinner/LoadingSpinner';
import { useGlobalPopupStore } from './shared/stores/globalPopStore';
import { useLoadingStore } from './shared/stores/loadingStore';
import { useErrorPopupStore } from './shared/stores/useErrorPopupStore';

export const App = () => {
  const { isLoading } = useLoadingStore();
  const { isGlobalPopup } = useGlobalPopupStore();
  const { isErrorPopup } = useErrorPopupStore();
  // const { t, i18n } = useTranslation();

  // const changeLanguage = (lang: Language) => {
  //   i18n.changeLanguage(lang);
  // };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppInitializer>
          <DataSyncManager />
          <NavigationLoadingIndicator />
          {isLoading && <LoadingSpinner />}
          <Outlet></Outlet>
          {isGlobalPopup.isOpen && <GlobalPopup />}
          {isErrorPopup.isOpen && <ErrorPopup />}
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </AppInitializer>
      </QueryClientProvider>
    </>
  );
};
