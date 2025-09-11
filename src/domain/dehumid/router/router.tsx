import { deviceLoader } from '@/domain/device/api/deviceLoader';
import { routerPath } from './routerPath';
import { Navigate, type ShouldRevalidateFunctionArgs } from 'react-router-dom';

export const dehumidRoutes = [
  {
    path: routerPath.path,
    loader: deviceLoader,
    shouldReValidate: ({
      currentUrl,
      nextUrl,
    }: ShouldRevalidateFunctionArgs) => {
      return currentUrl.pathname !== nextUrl.pathname;
    },
    children: [
      {
        index: true,
        element: <Navigate to="/dehumid/home" replace />,
      },
      {
        path: routerPath.home,
        lazy: async () => {
          const { DehumidHomePage } = await import('../pages/DehumidHomePage');
          return { Component: DehumidHomePage };
        },
      },
      {
        path: routerPath.report,
        lazy: async () => {
          const { DehumidReportPage } = await import(
            '../pages/DehumidReportPage'
          );
          return { Component: DehumidReportPage };
        },
      },
      {
        path: routerPath.control,
        lazy: async () => {
          const { DehumidControlPage } = await import(
            '../pages/DehumidControlPage'
          );
          return { Component: DehumidControlPage };
        },
      },
      {
        path: routerPath.notice,
        lazy: async () => {
          const { DehumidNoticePage } = await import(
            '../pages/DehumidNoticePage'
          );
          return { Component: DehumidNoticePage };
        },
      },
      {
        path: routerPath.settings,
        lazy: async () => {
          const { DehumidSettingsPage } = await import(
            '../pages/DehumidSettingsPage'
          );
          return { Component: DehumidSettingsPage };
        },
      },
    ],
  },
];
