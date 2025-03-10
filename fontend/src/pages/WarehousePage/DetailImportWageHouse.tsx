import { useState, useEffect } from "react";

// import { SelectChangeEvent } from "@mui/material/Select";

import { useNavigate } from "react-router-dom";
import "./css/order.css";

import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import StockIn from "../../model/stockin.model";
import StockInService from "../../service/StockInService";
import Spiner from "../../component/Spiner/Spiner";
import { formatCurrency, formatDateTime } from "../../utils/Utils";
import ImageGallery from "../UtilsPage/ImageGallery/ImageGallery";

const DetailImportWageHouse = () => {
  const [stockIn, setStockIn] = useState<StockIn>();

  // const [open, setOpen] = useState<boolean>(false);
  // const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const param = useParams();

  const navigate = useNavigate();

  // //   Sự kiện mở đóng modal chỉnh sửa sản phẩm
  // const handleOnclose = () => {
  //   setOpen(false);
  // };

  const goBack = () => {
    navigate(-1);
  };

  //Bắt sự kiện thay đổi select trong option của hóa đơn
  // const handleChange = (event: SelectChangeEvent) => {};

  useEffect(() => {
    const id = param?.id;

    if (id) {
      setLoading(true);
      StockInService.getById(id)
        .then((response) => {
          setLoading(false);
          console.log(response);
          const data = response.data.data;
          setStockIn(data);
        })
        .catch((error) => {
          const errorReponse = error.response;
          console.log(errorReponse);
          toast.error("Lỗi không xác định. Vui lòng thử lại!", {
            autoClose: 1000,
          });
        });
    }
  }, [param]);

  return (
    <div>
      {loading && <Spiner></Spiner>}

      {!loading && (
        <div className="container">
          <h2 className="mb-20-px mt-15">Thông tin đơn nhập hàng</h2>
          <div className="d-flex justify-space-bettwen">
            <div className="d-flex dicrect-col">
              <div className="mt-10">
                <strong>Mã đơn nhập hàng:</strong>
                <span> {stockIn?.id}</span>
              </div>
              <div className="mt-10">
                <strong>Ngày:</strong>
                <span>
                  {" "}
                  {stockIn?.dateCreate
                    ? formatDateTime(stockIn?.dateCreate)
                    : ""}
                </span>
              </div>
              <div className="mt-10">
                <strong>Tổng tiền:</strong>
                <span>
                  {" "}
                  {stockIn?.totalPrice
                    ? formatCurrency(stockIn?.totalPrice) + " VNĐ"
                    : ""}
                </span>
              </div>

              <div className="mt-10">
                <strong>Nhà cung cấp:</strong>
                <span> {stockIn?.supplier}</span>
              </div>
            </div>
            <div>
              <button className="btn btn-black" onClick={goBack}>
                Trở về
              </button>
            </div>
          </div>

          <div className="mt-20">
            <div style={{ padding: "20px" }}>
              <div className="table-container">
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr className="color-blue header-table text-left border-header-table">
                      <th className="pb-7 font-w-500">STT</th>
                      <th className="pb-7 font-w-500">Mã Sản Phẩm</th>
                      <th className="pb-7 font-w-500">Tên Sản Phẩm</th>
                      <th className="pb-7 font-w-500">Số lượng</th>
                      <th className="pb-7 font-w-500">Loại</th>
                      <th className="pb-7 font-w-500">Giá Nhập</th>
                    </tr>
                  </thead>
                  <tbody className="border-header-table">
                    {stockIn?.listStockInDetails?.map((item, index) => (
                      <tr key={index} className="border-header-table">
                        <td className="pb-7 pt-7">{index + 1}</td>
                        <td className="pb-7 pt-7">{item.product.id || "-"}</td>
                        <td className="pb-7 pt-7">
                          {item.product.name || "-"}
                        </td>
                        <td className="pb-7 pt-7">{item.quanlity || "-"}</td>
                        <td className="pb-7 pt-7">
                          {item.product.type || "-"}
                        </td>
                        <td className="pb-7 pt-7">
                          {item.priceImport
                            ? formatCurrency(item.priceImport) + " VNĐ"
                            : " 0 VNĐ"}
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
                    marginTop: "20px",
                  }}
                  // className="form-group "
                >
                  <strong className="mb-10">Ảnh Hóa Đơn</strong>
                  <ImageGallery
                    image={stockIn?.imageInvoice ? stockIn.imageInvoice : ""}
                  ></ImageGallery>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailImportWageHouse;
