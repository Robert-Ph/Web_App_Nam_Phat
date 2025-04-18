import { toast } from "react-toastify";
import logo from "../../../assets/logoNamPhat.svg";
import Spiner from "../../../component/Spiner/Spiner";
import CompanyService from "../../../service/CompanyService";
import "./information.css";
import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import Company from "../../../model/company.model";

const InformartionPage = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);
  // const [
  //     // isLoading,
  //   setIsLoading] = useState<boolean>(false);
  const currentInfor = useRef<Company | null>(null);
  useEffect(() => {
    CompanyService.getCompany()
      .then((response) => {
        console.log(response);
        setCompanyInfo(response.data.data);
        currentInfor.current = response.data.data;
      })
      .catch((_error) => {toast.error("Lỗi");});
  }, []);

  console.log(companyInfo);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyInfo((prevInfo) => {
      if (!prevInfo) {
        // Handle the case where prevInfo is null, initialize with default empty values
        return {
          name: "",
          id: null,
          phone: "",
          idBank: "",
          address: "",
          email: "",
          idTax: "",
          [name]: value,
        };
      }

      return {
        ...prevInfo,
        [name]: value ?? "",
      };
    });
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setIsLoading(true);
    if (companyInfo) {
      CompanyService.update(companyInfo)
        .then((response) => {
          if (response.data.code == 200) {
            toast.success("Thông tin công ty đã được cập nhật", {
              autoClose: 1000,
            });
            currentInfor.current = companyInfo;
            setIsEditing(false); // Exit editing mode
          } else {
            toast.error("Lỗi");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Lỗi");
        })
        .finally(() => {
          // setIsLoading(false);
        });
    }

    // Kiểm tra nếu các trường cần thiết bị trống
  };
  const handleCancel = () => {
    setCompanyInfo(currentInfor.current); // Revert to original data
    setIsEditing(false); // Exit editing mode
  };
  return (
    <div className="main-body">
      <div className="d-flex justify-space-bettwen">
        <div>
          <h3>Information</h3>
        </div>
        <div style={{ marginRight: "5%" }}>
          {isEditing && (
            <button className="btn btn-danger" onClick={handleCancel}>
              Hủy
            </button>
          )}
          {!isEditing && (
            <button
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Chỉnh sửa
            </button>
          )}
          <button
            className={`btn btn-warning ${!isEditing ? "hide" : ""}`}
            type="submit"
            form="infoForm"
          >
            Lưu
          </button>
        </div>
      </div>

      <div className="mt-30">
        <div className="wrap-logo">
          <img src={logo}></img>
        </div>

        <div className="wrap-content">
          {companyInfo == null ? (
            <div className="wrap-spiner" style={{ position: "relative" }}>
              <Spiner></Spiner>
            </div>
          ) : isEditing ? (
            <form id="infoForm" onSubmit={handleSave}>
              <div className="form-group">
                <span>Tên công ty:</span>
                <input
                  type="text"
                  name="name"
                  value={companyInfo.name || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mt-10">
                <span>Mã số thuế:</span>
                <input
                  type="text"
                  name="idTax"
                  value={companyInfo.idTax || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mt-10">
                <span>Số điện thoại:</span>
                <input
                  type="text"
                  name="phone"
                  value={companyInfo.phone || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group mt-10">
                <span>Email:</span>
                <input
                  type="email"
                  name="email"
                  value={companyInfo.email || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mt-10">
                <span>Số tài khoản:</span>
                <input
                  type="text"
                  name="idBank"
                  value={companyInfo.idBank || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mt-10">
                <span>Địa chỉ:</span>
                <input
                  type="text"
                  name="address"
                  value={companyInfo.address || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </form>
          ) : (
            <>
              <p>
                Tên công ty: <strong>{companyInfo.name || ""}</strong>
              </p>
              <p>Mã số thuế: {companyInfo.idTax || ""}</p>
              <p>Số điện thoại: {companyInfo.phone || ""}</p>
              <p>Số tài khoản: {companyInfo.idBank || ""}</p>
              <p>Email: {companyInfo.email || ""}</p>
              <p>Địa chỉ: {companyInfo.address || ""}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InformartionPage;
