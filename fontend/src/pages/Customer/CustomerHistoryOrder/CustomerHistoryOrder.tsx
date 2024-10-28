import {useEffect, useRef, useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import TuneIcon from "@mui/icons-material/Tune";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./cutomerHistoryOrder.css";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SettingsIcon from "@mui/icons-material/Settings";
import {useNavigate, useParams} from "react-router-dom";
import Customer from "../../../model/customer.model.tsx";
import CustomerService from "../../../service/CustomerService.tsx";
import Order from "../../../model/order.model";
import {toast} from "react-toastify";


// const [page, setPage] = useState<number>(1);
const ListOrderPage = () => {
  const [customer, setCustomer] = useState<Customer>({
    id: null,
    fullName: "",
    phone: "",
    email: "",
    address: "",
    typeCustomer: "",
  });
  const currentCustomer = useRef<Customer | null>(null);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    const id = param?.id;

    if (!id) {
      toast.error("ID không hợp lệ");
      return; // Ngừng thực thi nếu id không tồn tại
    }

    console.log(id);

    // Gọi API lấy thông tin khách hàng
    CustomerService.getById(id)
        .then((response) => {
          if (!response || !response.data || !response.data.data) {
            throw new Error("Dữ liệu không hợp lệ");
          }

          console.log(response);
          const customerData = response.data.data;
          setCustomer(customerData);
          currentCustomer.current = customerData;

          // Gọi API lấy danh sách đơn hàng sau khi đã lấy thông tin khách hàng
          return CustomerService.getByIdListOrder(id);
        })
        .then((response) => {
          if (!response || !response.data || !response.data.data) {
            throw new Error("Dữ liệu đơn hàng không hợp lệ");
          }

          console.log(response);
          setOrders(response.data.data);
        })
        .catch((error) => {
          const errorResponse = error?.response;
          console.error("Error:", errorResponse);
          toast.error("Lỗi không xác định. Vui lòng thử lại!");
        });
  }, [param]);



  const [page, setPage] = useState<number>(1);
  // const [totalPages, setTotalPages] = useState(0);
  // const [loading, setLoading] = useState<boolean>(false);
  // const pageSize = 10;
  //
  // const [filterOption, setFilterOption] = useState<string>("all");
  // const [search, setSearch] = useState<string>("");


  return (
    <div style={{ paddingBottom: "5%" }}>
      <div className="main-body">
        <div className="d-flex justify-space-bettwen ">
          <div>
            <h3>Khách hàng: {customer.fullName}</h3>
            <h3>ID: {customer.id}</h3>
            <h3 style={{ marginTop: "20px" }}>Danh sách đơn hàng</h3>
          </div>
          <div style={{ alignContent: "center" }}>
            <button
              className="btn btn-black"
              onClick={() => {
                navigate(-1);
              }}
            >
              Quay về
            </button>
          </div>
        </div>
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
              <select className="filter-select btn btn-primary pd-r-40">
                <option value="all">Tất cả</option>
                <option value="newest">Đã thanh toán</option>
                <option value="confirmed">Chưa thanh toán</option>
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
                { orders.length === 0 && (
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
                  {orders.length > 0 && orders.map((order) => (
                    <tr key={order.id} className="border-header-table">
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                        {order.id}
                      </td>
                      <td
                        className="pb-7 pt-7 font-size-small font-w-500 "
                        style={{ paddingRight: "20px" }}
                      >
                        {"=" || "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                        {order.dateShip || "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                        {order.totalPrice || "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                        {order.pay || "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                        {order.status || "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                        <button
                          className="btn-more"
                          onClick={() =>
                            navigate(
                              `/customer/list/historyoder/order/detail/${order.id}`
                            )
                          }
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
                  // count={1}
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
