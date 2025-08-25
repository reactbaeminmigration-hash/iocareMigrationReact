import ReactDOM from 'react-dom/client';
import 'react-loading-skeleton/dist/skeleton.css';
import { RouterProvider } from 'react-router';
import './assets/css/common.css';
import './core/i18n/i18n';
import router from './router/router';

const root = document.getElementById('root');

ReactDOM.createRoot(root!).render(<RouterProvider router={router} />);
