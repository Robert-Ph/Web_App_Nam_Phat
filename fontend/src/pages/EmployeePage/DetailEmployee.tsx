import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate, useParams } from "react-router-dom";
const DetailEmployee = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [locaiton, setLocation] = useState<string>("employee");

  const navigate = useNavigate();
  const param = useParams();

  console.log(param.id);

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
              navigate("/employees/list");
            }}
          >
            Quay về
          </button>
          <button className="btn btn-danger">Xóa</button>
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
    </div>
  );
};

export default DetailEmployee;
