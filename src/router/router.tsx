import { createHashRouter } from 'react-router-dom';
import { App } from '../App';
import { AirHomePage } from '../domain/air/pages/AirHomePage';
import { LoginPage } from '../domain/user/pages/LoginPage';
import { WaterHomePage } from '../domain/water/pages/WaterHomePage';
import { routerPath } from './routerPath';
import { GnbHomePage } from '@/domain/gnb/pages/GnbHomePage';
import { AirReportPage } from '@/domain/air/pages/AirReportPage';
import { AirControlPage } from '@/domain/air/pages/AirControlPage';
import { AirNoticePage } from '@/domain/air/pages/AirNoticePage';
import { AirSettingsPage } from '@/domain/air/pages/AirSettingsPage';

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
        Component: AirHomePage,
      },
      {
        path: routerPath.air_report,
        Component: AirReportPage,
      },
      {
        path: routerPath.air_control,
        Component: AirControlPage,
      },
      {
        path: routerPath.air_notice,
        Component: AirNoticePage,
      },
      {
        path: routerPath.air_settings,
        Component: AirSettingsPage,
      },
      {
        path: routerPath.water,
        Component: WaterHomePage,
      },
      {
        path: routerPath.login,
        Component: LoginPage,
      },
      {
        path: routerPath.gnb,
        Component: GnbHomePage,
      },
    ],
  },
]);

export default router;
