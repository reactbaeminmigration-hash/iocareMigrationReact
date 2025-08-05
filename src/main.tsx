import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { AppInitializer } from './AppInitializer';
import './index.css';
import router from './router/router';

const root = document.getElementById('root');

ReactDOM.createRoot(root!).render(
  <AppInitializer>
    <RouterProvider router={router} />
  </AppInitializer>,
);
