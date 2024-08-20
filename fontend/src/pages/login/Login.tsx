// ui-admin/src/pages/system/Login.tsx
import "./login.scss";
import logo from "../../assets/logoNamPhat.svg";
import vflt from "../../assets/logo.svg"

const Login = () => {
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
          <input type="text" />
          <h2 className="pass">Password</h2>
          <input type="password" />
          <br />

          <button>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
