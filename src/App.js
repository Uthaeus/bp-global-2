import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Error from "./components/error/error";
import RootLayout from "./components/layouts/root-layout";
import Home from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
