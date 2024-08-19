import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import DvrOutlinedIcon from "@mui/icons-material/DvrOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";

import "./css/header.css";
import "./css/navbar.css";

export const isActive = (path: string, location: string) => {
  if (path == "/" && location != "/") {
    return false;
  }
  return location.search(path) != -1;
};

const Navbar = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="d-flex dicrect-col bg-navbar navbar pd-20-px">
      <Link
        to={"/"}
        className={`navbar-item color-black ${
          isActive("/", location.pathname) ? " active" : ""
        }`}
      >
        <HomeIcon className="icon-size"></HomeIcon>
      </Link>
      <Link
        to={"/order/create"}
        className={`navbar-item color-black ${
          isActive("/order", location.pathname) ? " active" : ""
        }`}
      >
        <ShoppingCartOutlinedIcon className="icon-size"></ShoppingCartOutlinedIcon>
      </Link>
      <Link to={""} className="navbar-item color-black">
        <Groups2OutlinedIcon className="icon-size"></Groups2OutlinedIcon>
      </Link>
      <Link to={""} className="navbar-item color-black">
        <Diversity3OutlinedIcon className="icon-size"></Diversity3OutlinedIcon>
      </Link>
      <Link to={""} className="navbar-item color-black">
        <QueryStatsOutlinedIcon className="icon-size"></QueryStatsOutlinedIcon>
      </Link>
      <Link to={""} className="navbar-item color-black">
        <DvrOutlinedIcon className="icon-size"></DvrOutlinedIcon>
      </Link>
      <Link to={""} className="navbar-item color-black">
        <SettingsSuggestOutlinedIcon className="icon-size"></SettingsSuggestOutlinedIcon>
      </Link>
    </div>
  );
};
export default Navbar;
