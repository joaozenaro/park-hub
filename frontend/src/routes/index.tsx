import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Confirm from "../pages/Confirm";
import NotFound from "../pages/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "../pages/Login";
import SidebarPageLayout from "../components/layout/SidebarPageLayout";

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <SidebarPageLayout><Outlet /></SidebarPageLayout>,
        children: [
          {
            path: "/",
            element: <Home />,
          },
        ]
      },
      {
        path: "/profile",
        element: <p>Profile</p>,
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