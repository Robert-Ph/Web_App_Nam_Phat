import { useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import TuneIcon from "@mui/icons-material/Tune";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import "./ListOrderPage/listOrder.css";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import React from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import type { Range } from "react-date-range";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SettingsIcon from "@mui/icons-material/Settings";

const ListOrderPage = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPages
      // , setTotalPages
  ] = useState(0);
  // const pageSize = 15;

  const [filterOption, setFilterOption] = useState<string>("all");
  // const [
  //     // search,
  //     setSearch] = useState<string>("");

    const [showPicker, setShowPicker] = useState(false);

    const [range, setRange] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const togglePicker = () => setShowPicker(!showPicker);


  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    setFilterOption(event.target.value);
  };


  return (
    <div>
      <div className="main-body">
        <h3 style={{fontSize:"1rem", color:"#0000FF"}}>Danh sách giao dịch</h3>
        <div style={{ marginBottom: "10px" }}>
          <div
            className="d-flex justify-space-bettwen "
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
                  // onChange={(e) => {
                  //   setPage(1);
                  //   setSearch(e.target.value);
                  // }}
                />
              </Box>
            </div>

            <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px", // khoảng cách giữa các item
                }}
            >
              <button
                  className="btn-primary"
                  style={{
                    height: "30px",
                    width: "30px",            // làm nút vuông
                    display: "flex",          // dùng flex để căn giữa icon
                    alignItems: "center",     // căn giữa theo chiều dọc
                    justifyContent: "center", // căn giữa theo chiều ngang
                    padding: 0, // loại bỏ padding mặc định nếu có
                      background:"#0284C7"
                  }}
                  disabled={true}
                  title="Làm mới"
              >
                <RestartAltIcon fontSize="small" />
              </button>


              <button className="btn btn-primary" disabled={true} style={{background:"#16A34A"}}>
                  Thêm
              </button>

              <button className="btn btn-primary" disabled={true} style={{background:"#10B981"}}>
                Export
              </button>

                {/* Hiển thị ngày đã chọn + icon */}
                <button
                    onClick={togglePicker}
                    style={{
                        padding: "3px 12px",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        background: "#fff",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        boxShadow:"4px 7px 6px rgba(0, 0, 0, 0.2)"
                    }}
                >
        <span style={{ marginRight: "8px" }}>
          {`${format(range[0].startDate ?? new Date(), "dd/MM/yyyy")} - ${format(
              range[0].endDate ?? new Date(),
              "dd/MM/yyyy"
          )}`}
        </span>
                    <CalendarMonthIcon />
                </button>

                {/* Date range picker */}
                {showPicker && (
                    <div style={{ position: "absolute", zIndex: 100, top: "45px", left: 0 }}>
                        <DateRange
                            editableDateInputs={true}
                            onChange={(item) => setRange([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={range}
                            locale={vi}
                            months={1}
                            direction="horizontal"
                        />
                    </div>
                )}

              <select
                  className="filter-select btn btn-primary"
                  style={{ width: "100px", height: "30px", background:"#FF7130", color:"white" }}
                  onChange={handleFilterChange}
                  value={filterOption}
              >
                <option value="all">Tất cả</option>
                <option value="newest">Mới nhất</option>
                <option value="confirmed">Xác nhận</option>
                <option value="completed">Hoàn thành</option>
                <option value="delivered">Đã giao</option>
                <option value="paid">Đã thanh toán</option>
                <option value="unpaid">Chưa thanh toán</option>
              </select>

              <i className="icon-filter" title="Lọc" style={{ cursor: "pointer", marginTop:"15px"}}>
                <TuneIcon />
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
                    <th className="pb-5 font-w-500" style={{ width: "7%" }}>
                      ID
                    </th>
                    <th
                      className="pb-5 font-w-500"
                      style={{ width: "20%", paddingRight: "10px" }}
                    >
                        Hóa đơn
                    </th>
                    <th className="pb-5 font-w-500" style={{ width: "10%" }}>
                      Ngày
                    </th>
                    <th className="pb-5 font-w-500" style={{ width: "15%" }}>
                      Giá (vnđ)
                    </th>
                    <th className="pb-5 font-w-500" style={{ width: "10%" }}>
                        Đã thanh toán
                    </th>
                    <th className="pb-5 font-w-500" style={{ width: "10%" }}>
                        Còn lại
                    </th>
                    <th
                      className="pb-7 font-w-500 text-black"
                      style={{ width: "5%" }}
                    >
                      <SettingsIcon></SettingsIcon>
                    </th>
                  </tr>
                </thead>
                <tbody className="border-header-table" style={{fontSize:"0.75rem"}}>
                      <tr key={""} className="border-header-table">
                          <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                          {/*{order.pay ? "Đã thanh toán" : "Chưa thanh toán"}*/}
                          -
                        </td>
                        <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                          {/*{order.status ? hienThiTrangThai(order.status) : ""}*/}
                            -
                        </td><td className="pb-7 pt-7 font-size-small td-table font-w-500">
                          {/*{order.pay ? "Đã thanh toán" : "Chưa thanh toán"}*/}
                          -
                        </td>
                        <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                          {/*{order.status ? hienThiTrangThai(order.status) : ""}*/}
                            -
                        </td><td className="pb-7 pt-7 font-size-small td-table font-w-500">
                          {/*{order.pay ? "Đã thanh toán" : "Chưa thanh toán"}*/}
                          -
                        </td>
                        <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                          {/*{order.status ? hienThiTrangThai(order.status) : ""}*/}
                            -
                        </td>
                        <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                          <button
                            className="btn-more"
                            onClick={() => {
                              // navigate(``);
                            }}
                          >
                            <MoreHorizIcon></MoreHorizIcon>
                          </button>
                        </td>
                      </tr>

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
      </div>
    </div>
  );
};
export default ListOrderPage;
