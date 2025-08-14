import { routerPath } from './routerPath';

export const WaterRoutes = [
  {
    path: '/Water',
    lazy: async () => {
      const { Layout } = await import('@/shared/components/Layout/Layout');
      return { Component: Layout };
    },
    children: [
      {
        index: true,
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
