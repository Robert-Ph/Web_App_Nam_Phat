import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ProductModal from "./ProductModal";
import product from "../../model/product.model";
import { useNavigate } from "react-router-dom";
import "./order.css";

const DetailOrderPage = () => {
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
  const navigate = useNavigate();

  //   Sự kiện mở đóng modal chỉnh sửa sản phẩm
  const handleOnclose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const addProduct = (product: product) => {
    setOpen(false);
    setProducts([...products, product]);
  };

  const goBack = () => {
    navigate(-1);
  };

  //Bắt sự kiện thay đổi select trong option của hóa đơn
  const handleChange = (event: SelectChangeEvent) => {
    setInvoice(event.target.value);
  };
  return (
    <div>
      <div className="container">
        <div className="d-flex justify-space-bettwen">
          <div className="d-flex dicrect-col">
            <div>
              <strong>Mã đơn hàng:</strong>
              <span> #51235</span>
            </div>
            <div>
              <strong>Ngày:</strong>
              <span> 31/12/2024</span>
            </div>
          </div>
          <div>
            <button className="btn btn-danger" onClick={goBack}>
              Hủy
            </button>
            <button className="btn btn-primary" style={{ marginRight: "0px;" }}>
              Cập nhật
            </button>
          </div>
        </div>

        <div className="mt-15">
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
                        <button className="btn-more" onClick={handleOpen}>
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
                  alignContent: "center",
                  marginTop: "12px",
                }}
                className="form-group "
              >
                <span>Trạng thái</span>
                <input disabled style={{ width: "80%" }}></input>
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

export default DetailOrderPage;
