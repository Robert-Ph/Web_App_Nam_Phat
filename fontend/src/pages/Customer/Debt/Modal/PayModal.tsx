import { useState } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import "./payModal.css";
import TextFieldAuto from "../../../../component/TextFieldAuto/TextFieldAuto";
import Order from "../../../../model/order.model.tsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "53%",
  transform: "translate(-50%, -50%)",
  width: "35%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
  maxHeight: "90vh",
  overflowY: "auto",
  borderRadius: "20px",
  paddingBottom: "40px",
};


type Props = {
  open: boolean;
  onClose: () => void;
  tittle: string;
  orders: Order[];

};

const PayModal = ({ open, tittle, onClose, orders }: Props) => {
  const [role, setRole] = useState<string>("direct");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);  // Lưu order đã chọn

  const handleRole = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  const handleOrderSelect = (order: Order | null) => {
    setSelectedOrder(order);  // Cập nhật thông tin order khi người dùng chọn
  };


    return (
      <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="mt-10">
            <h3 className="text-center">{tittle}</h3>
          </div>

          <div
              className="d-flex dicrect-col"
              style={{ paddingLeft: "20px", paddingRight: "10px" }}
          >
            <div>
              <div className=" mt-20">
              <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "10px",
                  }}
              >
                Thanh toán cho{" "}
                <span
                    style={{
                      color: "red",
                    }}
                >
                  *
                </span>{" "}
                :
              </span>
                <TextFieldAuto
                    options={orders}  // Sử dụng orders đã được truyền vào modal
                    getOptionLabel={(order) => `${order.id}`}  // Chọn id của đơn hàng làm nhãn
                    onSelect={handleOrderSelect}
                    renderOption={(props, option) => (
                        <li {...props}>
                          {option.id} ({option.id})
                        </li>
                    )}
                ></TextFieldAuto>
              </div>

              <div className="form-group mt-20">
                <span>Tổng số tiền cho đơn hàng:</span>
                <input
                    className="shadow"
                    disabled
                    value={
                      selectedOrder?.totalPrice !== undefined && selectedOrder?.totalPrice !== null
                          ? String(selectedOrder.totalPrice)
                          : ""
                    }
                />
              </div>

              {/*<div className="form-group mt-20">*/}
              {/*<span>*/}
              {/*  Số tiền thanh toán <span style={{ color: "red" }}>*</span> :*/}
              {/*</span>*/}
              {/*  <input className="shadow" />*/}
              {/*</div>*/}

              <div className="form-group mt-20">
              <span>
                Hình thức thanh toán <span style={{ color: "red" }}>*</span>:
              </span>
                <FormControl size="small">
                  <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={role}
                      onChange={handleRole}
                      className="font-size-small shadow"
                      style={{
                        borderRadius: "7px",
                      }}
                  >
                    <MenuItem value={"direct"} style={{ padding: "10px 12px" }}>
                      Tiền mặt
                    </MenuItem>
                    <MenuItem value={"bank"} style={{ padding: "10px 12px" }}>
                      Chuyển khoản
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div
                  className="d-flex justify-space-arround "
                  style={{ marginTop: "50px" }}
              >
                <button className="btn btn-danger" onClick={onClose}>
                  Hủy
                </button>
                <button className="btn btn-primary" >Thêm</button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
  );
};

export default PayModal;
