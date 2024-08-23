import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../ListOrderPage/listOrder.css";
import { useNavigate } from "react-router-dom";

import exportProduct from "../../model/export.product.model";
import ExportWarehouseModal from "./ExportWarehouseModal";
const ExportWarehouse = () => {
  const [exports, setExports] = useState<exportProduct[]>([
    {
      id: "1234",
      product: {
        id: 1,
        name: "Giấy khổ to",
        quantity: "123",
        paperCount: "123",
        price: "100000000",
        totalPrice: "123123",
        type: "Decal",
        unit: "Tờ",
      },
      date: "12/12/2024",
      reson:
        "Xuất hàng cho kho xuất cho công ty TPHCM Đơn vị vận chuyển hàng hóa 12345 Huyện Bình Chánh TPHCM",
    },
    {
      id: "12337",
      product: {
        id: 1,
        name: "Giấy khổ to",
        quantity: "123",
        paperCount: "123",
        price: "100000000",
        totalPrice: "123123",
        type: "Decal",
        unit: "Tờ",
      },
      date: "12/12/2024",
      reson:
        "Xuất hàng cho kho xuất cho công ty TPHCM Đơn vị vận chuyển hàng hóa 12345 Huyện Bình Chánh TPHCM",
    },
  ]);

  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);

  const handleOnclose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  console.log(page);
  const navigate = useNavigate();
  return (
    <div>
      <div className="main-body">
        <h3>Danh sách hàng xuất kho</h3>
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
            <div style={{ paddingRight: "5%" }}>
              <button className="btn btn-primary" onClick={handleOpen}>
                Thêm mới
              </button>
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
                    style={{ width: "15%", paddingRight: "10px" }}
                  >
                    Tên hàng hóa
                  </th>
                  <th
                    className="pb-7 font-w-500"
                    style={{ width: "8%", paddingRight: "10px" }}
                  >
                    Loại
                  </th>
                  <th className="pb-7 font-w-500" style={{ width: "8%" }}>
                    Số lượng
                  </th>
                  <th className="pb-7 font-w-500" style={{ width: "8%" }}>
                    Đơn vị tính
                  </th>
                  <th className="pb-7 font-w-500" style={{ width: "10%" }}>
                    Ngày
                  </th>

                  <th className="pb-7 font-w-500" style={{ width: "20%" }}>
                    Lí do xuất kho
                  </th>
                </tr>
              </thead>
              <tbody className="border-header-table">
                {exports.map((item) => (
                  <tr key={item.id} className="border-header-table">
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                      {item.id}
                    </td>
                    <td className="pb-7 pt-7 font-size-small font-w-500 ">
                      {item.product.name || "-"}
                    </td>
                    <td
                      className="pb-7 pt-7 font-size-small td-table font-w-500"
                      style={{ paddingRight: "20px" }}
                    >
                      {item.product.type || "-"}
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      {item.product.quantity || "-"}
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      {item.product.unit || "-"}
                    </td>

                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      {item.date || "-"}
                    </td>

                    <td
                      className="pb-7 pt-7 font-size-small td-table font-w-500"
                      style={{ textAlign: "justify" }}
                    >
                      {item.reson || "-"}
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
      <ExportWarehouseModal
        open={open}
        onClose={handleOnclose}
      ></ExportWarehouseModal>
    </div>
  );
};

export default ExportWarehouse;
