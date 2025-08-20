import { Navigate } from 'react-router-dom';
import { routerPath } from './routerPath';

export const airRoutes = [
  {
    children: [
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
            element: <Navigate to="/air/home" replace />,
          },
          {
            path: routerPath.home,
            lazy: async () => {
              const { AirHomePage } = await import('../pages/AirHomePage');
              return { Component: AirHomePage };
            },
          },
          {
            path: routerPath.report,
            lazy: async () => {
              const { AirReportPage } = await import('../pages/AirReportPage');
              return { Component: AirReportPage };
            },
          },
          {
            path: routerPath.control,
            lazy: async () => {
              const { AirControlPage } = await import(
                '../pages/AirControlPage'
              );
              return { Component: AirControlPage };
            },
          },
          {
            path: routerPath.notice,
            lazy: async () => {
              const { AirNoticePage } = await import('../pages/AirNoticePage');
              return { Component: AirNoticePage };
            },
          },
          {
            path: routerPath.settings,
            lazy: async () => {
              const { AirSettingsPage } = await import(
                '../pages/AirSettingsPage'
              );
              return { Component: AirSettingsPage };
            },
          },
        ],
      },
    ],
  },
];
