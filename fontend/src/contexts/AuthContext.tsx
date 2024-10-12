import React, { createContext, useContext, useState, ReactNode } from "react";
import { login } from "../service/AuthenService";
import AxiosStatic from "axios";
interface AuthContextType {
  role: string | null;
  // Thêm trường role
  loginUser: (username: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [role, setRole] = useState<string | null>(null); // Thêm trạng thái cho role

  const loginUser = async (username: string, password: string) => {
    try {
      const reponse = await login(username, password);

      console.log(reponse);
      localStorage.setItem("token", reponse.data.token); // Lưu token

      setRole(reponse.data.account.permission); // Lưu role
    } catch (error: any) {
      throw error;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");

    setRole(null); // Xóa role khi đăng xuất
  };

  return (
    <AuthContext.Provider value={{ role, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
