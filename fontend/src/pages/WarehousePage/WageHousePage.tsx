import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../OrderPage/OrderPage/order.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

import useDebounce from "../../hooks/useDebounce";

import InventoryService from "../../service/InventoriesService";
import Inventory from "../../model/inventory.model";
import { formatDateTime } from "../../utils/Utils";
import Spiner from "../../component/Spiner/Spiner";
import { highlightText } from "../UtilsPage/Highlight/highligth";

const WageHousePage = () => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const pageSize = 10;

  const [inventories, setInventories] = useState<Inventory[]>([]);

  const debouncedQuery = useDebounce(query, 500);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await InventoryService.getBySearch(
        page - 1,
        pageSize,
        debouncedQuery
      );
      setInventories(response.data.data.content);
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

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value); // Update query immediately, debouncing will handle the delay
  };

  console.log(page);
  const navigate = useNavigate();
  return (
    <div>
      <div className="main-body">
        <h3>Danh sách hàng tồn kho</h3>
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

            <div>
              <button
                className="btn btn-warning"
                onClick={() => {
                  navigate("/warehouse/list/history");
                }}
              >
                Lịch sử nhập kho
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
                      style={{ width: "15%", paddingRight: "25px" }}
                    >
                      Tên hàng hóa
                    </th>
                    <th
                      className="pb-7 font-w-500"
                      style={{ width: "8%", paddingRight: "10px" }}
                    >
                      Loại
                    </th>
                    <th
                      className="pb-7 font-w-500 text-center"
                      style={{ width: "8%" }}
                    >
                      Số lượng
                    </th>
                    <th
                      className="pb-7 font-w-500 text-center"
                      style={{ width: "10%" }}
                    >
                      Đơn vị tính
                    </th>
                    <th
                      className="pb-7 font-w-500 text-center"
                      style={{ width: "15%" }}
                    >
                      Giá/ đơn vị tính (VNĐ)
                    </th>

                    <th className="pb-7 font-w-500" style={{ width: "15%" }}>
                      Ngày nhập gần nhất
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
                  {inventories.map((item) => (
                    <tr key={item.product.id} className="border-header-table">
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                        {highlightText(item.product.id + "", debouncedQuery)}
                      </td>
                      <td
                        className="pb-7 pt-7 font-size-small font-w-500 "
                        style={{ paddingRight: "25px" }}
                      >
                        {highlightText(item.product.name, debouncedQuery) ||
                          "-"}
                      </td>
                      <td
                        className="pb-7 pt-7 font-size-small td-table font-w-500"
                        style={{ paddingRight: "20px" }}
                      >
                        {item.product.type
                          ? highlightText(item.product.type, debouncedQuery)
                          : "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        {item.quanlity}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        {item.product.unit || "-"}
                      </td>

                      <td className="pb-7 pt-7 font-size-small td-table font-w-500 text-center">
                        {highlightText(
                          item.product.price + "",
                          debouncedQuery
                        ) || "-"}
                      </td>

                      <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                        {item.lastDateIn
                          ? formatDateTime(item.lastDateIn)
                          : "-"}
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                        <button
                          className="btn-more"
                          onClick={() => {
                            navigate(
                              `/warehouse/list/product/detail/${item.product.id}`
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
    </div>
  );
};

export default WageHousePage;
