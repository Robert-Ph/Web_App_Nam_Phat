import { useState, useEffect, useRef } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ProductModal from "../ProductModal/ProductModal";
import { useNavigate } from "react-router-dom";
import "../OrderPage/order.css";
import Order from "../../../model/order.model";
import { useParams } from "react-router-dom";
import OrderService from "../../../service/OrderService";
import { toast } from "react-toastify";
import Spiner from "../../../component/Spiner/Spiner";
import { formatDateTime } from "../../../utils/Utils";
import Customer from "../../../model/customer.model";
import { formatCurrency } from "../../../utils/Utils";
import OrderItem from "../../../model/orderItem.model";

const DetailOrderPage = () => {
  const [order, setOrder] = useState<Order | null>();
  const [customer, setCustomer] = useState<Customer>();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const addressRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<string>("");
  const [vat, setVat] = useState<number>(8);
  const [reduce, setReduce] = useState<number>(0);
  const [invoice, setInvoice] = useState<string>("INDIVIDUAL");

  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);


  const [selectItem, setSelectItem] = useState<OrderItem | null>(null);

  const param = useParams();
  const currentOrder = useRef<Order | null>(null);

  const navigate = useNavigate();


  // const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   console.log("Selected status:", e.target.value);  // Log giá trị khi người dùng chọn
  //   if (order) {
  //     setOrder({ ...order, status: e.target.value });
  //     setQuery(order.phone);
  //   }
  //
  // };

  //   Sự kiện mở đóng modal chỉnh sửa sản phẩm
  const handleOnclose = () => {
    setOpen(false);
  };

  const handleOpen = (item: OrderItem) => {
    setSelectItem(item);
    setOpen(true);
  };

  // const addProduct = (product: product) => {
  //   setOpen(false);
  // };

  const goBack = () => {
    navigate(-1);
  };

  const addProduct = (orderItem: OrderItem) => {
    setOpen(false);
    setOrderItems([...orderItems, orderItem]);
  };

  //Bắt sự kiện thay đổi select trong option của hóa đơn
  const handleChange = (event: SelectChangeEvent) => {
    setInvoice(event.target.value);
  };

  const handleUpdate = (id: number | null) => {
        const orders = {
          id: id,
          vat: vat,
          reduce: reduce,
          typeOrder: invoice,
          phone: query,
          address: addressRef.current?.value,
          orderItems: [...orderItems],
        } as Order;

        try {
          OrderService.update(orders.id ?? 0, orders)
              .then((response) => {
                console.log(response.data);
                if (response.data.code == 201) {
                  toast.success("Tạo đơn hàng thành công!", {
                    autoClose: 2000,
                  });
                  navigate("/order/list");
                }
              })
              .catch((e) => {
                const error = e.response.data;

                if (error.code == 802) {
                  toast.error("Không tìm thấy khách hàng trong hệ thống!", {
                    autoClose: 1000,
                  });
                } else {
                  toast.error("Lỗi không xác định!", {
                    autoClose: 1000,
                  });
                }
              });
          // ✅ Reload trang sau 0s để toast hiển thị
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } catch (error) {
          console.log(error);
        } finally {
          console.log('');
        }

  };


  // bat su kien huy don hang(cancel order)
  const handleCancelOrder = () =>{
    OrderService.updateStatusCan(order?.id ?? null);
    // ✅ Reload trang sau 1.5s để toast hiển thị
    setTimeout(() => {
      window.location.reload();
    }, 0);
    toast.success("Đã hủy đơn hàng thành công!", {
      autoClose: 1000,
    });
  }


  useEffect(() => {
    const id = param?.id;

    if (id) {
      setLoading(true);
      OrderService.getById(id)
        .then((response) => {
          setLoading(false);
          console.log(response);
          const data = response.data.data;
          setOrder(data);
          currentOrder.current = data;
          setCustomer(data.customer);
        })
        .catch((error) => {
          const errorReponse = error.response;
          console.log(errorReponse);
          toast.error("Lỗi không xác định. Vui lòng thử lại!", {
            autoClose: 1000,
          });
        });
    }
  }, [param]);

  console.log(customer);
  console.log(order);
  return (
    <div>
      {loading && <Spiner></Spiner>}

      {!loading && (
        <div className="container">
          <div className="d-flex justify-space-bettwen" style={{color:"#92400E"}}>
            <div className="d-flex" style={{ alignItems: "center", gap: "20px" }}>
              <div>
                <strong>Mã đơn hàng:</strong>
                <span> #DH{order?.id}</span>
              </div>

              <div>
                <strong>Ngày:</strong>
                <span>{order?.dateCreate ? " " + formatDateTime(order?.dateCreate) : ""}</span>
              </div>

              <p style={{
                fontWeight: "bold",
                color: order?.status !== "CANCELLED" ? "green" : "red",
                margin: 0
              }}>
                {order?.status !== "CANCELLED" ? "" : "Đã bị hủy"}
              </p>
            </div>

            <div>
              {isEdit ? (
                <button
                  className="btn btn-danger"
                  style={{background:"#EF4444"}}
                  onClick={() => setIsEdit(false)}
                >
                  Hủy
                </button>
              ) : (
                <button className="btn btn-black" style={{background:"#10B981"}} onClick={goBack}>
                  Reset
                </button>
              )}
              {!isEdit && order?.status !=="CANCELLED"  ? (
                  <button
                      className="btn btn-primary"
                      style={{ marginRight: "10px", background: "orange" }}
                      onClick={handleCancelOrder}
                  >
                    Hủy đơn hàng
                  </button>
              ):(null)}
              {order?.status !=="CANCELLED" && (
                  isEdit ? (
                      <button
                          className="btn btn-warning"
                          style={{ marginRight: "10px", background:"#16A34A" }}
                          onClick={() => handleUpdate(order?.id ?? 0)}
                      >
                        Cập nhật
                      </button>
                  ) : (
                      <button
                          className="btn btn-primary"
                          // disabled={true}
                          style={{ marginRight: "0px" }}
                          onClick={() => setIsEdit(true)}
                      >
                        Chỉnh sửa
                      </button>
                  )
              )}

              {isEdit && (
                <button className="btn btn-primary">Thêm sản phẩm</button>
              )}
            </div>
          </div>

          <div className="mt-15 custommer">
            <h3 style={{color:"#0000FF", fontSize: "1rem"}}>Thông tin khách hàng </h3>
            <div className="wrap-form">
              <div className="form-group flex-8">
                <span>Tên khách hàng</span>
                <input
                  placeholder="Tên khách hàng"
                  disabled={true}
                  value={customer?.fullName}
                ></input>
              </div>

              <div className="form-group flex-2" style={{ margin: "0px 10px" }}>
                <span>Số điện thoại</span>
                <input
                  placeholder="Số điện thoại"
                  disabled={!isEdit}
                  value={order?.phone || query}
                  onChange={(e)=> setQuery(e.target.value)}
                ></input>
              </div>

              <div className="form-group flex-2">
                <span>Hóa đơn</span>
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={order?.typeOrder}
                    onChange={handleChange}
                    disabled={!isEdit}
                  >
                    <MenuItem value={"INDIVIDUAL"} className="">
                      Cá Nhân
                    </MenuItem>
                    <MenuItem value={"BUSINESS"}>Doanh Nghiệp</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="wrap-form" style={{ marginTop: "10px" }}>
              <div className="form-group flex-2">
                <span>Email</span>
                <input
                  placeholder="Tên khách hàng"
                  disabled={true}
                  type="email"
                  value={customer?.email ? customer.email : ""}
                ></input>
              </div>

              <div className="form-group flex-8" style={{ marginLeft: "10px" }}>
                <span>Địa chỉ giao hàng</span>
                <input
                  placeholder="Địa chỉ giao hàng"
                  disabled={!isEdit}
                  value={order?.address}
                ></input>
              </div>

            </div>
            <div className="wrap-form" style={{ marginTop: "10px" }}>
              <div className="form-group flex-8">
                <span>Ghi chú</span>
                <input placeholder="Ghi chú" ref={addressRef}></input>
              </div>
            </div>
          </div>

          <div className="mt-20 order" style={{float: "left", width: "75%", borderRadius:"5px", marginRight: "2%"}}>
            <h3>Danh sách sản phẩm</h3>
            <div style={{ padding: "20px" }}>
              <div className="table-container">
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr className="color-blue header-table text-left border-header-table">
                      <th className="pb-7 font-w-500">STT</th>
                      <th className="pb-7 font-w-500">Tên sản phẩm</th>
                      <th className="pb-7 font-w-500">Số lượng</th>
                      <th className="pb-7 font-w-500">Số lượng giấy in</th>
                      <th className="pb-7 font-w-500">Giá (vnd)</th>
                      <th className="pb-7 font-w-500">Tổng giá</th>
                      <th className="pb-7 font-w-500"></th>
                    </tr>
                  </thead>
                  <tbody className="border-header-table">
                    {order?.orderItems.map((item) => (
                      <tr key={item.id} className="border-header-table">
                        <td className="pb-7 pt-7">{item.id}</td>
                        <td className="pb-7 pt-7">{item.nameProduct || "-"}</td>
                        <td className="pb-7 pt-7">
                          {item.quanlityProduct || "-"}
                        </td>
                        <td className="pb-7 pt-7">
                          {item.qualityPaper || "-"}
                        </td>
                        <td className="pb-7 pt-7">{item.pricePerOne || "-"}</td>
                        <td className="pb-7 pt-7">
                          {item.pricePerOne * item.quanlityProduct || "-"}
                        </td>
                        <td className="pb-7 pt-7">
                          {" "}
                          <button
                            className="btn-more"
                            onClick={() => {
                              handleOpen(item);
                            }}
                            disabled={!isEdit}
                          >
                            <MoreHorizIcon></MoreHorizIcon>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="wrap-vat d-flex order" style={{flexDirection: 'column', width: "23%"}}>
            <div
                className="form-group"
                style={{ flex: "5", marginRight: "10px" }}
            >
              <span>Giảm</span>
              <input
                  placeholder="Giảm"
                  style={{ width: "85%" }}
                  disabled={!isEdit}
                  value={order?.reduce ? order.reduce : 0}
                  onChange={(e)=> setReduce(Number(e.target.value))}
              ></input>
            </div>
            <div
                className="form-group"
                style={{ flex: "5", marginRight: "10px" }}
            >
              <span>Thuế Giá Trị Gia Tăng - VAT (%)</span>
              <input
                  placeholder="Thuế giá trị gia tăng"
                  style={{ width: "85%" }}
                  disabled={!isEdit}
                  value={order?.vat}
                  onChange={(e)=> setVat(Number(e.target.value))}
              ></input>
            </div>
            <div style={{ flex: "5" }}>
              <p>
                <span style={{fontWeight:"bold"}}>Tổng: </span>
                {formatCurrency(order?.totalPrice ? order.totalPrice : 0)}{" "}
                VNĐ
              </p>
              <p><span style={{fontWeight:"bold"}}>Giảm: </span>
                {formatCurrency(order?.reduce ? order.reduce : 0)}{" "}
                VNĐ
              </p>
              <p>
                <span style={{fontWeight:"bold"}}>Thuế GTGT(VAT): </span>
                {formatCurrency(
                    order?.totalPrice
                        ? (order.totalPrice * order.vat) / 100
                        : 0
                )}{" "}
                VNĐ
              </p>
              <p>
                <span style={{fontWeight:"bold"}}>Thành tiền: </span>
                {formatCurrency(
                    order?.totalPrice
                        ? (order.totalPrice - (order.reduce ?? 0) +
                            ((order.totalPrice * order.vat) / 100) )
                        : 0
                )}{" "}
                VNĐ
              </p>
            </div>
          </div>
        </div>
      )}

      <ProductModal
        open={open}
        onClose={handleOnclose}
        orderItem={selectItem}
        handleAdd={(orderItem: OrderItem) => {addProduct(orderItem)}}
      ></ProductModal>
    </div>
  );
};

export default DetailOrderPage;
