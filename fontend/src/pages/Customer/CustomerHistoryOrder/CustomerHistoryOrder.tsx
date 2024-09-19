import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import TuneIcon from "@mui/icons-material/Tune";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./cutomerHistoryOrder.css";
import { order } from "../../../model/person.model";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

const ListOrderPage = () => {
  const [products, setProducts] = useState<order[]>([
    {
      id: "521345",
      name: "Công ty TNHN XD Nguyễn Hoàng Tiến Phát Hoàng Thanh Hải Đăng Kiểm",
      date: "31/12/2024",
      price: "1 200 000 000 000 VNĐ",
      isPay: "Chưa Thanh Toán",
      status: "Chưa giao",
    },
  ]);

  const [page, setPage] = useState<number>(1);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <div style={{ paddingBottom: "5%" }}>
      <div className="main-body">
        <div className="d-flex justify-space-bettwen ">
          <div>
            <h3>Khách hàng: Nguyễn Văn A</h3>
            <h3>ID: 124563</h3>
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
                        <button
                          className="btn-more"
                          onClick={() =>
                            navigate(
                              `/customer/list/historyoder/order/detail/${product.id}`
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
export default ListOrderPage;
