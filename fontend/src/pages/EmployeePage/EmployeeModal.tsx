import { useState } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "53%",
  transform: "translate(-50%, -50%)",
  width: "40%",
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
  //   handleAdd: (employee: Employee) => void;
};
const EmployeeModal = ({ open, onClose }: props) => {
  const [locaiton, setLocation] = useState<string>("employee");

  const handleChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value);
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
            <h3 className="text-center">Thêm Nhân Viên</h3>
          </div>

          <div
            className="d-flex dicrect-col"
            style={{ paddingLeft: "20px", paddingRight: "10px" }}
          >
            <div className="">
              <div className="form-group mt-10">
                <span>
                  Tên nhân viên <span style={{ color: "red" }}>*</span> :
                </span>
                <input className="shadow"></input>
              </div>

              <div className="form-group mt-10">
                <span>
                  Số điện thoại <span style={{ color: "red" }}>*</span> :
                </span>
                <input className="shadow"></input>
              </div>

              <div className="form-group mt-10">
                <span>
                  Email <span style={{ color: "red" }}>*</span> :
                </span>
                <input className="shadow" type="email"></input>
              </div>

              <div className="form-group mt-10">
                <span>
                  Ngày vào làm <span style={{ color: "red" }}>*</span> :
                </span>
                <input className="shadow" type="date"></input>
              </div>

              <div className="d-flex dicrect-row mt-10">
                <div
                  className="form-group flex-1"
                  style={{ marginRight: "10px" }}
                >
                  <span>Lương cơ bản:</span>
                  <input className="shadow" type="number"></input>
                </div>

                <div
                  className="form-group flex-1"
                  style={{ marginLeft: "10px" }}
                >
                  <span>Vị trí:</span>
                  <FormControl size="small">
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={locaiton}
                      onChange={handleChange}
                      className="font-size-small shadow"
                      style={{
                        borderRadius: "7px;",
                      }}
                    >
                      <MenuItem
                        value={"employee"}
                        style={{ padding: "10px 12px;" }}
                      >
                        Thử việc
                      </MenuItem>
                      <MenuItem
                        value={"enterprise"}
                        style={{ padding: "10px 12px;" }}
                      >
                        Chính thức
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="d-flex mt-20 justify-space-arround ">
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

export default EmployeeModal;
