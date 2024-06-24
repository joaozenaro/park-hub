import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "../pages/Login";
import PasswordReset from "../pages/PasswordReset";
import SidebarPageLayout from "../components/layout/SidebarPageLayout";
import Profile from "../pages/Profile";
import PublicOnlyRoutes from "./PublicOnlyRoutes";
import ForgotPassword from "../pages/ForgotPassword";
import Users from "../pages/Users";
import ParkingSpots from "../pages/ParkingSpots";
import CompleteSignup from "../pages/CompleteSignup";

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
          {
            path: "/usuarios",
            element: <Users />,
          },
          {
            path: "/vagas",
            element: <ParkingSpots />,
          },
          {
            path: "/fluxo-de-veiculos",
            element: <ParkingSpots />,
          },
          {
            path: "/financeiro",
            element: <ParkingSpots />,
          },
          {
            path: "/profile",
            element: <Profile />,
          }, 
        ]
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
    element: <CompleteSignup />
  },
  {
    path: '/password-reset',
    element: <PasswordReset />
  },
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: '/esqueceu-sua-senha',
    element: <ForgotPassword />
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;