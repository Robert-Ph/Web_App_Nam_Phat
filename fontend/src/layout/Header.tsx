import "./css/header.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import vflt from "../assets/logo.svg";

const Header = () => {
  return (
    <div className="wrap-container">
      <div className="bg-primary header-page">
        <div className="container-header  d-flex justify-space-bettwen">
          <div>
            <img src={vflt} style={{ width: "100px" }}></img>
          </div>
          <div className="d-flex ">
            <AccountCircleIcon
              className="icon"
              style={{ marginTop: "2.7%" }}
            ></AccountCircleIcon>
            <div className="" style={{ alignContent: "center" }}>
              <span>Nguyễn Văn A</span>
            </div>
            <div style={{ marginLeft: "25px" }}>
              <button className="btn-danger btn">Log out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
