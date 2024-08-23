import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const style = {
  position: "absolute" as "absolute",
  top: "45%",
  left: "53%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 1,
  maxHeight: "90vh", // Giới hạn chiều cao tối đa của modal
  overflowY: "auto", // Kích hoạt cuộn dọc khi nội dung quá lớn
  borderRadius: "20px",
  paddingBottom: "40px",
};

type props = {
  open: boolean;
  onClose: () => void;
};
//Sự kiện khi bấm ô select vị trí

const ExportWarehouseModal = ({ open, onClose }: props) => {
  const [typeProduct, setTypeProduct] = useState<string>("use");

  const handleChange = (event: SelectChangeEvent) => {
    setTypeProduct(event.target.value);
  };
  return (
    <div>
      <Modal
        open={open}
        // onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="mt-10">
            <h3 className="text-center">Thêm Loại hàng</h3>
          </div>

          <div
            className="d-flex dicrect-col"
            style={{ paddingLeft: "20px", paddingRight: "10px" }}
          >
            <div className="">
              <div className="d-flex mt-10">
                <div
                  className="form-group flex-1"
                  style={{ paddingRight: "3%" }}
                >
                  <span>Tên loại hàng:</span>
                  <input></input>
                </div>

                <div
                  className="form-group flex-1"
                  style={{ paddingLeft: "3%" }}
                >
                  <span>
                    Mã loại hàng <span style={{ color: "red" }}>*</span> :
                  </span>
                  <input className="shadow" disabled></input>
                </div>
              </div>

              <div className="d-flex mt-10">
                <div
                  className="form-group flex-1"
                  style={{ paddingRight: "3%" }}
                >
                  <span>Đơn vị tính:</span>
                  <input className="shadow" disabled></input>
                </div>

                <div
                  className="form-group flex-1"
                  style={{ paddingLeft: "3%" }}
                >
                  <span>Loại :</span>
                  <input className="shadow" disabled></input>
                </div>
              </div>

              <div className="d-flex mt-10">
                <div
                  className="form-group flex-1"
                  style={{ paddingRight: "3%" }}
                >
                  <span>Số lượng xuất kho:</span>
                  <input className="shadow" type="number"></input>
                </div>

                <div
                  className="form-group flex-1 mt-10"
                  style={{ paddingLeft: "3%" }}
                >
                  <span>Kích thước (ví dụ: 30x30 mm)</span>
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
                        disabled
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
                          width: "20%",
                          marginLeft: "1%",
                        }}
                        disabled
                      ></input>
                      <span style={{ marginLeft: "1%" }}>(mm)</span>
                    </div>

                    <div></div>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="form-group">
                  <span>Lí do xuất kho:</span>
                  <input className="shadow"></input>
                </div>
              </div>
              <div className="d-flex mt-30 justify-space-evenly ">
                <button className="btn btn-danger" onClick={onClose}>
                  Hủy
                </button>
                <button className="btn btn-primary">Thêm </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      ;
    </div>
  );
};
export default ExportWarehouseModal;
