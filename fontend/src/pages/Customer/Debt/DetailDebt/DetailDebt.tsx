import {useEffect, useRef, useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import TuneIcon from "@mui/icons-material/Tune";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./detailDebt.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SettingsIcon from "@mui/icons-material/Settings";
import {useNavigate, useParams} from "react-router-dom";
import PayModal from "../Modal/PayModal";
import {toast} from "react-toastify";
import Dept from "../../../../model/debt.model.tsx";
import DeptService from "../../../../service/DeptService.tsx";
import Order from "../../../../model/order.model.tsx";
import {formatCurrency} from "../../../../utils/Utils.tsx";
import {updateIspay} from "../../../../service/OrderService.tsx";


const DetailDebt = () => {

  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const param = useParams();
  const currentDepts = useRef<Dept | null>(null);
  const navigate = useNavigate();
  const [depts, setDepts] = useState<Dept>({
    customerID: null,
    nameCustomer: "",
    phoneNumber: "",
    totalAmount: 0,
    monthlyPayment: 0,
  });
  const [orders, setOrders] = useState<Order[]>([]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const handleAddOrder = async (id: number) => {
    try {
      // Gọi API cập nhật trạng thái 'isPay' cho đơn hàng với id
      await updateIspay(id);
      // ✅ Reload trang sau 1.5s để toast hiển thị
      setTimeout(() => {
        window.location.reload();
      }, 0);
      // alert("Đã cập nhật đơn hàng thành công!");
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
    }
  };



  useEffect(() => {
    const id = param?.id;

    if (!id) {
      toast.error("ID không hợp lệ");
      return; // Ngừng thực thi nếu id không tồn tại
    }

    console.log(id);

    // Gọi API lấy thông tin khách hàng
    DeptService.getById(id)
        .then((response) => {
          if (!response || !response.data || !response.data.data) {
            throw new Error("Dữ liệu không hợp lệ");
          }

          console.log(response);
          const customerData = response.data.data;
          setDepts(customerData);
          currentDepts.current = customerData;

          // Gọi API lấy danh sách đơn hàng sau khi đã lấy thông tin khách hàng
          return DeptService.getDebts(id);
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



  return (
    <div style={{ paddingBottom: "5%" }}>
      <div className="main-body">
        <div className="d-flex justify-space-bettwen ">
          <div>
            <span className="infor-customer">Khách hàng: {depts.nameCustomer}</span>
            <br />
            <span className="infor-customer">ID: {depts.customerID}</span>
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
            <button
                className="btn btn-primary"
                disabled={true}
            >
              Export
            </button>
            <button className="btn btn-primary" disabled={true} onClick={() => setOpen(true)}>
              Cập nhật công nợ
            </button>
          </div>
        </div>

        <div className="mt-0">
          <span>
            <strong>Tổng số nợ còn lại: {formatCurrency(depts.totalAmount)  } vnđ</strong>
          </span>
          <br />
          <span>Ngày thanh toán gần nhất: ../../..</span>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <h3 style={{ marginTop: "20px" }}>
            Danh sách đơn hàng chưa thanh toán
          </h3>
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
                <option value="newest">Tiền mặt</option>
                <option value="confirmed">Chuyển khoản</option>
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
                    <th
                      className="pb-7 font-w-500 text-center"
                      style={{ width: "7%" }}
                    >
                      ID
                    </th>
                    <th
                      className="pb-7 font-w-500 text-center"
                      style={{ width: "15%" }}
                    >
                      Tổng nợ
                    </th>
                    <th
                      className="pb-7 font-w-500 text-center"
                      style={{ width: "15%" }}
                    >
                      Đã thanh toán
                    </th>
                    <th
                      className="pb-7 font-w-500 text-center"
                      style={{ width: "15%" }}
                    >
                      Ngày thanh toán
                      <p>mới nhất</p>
                    </th>
                    <th
                      className="pb-7 font-w-500 text-center"
                      style={{ width: "15%" }}
                    >
                      Thanh toán
                      <p>mới nhất (VNĐ)</p>
                    </th>
                    <th
                      className="pb-7 font-w-500 text-center"
                      style={{ width: "15%" }}
                    >
                      Nợ còn lại (VNĐ)
                    </th>
                    <th
                        className="pb-7 font-w-500 text-center"
                        style={{ width: "15%" }}
                    >
                      Thanh toán
                    </th>
                    <th
                      className="pb-7 font-w-500 text-center text-black"
                      style={{ width: "6%" }}
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
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center ">
                        {order.id}
                      </td>
                      <td className="pb-7 pt-7 font-size-small font-w-500 text-center ">
                        {order.totalPrice
                            ? formatCurrency(order.totalPrice + order.totalPrice * order.vat/100)
                            : "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        {"-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        { "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        { "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        { "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        <button
                            style={{ background: "blue", color: "white" }}
                            onClick={() => order.id !== null && handleAddOrder(order.id)}  // Kiểm tra nếu order.id hợp lệ
                        >
                          Xác nhận đã thanh toán
                        </button>
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        <button
                          className="btn-more"
                          onClick={() =>
                            navigate(
                              `/customer/debt/list/order/detail/${order.id}`
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
                  count={orders.length/10+1}
                  color="primary"
                  page={page}
                  onChange={handleChange}
                />
              </Stack>
            </div>
          </div>
        </div>
      </div>
      <PayModal
        open={open}
        onClose={() => setOpen(false)}
        tittle="Cập nhật công nợ"
        orders={orders}
      ></PayModal>
    </div>
  );
};
export default DetailDebt;
