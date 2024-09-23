import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import TuneIcon from "@mui/icons-material/Tune";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./listDebtCustomer.css";
import { order } from "../../../../model/person.model";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
const ListDebtCustomer = () => {
  const [products, setProducts] = useState<order[]>([
    {
      id: "521345",
      name: "Công ty TNHN XD Nguyễn Hoàng Tiến Phát Hoàng Thanh Hải Đăng Kiểm",
      date: "0123456789",
      price: "1 200 000 000 ",
      isPay: "1.200.000",
      status: "1",
    },
  ]);

  const [page, setPage] = useState<number>(1);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <div>
      <div className="main-body">
        <h3>Danh sách công nợ khách hàng</h3>
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
                    <th
                      className="pb-7 font-w-500 text-center"
                      style={{ width: "6%" }}
                    >
                      ID
                    </th>
                    <th
                      className="pb-7 font-w-500"
                      style={{
                        width: "20%",
                        paddingRight: "10px",
                        paddingLeft: "10px",
                      }}
                    >
                      Tên khách hàng
                    </th>
                    <th
                      className="pb-7 font-w-500 text-center"
                      style={{ width: "12%" }}
                    >
                      Số điện thoại
                    </th>
                    <th
                      className="pb-7 font-w-500"
                      style={{ width: "13%", textAlign: "center" }}
                    >
                      Tổng công nợ
                      <p>(VNĐ)</p>
                    </th>
                    <th
                      className="pb-7 font-w-500 text-center"
                      style={{ width: "13%" }}
                    >
                      Đã thanh toán
                      <p>(VNĐ)</p>
                    </th>
                    <th
                      className="pb-7 font-w-500 text-center"
                      style={{ width: "13%" }}
                    >
                      Còn lại (VNĐ)
                    </th>
                    <th
                      className="pb-7 font-w-500 text-center"
                      style={{ width: "10%" }}
                    >
                      Đã nợ (tháng)
                    </th>
                    <th
                      className="pb-7 font-w-500 text-black text-center"
                      style={{ width: "6%" }}
                    >
                      <SettingsIcon></SettingsIcon>
                    </th>
                  </tr>
                </thead>
                <tbody className="border-header-table">
                  {products.map((product) => (
                    <tr key={product.id} className="border-header-table">
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        {product.id}
                      </td>
                      <td
                        className="pb-7 pt-7 font-size-small font-w-500 "
                        style={{ paddingRight: "10px", paddingLeft: "10px" }}
                      >
                        {product.name || "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        {product.date || "-"}
                      </td>
                      <td
                        className="pb-7 pt-7 font-size-small td-table font-w-500"
                        style={{ textAlign: "center" }}
                      >
                        {product.price || "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        {product.isPay || "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        {product.price || "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        {product.status || "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        <button
                          className="btn-more"
                          onClick={() => {
                            navigate(
                              `/customer/debt/list/detail/${product.id}`
                            );
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
                  count={10}
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
export default ListDebtCustomer;
