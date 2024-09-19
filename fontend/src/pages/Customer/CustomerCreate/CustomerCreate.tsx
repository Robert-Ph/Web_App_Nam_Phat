import "./customerCreate.css";
import { useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
const OrderPage = () => {
  const [invoice, setInvoice] = useState<string>("personally");
  const navigate = useNavigate();

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
          <button className="btn btn-primary" style={{ marginRight: "0px;" }}>
            Thêm
          </button>
        </div>
        <form>
          <div className="mt-20">
            <h3>Thêm khách hàng </h3>
            <div className="wrap-form">
              <div className="form-group flex-8">
                <span>Tên khách hàng</span>
                <input placeholder="Tên khách hàng"></input>
              </div>

              <div className="form-group flex-2" style={{ margin: "0px 20px" }}>
                <span>Số điện thoại</span>
                <input placeholder="Số điện thoại"></input>
              </div>

              <div className="form-group flex-2">
                <span>Loại khách hàng</span>
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={invoice}
                    // onChange={handleChange}
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
                <input placeholder="Mã khách hàng"></input>
              </div>
              <div className="form-group flex-4" style={{ marginLeft: "20px" }}>
                <span>Ngày tạo</span>
                <input placeholder="Ngày tạo"></input>
              </div>
              <div className="form-group flex-6" style={{ marginLeft: "20px" }}>
                <span>Email</span>
                <input placeholder="Email" type="email"></input>
              </div>
            </div>
            <div className="wrap-form" style={{ marginTop: "10px" }}>
              <div className="form-group flex-8" style={{ marginLeft: "0px" }}>
                <span>Địa chỉ giao hàng</span>
                <input placeholder="Địa chỉ giao hàng"></input>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
