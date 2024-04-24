import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import UserContextProvider from './store/user-context';
import OrdersContextProvider from './store/orders-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <OrdersContextProvider>
        <App />
      </OrdersContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
