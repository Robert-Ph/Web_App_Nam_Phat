import { useState } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import "./payModal.css";
import TextFieldAuto from "../../../../component/TextFieldAuto/TextFieldAuto";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "53%",
  transform: "translate(-50%, -50%)",
  width: "35%",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 1,
  maxHeight: "90vh", // Giới hạn chiều cao tối đa của modal
  overflowY: "auto", // Kích hoạt cuộn dọc khi nội dung quá lớn
  borderRadius: "20px",
  paddingBottom: "40px",
};

// Interface cho User
interface User {
  id: number;
  name: string;
}

type props = {
  open: boolean;
  onClose: () => void;

  tittle: string;
  //   handleAdd: (employee: Employee) => void;
};
const PayModal = ({ open, tittle, onClose }: props) => {
  const [role, setRole] = useState<string>("direct");
  // const [phone, setPhone] = useState<string>("");

  const handleRole = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  const users: User[] = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ];

  const handleUserSelect = (selectedId: User | null) => {
    console.log("Selected User ID:", selectedId);
    // Bạn có thể thực hiện các hành động khác tại đây
  };
  return (
    <Modal
      open={open}
      // onClose={onClose}
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
          <div className="">
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
              {/* <input className={`shadow `}></input> */}
              <TextFieldAuto
                options={users}
                getOptionLabel={(user) => `${user.id}`}
                onSelect={handleUserSelect}
                renderOption={(props, option) => (
                  <li {...props}>
                    {option.id} ({option.name})
                  </li>
                )}
              ></TextFieldAuto>
            </div>

            <div className="form-group mt-20">
              <span>Tổng số tiền cho đơn hàng:</span>
              <input className="shadow" disabled></input>
            </div>

            <div className="form-group mt-20">
              <span>
                Số tiền thanh toán <span style={{ color: "red" }}>*</span> :
              </span>
              <input className="shadow"></input>
            </div>

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
              <button className="btn btn-primary">Thêm</button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
export default PayModal;
