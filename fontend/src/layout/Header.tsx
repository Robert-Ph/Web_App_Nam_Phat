import "./css/header.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import vflt from "../assets/logo.svg";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { logoutUser } = useAuth();
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  return (
    <div className="wrap-container">
      <div className="bg-primary header-page">
        <div className="container-header  d-flex justify-space-bettwen">
          <div>
            <img src={vflt} style={{ width: "100px" , marginTop:'10px'}}></img>
            <p style={{fontSize:'14px', marginTop:'0px'}}>Version: 2.0.3(Meta)</p>
          </div>
          <div className="d-flex ">
            <AccountCircleIcon
              className="icon"
              style={{ marginTop: "2.7%" }}
            ></AccountCircleIcon>
            <div className="" style={{ alignContent: "center" }}>
              <span>{username ? username : "Unknow"}</span>
            </div>
            <div style={{ marginLeft: "25px" }}>
              <button
                className="btn-danger btn"
                onClick={() => {
                  logoutUser();
                  navigate("/login");
                }}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
