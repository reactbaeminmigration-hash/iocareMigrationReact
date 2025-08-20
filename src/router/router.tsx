import { DeviceProvider } from '@/app/contexts/DeviceProvider';
import { WaterRoutes } from '@/domain/water/router/router';
import { createHashRouter, Outlet } from 'react-router-dom';
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
        path: routerPath.login,
        Component: LoginPage,
      },
      {
        element: <ProtectedRoute />, // ProtectedRoute가 인증 및 로딩 상태를 확인합
        children: [
          {
            element: (
              <DeviceProvider>
                <Outlet />
              </DeviceProvider>
            ),
            children: [...airRoutes, ...WaterRoutes],
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
