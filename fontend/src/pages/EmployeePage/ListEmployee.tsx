import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../OrderPage/ListOrderPage/listOrder.css";
import { Employee } from "../../model/employee.model";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import EmployeeModal from "./EmployeeModal";
import useDebounce from "../../hooks/useDebounce";
import EmployeeService from "../../service/EmployeeService";
import { toast } from "react-toastify";
import Spiner from "../../component/Spiner/Spiner";
import { highlightText } from "../UtilsPage/Highlight/highligth";

const ListEmployee = () => {
  const [emplyees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);
  const [open, setOpen] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");
  const debouncedQuery = useDebounce(search, 300);
  const pageSize = 15;

  const handleOnclose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleAdd = (emplyee: Employee) => {
    console.log("add");
    EmployeeService.create(emplyee)
      .then((response) => {
        console.log(response);
        try {
          const newEmployee = response.data.data;
          setEmployees([newEmployee, ...emplyees]);
          handleOnclose();
          toast.success("Thêm nhân viên thành công!");
          // ✅ Reload trang sau 1.5s để toast hiển thị
          setTimeout(() => {
            window.location.reload();
          }, 0);
        } catch (_error) {
          toast.error("Đã xảy ra lỗi. Vui lòng thử lại!");
        }
      })
      .catch(() => {
        // const errorReponse = error.response;

        toast.error("Lỗi không xác định. Vui lòng thử lại!");
      });
  };

  //Call API if filter
  useEffect(() => {
    setLoading(true);
    EmployeeService.getByFilter(page - 1, pageSize, search)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          setTotalPages(response.data.data.page.totalPages);
          setLoading(false);
          setEmployees(response.data.data.content);
        }
      })
      .catch((error) => {
        toast.error("Xảy ra lỗi");
        console.log(error.response);
      });
  }, [page, pageSize, debouncedQuery]);
  console.log(page);
  const navigate = useNavigate();
  return (
    <div>
      <div className="main-body">
        <h3>Danh sách nhân viên</h3>
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

            <div style={{ position: "relative", marginRight: "5%" }}>
              <button
                  className="btn btn-primary"
                  disabled={true}
              >
                Export
              </button>
              <button className="btn btn-primary" onClick={handleOpen}>
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
                    <th className="pb-7 font-w-500" style={{ width: "5%" }}>
                      ID
                    </th>
                    <th
                      className="pb-7 font-w-500"
                      style={{ width: "15%", paddingRight: "10px" }}
                    >
                      Tên nhân viên
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
                    <th className="pb-7 font-w-500" style={{ width: "10%" }}>
                      Bắt đầu làm việc (ngày)
                    </th>
                    <th className="pb-7 font-w-500" style={{ width: "10%" }}>
                      Lương cơ bản (VNĐ)
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
                  {loading && (
                    <tr>
                      <td>
                        <Spiner></Spiner>
                      </td>
                    </tr>
                  )}
                  {!loading && emplyees.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        rowSpan={10}
                        className="pb-7 pt-7 font-size-small td-table font-w-500 text-center"
                        style={{
                          padding: "10% 0px",
                          display: "table-cell", // Makes it behave like a table cell
                          verticalAlign: "middle", // Vertically center the content
                          borderBottom: "none",
                          fontSize: "20px",
                        }}
                      >
                        Không có dữ liệu
                      </td>
                    </tr>
                  )}
                  {!loading &&
                    emplyees.length > 0 &&
                    emplyees.map((employee) => (
                      <tr key={employee.id} className="border-header-table">
                        <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                          {highlightText(employee.id + "", debouncedQuery)}
                        </td>
                        <td
                          className="pb-7 pt-7 font-size-small font-w-500 "
                          style={{ paddingRight: "10px" }}
                        >
                          {highlightText(employee.fullName, debouncedQuery) ||
                            "-"}
                        </td>
                        <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                          {highlightText(employee.phone, debouncedQuery) || "-"}
                        </td>
                        <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                          {highlightText(employee.email, debouncedQuery) || "-"}
                        </td>
                        <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                          {employee.work_date || "-"}
                        </td>

                        <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                          {employee.wage || "-"}
                        </td>

                        <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                          <button
                            className="btn-more"
                            onClick={() => {
                              navigate(`/employees/list/detail/${employee.id}`);
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
      <EmployeeModal
        open={open}
        onClose={handleOnclose}
        handleAdd={handleAdd}
      ></EmployeeModal>
    </div>
  );
};

export default ListEmployee;
