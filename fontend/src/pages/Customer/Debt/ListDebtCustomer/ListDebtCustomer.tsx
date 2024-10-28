import {useEffect, useRef, useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import TuneIcon from "@mui/icons-material/Tune";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./listDebtCustomer.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SettingsIcon from "@mui/icons-material/Settings";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import DeptService from "../../../../service/DeptService.tsx";
import Dept from "../../../../model/debt.model.tsx";
import {formatCurrency} from "../../../../utils/Utils.tsx";
const ListDebtCustomer = () => {


  const [page, setPage] = useState<number>(1);
  const [depts, setDepts] = useState<Dept[]>([]);
  const navigate = useNavigate();
  const currentDepts = useRef<Dept | null>(null);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };


  const param = useParams();
  useEffect(() => {
    DeptService.getByIdList()
        .then((response) => {
          console.log(response);
          setDepts(response.data.data);
          currentDepts.current = response.data.data;
        })
        .catch((error) => {
          const errorReponse = error.response;

          toast.error("Lỗi không xác định. Vui lòng thử lại!");
        });
  }, [param]);
  return (
    <div>
      <div className="main-body">
        <h3>Danh sách công nợ khách hàng</h3>
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

            <div style={{ position: "relative" }}>
              <select className="filter-select btn btn-primary pd-r-40">
                <option value="all">Tất cả</option>
                <option value="newest">Mới nhất</option>
                <option value="confirmed">Xác nhận</option>
                <option value="completed">Hoàn thành</option>
                <option value="delivered">Đã giao</option>
                <option value="paid">Đã thanh toán</option>
                <option value="unpaid">Chưa thanh toán</option>
              </select>
              <i className="icon-filter">
                <TuneIcon></TuneIcon>
              </i>
            </div>
          </div>
        </div>
        <div>
          <div style={{ padding: "10px" }}>
            <div className="table-more">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr className="color-blue header-table text-left border-header-table">
                    <th
                      className="pb-7 font-w-500 text-center"
                      style={{ width: "6%" }}
                    >
                      ID
                    </th>
                    <th
                      className="pb-7 font-w-500"
                      style={{
                        width: "20%",
                        paddingRight: "10px",
                        paddingLeft: "10px",
                      }}
                    >
                      Tên khách hàng
                    </th>
                    <th
                      className="pb-7 font-w-500 text-center"
                      style={{ width: "12%" }}
                    >
                      Số điện thoại
                    </th>
                    <th
                      className="pb-7 font-w-500"
                      style={{ width: "13%", textAlign: "center" }}
                    >
                      Tổng công nợ
                      <p>(VNĐ)</p>
                    </th>
                    <th
                      className="pb-7 font-w-500 text-center"
                      style={{ width: "10%" }}
                    >
                      Đã nợ (tháng)
                    </th>
                    <th
                      className="pb-7 font-w-500 text-black text-center"
                      style={{ width: "6%" }}
                    >
                      <SettingsIcon></SettingsIcon>
                    </th>
                  </tr>
                </thead>
                <tbody className="border-header-table">
                { depts.length === 0 && (
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
                  {depts.length >0 && depts.map((dept) => (
                    <tr  className="border-header-table">
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        {dept.customerID}
                      </td>
                      <td
                        className="pb-7 pt-7 font-size-small font-w-500 "
                        style={{ paddingRight: "10px", paddingLeft: "10px" }}
                      >
                        {dept.nameCustomer || "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        {dept.phoneNumber || "-"}
                      </td>
                      <td
                        className="pb-7 pt-7 font-size-small td-table font-w-500"
                        style={{ textAlign: "center" }}
                      >
                        {formatCurrency(dept.totalAmount)  || "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        {dept.monthlyPayment || "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        <button
                          className="btn-more"
                          onClick={() => {
                            navigate(
                              `/customer/debt/list/detail/${dept.customerID}`
                            );
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
    </div>
  );
};
export default ListDebtCustomer;
