import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

interface RequireAuthProps {
  allowedRoles: string[]; // Các vai trò được phép
  children: JSX.Element;
}

const RequireAuth: React.FC<RequireAuthProps> = ({
  allowedRoles,
  children,
}) => {
  const { role } = useAuth();
  const token = localStorage.getItem("token");

  const [isLoading, setIsLoading] = useState(true);
  console.log("Role:" + role);

  useEffect(() => {
    if (role || !token) {
      setIsLoading(false);
    }
  }, [role, token]);

  if (isLoading) {
    return <div>Đang kiểm tra quyền truy cập...</div>;
  }

  if (!role) {
    // toast.error("Lỗi xác thực", {
    //   autoClose: 1000,
    // });
    return <Navigate to="/login" replace />;
  }

  if (!token) {
    toast.error("Vui lòng đăng nhập lại", {
      autoClose: 1000,
    });
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    toast.error("Bạn không có quyền truy cập trang này", {
      autoClose: 1000,
    });
    return <Navigate to="/" replace />;
  }

  return children;

  return children;
};

export default RequireAuth;
