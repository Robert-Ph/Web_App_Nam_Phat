import "./customnerManagement.css";
import { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Employee } from "../../../model/employee.model";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

const CustomerManagement = () => {
  const [emplyees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "Nguyễn Ngọc Phương Trâm Hoàng Thượng Đế",
      phone: "031231312312",
      email: "nguyenphuong12312321@gmail.com",
      dateEnjoy: "Cá Nhân",
      wage: "12000000",
    },
    {
      id: "2",
      name: "Nguyễn Ngọc Phương",
      phone: "031231312312",
      email: "nguyenphuong12312321@gmail.com",
      dateEnjoy: "Cá Nhân",
      wage: "12000000",
    },
    {
      id: "3",
      name: "Nguyễn Ngọc Phương",
      phone: "031231312312",
      email: "nguyenphuong12312321@gmail.com",
      dateEnjoy: "Cá Nhân",
      wage: "12000000",
    },
    {
      id: "4",
      name: "Nguyễn Ngọc Phương",
      phone: "031231312312",
      email: "nguyenphuong12312321@gmail.com",
      dateEnjoy: "Cá Nhân",
      wage: "12000000",
    },
    {
      id: "5",
      name: "Nguyễn Ngọc Phương",
      phone: "031231312312",
      email: "nguyenphuong12312321@gmail.com",
      dateEnjoy: "Cá Nhân",
      wage: "12000000",
    },
    {
      id: "6",
      name: "Nguyễn Ngọc Phương",
      phone: "031231312312",
      email: "nguyenphuong12312321@gmail.com",
      dateEnjoy: "Cá Nhân",
      wage: "12000000",
    },
    {
      id: "7",
      name: "Nguyễn Ngọc Phương",
      phone: "031231312312",
      email: "nguyenphuong12312321@gmail.com",
      dateEnjoy: "Cá Nhân",
      wage: "12000000",
    },
    {
      id: "8",
      name: "Nguyễn Ngọc Phương",
      phone: "031231312312",
      email: "nguyenphuong12312321@gmail.com",
      dateEnjoy: "Cá Nhân",
      wage: "12000000",
    },
  ]);

  const [page, setPage] = useState<number>(1);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div>
      <div className="main-body">
        <h3>Danh sách khách hàng</h3>
        <div style={{ marginBottom: "10px" }}>
          <div
            className="d-flex justify-space-bettwen "
            style={{ marginTop: "15px" }}
          >
            <div className="d-flex">
              <button className="btn-filter">
                <FilterListIcon></FilterListIcon>
              </button>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Tìm kiếm"
                  variant="standard"
                />
              </Box>
            </div>

            <div style={{ position: "relative", marginRight: "5%" }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate("/customer/list/create");
                }}
              >
                Thêm mới
              </button>
            </div>
          </div>
        </div>
        <div style={{ padding: "10px" }}>
          <div className="table-more">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr className="color-blue header-table text-left border-header-table">
                  <th className="pb-7 font-w-500" style={{ width: "5%" }}>
                    ID
                  </th>
                  <th
                    className="pb-7 font-w-500"
                    style={{ width: "15%", paddingRight: "20px" }}
                  >
                    Tên khách hàng
                  </th>
                  <th
                    className="pb-7 font-w-500"
                    style={{ width: "10%", paddingRight: "10px" }}
                  >
                    Số điện thoại
                  </th>
                  <th className="pb-7 font-w-500" style={{ width: "20%" }}>
                    Email
                  </th>
                  <th
                    className="pb-7 font-w-500"
                    style={{ width: "8%", textAlign: "center" }}
                  >
                    Loại khách hàng
                  </th>
                  <th
                    className="pb-7 font-w-500"
                    style={{ width: "10%", textAlign: "center" }}
                  >
                    Lịch sử đặt hàng
                  </th>

                  <th
                    className="pb-7 font-w-500 text-black"
                    style={{ width: "5%" }}
                  >
                    <SettingsIcon></SettingsIcon>
                  </th>
                </tr>
              </thead>
              <tbody className="border-header-table">
                {emplyees.map((employee) => (
                  <tr key={employee.id} className="border-header-table">
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                      {employee.id}
                    </td>
                    <td
                      className="pb-7 pt-7 font-size-small font-w-500 "
                      style={{ paddingRight: "25px" }}
                    >
                      {employee.name || "-"}
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      {employee.phone || "-"}
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      {employee.email || "-"}
                    </td>
                    <td
                      className="pb-7 pt-7 font-size-small td-table font-w-500"
                      style={{ textAlign: "center" }}
                    >
                      {employee.dateEnjoy || "-"}
                    </td>

                    <td
                      className="pb-7 pt-7 font-size-small td-table font-w-500"
                      style={{ textAlign: "center" }}
                    >
                      <button
                        className="btn-more"
                        onClick={() => {
                          navigate(`/customer/list/historyoder/${employee.id}`);
                        }}
                      >
                        <MoreHorizIcon></MoreHorizIcon>
                      </button>
                    </td>

                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      <button
                        className="btn-more"
                        onClick={() => {
                          navigate(`/customer/list/infomation/${employee.id}`);
                        }}
                      >
                        <MoreHorizIcon></MoreHorizIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <Stack spacing={2}>
              <Pagination
                count={10}
                color="primary"
                page={page}
                onChange={handleChange}
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;
