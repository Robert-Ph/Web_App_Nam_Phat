import "./order.css";
import React, { useState, useEffect, useRef, Suspense } from "react";

const ProductModal = React.lazy(() => import("../ProductModal/ProductModal"));
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TextFieldAuto from "../../../component/TextFieldAuto/TextFieldAuto";
import Customer from "../../../model/customer.model";
import useDebounce from "../../../hooks/useDebounce";
import CustomerService from "../../../service/CustomerService";
import OrderItem from "../../../model/orderItem.model";
import Spiner from "../../../component/Spiner/Spiner";
import Order from "../../../model/order.model";
import { toast } from "react-toastify";
import OrderService from "../../../service/OrderService";

import { formatCurrency } from "../../../utils/Utils";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const [invoice, setInvoice] = useState<string>("INDIVIDUAL");

  const [open, setOpen] = useState<boolean>(false);

  const [query, setQuery] = useState<string>("");
  const addressRef = useRef<HTMLInputElement>(null);

  const [_loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const [vat, setVat] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const navigate = useNavigate();

  // {
  //   id: null,
  //   fullName: "",
  //   phone: "",
  //   email: "",
  //   address: "",
  //   typeCustomer: "",
  // }

  const debouncedQuery = useDebounce(query, 200);

  const handleOnclose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setInvoice(event.target.value);
  };

  const addProduct = (orderItem: OrderItem) => {
    setOpen(false);
    setOrderItems([...orderItems, orderItem]);
  };

  const handleUserSelect = (customer: Customer | null) => {
    setSelectedCustomer(customer);
    if (addressRef.current) {
      addressRef.current.value = customer?.address || "";
    }
  };

  const handleChangeVate = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Chuyển đổi giá trị từ string sang number
    const newValue = parseFloat(e.target.value);
    setVat(newValue);
  };

  // const handleChangeVat = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setVat(Number(e.target.value)); // Cập nhật VAT trong state
  // };

  const handleReset = () => {
    console.log("Reset Run");
    setQuery("");
    setOrderItems([]);
    setSelectedCustomer(null);

    if (addressRef.current) {
      addressRef.current.value = "";
    }
    setVat(0);
    setInvoice("INDIVIDUAL");
  };

  const handleCreate = () => {
    setLoading(true);
    if (selectedCustomer == null) {
      toast.error("Thông tin khách hàng không hợp lệ hoặc trống", {
        autoClose: 1000,
      });
    } else if (orderItems.length == 0) {
      toast.error("Bạn chưa thêm sản phẩm vào đơn hàng", {
        autoClose: 1000,
      });
    } else {
      const order = {
        id: null,
        vat: vat,
        typeOrder: invoice,
        phone: query,
        address: addressRef.current?.value,
        totalPrice: null,
        status: null,
        dateCreate: null,
        dateShip: null,
        pay: null,
        orderItems: [...orderItems],
      } as Order;

      try {
        handleReset();
        console.log(query);
        OrderService.create(order)
          .then((response: any) => {
            console.log(response.data);
            if (response.data.code == 201) {
              toast.success("Tạo đơn hàng thành công!", {
                autoClose: 2000,
              });
              navigate("/order/list");
            }
          })
          .catch((e: any) => {
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
      } catch (error) {
        console.log(error);
      } finally {
        console.log('');
      }
    }
  };

  // const handleInputChange = (value: string) => {
  //   if (value != "") {
  //     setQuery(value);
  //   }
  // };
  console.log(selectedCustomer);
  useEffect(() => {
    const calculatedTotal = orderItems.reduce((sum, item) => {
      return sum + item.pricePerOne * item.quanlityProduct;
    }, 0);

    setTotal(calculatedTotal); // Cập nhật state cho tổng
  }, [orderItems]);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedQuery.length > 0) {
        try {
          console.log("Debounce:" + debouncedQuery);
          const customerList = await CustomerService.getCustomerByPhone(
            debouncedQuery
          ); // Fetch data from API
          setCustomers(customerList); // Set options state
        } catch (error) {
          console.error("Error fetching customers:", error);
        } finally {
          console.log('');
        }
      } else {
        setCustomers([]); // Clear options if input is empty
      }
    };

    fetchData();
  }, [debouncedQuery]);

  //Method format number to argent

  console.log("Query:" + query);

  return (
    <div>
      <div className="container">
        <div className="d-flex justify-end">
          <button className="btn btn-danger">Hủy</button>
          <button className="btn btn-warning" onClick={handleReset}>
            Reset
          </button>
          <button
            className="btn btn-primary"
            // style={{ marginRight: "0px" }}
            onClick={() => {
              console.log(addressRef.current?.value);
              handleCreate();
            }}
          >
            Tạo đơn hàng
          </button>
        </div>

        <div className="mt-20">
          <h3>Thông tin khách hàng </h3>
          <div className="wrap-form">
            <div className="form-group flex-8">
              <span>Tên khách hàng</span>
              <input
                placeholder="Tên khách hàng"
                disabled
                value={selectedCustomer?.fullName || ""}
              ></input>
            </div>

            {/* <div className="form-group flex-2" style={{ margin: "0px 20px" }}>
              <span>Số điện thoại</span>
              <input placeholder="Số điện thoại"></input>
            </div> */}

            <div className="flex-2 " style={{ margin: "0px 20px" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "5px",
                }}
              >
                Số điện thoại
              </span>
              <TextFieldAuto
                type="Number"
                options={customers.filter((customer) => customer.active)}
                getOptionLabel={(customer) => `${customer.phone}`}
                onSelect={handleUserSelect}
                onInputChange={setQuery}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.phone} ({option.fullName})
                  </li>
                )}
              ></TextFieldAuto>
            </div>

            <div className="form-group flex-2">
              <span>Hóa đơn</span>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={invoice}
                  onChange={handleChange}
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
                placeholder="Email khách hàng"
                value={selectedCustomer?.email || ""}
                disabled
                type="email"
              ></input>
            </div>

            <div className="form-group flex-8" style={{ marginLeft: "20px" }}>
              <span>Địa chỉ giao hàng</span>
              <input placeholder="Địa chỉ giao hàng" ref={addressRef}></input>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3>Danh sách sản phẩm</h3>
          <div style={{ padding: "20px", height:'80%' }}>
            <div className="table-container">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr className="color-blue header-table text-left border-header-table">
                    <th className="pb-7 pl-8  font-w-500">STT</th>
                    <th className="pb-7 pl-8  font-w-500">Tên sản phẩm</th>
                    <th className="pb-7 pl-8  font-w-500">Số lượng</th>
                    <th className="pb-7 pl-8  font-w-500">Số lượng giấy in</th>
                    <th className="pb-7 pl-8  font-w-500">Giá (vnd)</th>
                    <th className="pb-7 pl-8  font-w-500">Tổng giá</th>
                    <th className="pb-7 pl-8  font-w-500"></th>
                  </tr>
                </thead>
                <tbody className="border-header-table">
                  {orderItems.map((orderItem, index) => (
                    <tr key={index} className="border-header-table">
                      <td className="pb-7 pt-7">{index + 1}</td>
                      <td className="pb-7 pt-7">
                        {orderItem.nameProduct || "-"}
                      </td>
                      <td className="pb-7 pt-7">
                        {orderItem.quanlityProduct || "-"}
                      </td>
                      <td className="pb-7 pt-7">
                        {orderItem.qualityPaper || "-"}
                      </td>
                      <td className="pb-7 pt-7">
                        {formatCurrency(orderItem.pricePerOne) || "-"}
                      </td>
                      <td className="pb-7 pt-7">
                        {formatCurrency(
                          orderItem.pricePerOne * orderItem.quanlityProduct
                        ) + " VNĐ" || "-"}
                      </td>
                      <td className="pb-7 pt-7">
                        {" "}
                        <button className="btn-more">
                          <MoreHorizIcon></MoreHorizIcon>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-800 d-flex">
              <div
                style={{
                  flex: "3",
                  textAlign: "center",
                  alignContent: "center",
                }}
              >
                <button className="btn btn-primary mt-20" onClick={handleOpen}>
                  Thêm sản phẩm
                </button>
              </div>

              <div className="wrap-vat d-flex">
                <div
                  className="form-group"
                  style={{ flex: "5", marginRight: "10px" }}
                >
                  <span>Thuế Giá Trị Gia Tăng - VAT (%)</span>
                  <input
                    placeholder="Thuế giá trị gia tăng"
                    type="number"
                    style={{ width: "85%" }}
                    value={vat}
                    onChange={handleChangeVate}
                  ></input>
                </div>
                <div style={{ flex: "5" }}>
                  <p>Tổng: {formatCurrency(total)} VNĐ</p>
                  <p>
                    Thuế giá trị gia tăng(VAT):{" "}
                    {formatCurrency((total * vat) / 100)}
                  </p>
                  <p>
                    Thành tiền: {formatCurrency(total + total * (vat / 100))}{" "}
                    VNĐ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <Suspense fallback={<Spiner></Spiner>}>
          <ProductModal
            open={open}
            onClose={handleOnclose}
            handleAdd={(orderItem: OrderItem) => {
              addProduct(orderItem);
            }}
          ></ProductModal>
        </Suspense>
      )}
    </div>
  );
};

export default OrderPage;
