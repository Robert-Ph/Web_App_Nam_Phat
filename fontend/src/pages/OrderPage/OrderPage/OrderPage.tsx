import "./order.css";
import { useState } from "react";
import ProductModal from "../ProductModal/ProductModal";
import product from "../../../model/product.model";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const OrderPage = () => {
  const [products, setProducts] = useState<product[]>([
    {
      id: 1,
      name: "",
      quantity: "",
      paperCount: "",
      price: "",
      totalPrice: "",
    },
  ]);

  const [invoice, setInvoice] = useState<string>("personally");

  const [open, setOpen] = useState<boolean>(false);

  const handleOnclose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setInvoice(event.target.value);
  };

  const addProduct = (product: product) => {
    setOpen(false);
    setProducts([...products, product]);
  };

  return (
    <div>
      <div className="container">
        <div className="d-flex justify-end">
          <button className="btn btn-danger">Hủy</button>
          <button className="btn btn-warning">Reset</button>
          <button className="btn btn-primary" style={{ marginRight: "0px;" }}>
            Tạo đơn hàng
          </button>
        </div>

        <div className="mt-20">
          <h3>Thông tin khách hàng </h3>
          <div className="wrap-form">
            <div className="form-group flex-8">
              <span>Tên khách hàng</span>
              <input placeholder="Tên khách hàng"></input>
            </div>

            <div className="form-group flex-2" style={{ margin: "0px 20px" }}>
              <span>Số điện thoại</span>
              <input placeholder="Số điện thoại"></input>
            </div>

            <div className="form-group flex-2">
              <span>Hóa đơn</span>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={invoice}
                  onChange={handleChange}
                >
                  <MenuItem value={"personally"} className="">
                    Cá Nhân
                  </MenuItem>
                  <MenuItem value={"enterprise"}>Doanh Nghiệp</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="wrap-form" style={{ marginTop: "10px" }}>
            <div className="form-group flex-2">
              <span>Email</span>
              <input placeholder="Tên khách hàng"></input>
            </div>

            <div className="form-group flex-8" style={{ marginLeft: "20px" }}>
              <span>Địa chỉ giao hàng</span>
              <input placeholder="Số điện thoại"></input>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3>Danh sách sản phẩm</h3>
          <div style={{ padding: "20px" }}>
            <div className="table-container">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr className="color-blue header-table text-left border-header-table">
                    <th className="pb-7 font-w-500">STT</th>
                    <th className="pb-7 font-w-500">Tên sản phẩm</th>
                    <th className="pb-7 font-w-500">Số lượng</th>
                    <th className="pb-7 font-w-500">Số lượng giấy in</th>
                    <th className="pb-7 font-w-500">Giá (vnd)</th>
                    <th className="pb-7 font-w-500">Tổng giá</th>
                    <th className="pb-7 font-w-500"></th>
                  </tr>
                </thead>
                <tbody className="border-header-table">
                  {products.map((product) => (
                    <tr key={product.id} className="border-header-table">
                      <td className="pb-7 pt-7">{product.id}</td>
                      <td className="pb-7 pt-7">{product.name || "-"}</td>
                      <td className="pb-7 pt-7">{product.quantity || "-"}</td>
                      <td className="pb-7 pt-7">{product.paperCount || "-"}</td>
                      <td className="pb-7 pt-7">{product.price || "-"}</td>
                      <td className="pb-7 pt-7">{product.totalPrice || "-"}</td>
                      <td className="pb-7 pt-7">
                        {" "}
                        <button className="btn-more">
                          <MoreHorizIcon></MoreHorizIcon>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-30 d-flex">
              <div
                style={{
                  flex: "3",
                  textAlign: "center",
                  alignContent: "center",
                }}
              >
                <button className="btn btn-primary mt-20" onClick={handleOpen}>
                  Thêm sản phẩm
                </button>
              </div>

              <div className="wrap-vat d-flex">
                <div
                  className="form-group"
                  style={{ flex: "5", marginRight: "10px" }}
                >
                  <span>Thuế Giá Trị Gia Tăng - VAT (%)</span>
                  <input
                    placeholder="Thuế giá trị gia tăng"
                    style={{ width: "85%" }}
                  ></input>
                </div>
                <div style={{ flex: "5" }}>
                  <p>Tổng:</p>
                  <p>Thuế giá trị gia tăng(VAT):</p>
                  <p>Thành tiền:</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductModal
        open={open}
        onClose={handleOnclose}
        listProduct={products}
        handleAdd={(product: product) => {
          addProduct(product);
        }}
      ></ProductModal>
    </div>
  );
};

export default OrderPage;
