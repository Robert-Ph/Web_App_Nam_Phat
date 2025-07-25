import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import OrderItem from "../../../model/orderItem.model";
import { useState, useEffect } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const style = {
  position: "absolute",
  top: "50%",
  left: "53%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh", // Giới hạn chiều cao tối đa của modal
  overflowY: "auto", // Kích hoạt cuộn dọc khi nội dung quá lớn
};

type props = {
  open: boolean;
  orderItem?: OrderItem | null;
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
    depthProduct: 0,
    quanlityProduct: 0,
    typePaper: "",
    qualityPaper: 0,
    unitPaper: "",
    heightPaper: 0,
    widthPaper: 0,
    laminnation: "",
    cradle: false,
    cut: false,
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

  console.log(orderItem);

  const handleAddOrderItem = (e: React.FormEvent) => {
    e.preventDefault();
    handleAdd(values);
    if (!orderItem) {
      setValues({
        id: null,
        nameProduct: "",
        typeProduct: "",
        unitProduct: "",
        heightProudct: 0,
        widthProduct: 0,
        depthProduct: 0,
        quanlityProduct: 0,
        typePaper: "",
        qualityPaper: 0,
        unitPaper: "",
        heightPaper: 0,
        widthPaper: 0,
        laminnation: "",
        cradle: false,
        cut: false,
        pricePerOne: 0,
        mode: "",
      });
    }
  };

  console.log(values);
  return (
    <div style={{width: "500px"}}>
      <Modal
        open={open}
        // onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleAddOrderItem}>
            <div className="d-flex justify-end " >
              <button
                className="btn btn-warning"
                style={{background:"#EF4444"}}
                type="button"
                onClick={() => {
                  if (orderItem) {
                    setValues(orderItem);
                  } else {
                    setValues({
                      id: null,
                      nameProduct: "",
                      typeProduct: "",
                      unitProduct: "",
                      heightProudct: 0,
                      widthProduct: 0,
                      depthProduct: 0,
                      quanlityProduct: 0,
                      typePaper: "",
                      qualityPaper: 0,
                      unitPaper: "",
                      heightPaper: 0,
                      widthPaper: 0,
                      laminnation: "",
                      cradle: false,
                      cut: false,
                      pricePerOne: 0,
                      mode: "",
                    });
                  }
                  onClose();
                }}
              >
                Hủy
              </button>
              <button className="btn btn-warning" style={{background:"#FFC107"}} type="button">
                Reset
              </button>
              <button
                className="btn btn-primary"
                style={{background:"#198754"}}
                type="submit"
              >
                Thêm / Cập nhật
              </button>
            </div>

            <div className="mt-20">
              <h3 style={{color:"#2563EB"}}>Thông tin sản phẩm</h3>

              {/* Tên Sản phẩm */}
              <div className="form-group mt-10" style={{float:'left', width:"50%", marginRight:"3%"}}>
                <span>Tên sản phẩm</span>
                <input
                  placeholder="Tên sản phẩm"
                  name="nameProduct"
                  onChange={onChange}
                  value={values?.nameProduct}
                  required
                ></input>
              </div>
              {/* Loại */}
              <div className="d-flex" style={{ marginTop: "10px" }}>
                <div className="form-group flex-3">
                  <span>Đơn vị tính</span>
                  <input
                      type="text"
                      name="unitProduct"
                      required
                      onChange={onChange}
                      value={values?.unitProduct}
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
                    value={values?.quanlityProduct}
                  ></input>
                </div>

                <div className="flex-3"></div>
              </div>

              {/* Đơn vị tính sản phẩm */}

              <div className="d-flex" style={{ marginTop: "10px", float:"left", width:"50%" }}>
                <div
                  className="form-group flex-6"
                  // style={{ marginLeft: "20px" }}
                >
                  <span>Kích thước sp ( C x R x S)</span>
                  <div>
                    <div>
                      {/*<span className="align-content-center">Cao:</span>*/}
                      <input
                        type="number"
                        className="size"
                        style={{
                          padding: "12px 4px 10px 4px",
                          width: "10%",
                          // marginLeft: "1%",
                        }}
                        name="heightProudct"
                        onChange={onChange}
                        min={0}
                        required
                        value={values?.heightProudct}
                      ></input>

                      <span
                        className="align-content-center"
                        style={{ marginLeft: "1%" }}
                      >X
                      </span>
                      <input
                        type="number"
                        className="size"
                        style={{
                          padding: "12px 4px 10px 4px",
                          width: "10%",
                          marginLeft: "1%",
                        }}
                        name="widthProduct"
                        onChange={onChange}
                        min={0}
                        required
                        value={values?.widthProduct}
                      ></input>
                      <span
                          className="align-content-center"
                          style={{ marginLeft: "1%" }}
                      >X
                      </span>
                      <input
                          type="number"
                          className="size"
                          style={{
                            padding: "12px 4px 10px 4px",
                            width: "10%",
                            marginLeft: "1%",
                          }}
                          name="depthProduct"
                          onChange={onChange}
                          min={0}
                          required
                          value={values?.depthProduct}
                      ></input>
                      <span style={{ marginLeft: "1%" }}>(mm)</span>
                    </div>
                    {/* Cán màng */}
                    <div className="d-flex" style={{ marginTop: "15px", width:"50%" }}>
                      <div className="form-group flex-3">
                        <span>Cán màng</span>
                        <input
                            name="laminnation"
                            required
                            onChange={onChange}
                            value={values?.laminnation}
                        ></input>
                      </div>
                      <div
                          className="form-group flex-1"
                          style={{ marginLeft: "30px", marginRight: "10px" }}
                      >
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
                            label="Bế"
                        />
                      </div>
                      <div
                          className="form-group flex-1"
                          style={{ marginLeft: "20px", marginRight: "10px" }}
                      >
                        <FormControlLabel
                            control={
                              <Checkbox
                                  name="cut"
                                  checked={values.cut}
                                  onChange={(e) => {
                                    setValues({
                                      ...values,
                                      ["cut"]: e.target.checked,
                                    });
                                  }}
                              />
                            }
                            label="Cắt"
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
                            value={values?.pricePerOne}
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
                          value={values?.mode}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              <p>________________________________________________________________________________________________________________________________</p>

              {/* Loại giấy */}
              <h3 style={{color:"#2563EB"}}>Thông tin giấy</h3>
              <div className="d-flex" style={{ marginTop: "15px" }}>
                <div className="form-group flex-4" style={{width:"25%"}}>
                  <span>Loại giấy</span>
                  <input
                    type="text"
                    name="typePaper"
                    required
                    onChange={onChange}
                    value={values?.typePaper}
                  ></input>
                </div>

                <div
                  className="form-group "
                  style={{ marginLeft: "10px", width:"10%" }}
                >
                  <span>Số lượng in</span>
                  <input
                    type="number"
                    name="qualityPaper"
                    required
                    onChange={onChange}
                    min={1}
                    value={values?.qualityPaper}
                  ></input>
                </div>

                <div className="form-group " style={{width:"10%", marginLeft:"20px"}}>
                  <span>Đơn vị tính</span>
                  <input
                      type="text"
                      name="unitPaper"
                      required
                      onChange={onChange}
                      value={values?.unitPaper}
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
                          value={values?.heightPaper}
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
                          value={values?.widthPaper}
                      ></input>
                      <span style={{ marginLeft: "1%" }}>(mm)</span>
                    </div>

                    <div></div>
                  </div>
                </div>
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
