import "./css/header.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  return (
    <div className="wrap-container">
      <div className="bg-primary header-page">
        <div className="container d-flex justify-space-bettwen">
          <div>
            <h2>Logo</h2>
          </div>
          <div className="d-flex mr-5-percent">
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
