import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../OrderPage/ListOrderPage/listOrder.css";
// import { useNavigate } from "react-router-dom";
//
// import exportProduct from "../../model/stockOut.model";
import ExportWarehouseModal from "./ExportWarehouseModal";
import StockOut from "../../model/stockOut.model";
import useDebounce from "../../hooks/useDebounce";
import StockOutService from "../../service/StockOutService";
import Spiner from "../../component/Spiner/Spiner";
import { formatDateTime } from "../../utils/Utils";
import { highlightText } from "../UtilsPage/Highlight/highligth";
const ExportWarehouse = () => {
  const [exports, setExports] = useState<StockOut[]>([]);

  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const pageSize = 10;
  const [open, setOpen] = useState<boolean>(false);
  const debouncedQuery = useDebounce(query, 500);

  const handleOnclose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  console.log(page);
  // const navigate = useNavigate();

  const fetchStockOut = async () => {
    try {
      setLoading(true);
      const response = await StockOutService.getBySearch(
        page - 1,
        pageSize,
        debouncedQuery
      );
      setExports(response.data.data.content);
      setTotalPages(response.data.data.page.totalPages);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockOut();
  }, [page, debouncedQuery, totalPages]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value); // Update query immediately, debouncing will handle the delay
  };

  const handleAdd = (stockOut: StockOut) => {
    setExports((prevExports) => [stockOut, ...prevExports]);
  };
  return (
    <div>
      <div className="main-body">
        <h3>Danh sách hàng xuất kho</h3>
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
                  onChange={handleSearchChange}
                />
              </Box>
            </div>
            <div style={{ paddingRight: "5%" }}>
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
                    <th className="pb-7 font-w-500" style={{ width: "6%" }}>
                      ID
                    </th>
                    <th
                      className="pb-7 font-w-500"
                      style={{ width: "15%", paddingRight: "10px" }}
                    >
                      Tên hàng hóa
                    </th>
                    <th
                      className="pb-7 font-w-500"
                      style={{ width: "8%", paddingRight: "10px" }}
                    >
                      Loại
                    </th>
                    <th className="pb-7 font-w-500" style={{ width: "7%" }}>
                      Số lượng
                    </th>
                    <th className="pb-7 font-w-500" style={{ width: "8%" }}>
                      Đơn vị tính
                    </th>
                    <th className="pb-7 font-w-500" style={{ width: "12%" }}>
                      Ngày
                    </th>

                    <th className="pb-7 font-w-500" style={{ width: "20%" }}>
                      Lí do xuất kho
                    </th>
                  </tr>
                </thead>
                <tbody className="border-header-table">
                  {exports.map((item) => (
                    <tr key={item.id} className="border-header-table">
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                        {highlightText(item.id + "", query)}
                      </td>
                      <td className="pb-7 pt-7 font-size-small font-w-500 ">
                        {item.product?.name
                          ? highlightText(item.product?.name, query)
                          : " - "}
                      </td>
                      <td
                        className="pb-7 pt-7 font-size-small td-table font-w-500"
                        style={{ paddingRight: "20px" }}
                      >
                        {item.product?.type
                          ? highlightText(item.product.type, query)
                          : "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                        {item.quantity || "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                        {item.product?.unit
                          ? highlightText(item.product.unit, query)
                          : "-"}
                      </td>

                      <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                        {item.dateCreate
                          ? formatDateTime(item.dateCreate)
                          : " - "}
                      </td>

                      <td
                        className="pb-7 pt-7 font-size-small td-table font-w-500"
                        style={{ textAlign: "justify" }}
                      >
                        {highlightText(item.reson, query) || "-"}
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
      <ExportWarehouseModal
        open={open}
        onClose={handleOnclose}
        handleAdd={handleAdd}
      ></ExportWarehouseModal>
    </div>
  );
};

export default ExportWarehouse;
