import { createHashRouter } from 'react-router-dom';
import { App } from '../App';
import { AirHomePage } from '../domain/air/pages/AirHomePage';
import { WaterHomePage } from '../domain/water/pages/WaterHomePage';
import { routerPath } from './routerPath';

const router = createHashRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: AirHomePage,
      },
      {
        path: routerPath.air,
        Component: AirHomePage,
      },
      {
        path: routerPath.water,
        Component: WaterHomePage,
      },
    ],
  },
]);

export default router;
