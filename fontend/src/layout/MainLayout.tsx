import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import MoreInfor from "./MoreInfor";
import Navbar, { isActive } from "./Navbar";
import "./css/mainlayout.css";
import { useEffect, useState } from "react";
import { MoreNav } from "./MoreInfor";

const MainLayout = () => {
  const location = useLocation();
  const [navMore, setNavMore] = useState<MoreNav>({
    title: "Tổng quan",
    listNav: [],
  });

  //Dựa vào url để set thông tin
  useEffect(() => {
    if (isActive("/order", location.pathname)) {
      setNavMore({
        title: "Đơn hàng",
        listNav: [
          {
            id: "1",
            name: "Tạo đơn hàng",
            link: "/order/create",
          },
          {
            id: "2",
            name: "Danh sách đơn hàng",
            link: "/order/list",
          },
          {
            id: "3",
            name: "Đơn hàng chưa hoàn thành",
            link: "/order/unfulfilled",
          },
          {
            id: "4",
            name: "Hóa đơn",
            link: "/order/invoice",
          },
        ],
      });
    } else if (isActive("/", location.pathname)) {
      setNavMore({
        title: "Tổng quan",
        listNav: [],
      });
    } else if (isActive("/employees", location.pathname)) {
      setNavMore({
        title: "Quản lí",
        listNav: [
          {
            id: "1",
            name: "Nhân viên",
            link: "/employees/list",
          },
        ],
      });
    }
    //Nếu đường dẫn là customer
    else if (isActive("/customer", location.pathname)) {
      setNavMore({
        title: "Quản lí",
        listNav: [
          {
            id: "1",
            name: "Khách hàng",
            link: "/customer",
          },
          {
            id: "2",
            name: "Công nợ khách hàng",
            link: "/customer/debt", // Chỉnh sửa cái link này,
          },
        ],
      });
    }
  }, [location]);

  return (
    <div>
      <Header></Header>
      <div className="d-flex main-layout">
        <div className="flex-2">
          <Navbar></Navbar>
        </div>
        <div className="flex-4">
          <MoreInfor morenav={navMore}></MoreInfor>
        </div>

        <div className="flex-14">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
