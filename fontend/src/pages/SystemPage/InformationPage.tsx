import logo from "../../assets/logoNamPhat.svg";
import "./information.css";
import React, { useState, ChangeEvent } from "react";

type CompanyData = {
  name: string;
  taxCode: string;
  phoneNumber: string;
  accountNumber: string;
  address: string;
};
const InformartionPage = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [companyInfo, setCompanyInfo] = useState<CompanyData>({
    name: "CÔNG TY TNHH THƯƠNG MẠI IN KỸ THUẬT NAM PHÁT",
    taxCode: "0317924032",
    phoneNumber: "0904 170 472",
    accountNumber: "",
    address:
      "168/17 đường Bình Trị Đông, P.Bình Trị Đông, Q.Bình Tân, TP.Hồ Chí Minh",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  return (
    <div className="main-body">
      <div className="d-flex justify-space-bettwen">
        <div>
          <h3>Information</h3>
        </div>
        <div style={{ marginRight: "5%" }}>
          {!isEditing && (
            <button
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Chỉnh sửa
            </button>
          )}

          {isEditing && (
            <button
              className="btn btn-warning"
              onClick={() => setIsEditing(false)}
            >
              Lưu
            </button>
          )}
        </div>
      </div>

      <div className="mt-30">
        <div className="wrap-logo">
          <img src={logo}></img>
        </div>

        <div className="wrap-content">
          {isEditing ? (
            <>
              <div className="form-group">
                <span>Tên công ty:</span>
                <input
                  type="text"
                  name="name"
                  value={companyInfo.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mt-10">
                <span>Mã số thuế:</span>
                <input
                  type="text"
                  name="taxCode"
                  value={companyInfo.taxCode}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mt-10">
                <span>Số điện thoại:</span>
                <input
                  type="text"
                  name="phoneNumber"
                  value={companyInfo.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mt-10">
                <span>Số tài khoản:</span>
                <input
                  type="text"
                  name="accountNumber"
                  value={companyInfo.accountNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mt-10">
                <span>Địa chỉ:</span>
                <input
                  type="text"
                  name="address"
                  value={companyInfo.address}
                  onChange={handleChange}
                />
              </div>
            </>
          ) : (
            <>
              <p>
                Tên công ty: <strong>{companyInfo.name}</strong>
              </p>
              <p>Mã số thuế: {companyInfo.taxCode}</p>
              <p>Số điện thoại: {companyInfo.phoneNumber}</p>
              <p>Số tài khoản: {companyInfo.accountNumber}</p>
              <p>Địa chỉ: {companyInfo.address}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InformartionPage;
