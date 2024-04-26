import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Error from "./components/error/error";
import RootLayout from "./components/layouts/root-layout";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Signup from "./components/auth/signup";
import Login from "./components/auth/login";
import Admin from "./components/admin/admin";
import Account from "./components/account/account";
import AccountEdit from "./components/account/account-edit";
import OrderDetail from "./components/orders/order-detail";
import EditOrder from "./components/orders/edit-order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/admin",
        element: <Admin />
      },
      {
        path: "/account",
        element: <Account />
      },
      {
        path: "/account/edit",
        element: <AccountEdit />
      },
      {
        path: "/orders/:id",
        element: <OrderDetail />
      },
      {
        path: "/orders/:id/edit",
        element: <EditOrder />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/login",
        element: <Login />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
