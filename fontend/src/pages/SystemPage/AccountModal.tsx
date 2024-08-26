import { useState } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import account from "../../model/account.model";

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
  isUpdate?: (account: account) => void;
  //   handleAdd: (employee: Employee) => void;
};
const AccountModal = ({ open, onClose, isUpdate }: props) => {
  const [role, setRole] = useState<string>("employee");
  const [status, setStatus] = useState<string>("use");

  const handleRole = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  const handleStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
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
            <h3 className="text-center">Thêm Tài Khoản</h3>
          </div>

          <div
            className="d-flex dicrect-col"
            style={{ paddingLeft: "20px", paddingRight: "10px" }}
          >
            <div className="">
              <div className="form-group mt-10">
                <span>
                  User name <span style={{ color: "red" }}>*</span> :
                </span>
                <input className="shadow"></input>
              </div>

              <div className="form-group mt-10">
                <span>
                  Password <span style={{ color: "red" }}>*</span> :
                </span>
                <input className="shadow" type="password"></input>
              </div>

              <div className="form-group mt-10">
                <span>
                  Mã nhân viên <span style={{ color: "red" }}>*</span> :
                </span>
                <input className="shadow"></input>
              </div>

              <div className="form-group mt-10">
                <span>Quyền :</span>
                <FormControl size="small">
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={role}
                    onChange={handleRole}
                    className="font-size-small shadow"
                    style={{
                      borderRadius: "7px;",
                    }}
                  >
                    <MenuItem
                      value={"employee"}
                      style={{ padding: "10px 12px;" }}
                    >
                      Nhân viên
                    </MenuItem>
                    <MenuItem
                      value={"enterprise"}
                      style={{ padding: "10px 12px;" }}
                    >
                      Quản lí
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="form-group mt-10">
                <span>Trạng thái :</span>
                <FormControl size="small">
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={status}
                    onChange={handleStatus}
                    className="font-size-small shadow"
                    style={{
                      borderRadius: "7px;",
                    }}
                  >
                    <MenuItem value={"use"} style={{ padding: "10px 12px;" }}>
                      Đang sử dụng
                    </MenuItem>
                    <MenuItem value={"block"} style={{ padding: "10px 12px;" }}>
                      Khóa
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="d-flex mt-30 justify-space-arround ">
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
export default AccountModal;
