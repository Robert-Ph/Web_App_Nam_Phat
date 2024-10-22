import "./customnerManagement.css";
import {useEffect, useState} from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import useDebounce from "../../../hooks/useDebounce.tsx";
import Customer from "../../../model/customer.model.tsx";
import CustomerService from "../../../service/CustomerService.tsx";
import Spiner from "../../../component/Spiner/Spiner.tsx";

const CustomerManagement = () => {

  const [customers, setCustomer] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState<string>("");
  const debouncedQuery = useDebounce(search, 300);
  const pageSize = 10;


  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // const handleAdd = (customer: Customer) => {
  //   console.log("add");
  //   CustomerService.create(customer)
  //       .then((response) => {
  //         console.log(response);
  //         try {
  //           const newCustomer = response.data.data;
  //           setCustomer([newCustomer, ...customers]);
  //           toast.success("Thêm nhân viên thành công!");
  //         } catch (error) {
  //           toast.error("Đã xảy ra lỗi. Vui lòng thử lại!");
  //         }
  //       })
  //       .catch((error) => {
  //         const errorReponse = error.response;
  //
  //         toast.error("Lỗi không xác định. Vui lòng thử lại!");
  //       });
  // };


  //Call API if filter
  useEffect(() => {
    setLoading(true);
    CustomerService.getByFilter(page - 1, pageSize, search)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            setTotalPages(response.data.data.page.totalPages);
            setLoading(false);
            setCustomer(response.data.data.content);
          }
        })
        .catch((error) => {
          toast.error("Xảy ra lỗi");
          console.log(error.response);
        });
  }, [page, pageSize, debouncedQuery]);
  console.log(page);



  return (
    <div>
      <div className="main-body">
        <h3>Danh sách khách hàng</h3>
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
                onClick={() => {
                  navigate("/customer/list/create");
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
                  <th className="pb-7 font-w-500" style={{ width: "5%" }}>
                    ID
                  </th>
                  <th
                    className="pb-7 font-w-500"
                    style={{ width: "15%", paddingRight: "20px" }}
                  >
                    Tên khách hàng
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
                  <th
                    className="pb-7 font-w-500"
                    style={{ width: "8%", textAlign: "center" }}
                  >
                    Loại khách hàng
                  </th>
                  <th
                    className="pb-7 font-w-500"
                    style={{ width: "10%", textAlign: "center" }}
                  >
                    Lịch sử đặt hàng
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
              {!loading && customers.length === 0 && (
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
                  customers.length > 0 &&customers.map((cusomer) => (
                  <tr key={cusomer.id} className="border-header-table">
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                      {cusomer.id}
                    </td>
                    <td
                      className="pb-7 pt-7 font-size-small font-w-500 "
                      style={{ paddingRight: "25px" }}
                    >
                      {cusomer.fullName || "-"}
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      {cusomer.phone || "-"}
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      {cusomer.email || "-"}
                    </td>
                    <td
                      className="pb-7 pt-7 font-size-small td-table font-w-500"
                      style={{ textAlign: "center" }}
                    >
                      {cusomer.typeCustomer === "personally"
                          ? "Cá nhân"
                          : cusomer.typeCustomer === "enterprise"
                              ? "Doanh nghiệp"
                              : "-"}
                    </td>

                    <td
                      className="pb-7 pt-7 font-size-small td-table font-w-500"
                      style={{ textAlign: "center" }}
                    >
                      <button
                        className="btn-more"
                        onClick={() => {
                          navigate(`/customer/list/historyoder/${cusomer.id}`);
                        }}
                      >
                        <MoreHorizIcon></MoreHorizIcon>
                      </button>
                    </td>

                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      <button
                        className="btn-more"
                        onClick={() => {
                          navigate(`/customer/list/infomation/${cusomer.id}`);
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
      {/*<CustomerCreate*/}
      {/*    open={open}*/}
      {/*    onClose={handleOnclose}*/}
      {/*    handleAdd={handleAdd}*/}
      {/*></CustomerCreate>*/}
    </div>
  );
};

export default CustomerManagement;
