import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import TuneIcon from "@mui/icons-material/Tune";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./listOrder.css";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import Order from "../../../model/order.model";
import OrderService from "../../../service/OrderService";
import { formatCurrency, formatDateTime } from "../../../utils/Utils";
import Spiner from "../../../component/Spiner/Spiner";

const ListOrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const pageSize = 15;

  const [filterOption, setFilterOption] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      console.log("search:" + search + "filter:" + filterOption);

      setLoading(true);
      try {
        const response = await OrderService.getBySearchAndFilter(
          page - 1,
          pageSize,
          search,
          filterOption
        );
        setOrders(response.data.data.content);
        setTotalPages(response.data.data.page.totalPages);
        console.log(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
      }
      // finally {
      //   setLoading(false);
      // }
    };

    fetchData();
  }, [page, pageSize, search, filterOption]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    setFilterOption(event.target.value);
  };

  const hienThiTrangThai = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "Đã giao";
      case "CONFIM":
        return "Xác nhận";
      case "FISNISHED":
        return "Hoàn thành";
      case "CANCELLED":
        return "Đã hủy";
      default:
        return status;
    }
  };

  return (
    <div>
      <div className="main-body">
        <h3>Danh sách đơn hàng</h3>
        <div style={{ marginBottom: "10px" }}>
          <div
            className="d-flex justify-space-bettwen "
            style={{ marginTop: "15px" }}
          >
            <div className="d-flex">
              <button className="btn-filter">
                <FilterListIcon></FilterListIcon>
              </button>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Tìm kiếm"
                  variant="standard"
                  onChange={(e) => {
                    setPage(1);
                    setSearch(e.target.value);
                  }}
                />
              </Box>
            </div>

            <div style={{ position: "relative" }}>
              <select
                className="filter-select btn btn-primary pd-r-40"
                onChange={handleFilterChange}
                value={filterOption}
              >
                <option value="all">Tất cả</option>
                <option value="newest">Mới nhất</option>
                <option value="confirmed">Xác nhận</option>
                <option value="completed">Hoàn thành</option>
                <option value="delivered">Đã giao</option>
                <option value="paid">Đã thanh toán</option>
                <option value="unpaid">Chưa thanh toán</option>
              </select>
              <i className="icon-filter">
                <TuneIcon></TuneIcon>
              </i>
            </div>
          </div>
        </div>
        <div>

          <div style={{ padding: "10px" }}>
            <div className="table-more">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr className="color-blue header-table text-left border-header-table">
                    <th className="pb-7 font-w-500" style={{ width: "7%" }}>
                      ID
                    </th>
                    <th
                      className="pb-7 font-w-500"
                      style={{ width: "25%", paddingRight: "10px" }}
                    >
                      Tên khách hàng
                    </th>
                    <th className="pb-7 font-w-500" style={{ width: "12%" }}>
                      Ngày
                    </th>
                    <th className="pb-7 font-w-500" style={{ width: "18%" }}>
                      Giá (vnđ)
                    </th>
                    <th className="pb-7 font-w-500" style={{ width: "15%" }}>
                      Thanh toán
                    </th>
                    <th className="pb-7 font-w-500" style={{ width: "12%" }}>
                      Trạng thái
                    </th>
                    <th
                      className="pb-7 font-w-500 text-black"
                      style={{ width: "5%" }}
                    >
                      <SettingsIcon></SettingsIcon>
                    </th>
                  </tr>
                </thead>
                <tbody className="border-header-table">
                  {loading && (
                    <tr>
                      <td>
                        <Spiner></Spiner>
                      </td>
                    </tr>
                  )}
                  {!loading && orders.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        rowSpan={10}
                        className="pb-7 pt-7 font-size-small td-table font-w-500 text-center"
                        style={{
                          padding: "10% 0px",
                          display: "table-cell", // Makes it behave like a table cell
                          verticalAlign: "middle", // Vertically center the content
                          borderBottom: "none",
                          fontSize: "20px",
                        }}
                      >
                        Không có dữ liệu
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    orders.length > 0 &&
                    orders.map((order) => (
                      <tr key={order.id} className="border-header-table" style={{ color: order.status === "CANCELLED" ? "red" : "inherit" }}>
                        <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                          {order.id}
                        </td>
                        <td
                          className="pb-7 pt-7 font-size-small font-w-500 "
                          style={{ paddingRight: "20px" }}
                        >
                          {(order.nameCustomer as string)   || "-"}
                        </td>
                        <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                          {order.dateCreate
                            ? formatDateTime(order.dateCreate)
                            : " - "}
                        </td>
                        <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                          {order.totalPrice
                            ? formatCurrency(
                                order.totalPrice +
                                  (order.totalPrice * order.vat) / 100
                              )
                            : "-"}
                        </td>
                        <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                          {order.pay ? "Đã thanh toán" : "Chưa thanh toán"}
                        </td>
                        <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                          {order.status ? hienThiTrangThai(order.status) : ""}
                        </td>
                        <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                          <button
                            className="btn-more"
                            onClick={() => {
                              navigate(`/order/list/detail/${order.id}`);
                            }}
                          >
                            <MoreHorizIcon></MoreHorizIcon>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="pagination">
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  color="primary"
                  page={page}
                  onChange={handleChange}
                />
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListOrderPage;
