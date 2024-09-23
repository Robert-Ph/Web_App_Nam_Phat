import "./customerInfomation.css";
import { useState } from "react";
import product from "../../../model/product.model";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import FilterListIcon from "@mui/icons-material/FilterList";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TuneIcon from "@mui/icons-material/Tune";

import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";

import NotifyDeleteModal from "../../UtilsPage/NotifyDeleteModal";
const OrderPage = () => {
  const [products, setProducts] = useState<product[]>([
    // {
    //     id: 1,
    //     name: "",
    //     totalPrice: "",
    //     type: "",
    // },
  ]);

  const [page, setPage] = useState<number>(1);
  const [invoice, setInvoice] = useState<string>("personally");
  const [isEdit, setIsEdit] = useState(false);
  const [openDelte, setOpenDelete] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setInvoice(event.target.value);
  };

  return (
    <div>
      <div className="container" style={{ paddingBottom: "5%" }}>
        <div className="d-flex justify-end mt-10">
          {!isEdit && (
            <button
              className="btn btn-black"
              onClick={() => {
                navigate(-1);
              }}
            >
              Trở về
            </button>
          )}

          {!isEdit ? (
            <button
              className="btn btn-danger"
              onClick={() => setOpenDelete(true)}
            >
              Xóa
            </button>
          ) : (
            <button className="btn btn-danger" onClick={() => setIsEdit(false)}>
              Hủy
            </button>
          )}

          {isEdit && <button className="btn btn-warning">Reset</button>}

          {isEdit ? (
            <button
              className="btn btn-primary"
              style={{ marginRight: "0px;" }}
              onClick={() => setIsEdit(false)}
            >
              Cập nhật
            </button>
          ) : (
            <button
              className="btn btn-primary"
              style={{ marginRight: "0px;" }}
              onClick={() => {
                setIsEdit(true);
              }}
            >
              Chỉnh sửa
            </button>
          )}
        </div>

        <div className="mt-20">
          <h3>Thông tin khách hàng </h3>
          <div className="wrap-form">
            <div className="form-group flex-1" style={{ marginRight: "5%" }}>
              <span>Mã khách hàng</span>
              <input placeholder="Tên khách hàng" disabled={true}></input>
            </div>

            <div className="form-group flex-1" style={{ marginLeft: "5%" }}>
              <span>Ngày tạo</span>
              <input placeholder="Ngày tạo" disabled={true} type="date"></input>
            </div>

            {/* <div className="form-group flex-2">
              <span>Loại khách hàng</span>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={invoice}
                  // onChange={handleChange}
                  disabled={!isEdit}
                >
                  <MenuItem value={"personally"} className="">
                    Cá Nhân
                  </MenuItem>
                  <MenuItem value={"enterprise"}>Doanh Nghiệp</MenuItem>
                </Select>
              </FormControl>
            </div> */}
          </div>
          <div className="wrap-form">
            <div className="form-group flex-1" style={{ marginRight: "5%" }}>
              <span>Tên khách hàng</span>
              <input placeholder="Tên khách hàng" disabled={!isEdit}></input>
            </div>

            <div className="form-group flex-1" style={{ marginLeft: "5%" }}>
              <span>Số điện thoại</span>
              <input placeholder="Số điện thoại" disabled={!isEdit}></input>
            </div>
          </div>
          <div className="wrap-form">
            <div className="form-group flex-1" style={{ marginRight: "5%" }}>
              <span>Email</span>
              <input
                placeholder="Email"
                disabled={!isEdit}
                type="email"
              ></input>
            </div>

            <div className="form-group flex-1" style={{ marginLeft: "5%" }}>
              <span>Loại khách hàng</span>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={invoice}
                  onChange={handleChangeSelect}
                  disabled={!isEdit}
                >
                  <MenuItem value={"personally"} className="">
                    Cá Nhân
                  </MenuItem>
                  <MenuItem value={"enterprise"}>Doanh Nghiệp</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="wrap-form" style={{ marginTop: "15px" }}>
            <div className="form-group flex-8" style={{ marginLeft: "0px" }}>
              <span>Địa chỉ giao hàng</span>
              <input placeholder="Địa chỉ giao hàng" disabled={!isEdit}></input>
            </div>
          </div>
        </div>

        <div className="mt-20 div-main">
          <h3>Lịch sử thanh toán</h3>
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
              <div className="d-flex justify-space-arround">
                {/* <div style={{ width: "150px" }}>
                  <button
                    className="btn btn-primary btn-add-pay "
                    onClick={handleOpen}
                  >
                    Thêm
                  </button>
                </div> */}

                <div style={{ position: "relative" }}>
                  <select className="filter-select btn btn-primary pd-r-40">
                    <option value="all">Tất cả</option>
                    <option value="newest">Tiền mặt</option>
                    <option value="confirmed"> Chuyển khoản</option>
                  </select>
                  <i className="icon-filter">
                    <TuneIcon></TuneIcon>
                  </i>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div style={{ padding: "10px" }}>
              <div className="table-more">
                <table
                  className="mb-50-px"
                  style={{
                    width: "100%",
                    height: "50px",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr className="color-blue header-table text-left border-header-table">
                      <th className="pb-7 font-w-500" style={{ width: "7%" }}>
                        ID
                      </th>
                      <th
                        className="pb-7 font-w-500"
                        style={{ width: "25%", paddingRight: "10px" }}
                      >
                        Ngày
                      </th>

                      <th className="pb-7 font-w-500" style={{ width: "15%" }}>
                        Số tiền thanh toán
                      </th>
                      <th className="pb-7 font-w-500" style={{ width: "12%" }}>
                        Hình thức
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-header-table">
                    {products.map((product) => (
                      <tr key={product.id} className="border-header-table">
                        <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                          {product.id}
                        </td>
                        <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                          {product.name || "-"}
                        </td>
                        <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                          {product.totalPrice || "-"}
                        </td>
                        <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                          {product.type || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pagination" style={{ right: "4%" }}>
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

      <NotifyDeleteModal
        message="Bạn có chắc chắn muốn xóa khách hàng này?"
        open={openDelte}
        handleClose={() => setOpenDelete(false)}
        handleDelete={() => {}}
      ></NotifyDeleteModal>
    </div>
  );
};

export default OrderPage;
