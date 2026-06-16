import React from 'react';
import ReactDOM from 'react-dom/client';
// @ts-ignore
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './main/Main';
import List from './list/List';
import Chart from './chart/Chart';
import Building from './building/Building';
import Testing from './testing/Testing';
import { Provider } from 'react-redux';
import store from './store';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/list",
    element: <List />,
  },
  {
    path: "/chart",
    element: <Chart />,
  },
  {
    path: "/building/:id",
    element: <Building />,
  },
  {
    path: "/testing",
    element: <Testing />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
