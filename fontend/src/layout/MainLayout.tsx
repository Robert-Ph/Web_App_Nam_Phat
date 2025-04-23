import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import MoreInfor from "./MoreInfor";
import Navbar, { isActive } from "./Navbar";
import "./css/mainlayout.css";
import { useEffect, useState } from "react";
import { MoreNav } from "./MoreInfor";
import ScrollToTop from "./ScrollToTop";

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
          // {
          //   id: "3",
          //   name: "Đơn hàng chưa hoàn thành",
          //   link: "/order/unfulfilled",
          // },
          {
            id: "3",
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
    //work, tool
    else if (isActive("/work", location.pathname)) {
      setNavMore({
        title: "Công việc, Công cụ",
        listNav: [
          {
            id: "1",
            name: "Công việc",
            link: "/work/list-work",
          }
        ]
      })
    }


    //Nếu đường dẫn là customer
    else if (isActive("/customer", location.pathname)) {
      setNavMore({
        title: "Quản lí",
        listNav: [
          {
            id: "1",
            name: "Khách hàng",
            link: "/customer/list",
          },
          {
            id: "2",
            name: "Công nợ khách hàng",
            link: "/customer/debt/list", // Chỉnh sửa cái link này,
          },
        ],
      });
    } else if (isActive("/warehouse", location.pathname)) {
      setNavMore({
        title: "Quản lí",
        listNav: [
          {
            id: "1",
            name: "Kho hàng",
            link: "/warehouse/list",
          },
          {
            id: "2",
            name: "Nhập kho",
            link: "/warehouse/import", // Chỉnh sửa cái link này,
          },

          {
            id: "3",
            name: "Xuất kho",
            link: "/warehouse/export", // Chỉnh sửa cái link này,
          },
        ],
      });
    } else if (isActive("/statictis", location.pathname)) {
      setNavMore({
        title: "Tổng quan",
        listNav: [
          {
            id: "1",
            name: "Tài chính",
            link: "/statictis/finance",
          },
          {
            id: "2",
            name: "Sổ quỹ",
            link: "/statictis/cash",
          },

          {
            id: "3",
            name: "Phân tích",
            link: "/statictis/analyse",
          },

          {
            id: "4",
            name: "Báo cáo ngày",
            link: "/statictis/report/day",
          },
          {
            id: "5",
            name: "Báo cáo tháng",
            link: "/statictis/report/month",
          },
          {
            id: "6",
            name: "Báo cáo đặt hàng",
            link: "/statictis/report/order",
          },
        ],
      });
    } else if (isActive("/system", location.pathname)) {
      setNavMore({
        title: "System",
        listNav: [
          {
            id: "1",
            name: "Log",
            link: "/system/log",
          },
          {
            id: "2",
            name: "Accounts",
            link: "/system/accounts",
          },

          {
            id: "3",
            name: "Backup",
            link: "/system/backup",
          },
          {
            id: "4",
            name: "Informartion",
            link: "/system/information",
          },
        ],
      });
    }
  }, [location]);

  return (
    <div>
      <ScrollToTop></ScrollToTop>
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
