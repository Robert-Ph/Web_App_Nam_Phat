import "./customerInfomation.css";
import {useEffect, useRef, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FilterListIcon from "@mui/icons-material/FilterList";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TuneIcon from "@mui/icons-material/Tune";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import NotifyDeleteModal from "../../UtilsPage/NotifyDeleteModal";
import Customer from "../../../model/customer.model.tsx";
import {toast} from "react-toastify";
import CustomerService from "../../../service/CustomerService.tsx";
const OrderPage = () => {


  const [page, setPage] = useState<number>(1);
  const [invoice, setInvoice] = useState<string>("personally");
  const [isEdit, setIsEdit] = useState(false);
  const [openDelte, setOpenDelete] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer>({
    id: null,
    fullName: "",
    phone: "",
    email: "",
    address: "",
    typeCustomer: invoice,
  });
  const currentCustomer = useRef<Customer | null>(null);
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  //Sự kiện khi bấm vào nút chỉnh sửa sẽ thay đổi các ô input cho phép chỉnh sửa
  const handleEdit = () => {
    console.log("debug");
    setIsEdit(true);
  };
  //Sự kiện khi bấm cập nhật chỉnh sửa
  // const handleSubmitEdit = (id: number, customer: Customer) => {
  //    CustomerService.update(id, customer);
  //   setIsEdit(false);
  // };

  const handleSubmitEdit = async () => {
    if (customer.id == null) {
      toast.error("ID khách hàng không hợp lệ.");
      return;
    }

    try {
      await CustomerService.update(customer.id, customer);
      toast.success("Cập nhật khách hàng thành công!");
      // setIsEdit(false);
      // ✅ Reload trang sau 1.5s để toast hiển thị
      setTimeout(() => {
        window.location.reload();
      }, 0);
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật.");
    }
  };
  const handleChangeSelect = (event: SelectChangeEvent) => {
    setInvoice(event.target.value);
  };
  const navigate = useNavigate();
  const param = useParams();
  useEffect(() => {
    const id = param?.id;
    console.log(id);
    CustomerService.getById(id)
        .then((response) => {
          console.log(response);
          setCustomer(response.data.data);
          currentCustomer.current = response.data.data;
        })
        .catch((error) => {
          console.log(error.response);

          toast.error("Lỗi không xác định. Vui lòng thử lại!");
        });
  }, [param]);

  return (
    <div>
      <div className="container" style={{ paddingBottom: "5%" }}>
        <div className="d-flex justify-end mt-10">
          {!isEdit && (
            <button
              className="btn btn-black"
              onClick={() => {
                navigate(-1);
              }}
            >
              Trở về
            </button>
          )}

          {!isEdit ? (
            <button
              className="btn btn-danger"
              onClick={() => setOpenDelete(true)}
            >
              Xóa
            </button>
          ) : (
            <button className="btn btn-danger" onClick={() => setIsEdit(false)}>
              Hủy
            </button>
          )}

          {isEdit && <button className="btn btn-warning">Reset</button>}

          {isEdit ? (
            <button
              className="btn btn-primary"
              style={{ marginRight: "0px" }}
              onClick={handleSubmitEdit}
            >
              Cập nhật
            </button>
          ) : (
            <button
              className="btn btn-primary"
              style={{ marginRight: "0px" }}
              onClick={handleEdit}
            >
              Chỉnh sửa
            </button>
          )}
        </div>

        <div className="mt-20">
          <h3>Thông tin khách hàng </h3>
          <div className="wrap-form">
            <div className="form-group flex-1" style={{ marginRight: "5%" }}>
              <span>Mã khách hàng</span>
              <input disabled={true}
                     value={customer.id || ""}></input>
            </div>

            <div className="form-group flex-1" style={{ marginLeft: "5%" }}>
              <span>Ngày tạo</span>
              <input  disabled={true} type="date"></input>
            </div>
          </div>
          <div className="wrap-form">
            <div className="form-group flex-1" style={{ marginRight: "5%" }}>
              <span>Tên khách hàng</span>
              <input value={customer.fullName || ""}
                     disabled={!isEdit}></input>
            </div>

            <div className="form-group flex-1" style={{ marginLeft: "5%" }}>
              <span>Số điện thoại</span>
              <input value={customer.phone || ""}
                     disabled={!isEdit}></input>
            </div>
          </div>
          <div className="wrap-form">
            <div className="form-group flex-1" style={{ marginRight: "5%" }}>
              <span>Email</span>
              <input
                placeholder="Email"
                disabled={!isEdit}
                type="email"
                value={customer.email || ""}
              ></input>
            </div>

            <div className="form-group flex-1" style={{ marginLeft: "5%" }}>
              <span>Loại khách hàng</span>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={customer.typeCustomer}
                  onChange={handleChangeSelect}
                  disabled={!isEdit}
                >
                  <MenuItem value={"personally"} className="">
                    Cá Nhân
                  </MenuItem>
                  <MenuItem value={"enterprise"}>Doanh Nghiệp</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="wrap-form" style={{ marginTop: "15px" }}>
            <div className="form-group flex-8" style={{ marginLeft: "0px" }}>
              <span>Địa chỉ giao hàng</span>
              <input value={customer.address || ""} disabled={!isEdit}
                     onChange={(e) =>
                         setCustomer({ ...customer, address: e.target.value })
                     }
              ></input>
            </div>
          </div>
        </div>

        <div className="mt-20 div-main">
          <h3>Lịch sử thanh toán</h3>
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
              <div className="d-flex justify-space-arround">
                {/* <div style={{ width: "150px" }}>
                  <button
                    className="btn btn-primary btn-add-pay "
                    onClick={handleOpen}
                  >
                    Thêm
                  </button>
                </div> */}

                <div style={{ position: "relative" }}>
                  <select className="filter-select btn btn-primary pd-r-40">
                    <option value="all">Tất cả</option>
                    <option value="newest">Tiền mặt</option>
                    <option value="confirmed"> Chuyển khoản</option>
                  </select>
                  <i className="icon-filter">
                    <TuneIcon></TuneIcon>
                  </i>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div style={{ padding: "10px" }}>
              <div className="table-more">
                <table
                  className="mb-50-px"
                  style={{
                    width: "100%",
                    height: "50px",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr className="color-blue header-table text-left border-header-table">
                      <th className="pb-7 font-w-500" style={{ width: "7%" }}>
                        ID
                      </th>
                      <th
                        className="pb-7 font-w-500"
                        style={{ width: "25%", paddingRight: "10px" }}
                      >
                        Ngày
                      </th>

                      <th className="pb-7 font-w-500" style={{ width: "15%" }}>
                        Số tiền thanh toán
                      </th>
                      <th className="pb-7 font-w-500" style={{ width: "12%" }}>
                        Hình thức
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-header-table">
                    {/*{products.map((product) => (*/}
                    {/*  <tr key={product.id} className="border-header-table">*/}
                    {/*    <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">*/}
                    {/*      {product.id}*/}
                    {/*    </td>*/}
                    {/*    <td className="pb-7 pt-7 font-size-small td-table font-w-500">*/}
                    {/*      {product.name || "-"}*/}
                    {/*    </td>*/}
                    {/*    <td className="pb-7 pt-7 font-size-small td-table font-w-500">*/}
                    {/*      {product.totalPrice || "-"}*/}
                    {/*    </td>*/}
                    {/*    <td className="pb-7 pt-7 font-size-small td-table font-w-500">*/}
                    {/*      {product.type || "-"}*/}
                    {/*    </td>*/}
                    {/*  </tr>*/}
                    {/*))}*/}
                  </tbody>
                </table>
              </div>
              <div className="pagination" style={{ right: "4%" }}>
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

      <NotifyDeleteModal
        message="Bạn có chắc chắn muốn xóa khách hàng này?"
        open={openDelte}
        handleClose={() => setOpenDelete(false)}
        handleDelete={() => {}}
      ></NotifyDeleteModal>
    </div>
  );
};

export default OrderPage;
