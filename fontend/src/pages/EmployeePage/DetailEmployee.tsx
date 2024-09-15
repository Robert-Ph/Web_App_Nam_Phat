import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";

export const styleModalNotify = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "53%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh", // Giới hạn chiều cao tối đa của modal
  overflowY: "auto", // Kích hoạt cuộn dọc khi nội dung quá lớn
  borderRadius: "20px",
  paddingBottom: "40px",
};

const DetailEmployee = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [locaiton, setLocation] = useState<string>("employee");

  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const param = useParams();

  console.log(param.id);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //Sự kiện khi bấm vào nút chỉnh sửa sẽ thay đổi các ô input cho phép chỉnh sửa
  const handleEdit = () => {
    setIsEdit(true);
  };

  //Sự kiện khi bấm cập nhật chỉnh sửa
  const handleSubmitEdit = () => {
    setIsEdit(false);
  };

  //Sự kiện khi bấm ô select vị trí
  const handleChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value);
  };
  return (
    <div>
      <div className="container">
        <div className="d-flex justify-end">
          <button
            className="btn btn-black"
            onClick={() => {
              navigate(-1);
            }}
          >
            Quay về
          </button>
          <button className="btn btn-danger" onClick={handleOpen}>
            Xóa
          </button>
          <button className="btn btn-warning">Reset</button>
          {!isEdit && (
            <button
              className="btn btn-primary"
              style={{ marginRight: "0px;" }}
              onClick={handleEdit}
            >
              Chỉnh sửa
            </button>
          )}
          {isEdit && (
            <button
              className="btn btn-primary"
              style={{ marginRight: "0px;" }}
              onClick={handleSubmitEdit}
            >
              Cập nhật
            </button>
          )}
        </div>

        <div className="mt-20">
          <h3>Thông tin nhân viên </h3>
          <div className="wrap-form">
            <div className="form-group flex-1">
              <span>Mã nhân viên</span>
              <input
                disabled={!isEdit}
                className="font-font-size-small"
              ></input>
            </div>

            <div className="form-group flex-1" style={{ margin: "0px 20px" }}>
              <span>Ngày vào làm</span>
              <input
                disabled={!isEdit}
                className="font-font-size-small"
              ></input>
            </div>
          </div>
          <div className="wrap-form">
            <div className="form-group flex-1">
              <span>Tên nhân viên </span>
              <input
                disabled={!isEdit}
                className="font-font-size-small"
              ></input>
            </div>

            <div className="form-group flex-1" style={{ margin: "0px 20px" }}>
              <span>Số điện thoại</span>
              <input
                disabled={!isEdit}
                className="font-font-size-small"
              ></input>
            </div>
          </div>

          <div className="wrap-form">
            <div className="form-group flex-1">
              <span>Email </span>
              <input
                disabled={!isEdit}
                className="font-font-size-small"
              ></input>
            </div>

            <div className="form-group flex-1" style={{ margin: "0px 20px" }}>
              <span>Lương cơ bản</span>
              <input
                disabled={!isEdit}
                className="font-font-size-small"
              ></input>
            </div>
          </div>

          <div className="wrap-form">
            <div className="form-group flex-1">
              <span>Vị trí (Thử việc hoặc chính thức) </span>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={locaiton}
                  onChange={handleChange}
                  className="font-size-small"
                  disabled={!isEdit}
                >
                  <MenuItem value={"employee"} className="">
                    Thử việc
                  </MenuItem>
                  <MenuItem value={"enterprise"}>Chính thức</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div
              className="form-group flex-1"
              style={{ margin: "0px 20px" }}
            ></div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModalNotify}>
          <h3 className="text-center">Thông báo</h3>
          <div className=" mt-10 " style={{ textAlign: "justify" }}>
            <span>Bạn Có Chắc Chắn Muốn Xóa Nhân Viên Này Không?</span>
          </div>
          <div className="d-flex mt-20 justify-space-arround">
            <button className="btn btn-black" onClick={handleClose}>
              Trở về
            </button>
            <button className="btn btn-danger">Xóa</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DetailEmployee;
