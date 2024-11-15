import { ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  requiredRole,
  children,
}: {
  requiredRole: string;
  children: ReactNode;
}) => {
  const { role } = useAuth();

  if (!role || role !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
