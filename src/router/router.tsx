import { createHashRouter, Navigate } from 'react-router-dom';
import { App } from '../App';
import { LoginPage } from '../domain/user/pages/LoginPage';
import { routerPath } from './routerPath';
import { airRoutes } from '../domain/air/router/router';

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
        path: '/air',
        element: <Navigate to="/air/home" replace />,
      },
      ...airRoutes,
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
