import { useAuth } from "../contexts/AuthContext";

export default function usePermission() {
  const { user } = useAuth();

  const hasRole = (requiredRole: string | string[]) => {
    if (!user?.role) return false;

    if (Array.isArray(requiredRole)) {
      requiredRole.includes(user.role);
    }
    return requiredRole === user.role;
  };

  return {
    hasRole,
  };
}
