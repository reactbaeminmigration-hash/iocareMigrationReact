import { createHashRouter, Navigate } from 'react-router-dom';
import { App } from '../App';
import { airRoutes } from '../domain/air/router/router';
import { LoginPage } from '../domain/user/pages/LoginPage';
import { ProtectedRoute } from './ProtectedRoute';
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
        element: <ProtectedRoute />, // ProtectedRoute가 인증 및 로딩 상태를 확인합
        children: [
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
    ],
  },
]);

export default router;
