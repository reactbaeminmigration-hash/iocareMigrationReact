import { createHashRouter } from 'react-router-dom';
import { App } from '../App';
import { LoginPage } from '../domain/user/pages/LoginPage';
import { routerPath } from './routerPath';

const router = createHashRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: LoginPage,
      },
      {
        path: routerPath.air_home,
        lazy: async () => {
          const { AirHomePage } = await import(
            '../domain/air/pages/AirHomePage'
          );
          return { Component: AirHomePage };
        },
      },
      {
        path: routerPath.air_report,
        lazy: async () => {
          const { AirReportPage } = await import(
            '@/domain/air/pages/AirReportPage'
          );
          return { Component: AirReportPage };
        },
      },
      {
        path: routerPath.air_control,
        lazy: async () => {
          const { AirControlPage } = await import(
            '@/domain/air/pages/AirControlPage'
          );
          return { Component: AirControlPage };
        },
      },
      {
        path: routerPath.air_notice,
        lazy: async () => {
          const { AirNoticePage } = await import(
            '@/domain/air/pages/AirNoticePage'
          );
          return { Component: AirNoticePage };
        },
      },
      {
        path: routerPath.air_settings,
        lazy: async () => {
          const { AirSettingsPage } = await import(
            '@/domain/air/pages/AirSettingsPage'
          );
          return { Component: AirSettingsPage };
        },
      },
      {
        path: routerPath.water,
        lazy: async () => {
          const { WaterHomePage } = await import(
            '../domain/water/pages/WaterHomePage'
          );
          return { Component: WaterHomePage };
        },
      },
      {
        path: routerPath.login,
        lazy: async () => {
          const { LoginPage } = await import('../domain/user/pages/LoginPage');
          return { Component: LoginPage };
        },
      },
      {
        path: routerPath.gnb,
        lazy: async () => {
          const { GnbHomePage } = await import(
            '@/domain/gnb/pages/GnbHomePage'
          );
          return { Component: GnbHomePage };
        },
      },
    ],
  },
]);

export default router;
