import { createHashRouter } from 'react-router-dom';
import { App } from '../App';
import { AirHomePage } from '../domain/air/pages/AirHomePage';
import { LoginPage } from '../domain/user/pages/LoginPage';
import { WaterHomePage } from '../domain/water/pages/WaterHomePage';
import { routerPath } from './routerPath';
import { GnbHomePage } from '@/domain/gnb/pages/GnbHomePage';

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
        path: routerPath.air,
        Component: AirHomePage,
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
