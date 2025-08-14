import { routerPath } from './routerPath';

export const airRoutes = [
  {
    path: '/air',
    lazy: async () => {
      const { Layout } = await import('@/shared/components/Layout/Layout');
      return { Component: Layout };
    },
    children: [
      {
        index: true,
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
          const { AirControlPage } = await import('../pages/AirControlPage');
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
          const { AirSettingsPage } = await import('../pages/AirSettingsPage');
          return { Component: AirSettingsPage };
        },
      },
    ],
  },
];
