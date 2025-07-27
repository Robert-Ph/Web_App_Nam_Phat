import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../OrderPage/ListOrderPage/listOrder.css";
import Invoices from "../../model/invoice.model";
import useDebounce from "../../hooks/useDebounce";
import InvoiceService from "../../service/InvoiceSevice";
import { formatDateTime } from "../../utils/Utils";
import { saveAs } from "file-saver";
import type {Range} from "react-date-range";
import React from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import TuneIcon from "@mui/icons-material/Tune";



const InvoicePage = () => {
  const [query, setQuery] = useState<string>("");
  const [invoices, setInvoices] = useState<Invoices[]>([]);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);
  const [_loading, setLoading] = useState<boolean>(false);
  const pageSize = 15;

  const debouncedQuery = useDebounce(query, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value); // Update query immediately, debouncing will handle the delay
  };
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const [showPicker, setShowPicker] = useState(false);

  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const togglePicker = () => setShowPicker(!showPicker);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await InvoiceService.getBySearch(
        page - 1,
        pageSize,
        debouncedQuery
      );
      setInvoices(response.data.data.content);
      setTotalPages(response.data.data.page.totalPages);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [page, debouncedQuery, totalPages]);

  const handleDowload = async (id: number) => {
    try {
      const response = await InvoiceService.dowloadFile(id);
      const contentDisposition = response.headers["content-disposition"];
      let fileName = "HD_" + id + ".pdf"; // default name

      if (contentDisposition) {
        console.log(contentDisposition);
        const fileNameMatch = contentDisposition.match(
          /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        );
        if (fileNameMatch.length === 2) {
          fileName = fileNameMatch[1];
        }
      }

      const blob = new Blob([response.data], { type: "application/pdf" });
      saveAs(blob, fileName);
      console.log(response);
      fetchInvoices();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeen = async (id: number) => {
    try {
      const response = await InvoiceService.seenFile(id);
      // Kiểm tra xem response có dữ liệu
      if (!response.data) {
        console.error("Không có dữ liệu từ phản hồi.");
        return;
      }

      const contentDisposition = response.headers["content-disposition"];
      // let fileName = `HD_${id}.pdf`;

      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(
            /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        );
        if (fileNameMatch && fileNameMatch.length === 2) {
          // Lấy tên file từ content-disposition
          // fileName = fileNameMatch[1].replace(/['"]/g, ''); // Loại bỏ dấu nháy
        }
      }



      // Tạo một blob từ response.data
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob); // Tạo URL cho blob

      // Mở file PDF trong tab mới
      window.open(url, '_blank');

      // Có thể không cần gọi fetchInvoices() ở đây, tùy thuộc vào logic ứng dụng
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const response = await InvoiceService.update(id);
      // ✅ Reload trang sau 1.5s để toast hiển thị
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      // Kiểm tra xem response có dữ liệu
      if (!response.data) {
        console.error("Không có dữ liệu từ phản hồi.");
        return;
      }
      // Có thể không cần gọi fetchInvoices() ở đây, tùy thuộc vào logic ứng dụng
      console.log(response);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="main-body">
        <h3  style={{fontSize:"1rem", color:"#0000FF"}}>Danh sách hóa đơn</h3>
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
                    onChange={handleSearchChange}
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
                  // onChange={handleFilterChange}
                  // value={filterOption}
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
          <div style={{ padding: "10px" }}>
            <div className="table-more">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr className="color-blue header-table text-left border-header-table">
                  <th className="pb-7 font-w-500" style={{width: "7%"}}>
                    ID
                  </th>
                  <th
                      className="pb-7 font-w-500"
                      style={{width: "8%", paddingRight: "10px"}}
                  >
                    Mã đơn hàng
                  </th>
                  <th
                      className="pb-7 font-w-500"
                      style={{width: "20%", paddingRight: "10px"}}
                  >
                    Tên khách hàng
                  </th>
                  <th className="pb-7 font-w-500" style={{width: "10%"}}>
                    Ngày xuất
                  </th>

                  <th
                      className="pb-7 font-w-500"
                      style={{width: "5%"}}
                  ></th>
                  <th
                      className="pb-7 font-w-500"
                      style={{width: "5%"}}
                  ></th>
                  <th
                      className="pb-7 font-w-500"
                      style={{width: "5%"}}
                  ></th>
                </tr>
                </thead>
                <tbody className="border-header-table">
                {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-header-table">
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                        {invoice.id}
                      </td>
                      <td className="pb-7 pt-7 font-size-small font-w-500 ">
                        {invoice.orderId || "-"}
                      </td>
                      <td
                          className="pb-7 pt-7 font-size-small td-table font-w-500"
                          style={{paddingRight: "20px"}}
                      >
                        {invoice.nameCustomer || "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                        {invoice.dateCreate
                            ? formatDateTime(invoice.dateCreate)
                            : "Chưa xuất File"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                              handleSeen(invoice.id);
                            }}
                        >
                          Xem
                        </button>
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                          <button
                              className="btn btn-primary"
                              onClick={() => {
                                handleDowload(invoice.id);
                              }}
                          >
                            Xuất File
                          </button>
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                              handleUpdate(invoice.id);
                            }}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <Stack spacing={2}>
              <Pagination count={totalPages}
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

export default InvoicePage;
