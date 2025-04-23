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
import { useAuth } from "../contexts/AuthContext";
import WorkIcon from "@mui/icons-material/Assignment";

export const isActive = (path: string, location: string) => {
  if (path == "/" && location != "/") {
    return false;
  }
  return location.search(path) != -1 && location.search(path) == 0;
};

const Navbar = () => {
  const location = useLocation();
  console.log(location.pathname);

  const { role } = useAuth();

  return (
    <div className="d-flex dicrect-col bg-navbar navbar pd-20-px">
      <Link
        to={"/"}
        className={`navbar-item color-black ${
          isActive("/", location.pathname) ? " active" : ""
        }`}
        title="Tổng quan"
      >
        <HomeIcon className="icon-size"></HomeIcon>
      </Link>
      <Link
        to={"/order/create"}
        className={`navbar-item color-black ${
          isActive("/order", location.pathname) ? " active" : ""
        }`}
        title="Đơn hàng"
      >
        <ShoppingCartOutlinedIcon className="icon-size"></ShoppingCartOutlinedIcon>
      </Link>
      <Link  to={"/work/list-work"}
             className={`navbar-item color-black ${
                 isActive("/work", location.pathname) ? " active" : ""
             }`}
             title="Công việc">
          <WorkIcon className="icon-size"></WorkIcon>
      </Link>
      <Link
        to={"/customer/list"}
        className={`navbar-item color-black ${
          isActive("/customer", location.pathname) ? " active" : ""
        }`}
        title="Khách hàng"
      >
        <Groups2OutlinedIcon className="icon-size"></Groups2OutlinedIcon>
      </Link>
        {role && role == "ADMIN" && (
            <Link
                to={"/employees/list"}
                className={`navbar-item color-black ${
                    isActive("/employees", location.pathname) ? " active" : ""
                }`}
                title="Nhân viên (nhân sự)"
            >
                <Diversity3OutlinedIcon className="icon-size"></Diversity3OutlinedIcon>
            </Link>
        )}

        {role && role =="ADMIN" && (
            <Link
                to={"/statictis/finance"}
                className={`navbar-item color-black ${
                    isActive("/statictis", location.pathname) ? " active" : ""
                }`}
                title="Thống kê"
            >
                <QueryStatsOutlinedIcon className="icon-size"></QueryStatsOutlinedIcon>
            </Link>
        )}
      {/*<Link*/}
      {/*  to={"/statictis/finance"}*/}
      {/*  className={`navbar-item color-black ${*/}
      {/*    isActive("/statictis", location.pathname) ? " active" : ""*/}
      {/*  }`}*/}
      {/*  title="Thống kê"*/}
      {/*>*/}
      {/*  <QueryStatsOutlinedIcon className="icon-size"></QueryStatsOutlinedIcon>*/}
      {/*</Link>*/}
      <Link
        to={"/warehouse/list"}
        className={`navbar-item color-black ${
          isActive("/warehouse", location.pathname) ? " active" : ""
        }`}
        title="Kho hàng"
      >
        <DvrOutlinedIcon className="icon-size"></DvrOutlinedIcon>
      </Link>
      {role && role == "ADMIN" && (
        <Link
          to={"/system/log"}
          className={`navbar-item color-black ${
            isActive("/system", location.pathname) ? " active" : ""
          }`}
          title="Hệ thống"
        >
          <SettingsSuggestOutlinedIcon className="icon-size"></SettingsSuggestOutlinedIcon>
        </Link>
      )}
    </div>
  );
};
export default Navbar;
