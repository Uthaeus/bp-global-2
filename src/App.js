import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Error from "./components/error/error";
import RootLayout from "./components/layouts/root-layout";
import Home from "./pages/home";
import Signup from "./components/auth/signup";
import Login from "./components/auth/login";

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
