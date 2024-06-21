import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PublicOnlyRoutes = () => {
  const { authenticated } = useAuth();

  return authenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicOnlyRoutes;
