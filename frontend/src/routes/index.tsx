import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "../pages/Login";
import PasswordReset from "../pages/PasswordReset";
import SidebarPageLayout from "../components/layout/SidebarPageLayout";
import Profile from "../pages/Profile";
import PublicOnlyRoutes from "./PublicOnlyRoutes";

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
        element: <Profile />,
      }, 
    ]
  },
  {
    element: <PublicOnlyRoutes />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
    ]
  },
  
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/invite',
    element: <Signup />
  },
  {
    path: '/password-reset',
    element: <PasswordReset />
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