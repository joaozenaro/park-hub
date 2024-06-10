import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Confirm from "../pages/Confirm";
import NotFound from "../pages/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ]
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/confirm',
    element: <Confirm />
  },
  {
    path: '*',
    element: <NotFound />
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;