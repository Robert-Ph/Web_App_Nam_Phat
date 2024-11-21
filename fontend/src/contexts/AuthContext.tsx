import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { login, logout } from "../service/AuthenService";

import api from "../api/APIConfig";

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
  const [role, setRole] = useState<string | null>(
    localStorage.getItem("role") || null
  ); // Thêm trạng thái cho role

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Ví dụ: Gửi yêu cầu kiểm tra token
      api
        .post("/authen/refesh", {
          token,
        })
        .then((response) => {
          // setRole(response.data.data.permission); // Lưu role từ API
          console.log(response.data.data.valid == true);
          if (response.data.data.valid == true) {
            setRole(response.data.data.permission); // Cập nhật role
            localStorage.setItem("role", response.data.data.permission); // Lưu lại role
          } else {
            logoutUser();
          }
        })
        .catch(() => {
          logoutUser();
        });
    }
  }, []);

  console.log(role);

  const loginUser = async (username: string, password: string) => {
    try {
      const reponse = await login(username, password);

      console.log(reponse);
      localStorage.setItem("token", reponse.data.token); // Lưu token
      localStorage.setItem("username", reponse.data.account.username);
      // setRole(reponse.data.account.permission); // Lưu role

      localStorage.setItem("role", reponse.data.account.permission);
      setRole(reponse.data.account.permission);
    } catch (error: any) {
      throw error;
    }
  };

  const logoutUser = () => {
    // const reponse = logout(localStorage.getItem("token")?.toString());
    // console.log(reponse);

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    //setRole(null); // Xóa role khi đăng xuất
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
