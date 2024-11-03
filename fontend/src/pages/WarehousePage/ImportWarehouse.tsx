import { useState, useMemo, useEffect } from "react";
import product from "../../model/product.model";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import "../OrderPage/OrderPage/order.css";
import InvoiceImage from "../UtilsPage/InvoiceImage";
import ImportWarehouseModal from "./ImportWarehouseModal";
import StockIn from "../../model/stockin.model";
import StockInDetail from "../../model/stockInDetail.model";
import { toast } from "react-toastify";
import StockInService from "../../service/StockInService";
import { useNavigate } from "react-router-dom";

const ImportWarehouse = () => {
  const [stockIn, setStockIn] = useState<StockIn>({
    supplier: "",
    totalPrice: 0,
    listStockInDetails: [],
  });

  const [open, setOpen] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const navigate = useNavigate();

  //Bắt sự kiện upload file
  const handleFileChange = (file: File | null) => {
    setUploadedFile(file);
  };
  console.log(uploadedFile);
  //Sự kiện mở đóng modal
  const handleOnclose = () => {
    setOpen(false);
  };

  const reset = () => {
    setStockIn({
      supplier: "",
      totalPrice: 0,
      listStockInDetails: [],
    });
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleAddStockInDetail = (detail: StockInDetail) => {
    setStockIn((prevStockIn) => ({
      ...prevStockIn,
      listStockInDetails: [...(prevStockIn.listStockInDetails || []), detail],
    }));
  };

  useEffect(() => {
    if (stockIn.listStockInDetails) {
      const newTotalPrice = stockIn.listStockInDetails.reduce(
        (total, item) => total + item.quanlity * item.priceImport,
        0
      );
      setStockIn((prevStockIn) => ({
        ...prevStockIn,
        totalPrice: newTotalPrice,
      }));
    }
  }, [stockIn.listStockInDetails]);

  const handleImport = () => {
    if (!uploadedFile) {
      toast.error("Vui lòng chọn file hóa đơn", {
        autoClose: 1000,
      });
    } else if (
      !stockIn.supplier ||
      !stockIn.totalPrice ||
      stockIn.listStockInDetails?.length == 0
    ) {
      toast.error("Có thông tin bị bỏ trống. Vui lòng kiểm tra lại", {
        autoClose: 1000,
      });
    } else {
      StockInService.sendStockInRequest(stockIn, uploadedFile)
        .then((response) => {
          if (response.data.code == 201) {
            toast.success("Thêm nhập kho thành công", {
              autoClose: 1000,
            });
            reset();
          } else {
            toast.error("Gặp lỗi", {
              autoClose: 1000,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Lỗi", {
            autoClose: 1000,
          });
        });
    }
  };

  // Hàm xóa chi tiết sản phẩm nhập
  const handleRemoveStockInDetail = (index: number) => {
    setStockIn((prevStockIn) => ({
      ...prevStockIn,
      listStockInDetails: prevStockIn.listStockInDetails
        ? prevStockIn.listStockInDetails.filter((_, i) => i !== index)
        : [],
    }));
  };

  // Handle input changes for supplier and totalPrice
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStockIn((prevStockIn) => ({
      ...prevStockIn,
      [name]: name === "totalPrice" ? parseInt(value) : value,
    }));
  };
  return (
    <div>
      <div className="container">
        <div className="d-flex justify-end">
          <button className="btn btn-danger">Hủy</button>
          <button
            className="btn btn-warning"
            onClick={() => {
              reset();
            }}
          >
            Reset
          </button>
          <button
            className="btn btn-primary"
            style={{ marginRight: "0px;" }}
            onClick={() => {
              handleImport();
              navigate(`/warehouse/list/history`);
            }}
          >
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
                    <th className="pb-7 font-w-500">Loại</th>
                    <th className="pb-7 font-w-500">Số lượng</th>
                    <th className="pb-7 font-w-500">Đơn vị tính</th>

                    <th className="pb-7 font-w-500">
                      Giá /đơn vị tính <br /> (vnd)
                    </th>
                    <th className="pb-7 font-w-500">Tổng giá</th>
                    <th className="pb-7 font-w-500"></th>
                  </tr>
                </thead>
                <tbody className="border-header-table">
                  {stockIn?.listStockInDetails &&
                    stockIn?.listStockInDetails.map((item, index) => (
                      <tr key={index} className="border-header-table">
                        <td className="pb-7 pt-7">{index + 1}</td>
                        <td className="pb-7 pt-7">
                          {item.product.name || "-"}
                        </td>
                        <td className="pb-7 pt-7">
                          {item.product.type || "-"}
                        </td>
                        <td className="pb-7 pt-7">{item.quanlity || "-"}</td>

                        <td className="pb-7 pt-7">
                          {item.product.unit || "-"}
                        </td>
                        <td className="pb-7 pt-7">{item.priceImport}</td>
                        <td className="pb-7 pt-7">
                          {item.priceImport * item.quanlity}
                        </td>
                        <td className="pb-7 pt-7">
                          {" "}
                          <button
                            className="btn-more"
                            style={{ color: "red" }}
                            onClick={() => handleRemoveStockInDetail(index)}
                          >
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
                  <input
                    name="supplier"
                    value={stockIn.supplier}
                    onChange={handleInputChange}
                  ></input>
                </div>

                <div className="form-group mt-20">
                  <span>
                    Tổng đơn hàng (vnđ) <span className="color-danger">*</span>:
                  </span>
                  <input
                    type="number"
                    min={0}
                    name="totalPrice"
                    value={stockIn.totalPrice}
                    onChange={handleInputChange}
                  ></input>
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
        handleAdd={handleAddStockInDetail}
      ></ImportWarehouseModal>
    </div>
  );
};

export default ImportWarehouse;
