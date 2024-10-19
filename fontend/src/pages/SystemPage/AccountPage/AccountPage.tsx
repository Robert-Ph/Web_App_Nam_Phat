import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import "../../OrderPage/ListOrderPage/listOrder.css";
import { useNavigate } from "react-router-dom";

import account from "../../../model/account.model";
import Span from "../../../component/Span/Span";
import AccountModal from "./AccountModal/AccountModal";
import NotifyDeleteModal from "../../UtilsPage/NotifyDeleteModal";
import AccountService from "../../../service/AccountService";
import { toast } from "react-toastify";
import { formatDateTime } from "../../../utils/Utils";

const AccountPage = () => {
  const [accounts, setAccounts] = useState<account[]>([]);

  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");
  const pageSize = 10;

  const [update, setUpdate] = useState<account | null>(null);

  const [notify, setNotify] = useState<boolean>(false);

  const handleCloseNotify = () => setNotify(false);

  const handleOnclose = () => {
    setUpdate(null);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    setLoading(true);
    AccountService.getByFilter(page - 1, pageSize, search)
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          setTotalPages(response.data.data.page.totalPages);
          setLoading(false);
          setAccounts(response.data.data.content);
        }
      })
      .catch((error) => {
        toast.error("Xảy ra lỗi.");
        console.log(error);
      });
  }, [page, pageSize, search]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleOnClickSettingUpdate = (account: account) => {
    setUpdate(account);
    setOpen(true);
  };

  const navigate = useNavigate();

  console.log();

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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Box>
            </div>
            <div style={{ paddingRight: "5%" }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setUpdate(null);
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
                  <th className="pb-7 font-w-500" style={{ width: "7%" }}>
                    Quyền
                  </th>
                  <th className="pb-7 font-w-500" style={{ width: "12%" }}>
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
                      {item.employeeId || "-"}
                    </td>
                    <td
                      className="pb-7 pt-7 font-size-small td-table font-w-500"
                      style={{ paddingRight: "20px" }}
                    >
                      {item.username || "-"}
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      {item.permission || "-"}
                    </td>
                    <td
                      className="pb-7 pt-7 font-size-small td-table font-w-500"
                      style={{ paddingRight: "5%" }}
                    >
                      {item.dateCreate ? formatDateTime(item.dateCreate) : "-"}
                    </td>

                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      <Span
                        type={item.status ? "SUCCESS" : "DANGER"}
                        message={item.status ? "Đang sử dụng" : "Block"}
                      ></Span>
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      <button
                        className="btn-more"
                        onClick={() => {
                          handleOnClickSettingUpdate(item);
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
                count={totalPages}
                color="primary"
                page={page}
                onChange={handleChange}
              />
            </Stack>
          </div>
        </div>
      </div>
      <AccountModal
        tittle={update ? "Chỉnh sửa tài khoản" : "Thêm mới tài khoản"}
        open={open}
        onClose={handleOnclose}
        update={update}
      ></AccountModal>

      <NotifyDeleteModal
        message="Bạn có chắn chắc xóa tài khoản này không?"
        open={notify}
        handleClose={handleCloseNotify}
        handleDelete={() => {}}
      ></NotifyDeleteModal>
    </div>
  );
};

export default AccountPage;
