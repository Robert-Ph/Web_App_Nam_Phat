import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "../OrderPage/listOrder.css";
import { useNavigate } from "react-router-dom";

import account from "../../model/account.model";
import Span from "../../component/Span";
import AccountModal from "./AccountModal";

const AccountPage = () => {
  const [accounts, setAccounts] = useState<account[]>([
    {
      id: "1203",
      idEmployee: "NV0111",
      username: "nguyenngocphuong11072002@gmail.com",
      level: "Nhân viên",
      dateCreate: "12/12/2024 15:15:30",
      status: "Đang sử dụng",
    },
  ]);

  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  const handleOnclose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  console.log(page);
  const navigate = useNavigate();

  return (
    <div>
      <div className="main-body">
        <h3>Account</h3>
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
            <div style={{ paddingRight: "5%" }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setTitle("Thêm mới tài khoản");
                  handleOpen();
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
                  <th className="pb-7 font-w-500" style={{ width: "6%" }}>
                    ID
                  </th>
                  <th
                    className="pb-7 font-w-500"
                    style={{ width: "10%", paddingRight: "10px" }}
                  >
                    Mã Nhân Viên
                  </th>
                  <th
                    className="pb-7 font-w-500"
                    style={{ width: "10%", paddingRight: "10px" }}
                  >
                    Tên đăng nhập
                  </th>
                  <th className="pb-7 font-w-500" style={{ width: "9%" }}>
                    Quyền
                  </th>
                  <th className="pb-7 font-w-500" style={{ width: "10%" }}>
                    Ngày tạo
                  </th>
                  <th className="pb-7 font-w-500" style={{ width: "12%" }}>
                    Trạng thái
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
                {accounts.map((item) => (
                  <tr key={item.id} className="border-header-table">
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                      {item.id}
                    </td>
                    <td className="pb-7 pt-7 font-size-small font-w-500 ">
                      {item.idEmployee || "-"}
                    </td>
                    <td
                      className="pb-7 pt-7 font-size-small td-table font-w-500"
                      style={{ paddingRight: "20px" }}
                    >
                      {item.username || "-"}
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      {item.level || "-"}
                    </td>
                    <td
                      className="pb-7 pt-7 font-size-small td-table font-w-500"
                      style={{ paddingRight: "5%" }}
                    >
                      {item.dateCreate || "-"}
                    </td>

                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      <Span type="success" message="Đang sử dụng"></Span>
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      <button
                        className="btn-more"
                        onClick={() => {
                          setTitle("Chỉnh sửa tài khoản");
                          handleOpen();
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
      <AccountModal
        tittle={title}
        open={open}
        onClose={handleOnclose}
      ></AccountModal>
    </div>
  );
};

export default AccountPage;
