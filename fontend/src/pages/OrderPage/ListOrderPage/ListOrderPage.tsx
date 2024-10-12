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
import { formatDateTime } from "../../../utils/Utils";
const ListOrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const pageSize = 10;

  const [filterOption, setFilterOption] = useState<string>("all");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await OrderService.getAll(page - 1, pageSize);
        setOrders(response.data.data.content);
        setTotalPages(response.data.data.page.totalPages);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOption(event.target.value);
  };

  console.log(page);
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
          {/* <div className="table-container">
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
                  <th className="pb-7 font-w-500" style={{ width: "20%" }}>
                    Giá (vnđ)
                  </th>
                  <th className="pb-7 font-w-500" style={{ width: "15%" }}>
                    Thanh toán
                  </th>
                  <th className="pb-7 font-w-500" style={{ width: "12%" }}>
                    Trạng thái
                  </th>
                  <th className="pb-7 font-w-500" style={{ width: "3%" }}></th>
                </tr>
              </thead>
              <tbody className="border-header-table">
                {products.map((product) => (
                  <tr key={product.id} className="border-header-table">
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                      {product.id}
                    </td>
                    <td
                      className="pb-7 pt-7 font-size-small font-w-500 "
                      style={{ paddingRight: "20px" }}
                    >
                      {product.name || "-"}
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      {product.date || "-"}
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      {product.price || "-"}
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      {product.isPay || "-"}
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      {product.status || "-"}
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      <button className="btn-more">
                        <MoreHorizIcon></MoreHorizIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}

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
                  {orders.map((order) => (
                    <tr key={order.id} className="border-header-table">
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                        {order.id}
                      </td>
                      <td
                        className="pb-7 pt-7 font-size-small font-w-500 "
                        style={{ paddingRight: "20px" }}
                      >
                        {order.nameCustomer || "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                        {order.dateCreate
                          ? formatDateTime(order.dateCreate)
                          : " - "}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                        {order.totalPrice
                          ? order.totalPrice + order.totalPrice * order.vat
                          : "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                        {order.isPay ? "Đã thanh toán" : "Chưa thanh toán"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                        {order.status || "-"}
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
