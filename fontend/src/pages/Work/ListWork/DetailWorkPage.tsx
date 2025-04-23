import { useState, useEffect, useRef } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./work.css";
import Order from "../../../model/order.model";
import { useParams } from "react-router-dom";
import OrderService from "../../../service/OrderService";
import { toast } from "react-toastify";
import Spiner from "../../../component/Spiner/Spiner";
import { formatDateTime } from "../../../utils/Utils";
import Customer from "../../../model/customer.model";
import OrderItem from "../../../model/orderItem.model";
import ProductModal from "../ProductModal/ProductModal.tsx";


const DetailOrderPage = () => {
  const [order, setOrder] = useState<Order| null>(null);
  const [customer, setCustomer] = useState<Customer>();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);


  const [selectItem, setSelectItem] = useState<OrderItem | null>(null);

  const param = useParams();
  const currentOrder = useRef<Order | null>(null);


  //   Sự kiện mở đóng modal chỉnh sửa sản phẩm
  const handleOnclose = () => {
    setOpen(false);
  };

  const handleOpen = (item: OrderItem) => {
    setSelectItem(item);
    setOpen(true);
  };

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
          <div className="d-flex justify-space-bettwen">
            <div className="d-flex dicrect-col">
              <div>
                <strong>Mã đơn hàng:</strong>
                <span> #{order?.id}</span>
              </div>
              <div>
                <strong>Ngày:</strong>
                <span>
                  {" "}
                  {order?.dateCreate ? formatDateTime(order?.dateCreate) : ""}
                </span>
              </div>
            </div>
          </div>

          {/*<div className="mt-15">*/}
          {/*  <h3>Thông tin khách hàng </h3>*/}
          {/*  <div className="wrap-form">*/}
          {/*    <div className="form-group flex-8">*/}
          {/*      <span>Tên khách hàng</span>*/}
          {/*      <input*/}
          {/*        placeholder="Tên khách hàng"*/}
          {/*        disabled={true}*/}
          {/*        value={customer?.fullName}*/}
          {/*      ></input>*/}
          {/*    </div>*/}

          {/*    <div className="form-group flex-2" style={{ margin: "0px 20px" }}>*/}
          {/*      <span>Số điện thoại</span>*/}
          {/*      <input*/}
          {/*        placeholder="Số điện thoại"*/}
          {/*        disabled={!isEdit}*/}
          {/*        value={order?.phone}*/}
          {/*      ></input>*/}
          {/*    </div>*/}

          {/*    <div className="form-group flex-2">*/}
          {/*      <span>Hóa đơn</span>*/}
          {/*      <FormControl sx={{ minWidth: 120 }} size="small">*/}
          {/*        <Select*/}
          {/*          labelId="demo-select-small-label"*/}
          {/*          id="demo-select-small"*/}
          {/*          value={order?.typeOrder}*/}
          {/*          onChange={handleChange}*/}
          {/*          disabled={!isEdit}*/}
          {/*        >*/}
          {/*          <MenuItem value={"INDIVIDUAL"} className="">*/}
          {/*            Cá Nhân*/}
          {/*          </MenuItem>*/}
          {/*          <MenuItem value={"BUSINESS"}>Doanh Nghiệp</MenuItem>*/}
          {/*        </Select>*/}
          {/*      </FormControl>*/}
          {/*    </div>*/}
          {/*  </div>*/}

          {/*  <div className="wrap-form" style={{ marginTop: "10px" }}>*/}
          {/*    <div className="form-group flex-2">*/}
          {/*      <span>Email</span>*/}
          {/*      <input*/}
          {/*        placeholder="Tên khách hàng"*/}
          {/*        disabled={true}*/}
          {/*        type="email"*/}
          {/*        value={customer?.email ? customer.email : ""}*/}
          {/*      ></input>*/}
          {/*    </div>*/}

          {/*    <div className="form-group flex-8" style={{ marginLeft: "20px" }}>*/}
          {/*      <span>Địa chỉ giao hàng</span>*/}
          {/*      <input*/}
          {/*        placeholder="Số điện thoại"*/}
          {/*        disabled={!isEdit}*/}
          {/*        value={order?.address}*/}
          {/*      ></input>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}

          <div className="mt-20">
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
                        <td className="pb-7 pt-7">
                          {" "}
                          <button
                            className="btn-more"
                            onClick={() => {
                              handleOpen(item);
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
            </div>
          </div>
        </div>
      )}

      <ProductModal
        open={open}
        onClose={handleOnclose}
        orderItem={selectItem}
        handleAdd={(_orderItem: OrderItem) => {}}
      ></ProductModal>
    </div>
  );
};

export default DetailOrderPage;
