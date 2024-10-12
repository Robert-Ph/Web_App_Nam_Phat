import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import OrderItem from "../../../model/orderItem.model";
import { useState, useEffect } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "53%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh", // Giới hạn chiều cao tối đa của modal
  overflowY: "auto", // Kích hoạt cuộn dọc khi nội dung quá lớn
};

type props = {
  open: boolean;
  orderItem?: OrderItem;
  onClose: () => void;
  handleAdd: (orderItem: OrderItem) => void;
};
const ProductModal = ({ open, onClose, orderItem, handleAdd }: props) => {
  const [values, setValues] = useState<OrderItem>({
    id: null,
    nameProduct: "",
    typeProduct: "",
    unitProduct: "",
    heightProudct: 0,
    widthProduct: 0,
    quanlityProduct: 0,
    typePaper: "",
    qualityPaper: 0,
    unitPaper: "",
    heightPaper: 0,
    widthPaper: 0,
    laminnation: "",
    cradle: false,
    pricePerOne: 0,
    mode: "",
  });

  useEffect(() => {
    if (orderItem) {
      setValues(orderItem);
    }
  }, [orderItem]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleAddOrderItem = (e: React.FormEvent) => {
    e.preventDefault();
    handleAdd(values);
    setValues({
      id: null,
      nameProduct: "",
      typeProduct: "",
      unitProduct: "",
      heightProudct: 0,
      widthProduct: 0,
      quanlityProduct: 0,
      typePaper: "",
      qualityPaper: 0,
      unitPaper: "",
      heightPaper: 0,
      widthPaper: 0,
      laminnation: "",
      cradle: false,
      pricePerOne: 0,
      mode: "",
    });
  };

  console.log(values);
  return (
    <div>
      <Modal
        open={open}
        // onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleAddOrderItem}>
            <div className="d-flex justify-end">
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => {
                  setValues({
                    id: null,
                    nameProduct: "",
                    typeProduct: "",
                    unitProduct: "",
                    heightProudct: 0,
                    widthProduct: 0,
                    quanlityProduct: 0,
                    typePaper: "",
                    qualityPaper: 0,
                    unitPaper: "",
                    heightPaper: 0,
                    widthPaper: 0,
                    laminnation: "",
                    cradle: false,
                    pricePerOne: 0,
                    mode: "",
                  });
                  onClose();
                }}
              >
                Hủy
              </button>
              <button className="btn btn-warning" type="button">
                Reset
              </button>
              <button
                className="btn btn-primary"
                style={{ marginRight: "0px;" }}
                type="submit"
              >
                Thêm / Cập nhật
              </button>
            </div>

            <div className="mt-20">
              <h3>Thông tin sản phẩm</h3>

              {/* Tên Sản phẩm */}
              <div className="form-group mt-20">
                <span>Tên sản phẩm</span>
                <input
                  placeholder="Tên sản phẩm"
                  name="nameProduct"
                  onChange={onChange}
                  required
                ></input>
              </div>
              {/* Loại */}
              <div className="d-flex" style={{ marginTop: "10px" }}>
                <div className="form-group flex-3">
                  <span>Loại sản phẩm</span>
                  <input
                    onChange={onChange}
                    name="typeProduct"
                    required
                  ></input>
                </div>
                <div
                  className="form-group flex-3"
                  style={{ marginLeft: "20px" }}
                >
                  <span>Số lượng</span>
                  <input
                    type="number"
                    name="quanlityProduct"
                    required
                    onChange={onChange}
                    min={1}
                  ></input>
                </div>

                <div className="flex-3"></div>
              </div>

              {/* Đơn vị tính sản phẩm */}

              <div className="d-flex" style={{ marginTop: "10px" }}>
                <div className="form-group flex-3">
                  <span>Đơn vị tính</span>
                  <input
                    type="text"
                    name="unitProduct"
                    required
                    onChange={onChange}
                  ></input>
                </div>
                <div
                  className="form-group flex-6"
                  style={{ marginLeft: "20px" }}
                >
                  <span>Kích thước sp (ví dụ: 30x30 mm)</span>
                  <div>
                    <div>
                      <span className="align-content-center">Cao:</span>
                      <input
                        type="number"
                        className="size"
                        style={{
                          padding: "12px 4px 10px 4px",
                          width: "20%",
                          marginLeft: "1%",
                        }}
                        name="heightProudct"
                        onChange={onChange}
                        min={0}
                        required
                      ></input>

                      <span
                        className="align-content-center"
                        style={{ marginLeft: "3%" }}
                      >
                        ,Rộng:
                      </span>
                      <input
                        type="number"
                        className="size"
                        style={{
                          padding: "12px 4px 10px 4px",
                          width: "20%",
                          marginLeft: "1%",
                        }}
                        name="widthProduct"
                        onChange={onChange}
                        min={0}
                        required
                      ></input>
                      <span style={{ marginLeft: "1%" }}>(mm)</span>
                    </div>

                    <div></div>
                  </div>
                </div>
              </div>

              {/* Loại giấy */}

              <div className="d-flex" style={{ marginTop: "15px" }}>
                <div className="form-group flex-3">
                  <span>Loại giấy</span>
                  <input
                    type="text"
                    name="typePaper"
                    required
                    onChange={onChange}
                  ></input>
                </div>
                <div
                  className="form-group flex-3"
                  style={{ marginLeft: "20px" }}
                >
                  <span>Số lượng cần in</span>
                  <input
                    type="number"
                    name="qualityPaper"
                    required
                    onChange={onChange}
                    min={1}
                  ></input>
                </div>

                <div className="flex-3"></div>
              </div>
              {/* Đơn vị tính giấy */}
              <div className="d-flex" style={{ marginTop: "10px" }}>
                <div className="form-group flex-3">
                  <span>Đơn vị tính</span>
                  <input
                    type="text"
                    name="unitPaper"
                    required
                    onChange={onChange}
                  ></input>
                </div>
                <div
                  className="form-group flex-6"
                  style={{ marginLeft: "20px" }}
                >
                  <span>Kích thước giấy (ví dụ: 30x30 mm)</span>
                  <div>
                    <div>
                      <span className="align-content-center">Cao:</span>
                      <input
                        type="number"
                        className="size"
                        style={{
                          padding: "12px 4px 10px 4px",
                          width: "20%",
                          marginLeft: "1%",
                        }}
                        name="heightPaper"
                        onChange={onChange}
                        min={0}
                        required
                      ></input>

                      <span
                        className="align-content-center"
                        style={{ marginLeft: "3%" }}
                      >
                        ,Rộng:
                      </span>
                      <input
                        type="number"
                        className="size"
                        style={{
                          padding: "12px 4px 10px 4px",
                          width: "20%",
                          marginLeft: "1%",
                        }}
                        name="widthPaper"
                        onChange={onChange}
                        min={0}
                        required
                      ></input>
                      <span style={{ marginLeft: "1%" }}>(mm)</span>
                    </div>

                    <div></div>
                  </div>
                </div>
              </div>

              {/* Cán màng */}
              <div className="d-flex" style={{ marginTop: "15px" }}>
                <div className="form-group flex-3">
                  <span>Cán màng</span>
                  <input
                    name="laminnation"
                    required
                    onChange={onChange}
                  ></input>
                </div>
                <div
                  className="form-group flex-1"
                  style={{ marginLeft: "30px", marginRight: "10px" }}
                >
                  <span>Bế</span>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="cradle"
                        checked={values.cradle}
                        onChange={(e) => {
                          setValues({
                            ...values,
                            ["cradle"]: e.target.checked,
                          });
                        }}
                      />
                    }
                    label="Sử dụng bế"
                  />
                </div>

                <div
                  className="form-group flex-3"
                  style={{ marginLeft: "20px" }}
                >
                  <span>Đơn giá/ 1 sản phẩm (vnđ)</span>
                  <input
                    type="number"
                    name="pricePerOne"
                    required
                    onChange={onChange}
                    min={0}
                  ></input>
                </div>
              </div>
              {/* Quy cách */}
              <div className="form-group mt-20">
                <span>Quy cách (ngắn gọn)</span>
                <input
                  placeholder="Quy cách"
                  type="text"
                  name="mode"
                  onChange={onChange}
                  required
                ></input>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
      ;
    </div>
  );
};
export default ProductModal;
