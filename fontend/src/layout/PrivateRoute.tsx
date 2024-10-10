import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface PrivateRouteProps {
  element: React.ReactNode;
  requiredRoles: string[];
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  requiredRoles,
  ...rest
}) => {
  const { role } = useAuth();

  const hasAccess = requiredRoles.includes(role!); // Kiểm tra quyền

  return (
    <Route {...rest} element={hasAccess ? element : <Navigate to="/login" />} />
  );
};

export default PrivateRoute;
