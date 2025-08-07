import { createHashRouter } from 'react-router-dom';
import { AirHomePage } from '../domain/air/pages/AirHomePage';
import { LoginPage } from '../domain/user/pages/LoginPage';
import { WaterHomePage } from '../domain/water/pages/WaterHomePage';
import { routerPath } from './routerPath';

const router = createHashRouter([
  {
    path: '/',
    Component: LoginPage,
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
    ],
  },
]);

export default router;
