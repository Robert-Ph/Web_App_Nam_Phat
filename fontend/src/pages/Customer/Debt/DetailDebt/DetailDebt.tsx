import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import TuneIcon from "@mui/icons-material/Tune";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./detailDebt.css";
import { order } from "../../../../model/person.model";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import PayModal from "../Modal/PayModal";

const DetailDebt = () => {
  const [products, setProducts] = useState<order[]>([
    {
      id: "521345",
      name: "12.000.000",
      date: "7.000.000",
      price: "20/12/2024",
      isPay: "3.000.000",
      status: "5.000.000",
    },
  ]);

  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <div style={{ paddingBottom: "5%" }}>
      <div className="main-body">
        <div className="d-flex justify-space-bettwen ">
          <div>
            <span className="infor-customer">Khách hàng: Nguyễn Văn A</span>
            <br />
            <span className="infor-customer">ID: 124563</span>
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
            <button className="btn btn-primary" onClick={() => setOpen(true)}>
              Cập nhật công nợ
            </button>
          </div>
        </div>

        <div className="mt-30">
          <span>
            <strong>Tổng số nợ còn lại: 0 VNĐ</strong>
          </span>
          <br />
          <span>Ngày thanh toán gần nhất: 11/07/2024</span>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <h3 style={{ marginTop: "30px" }}>
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
                      className="pb-7 font-w-500 text-center text-black"
                      style={{ width: "6%" }}
                    >
                      <SettingsIcon></SettingsIcon>
                    </th>
                  </tr>
                </thead>
                <tbody className="border-header-table">
                  {products.map((product) => (
                    <tr key={product.id} className="border-header-table">
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center ">
                        {product.id}
                      </td>
                      <td className="pb-7 pt-7 font-size-small font-w-500 text-center ">
                        {product.name || "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        {product.date || "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        {product.price || "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        {product.isPay || "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        {product.status || "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        <button
                          className="btn-more"
                          onClick={() =>
                            navigate(
                              `/customer/debt/list/order/detail/${product.id}`
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
      <PayModal
        open={open}
        onClose={() => setOpen(false)}
        tittle="Cập nhật công nợ"
      ></PayModal>
    </div>
  );
};
export default DetailDebt;
