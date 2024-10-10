// ui-admin/src/pages/system/Login.tsx
import "./login.scss";
import logo from "../../assets/logoNamPhat.svg";
import vflt from "../../assets/logo.svg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState<string | null>(null);
  const { loginUser } = useAuth(); // Lấy loginUser từ context
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // setError(null);

    try {
      await loginUser(username, password);
      navigate("/");
    } catch (err: any) {
      if (err.response.data.code == 422) {
        toast.error("Mật khẩu không chính xác!", {
          autoClose: 2000,
        });
      } else if (err.response.data.code == 420) {
        toast.error("Tài khoản không tồn tại trong hệ thống!", {
          autoClose: 2000,
        });
      } else if (err.response.data.code == 421) {
        toast.error("Tài khoản bị khóa! Vui lòng liên hệ admin!", {
          autoClose: 2000,
        });
      } else {
        toast.error("Lỗi không xác định !", {
          autoClose: 2000,
        });
      }
    }
  };
  return (
    <div className="login">
      <div className="header">
        <div className="title text">
          <img alt="Logo VFLT" className="logo-vflt" src={vflt}></img>
        </div>
        <div className="title text_2">
          <h1>
            SYSTEM <br /> MANAGERMENT
          </h1>
        </div>
      </div>
      <div className="logo">
        <img alt="Logo Nam Phát" src={logo}></img>
      </div>
      <div className="body">
        <div>
          <h2>Username</h2>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
          <h2 className="pass">Password</h2>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <button onClick={handleLogin}>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
