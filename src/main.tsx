import { RouterProvider } from 'react-router';

import ReactDOM from 'react-dom/client';
import './index.css';
import router from './router/router';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);