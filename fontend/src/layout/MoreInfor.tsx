import { Link } from "react-router-dom";
import "./css/navbar.css";
import { useState } from "react";

type LinkNav = {
  id: string;
  name: string;
  link: string;
};

const MoreInfor = () => {
  const [listNav, setListNav] = useState<LinkNav[]>([
    {
      id: "1",
      name: "Đơn hàng",
      link: "",
    },
    {
      id: "2",
      name: "Danh sách đơn hàng",
      link: "",
    },
    {
      id: "3",
      name: "Đơn hàng chưa hoàn thành",
      link: "",
    },
  ]);
  return (
    <div className="d-flex bg-more dicrect-col pd-20-px">
      <h3 style={{ textAlign: "center" }}>Đơn Hàng</h3>

      <div className="">
        {listNav.map((item: LinkNav) => {
          return (
            <div key={item.id} className="mt-20 mb-20-px pd-8 wrap-nav-item ">
              <Link
                to={item.link}
                className="text-black text-nav "
                style={{ padding: "10px 0px" }}
              >
                {" "}
                {item.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MoreInfor;
