import { Outlet } from "react-router-dom";
import Header from "./Header";
import MoreInfor from "./MoreInfor";
import Navbar from "./Navbar";
import "./css/mainlayout.css";

const MainLayout = () => {
  return (
    <div>
      <Header></Header>
      <div className="d-flex main-layout">
        <div className="flex-2">
          <Navbar></Navbar>
        </div>
        <div className="flex-4">
          <MoreInfor></MoreInfor>
        </div>

        <div className="flex-14">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
