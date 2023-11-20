import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Search } from './Search';
import { DetailsCard } from './components/DetailsCard/DetailsCard';
import { Provider } from 'react-redux';
import { store } from './redux';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Search />,
    children: [
      {
        path: 'details/:id',
        element: <DetailsCard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
