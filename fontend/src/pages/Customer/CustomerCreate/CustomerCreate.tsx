import "./customerCreate.css";
import { useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import {Employee} from "../../../model/employee.model.tsx";
import Customer from "../../../model/customer.model.tsx";
import CustomerService from "../../../service/CustomerService.tsx";
import {toast} from "react-toastify";
const OrderPage = () => {
  const [invoice, setInvoice] = useState<string>("personally");
  const navigate = useNavigate();
  const currentDate = new Date();

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(currentDate);
  const [customers, setCustomer] = useState<Customer[]>([]);
  const [formData, setFormData] = useState<Customer>({
    id: null,
    fullName: "",
    phone: "",
    email: "",
    address: "",
    typeCustomer: invoice,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleChange = (event: SelectChangeEvent) => {
    setInvoice(event.target.value);
    setFormData({ ...formData, ["typeCustomer"]: event.target.value });
  };

  const handleAdd = (customer: Customer) => {
    console.log("add");
    CustomerService.create(customer)
        .then((response) => {
          console.log(response);
          try {
            const newCustomer = response.data.data;
            setCustomer([newCustomer, ...customers]);
            toast.success("Thêm nhân viên thành công!");
          } catch (error) {
            toast.error("Đã xảy ra lỗi. Vui lòng thử lại!");
          }
        })
        .catch((error) => {
          const errorReponse = error.response;

          toast.error("Lỗi không xác định. Vui lòng thử lại!");
        });
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Ngăn chặn việc refresh trang
    console.log(formData);

    handleAdd(formData); // Gọi hàm handleSubmit truyền từ props với formData
    setFormData({
      id: null,
      fullName: "",
      phone: "",
      email: "",
      address: "",
      typeCustomer: invoice,
    });
  };

  console.log(formData);

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
          <button className="btn btn-warning">Reset</button>
          <button className="btn btn-primary" style={{ marginRight: "0px;" }} onClick={handleSubmitForm}>
            Thêm
          </button>
        </div>
        <form>
          <div className="mt-20">
            <h3>Thêm khách hàng </h3>
            <div className="wrap-form">
              <div className="form-group flex-8">
                <span>Tên khách hàng</span>
                <input placeholder="Tên khách hàng"
                       name="fullName"
                       onChange={handleInputChange}
                       required>
                </input>
              </div>

              <div className="form-group flex-2" style={{ margin: "0px 20px" }}>
                <span>Số điện thoại</span>
                <input placeholder="Số điện thoại"
                       name="phone"
                       onChange={handleInputChange}
                       required>

                </input>
              </div>

              <div className="form-group flex-2">
                <span>Loại khách hàng</span>
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={invoice}
                    onChange={handleChange}
                  >
                    <MenuItem value={"personally"} className="">
                      Cá Nhân
                    </MenuItem>
                    <MenuItem value={"enterprise"}>Doanh Nghiệp</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="wrap-form" style={{ marginTop: "10px" }}>
              <div className="form-group flex-4">
                <span>Mã khách hàng</span>
                <input placeholder="Mã khách hàng" readOnly></input>
              </div>
              <div className="form-group flex-4" style={{ marginLeft: "20px" }}>
                <span>Ngày tạo</span>
                <input placeholder={formattedDate} readOnly></input>
              </div>
              <div className="form-group flex-6" style={{ marginLeft: "20px" }}>
                <span>Email</span>
                <input placeholder="Email" type="email"
                       name="email"
                       onChange={handleInputChange}
                       required></input>
              </div>
            </div>
            <div className="wrap-form" style={{ marginTop: "10px" }}>
              <div className="form-group flex-8" style={{ marginLeft: "0px" }}>
                <span>Địa chỉ giao hàng</span>
                <input placeholder="Địa chỉ giao hàng"
                       name="address"
                       onChange={handleInputChange}
                       required></input>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
