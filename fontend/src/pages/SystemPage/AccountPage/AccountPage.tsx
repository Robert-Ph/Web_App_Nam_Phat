import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import "../../OrderPage/ListOrderPage/listOrder.css";


import account from "../../../model/account.model";
import Span from "../../../component/Span/Span";
import AccountModal from "./AccountModal/AccountModal";
import NotifyDeleteModal from "../../UtilsPage/NotifyDeleteModal";
import AccountService from "../../../service/AccountService";
import { toast } from "react-toastify";
import { formatDateTime } from "../../../utils/Utils";
import Spiner from "../../../component/Spiner/Spiner";
import useDebounce from "../../../hooks/useDebounce";

const AccountPage = () => {
  const [accounts, setAccounts] = useState<account[]>([]);

  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");
  const debouncedQuery = useDebounce(search, 200);
  const pageSize = 15;

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
  // Create account
  const createAccount = (account: account) => {
    console.log(account);
    AccountService.create(account)
      .then((response) => {
        console.log(response.status);
        if (response.status == 201) {
          setAccounts([response.data.data, ...accounts]);
          toast.success("Tạo tài khoản mới thành công");
          handleOnclose();
        } else {
          toast.error("Lỗi tạo tài khoản");
        }
      })
      .catch((error) => {
        const errorReponse = error.response;

        if (errorReponse.data.code == 400) {
          toast.error("Không tìm thấy mã nhân viên");
        } else if (errorReponse.data.code == 421) {
          toast.error("Tên tài khoản đã có trong hệ thống");
        } else if (errorReponse.data.code == 424) {
          toast.error("Nhân viên đã có tài khoản trong hệ thống");
        } else {
          toast.error("Lỗi không xác định. Vui lòng thử lại!");
        }
      });
  };
  // Update account if not input password not change password
  const updateAccount = (account: account) => {
    console.log(account);
    AccountService.update(account)
      .then((response) => {
        console.log(response.status);

        //Check if reponse data is successs
        if (response.status == 200) {
          toast.success("Cập nhật thành công");
          const newAccount = response.data.data;

          //Update data in list
          setAccounts((prevAccounts) =>
            prevAccounts.map((acc) =>
              acc.id === newAccount.id ? newAccount : acc
            )
          );
          handleOnclose();
        } else {
          toast.error("Lỗi tạo cập nhật");
        }
      })
      .catch((_error) => {
        toast.error("Xảy ra lỗi cập nhật. Vui lòng thử lại");
      });
  };
  //Call API if filter
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
        console.log(error.response);
      });
  }, [page, pageSize, debouncedQuery]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleOnClickSettingUpdate = (account: account) => {
    setUpdate(account);
    setOpen(true);
  };

  // const navigate = useNavigate();

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
                  onChange={(e) => {
                    setPage(1);
                    setSearch(e.target.value);
                  }}
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

        {loading && <Spiner></Spiner>}
        {!loading && (
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
                        <Span
                          type={item.permission}
                          message={item.permission}
                        ></Span>
                      </td>
                      <td
                        className="pb-7 pt-7 font-size-small td-table font-w-500"
                        style={{ paddingRight: "5%" }}
                      >
                        {item.dateCreate
                          ? formatDateTime(item.dateCreate)
                          : "-"}
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
        )}
      </div>
      <AccountModal
        tittle={update ? "Chỉnh sửa tài khoản" : "Thêm mới tài khoản"}
        open={open}
        onClose={handleOnclose}
        update={update}
        handleSubmit={update == null ? createAccount : updateAccount}
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
