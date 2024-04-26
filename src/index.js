import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import UserContextProvider from './store/user-context';
import OrdersContextProvider from './store/orders-context';
import UsersContextProvider from './store/users-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <UsersContextProvider>
        <OrdersContextProvider>
          <App />
        </OrdersContextProvider>
      </UsersContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
