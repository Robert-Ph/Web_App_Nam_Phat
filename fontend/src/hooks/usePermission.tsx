import { useAuth } from "../contexts/AuthContext";

const usePermission = (requiredRole: string) => {
  const { role } = useAuth();
  return role === requiredRole; // Hoặc bạn có thể kiểm tra một mảng quyền
};

export default usePermission;
