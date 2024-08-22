import { useState } from "react";
import product from "../../model/product.model";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import "../OrderPage/order.css";
import InvoiceImage from "../UtilsPage/InvoiceImage";
import ImportWarehouseModal from "./ImportWarehouseModal";

const ImportWarehouse = () => {
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

  const [open, setOpen] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  //Bắt sự kiện upload file
  const handleFileChange = (file: File | null) => {
    setUploadedFile(file);
  };
  console.log(uploadedFile);
  //Sự kiện mở đóng modal
  const handleOnclose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <div className="container">
        <div className="d-flex justify-end">
          <button className="btn btn-danger">Hủy</button>
          <button className="btn btn-warning">Reset</button>
          <button className="btn btn-primary" style={{ marginRight: "0px;" }}>
            Nhập kho
          </button>
        </div>

        <div className="mt-20">
          <h3>Danh sách sản phẩm</h3>
          <div
            style={{
              padding: "20px",
            }}
          >
            <div
              className="table-container"
              style={{ maxHeight: "200px", minHeight: "200px" }}
            >
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
                        <button className="btn-more" style={{ color: "red" }}>
                          <RemoveCircleOutlineIcon></RemoveCircleOutlineIcon>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-30 d-flex">
              <div className="flex-1 d-flex dicrect-col">
                <button
                  className="btn btn-primary"
                  style={{ width: "50%" }}
                  onClick={handleOpen}
                >
                  Thêm loại hàng
                </button>
                <div className="form-group mt-20">
                  <span>
                    Nhà cung cấp <span className="color-danger">*</span>:
                  </span>
                  <input></input>
                </div>

                <div className="form-group mt-20">
                  <span>
                    Tổng đơn hàng (vnđ) <span className="color-danger">*</span>:
                  </span>
                  <input></input>
                </div>
              </div>
              <div className="flex-1 ">
                <InvoiceImage onChangeFile={handleFileChange}></InvoiceImage>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImportWarehouseModal
        open={open}
        onClose={handleOnclose}
      ></ImportWarehouseModal>
    </div>
  );
};

export default ImportWarehouse;
