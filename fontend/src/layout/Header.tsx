import "./css/header.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleOutlineIcon from '@mui/icons-material/Chat';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
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
            <img src={vflt} style={{ width: "80px" , marginTop:'10px'}}></img>
            <p style={{fontSize:'12px', marginTop:"-10px"}}>Version: 3.0.0</p>
          </div>
          <div className="d-flex ">
            <ChatBubbleOutlineIcon
                className="iconchat"
                style={{ marginTop: "3%", marginRight: "10px" }}>

            </ChatBubbleOutlineIcon>
            <NotificationsNoneIcon
                className="iconnotifi"
                style={{ marginTop: "3%", marginRight: "10px" }}
            />
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
