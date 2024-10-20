import { useState, useEffect } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import account from "../../../../model/account.model";

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
  update: account | null;
  tittle: string;
  handleSubmit: (account: account) => void;
};
const AccountModal = ({
  open,
  tittle,
  onClose,
  update,
  handleSubmit,
}: props) => {
  const [formData, setFormData] = useState<account>({
    id: null,
    employeeId: 0,
    username: "",
    permission: "USER",
    dateCreate: null, // Hoặc để trống nếu không cần
    status: true,
    password: null,
  });

  useEffect(() => {
    if (update) {
      setFormData({
        id: update.id,
        employeeId: update.employeeId,
        username: update.username,
        permission: update.permission,
        dateCreate: update.dateCreate,
        status: update.status,
        password: update.password,
      });
    } else {
      // Reset form nếu không có update
      setFormData({
        id: null,
        employeeId: 0,
        username: "",
        permission: "USER",
        dateCreate: null,
        status: true,
        password: "",
      });
    }
  }, [update]);

  // const handleRole = (event: SelectChangeEvent) => {
  //   setRole(event.target.value);
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "employeeId" ? Number(value) : value,
    }));
  };

  const handlePermission = (event: SelectChangeEvent<string>) => {
    setFormData((prev) => ({
      ...prev,
      permission: event.target.value,
    }));
  };

  const handleStatus = (event: SelectChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      status: event.target.value === "true",
    }));
  };
  console.log(formData);

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Ngăn chặn việc refresh trang
    handleSubmit(formData); // Gọi hàm handleSubmit truyền từ props với formData
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
        <form onSubmit={handleSubmitForm}>
          <div
            className="d-flex dicrect-col"
            style={{ paddingLeft: "20px", paddingRight: "10px" }}
          >
            <div className="">
              <div className="form-group mt-10">
                <span>
                  User name <span style={{ color: "red" }}>*</span> :
                </span>
                <input
                  name="username"
                  className={`shadow `}
                  value={formData.username}
                  onChange={handleChange}
                  disabled={update != null}
                ></input>
              </div>

              <div className="form-group mt-10">
                <span>
                  Password <span style={{ color: "red" }}>*</span> :
                </span>
                <input
                  className="shadow"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  required={update == null}
                ></input>
              </div>

              <div className="form-group mt-10">
                <span>
                  Mã nhân viên <span style={{ color: "red" }}>*</span> :
                </span>
                <input
                  name="employeeId"
                  className="shadow"
                  value={formData.employeeId || ""}
                  onChange={handleChange}
                  disabled={update != null}
                ></input>
              </div>

              <div className="form-group mt-10">
                <label>Permission:</label>
                <FormControl size="small" fullWidth>
                  <Select
                    name="permission"
                    value={formData.permission}
                    onChange={handlePermission}
                    className="font-size-small shadow"
                    style={{ borderRadius: "7px" }}
                  >
                    <MenuItem value="USER" style={{ padding: "10px 12px" }}>
                      Nhân viên
                    </MenuItem>
                    <MenuItem value="ADMIN" style={{ padding: "10px 12px" }}>
                      Quản lý
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="form-group mt-10">
                <label>Status:</label>
                <FormControl size="small" fullWidth>
                  <Select
                    name="status"
                    value={formData.status ? "true" : "false"}
                    onChange={handleStatus}
                    className="font-size-small shadow"
                    style={{ borderRadius: "7px" }}
                  >
                    <MenuItem value="true" style={{ padding: "10px 12px" }}>
                      Đang sử dụng
                    </MenuItem>
                    <MenuItem value="false" style={{ padding: "10px 12px" }}>
                      Khóa
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="d-flex mt-30 justify-space-arround ">
                <button className="btn btn-danger" onClick={onClose}>
                  Hủy
                </button>
                <button className="btn btn-primary" type="submit">
                  {update != null ? "Chỉnh sửa" : "Thêm"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
};
export default AccountModal;
