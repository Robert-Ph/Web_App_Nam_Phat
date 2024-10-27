import { useEffect, useState, useRef } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";

import "./css/detailEmployee.css";
import EmployeeService from "../../service/EmployeeService";
import { toast } from "react-toastify";
import { Employee } from "../../model/employee.model";
import Position from "../../model/position.model";
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

  const [locaiton, setLocation] = useState<string>("INTERN");
  const [work, setWork] = useState<string>("true");

  const [open, setOpen] = useState<boolean>(false);

  const [employee, setEmployee] = useState<Employee>({
    id: null,
    fullName: "",
    phone: "",
    email: "",
    work_date: null,
    wage: 0,
    work: true, // Default value
    position: "INTERN", // Default position
  });
  const currentEmployee = useRef<Employee>(employee);

  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    const id = param?.id;
    console.log(id);
    EmployeeService.getById(id)
      .then((response) => {
        console.log(response);
        const data = response.data.data;

        // if (data.position as Position) {
        //   data.position = data.postion.name;
        // }
        setEmployee({ ...data, ["position"]: data.position.name });
        currentEmployee.current = { ...data, ["position"]: data.position.name };
      })
      .catch((error) => {
        const errorReponse = error.response;
        console.log(errorReponse);
        toast.error("Lỗi không xác định. Vui lòng thử lại!", {
          autoClose: 1000,
        });
      });
  }, [param]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //Sự kiện khi bấm vào nút chỉnh sửa sẽ thay đổi các ô input cho phép chỉnh sửa
  const handleEdit = () => {
    console.log("debug");
    setIsEdit(true);
  };

  //Sự kiện khi bấm cập nhật chỉnh sửa
  const handleSubmitEdit = () => {
    if (employee.id) {
      EmployeeService.update(employee, employee.id)
        .then((response) => {
          if (response.data.code == 200) {
            toast.success("Thông tin nhân viên đã được cập nhật", {
              autoClose: 1000,
            });
            setIsEdit(false);
            console.log(response);
            currentEmployee.current = employee;
          } else {
            toast.error("Lỗi");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Lỗi");
        });
    }
  };

  //Sự kiện khi bấm ô select vị trí
  const handleChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value);
    setEmployee({ ...employee, ["position"]: event.target.value });
  };
  const handleChangeWork = (event: SelectChangeEvent) => {
    setWork(event.target.value);
    setEmployee({ ...employee, ["work"]: event.target.value == "true" });
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  // const handleDelete = (id: number) => {
  //   EmployeeService.deleteEmployee(id)
  //     .then((response) => {
  //       console.log(response);
  //       if (response.data.code == 204) {
  //         toast.success("Xóa thành công", {
  //           autoClose: 1000,
  //         });
  //         navigate("/employees/list");
  //       } else {
  //         toast.error("Lỗi");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast.error("Lỗi");
  //     });
  // };
  console.log(employee);
  return (
    <div>
      <div className="container">
        <div className="d-flex justify-end">
          {!isEdit && (
            <button
              className="btn btn-black"
              onClick={() => {
                navigate(-1);
              }}
            >
              Quay về
            </button>
          )}
          {/* {!isEdit ? (
            <button
              className="btn btn-danger"
              onClick={() => {
                handleOpen();
              }}
            >
              Xóa
            </button>
          ) : (
            <button
              className="btn btn-danger"
              onClick={() => {
                setIsEdit(false);
                setEmployee(currentEmployee.current);
              }}
            >
              Hủy
            </button>
          )} */}
          {isEdit && (
            <button
              className="btn btn-danger"
              onClick={() => {
                setIsEdit(false);
                setEmployee(currentEmployee.current);
              }}
            >
              Hủy
            </button>
          )}

          {isEdit && (
            <button
              className="btn btn-warning"
              onClick={() => {
                setEmployee(currentEmployee.current);
              }}
            >
              Reset
            </button>
          )}
          {!isEdit ? (
            <button
              className="btn btn-primary"
              style={{ marginRight: "0px" }}
              onClick={handleEdit}
            >
              Chỉnh sửa
            </button>
          ) : (
            <button
              className="btn btn-primary"
              style={{ marginRight: "0px" }}
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
                disabled={true}
                className="font-font-size-small"
                value={employee.id || ""}
                onChange={handleInputChange}
              ></input>
            </div>

            <div className="form-group flex-1" style={{ margin: "0px 20px" }}>
              <span>Ngày vào làm (mm/dd/yyyy)</span>
              <input
                disabled={!isEdit}
                className="font-font-size-small"
                name="work_date"
                type="date"
                value={employee?.work_date || ""}
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="wrap-form">
            <div className="form-group flex-1">
              <span>Tên nhân viên </span>
              <input
                disabled={!isEdit}
                className="font-font-size-small"
                name="fullName"
                value={employee.fullName}
                onChange={handleInputChange}
              ></input>
            </div>

            <div className="form-group flex-1" style={{ margin: "0px 20px" }}>
              <span>Số điện thoại</span>
              <input
                disabled={!isEdit}
                className="font-font-size-small"
                name="phone"
                value={employee.phone}
                onChange={handleInputChange}
              ></input>
            </div>
          </div>

          <div className="wrap-form">
            <div className="form-group flex-1">
              <span>Email </span>
              <input
                disabled={!isEdit}
                className="font-font-size-small"
                name="email"
                value={employee.email}
                onChange={handleInputChange}
              ></input>
            </div>

            <div className="form-group flex-1" style={{ margin: "0px 20px" }}>
              <span>Lương cơ bản</span>
              <input
                disabled={!isEdit}
                className="font-font-size-small"
                name="wage"
                value={employee.wage}
                min={0}
                onChange={handleInputChange}
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
                  value={
                    typeof employee?.position === "string"
                      ? employee.position // Nếu là string
                      : employee.position.name
                  }
                  onChange={handleChange}
                  className="font-size-small"
                  disabled={!isEdit}
                  name="position"
                >
                  <MenuItem value={"INTERN"} className="">
                    Thử việc
                  </MenuItem>
                  <MenuItem value={"OFFICIAL"}>Chính thức</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="form-group flex-1" style={{ margin: "0px 20px" }}>
              <span>Trạng thái </span>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={employee.work ? "true" : "false"}
                  onChange={handleChangeWork}
                  name="work"
                  className="font-size-small"
                  disabled={!isEdit}
                >
                  <MenuItem value={"true"} className="">
                    Đang làm việc
                  </MenuItem>
                  <MenuItem value={"false"}>Đã nghĩ</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal
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
            <button
              className="btn btn-danger"
              onClick={() => {
                if (employee.id) {
                  handleDelete(employee.id);
                } else {
                  toast.error("Lỗi xóa nhân viên", {
                    autoClose: 1000,
                  });
                }
              }}
            >
              Xóa
            </button>
          </div>
        </Box>
      </Modal> */}
    </div>
  );
};

export default DetailEmployee;
