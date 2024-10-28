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
const InvoicePage = () => {
  const [query, setQuery] = useState<string>("");
  const [invoices, setInvoices] = useState<Invoices[]>([]);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const pageSize = 10;

  const debouncedQuery = useDebounce(query, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value); // Update query immediately, debouncing will handle the delay
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };


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
  }, [page, debouncedQuery]);

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


  return (
    <div>
      <div className="main-body">
        <h3>Danh sách hóa đơn</h3>
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
                  value={query}
                  onChange={handleSearchChange}
                />
              </Box>
            </div>

            {/* <div style={{ position: "relative" }}>
              <select className="filter-select">
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
            </div> */}
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
                  Ngày tạo
                </th>

                <th className="pb-7 font-w-500" style={{width: "5%"}}></th>
                <th className="pb-7 font-w-500" style={{width: "5%"}}></th>
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
                              handleSeen(invoice.id,"HD_"+invoice.id);
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
