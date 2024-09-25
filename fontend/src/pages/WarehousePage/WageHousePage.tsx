import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../OrderPage/OrderPage/order.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

import product from "../../model/product.model";

const WageHousePage = () => {
  const [products, setProducts] = useState<product[]>([
    {
      id: 123456,
      name: "Giấy khổ to dành cho đóng bìa sách",
      quantity: "12300",
      paperCount: "123",
      price: "10000000",
      totalPrice: "123123",
      type: "Decal giấy cứng dành cho bìa tập",
      unit: "Tờ",
    },
    {
      id: 2,
      name: "Giấy khổ to",
      quantity: "123",
      paperCount: "123",
      price: "100000000",
      totalPrice: "123123",
      type: "Decal",
      unit: "Tờ",
    },
    {
      id: 3,
      name: "Giấy khổ to",
      quantity: "123",
      paperCount: "123",
      price: "100000000",
      totalPrice: "123123",
      type: "Decal",
      unit: "Tờ",
    },
  ]);

  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);

  // const handleOnclose = () => {
  //   setOpen(false);
  // };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  console.log(page);
  const navigate = useNavigate();
  return (
    <div>
      <div className="main-body">
        <h3>Danh sách hàng tồn kho</h3>
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

            <div>
              <button className="btn btn-warning">Lịch sử nhập kho</button>
            </div>
          </div>
        </div>
        <div style={{ padding: "10px" }}>
          <div className="table-more">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr className="color-blue header-table text-left border-header-table">
                  <th className="pb-7 font-w-500" style={{ width: "6%" }}>
                    ID
                  </th>
                  <th
                    className="pb-7 font-w-500"
                    style={{ width: "15%", paddingRight: "25px" }}
                  >
                    Tên hàng hóa
                  </th>
                  <th
                    className="pb-7 font-w-500"
                    style={{ width: "8%", paddingRight: "10px" }}
                  >
                    Loại
                  </th>
                  <th
                    className="pb-7 font-w-500 text-center"
                    style={{ width: "8%" }}
                  >
                    Số lượng
                  </th>
                  <th
                    className="pb-7 font-w-500 text-center"
                    style={{ width: "10%" }}
                  >
                    Đơn vị tính
                  </th>
                  <th
                    className="pb-7 font-w-500 text-center"
                    style={{ width: "15%" }}
                  >
                    Giá/ đơn vị tính (VNĐ)
                  </th>

                  <th className="pb-7 font-w-500" style={{ width: "15%" }}>
                    Ngày nhập gần nhất
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
                      style={{ paddingRight: "25px" }}
                    >
                      {product.name || "-"}
                    </td>
                    <td
                      className="pb-7 pt-7 font-size-small td-table font-w-500"
                      style={{ paddingRight: "20px" }}
                    >
                      {product.type || "-"}
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                      {product.quantity || "-"}
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                      {product.unit || "-"}
                    </td>

                    <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                      {product.price || "-"}
                    </td>

                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      {"01/12/2024 15:30:30" || "-"}
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      <button
                        className="btn-more"
                        onClick={() => {
                          navigate(
                            `/warehouse/list/product/detail/${product.id}`
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
  );
};

export default WageHousePage;
