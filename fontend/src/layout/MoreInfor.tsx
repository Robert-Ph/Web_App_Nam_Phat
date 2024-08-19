import { Link, useLocation } from "react-router-dom";
import "./css/navbar.css";

type LinkNav = {
  id: string;
  name: string;
  link: string;
};

export type MoreNav = {
  title: string;
  listNav: LinkNav[];
};

const isActive = (path: string, location: string) => {
  return location == path;
};

const MoreInfor = ({ morenav }: { morenav: MoreNav }) => {
  const location = useLocation();

  return (
    <div className="d-flex bg-more dicrect-col pd-20-px">
      <h3 style={{ textAlign: "center" }}>{morenav.title}</h3>

      <div className="">
        {morenav.listNav.map((item: LinkNav) => {
          return (
            <div
              key={item.id}
              className={`mt-20 mb-20-px pd-8 wrap-nav-item  ${
                isActive(item.link, location.pathname) ? "active-item" : ""
              }`}
            >
              <Link
                to={item.link}
                className={`text-black text-nav `}
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
