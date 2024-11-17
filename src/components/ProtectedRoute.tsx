import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, userData } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userData?.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export { ProtectedRoute };
