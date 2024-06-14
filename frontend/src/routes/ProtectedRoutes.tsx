import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoutes = () => {
  const { token } = useAuth();

	return token  ? <Outlet /> : <Navigate to="/login"  replace />;
};

export default ProtectedRoutes;