import { DeviceProvider } from '@/app/contexts/DeviceProvider';
import { WaterRoutes } from '@/domain/water/router/router';
import { DomainLayoutWrapper } from '@/shared/components/Layout/DomainLayoutWrapper';
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
            children: [
              {
                Component: DomainLayoutWrapper,
                children: [
                  ...airRoutes,
                  ...WaterRoutes,
                  // {
                  //   path: routerPath.wifiError,
                  //   lazy: async () => {
                  //     const { WifiConnectError } = await import(
                  //       './../shared/components/Layout/WifiConnectError'
                  //     );
                  //     return { Component: WifiConnectError };
                  //   },
                  // },
                ],
              },
            ],
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
