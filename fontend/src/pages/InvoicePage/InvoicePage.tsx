import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../OrderPage/ListOrderPage/listOrder.css";
import { order } from "../../model/person.model";

const InvoicePage = () => {
  const [products, setProducts] = useState<order[]>([
    {
      id: "521345",
      name: "Công ty TNHN XD Nguyễn Hoàng Tiến Phát Hoàng Thanh Hải Đăng Kiểm",
      date: "31/12/2024",
      price: "1 200 000 000 000 VNĐ",
      isPay: "Chưa Thanh Toán",
      status: "Chưa giao",
    },
    {
      id: "123",
      name: "Công ty TNHN XD Nguyễn Hoàng Tiến Phát Hoàng Thanh Hải Đăng Kiểm",
      date: "31/12/2024",
      price: "1 200 000 000 000 VNĐ",
      isPay: "Chưa Thanh Toán",
      status: "Chưa giao",
    },
    {
      id: "4567",
      name: "Công ty TNHN XD Nguyễn Hoàng Tiến Phát Hoàng Thanh Hải Đăng Kiểm",
      date: "31/12/2024",
      price: "1 200 000 000 000 VNĐ",
      isPay: "Chưa Thanh Toán",
      status: "Chưa giao",
    },
    {
      id: "5213145",
      name: "Công ty TNHN XD Nguyễn Hoàng Tiến Phát Hoàng Thanh Hải Đăng Kiểm",
      date: "31/12/2024",
      price: "1 200 000 000 000 VNĐ",
      isPay: "Chưa Thanh Toán",
      status: "Chưa giao",
    },
    {
      id: "521321345",
      name: "Công ty TNHN XD Nguyễn Hoàng Tiến Phát Hoàng Thanh Hải Đăng Kiểm",
      date: "31/12/2024",
      price: "1 200 000 000 000 VNĐ",
      isPay: "Chưa Thanh Toán",
      status: "Chưa giao",
    },
  ]);
  return (
    <div>
      <div className="main-body">
        <h3>Danh sách hóa đơn</h3>
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

            {/* <div style={{ position: "relative" }}>
              <select className="filter-select">
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
            </div> */}
          </div>
        </div>
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
                    style={{ width: "8%", paddingRight: "10px" }}
                  >
                    Mã đơn hàng
                  </th>
                  <th
                    className="pb-7 font-w-500"
                    style={{ width: "20%", paddingRight: "10px" }}
                  >
                    Tên khách hàng
                  </th>
                  <th className="pb-7 font-w-500" style={{ width: "10%" }}>
                    Ngày tạo
                  </th>

                  <th className="pb-7 font-w-500" style={{ width: "5%" }}></th>
                </tr>
              </thead>
              <tbody className="border-header-table">
                {products.map((product) => (
                  <tr key={product.id} className="border-header-table">
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                      {product.id}
                    </td>
                    <td className="pb-7 pt-7 font-size-small font-w-500 ">
                      {product.id || "-"}
                    </td>
                    <td
                      className="pb-7 pt-7 font-size-small td-table font-w-500"
                      style={{ paddingRight: "20px" }}
                    >
                      {product.name || "-"}
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      {product.date || "-"}
                    </td>

                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      <button className="btn btn-primary">Xuất File</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <Stack spacing={2}>
              <Pagination count={10} color="primary" />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
