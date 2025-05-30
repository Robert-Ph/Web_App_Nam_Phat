import "./customerCreate.css";
import { useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
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
    tax: "",
    address: "",
    typeCustomer: invoice,
    active: true,
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
            toast.success("Thêm khách hàng thành công!");
            // ✅ Reload trang sau 1.5s để toast hiển thị
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } catch (error) {
            console.log(error);
            toast.error("Đã xảy ra lỗi. Vui lòng thử lại!");
            // ✅ Reload trang sau 1.5s để toast hiển thị
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        })
        .catch((error) => {
          // const errorReponse = error.response;
          console.log(error);
          // ✅ Reload trang sau 1.5s để toast hiển thị
          setTimeout(() => {
            window.location.reload();
          }, 1000);
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
      tax: "",
      address: "",
      typeCustomer: invoice,
      active: true,
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
          <form onSubmit={handleSubmitForm}>
            <button className="btn btn-primary" type="submit" style={{marginRight: "0px"}}>
              Thêm
            </button>
          </form>
        </div>
        <form>
          <div className="mt-20">
            <h3>Thêm khách hàng </h3>
            <div className="wrap-form">
              <div className="form-group flex-8">
                <span>Tên khách hàng <span style={{color: "red"}}>*</span></span>
                <input placeholder="Tên khách hàng"
                       name="fullName"
                       onChange={handleInputChange}
                       required>
                </input>
              </div>

              <div className="form-group flex-2" style={{ margin: "0px 20px" }}>
                <span>Số điện thoại <span style={{color: "red"}}>*</span></span>
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
                <span>Mã số thuế(Tax)</span>
                <input  placeholder="Mã số thuế"
                        name="tax"></input>
              </div>
              <div className="form-group flex-4" style={{ marginLeft: "20px" }}>
                <span>Ngày tạo</span>
                <input placeholder={formattedDate} readOnly disabled={true}></input>
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
                <span>Địa chỉ giao hàng <span style={{color: "red"}}>*</span></span>
                <input placeholder="Địa chỉ giao hàng"
                       name="address"
                       onChange={handleInputChange}
                       required></input>
              </div>
            </div>
          </div>
        </form>
        <p style={{marginTop: '20px'}}> 1. (<span style={{color:"red"}}>*</span>) là các trường bắt buộc phải điền. Nếu không điền sẽ gây lỗi.</p>
        <p style={{color:"red"}}>2. Số điện thoại là duy nhất cho mỗi khách hàng, không được trùng số điện thoại.</p>
        <p>3. Mã số thuế(Tax): không bắt buộc nhưng nên cung cấp nếu là Doanh nghiệp.</p>
        <p>4. Không được bỏ trống ô địa chỉ, địa chỉ có thể sửa đổi khi tạo đơn hàng.</p>
      </div>
    </div>
  );
};

export default OrderPage;