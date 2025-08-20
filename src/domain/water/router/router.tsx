import { Navigate } from 'react-router-dom';
import { routerPath } from './routerPath';

export const WaterRoutes = [
  {
    path: routerPath.path,
    lazy: async () => {
      const { DomainLayoutWrapper } = await import(
        '@/shared/components/Layout/DomainLayoutWrapper'
      );
      return { Component: DomainLayoutWrapper };
    },
    children: [
      {
        index: true,
        element: <Navigate to="/water/home" replace />,
      },
      {
        path: routerPath.home,
        lazy: async () => {
          const { WaterHomePage } = await import('../pages/WaterHomePage');
          return { Component: WaterHomePage };
        },
      },
      {
        path: routerPath.report,
        lazy: async () => {
          const { WaterReportPage } = await import('../pages/WaterReportPage');
          return { Component: WaterReportPage };
        },
      },
      {
        path: routerPath.control,
        lazy: async () => {
          const { WaterControlPage } = await import(
            '../pages/WaterControlPage'
          );
          return { Component: WaterControlPage };
        },
      },
      {
        path: routerPath.notice,
        lazy: async () => {
          const { WaterNoticePage } = await import('../pages/WaterNoticePage');
          return { Component: WaterNoticePage };
        },
      },
      {
        path: routerPath.settings,
        lazy: async () => {
          const { WaterSettingsPage } = await import(
            '../pages/WaterSettingsPage'
          );
          return { Component: WaterSettingsPage };
        },
      },
    ],
  },
];
