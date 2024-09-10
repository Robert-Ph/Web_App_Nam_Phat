import React, { useEffect, useState, useMemo } from "react";

import "./analyse.css";
import PieChartCustom from "../../UtilsPage/PieChart/PieChartCustom";
import DateRangePicker from "../../UtilsPage/DateRangePicker/DateRangePicker";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PaymentIcon from "@mui/icons-material/Payment";

import { MakeOptional } from "@mui/x-charts/internals";
import { PieValueType } from "@mui/x-charts";
import { Colors } from "../../../model/utils/color.utils";

import BarChartCustom from "../../UtilsPage/BarChartCustom/BarChartCustom";
import AreaChartCustom from "../../UtilsPage/AreaChartCustom/AreaChartCustom";
import LineChartCustom from "../../UtilsPage/LineChartCustom/LineChartCustom";
import BarChart3DCustom from "../../UtilsPage/BarChart3DCustom/BarChart3DCustom";
import ScrollButton from "../../UtilsPage/RollPage/ScrollButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const Analyse = () => {
  const [data, setData] = useState<MakeOptional<PieValueType, "id">[] | []>([]);

  const [orders, setOrders] = useState<MakeOptional<PieValueType, "id">[] | []>(
    []
  );

  const [employees, setEmployees] = useState<
    MakeOptional<PieValueType, "id">[] | []
  >([]);

  const [oldEmployee, setOldEmployee] = useState<
    MakeOptional<PieValueType, "id">[] | []
  >([]);

  //data doanh số theo hàng hóa
  const [saleProduct, setSaleProduct] = useState<(string | number)[][]>([
    ["Category", "Percent"],
  ]);

  //Cơ cấu đơn hàng
  const [saleOrder, setSaleOrder] = useState<(string | number)[][]>([
    ["Type", "Percent"],
  ]);

  const [detailEmployee, setDetailEmployee] = useState<(string | number)[][]>([
    ["Type", "Percent"],
    ["Chính thức", 8],
    ["Thử việc", 2],
    ["Thực tập", 1],
  ]);

  useEffect(() => {
    setData([
      { id: 1, label: "Khách hàng cũ", value: 400, color: Colors.Old },
      { id: 2, label: "Khách hàng mới", value: 300, color: Colors.New },
      { id: 3, label: "Khách hàng lẻ", value: 0, color: Colors.Standard },
    ]);

    setOrders([
      { id: 1, label: "Đơn hàng đã thanh toán", value: 85, color: Colors.Old },
      {
        id: 2,
        label: "Đơn hàng chưa thanh toán",
        value: 25,
        color: Colors.Standard, //Standard là màu cam cam
      },
    ]);

    setEmployees([
      { id: 1, label: "Nhân sự cũ", value: 85, color: Colors.Old },
      {
        id: 2,
        label: "Nhân sự mới",
        value: 25,
        color: Colors.New, //Standard là màu cam cam
      },
    ]);

    setOldEmployee([
      { id: 1, label: "Dưới 30 tuổi", value: 30, color: Colors.Old },
      {
        id: 2,
        label: "Trên 30 tuổi",
        value: 5,
        color: Colors.New, //Standard là màu cam cam
      },
    ]);
    setSaleProduct([
      ...saleProduct,
      ["Temp", 2],
      ["Danh thiếp", 3],
      ["Tem bảo hành", 12],
      ["Catalog", 5],
      ["Khác", 6],
    ]);

    setSaleOrder([
      ...saleOrder,
      [">10.000.000", 2],
      ["<10.000.000", 3],
      ["<5.000.000", 12],
      ["<3.000.000", 5],
      ["<1.000.000", 6],
    ]);
  }, []);

  const TOTAL = useMemo(() => {
    const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
    return TOTAL;
  }, [data]);

  const TOTAL_ORDER = useMemo(() => {
    const TOTAL = orders.map((item) => item.value).reduce((a, b) => a + b, 0);
    return TOTAL;
  }, [data]);

  const TOTAL_EMPLOYEE = useMemo(() => {
    const TOTAL = employees
      .map((item) => item.value)
      .reduce((a, b) => a + b, 0);
    return TOTAL;
  }, [data]);

  //Function tính phần trăm
  const getArcLabel = (value: number, total: number) => {
    const percent = value / total;
    return `${(percent * 100).toFixed(0)}%`;
  };

  console.log(TOTAL);

  return (
    <div>
      <div className="mt-10 ">
        <div className="d-flex justify-end" style={{ marginRight: "5%" }}>
          <DateRangePicker></DateRangePicker>
        </div>
      </div>

      <div className="wrap-customer">
        <h3 style={{ marginLeft: "1%" }}>Phân tích khách hàng</h3>
        {/* Phân tích khách hàng */}
        <div className="d-flex mt-10 ">
          <PieChartCustom heigth={300} data={data}>
            <div className="wrap-content-pie ">
              <p className="title-pie">Tổng khách hàng</p>
              <p className="text-bold">100</p>
              {data.map((item) => {
                return (
                  <div className="group-analyse mt-10">
                    <div>
                      {" "}
                      <PersonOutlineOutlinedIcon
                        className="icon"
                        style={{ color: `${item.color}` }}
                      ></PersonOutlineOutlinedIcon>
                    </div>
                    <div className="d-flex dicrect-col wrap-analyse_content">
                      <span>{item.label?.toString()}</span>
                      <span className="descreption">
                        <strong style={{ color: `${item.color}` }}>
                          {item.value}
                        </strong>{" "}
                        ({getArcLabel(item.value, TOTAL)})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </PieChartCustom>
          <PieChartCustom data={data} heigth={300}>
            <div className="wrap-content-pie ">
              <p className="title-pie">Tổng doanh thu</p>
              <p className="text-bold">100 Triệu</p>
              {data.map((item) => {
                return (
                  <div className="group-analyse mt-10">
                    <div>
                      {" "}
                      <PersonOutlineOutlinedIcon
                        className="icon"
                        style={{ color: `${item.color}` }}
                      ></PersonOutlineOutlinedIcon>
                    </div>
                    <div className="d-flex dicrect-col wrap-analyse_content">
                      <span>{item.label?.toString()}</span>
                      <span className="descreption">
                        <strong style={{ color: `${item.color}` }}>
                          {item.value}
                        </strong>{" "}
                        ({getArcLabel(item.value, TOTAL)})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </PieChartCustom>
        </div>

        <div className="mt-20 " style={{ marginBottom: "20px" }}>
          <div className="d-flex mt-10">
            <AreaChartCustom
              title="Chi tiết lưu lượng khách hàng"
              heigth={300}
            ></AreaChartCustom>

            <BarChartCustom
              title={"Chi tiết lưu lượng khách hàng"}
              heigth={300}
            ></BarChartCustom>
          </div>
        </div>
      </div>

      {/* Phân tích đơn hàng */}
      <div className="wrap-order">
        <h3 style={{ marginLeft: "1%" }}>Phân tích đơn hàng</h3>

        <div className="d-flex mt-10">
          <PieChartCustom heigth={300} data={data}>
            <div className="wrap-content-pie ">
              <p className="title-pie">Tổng đơn hàng</p>
              <p className="text-bold">1000</p>
              {data.map((item) => {
                return (
                  <div className="group-analyse mt-10">
                    <div>
                      {" "}
                      <PaymentIcon
                        className="icon"
                        style={{ color: `${item.color}` }}
                      ></PaymentIcon>
                    </div>
                    <div className="d-flex dicrect-col wrap-analyse_content">
                      <span>{item.label?.toString()}</span>
                      <span className="descreption">
                        <strong style={{ color: `${item.color}` }}>
                          {item.value}
                        </strong>{" "}
                        ({getArcLabel(item.value, TOTAL)})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </PieChartCustom>
          <PieChartCustom data={data} heigth={300}>
            <div className="wrap-content-pie ">
              <p className="title-pie">Tổng doanh đơn hàng</p>
              <p className="text-bold">1000</p>
              {data.map((item) => {
                return (
                  <div className="group-analyse mt-10">
                    <div>
                      {" "}
                      <PaymentIcon
                        className="icon"
                        style={{ color: `${item.color}` }}
                      ></PaymentIcon>
                    </div>
                    <div className="d-flex dicrect-col wrap-analyse_content">
                      <span>{item.label?.toString()}</span>
                      <span className="descreption">
                        <strong style={{ color: `${item.color}` }}>
                          {item.value}
                        </strong>{" "}
                        ({getArcLabel(item.value, TOTAL)})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </PieChartCustom>
        </div>

        <div className="mt-20 " style={{ marginBottom: "20px" }}>
          <div className="d-flex mt-10">
            <LineChartCustom
              title="Chi tiết đơn hàng"
              labelY="Số lượng đơn hàng"
              heigth={300}
            ></LineChartCustom>

            <BarChart3DCustom
              title="Doanh số theo hàng hóa"
              heigth={300}
              data={saleProduct}
            ></BarChart3DCustom>
          </div>
        </div>

        <div className="mt-20 " style={{ marginBottom: "20px" }}>
          <div className="d-flex mt-10">
            {/* Cơ cấu giá trị đơn hàng */}
            <BarChart3DCustom
              title="Cơ cấu giá trị đơn hàng"
              heigth={300}
              data={saleOrder}
            >
              <h3 className="">Giá trị trung bình: 840.000 VNĐ</h3>
            </BarChart3DCustom>

            {/* Chi tiết thanh toán chart */}
            <PieChartCustom heigth={300} data={orders}>
              <div className="wrap-content-pie ">
                <p className="title-pie" style={{ marginBottom: "10%" }}>
                  Chi tiết thanh toán
                </p>
                {orders.map((item) => {
                  return (
                    <div className="group-analyse mt-10">
                      <div>
                        {" "}
                        <PaymentIcon
                          className="icon"
                          style={{ color: `${item.color}` }}
                        ></PaymentIcon>
                      </div>
                      <div className="d-flex dicrect-col wrap-analyse_content">
                        <span>{item.label?.toString()}</span>
                        <span className="descreption">
                          <strong style={{ color: `${item.color}` }}>
                            {item.value}
                          </strong>{" "}
                          ({getArcLabel(item.value, TOTAL_ORDER)})
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </PieChartCustom>
          </div>
        </div>

        <div className="mt-20 " style={{ marginBottom: "20px" }}></div>
      </div>

      {/* Phân tích nhân sự */}
      <div className="wrap-employee">
        <h3 style={{ marginLeft: "1%" }}>Phân tích nhân sự</h3>

        <div className="d-flex mt-10 ">
          <PieChartCustom heigth={300} data={employees}>
            <div className="wrap-content-pie ">
              <p className="title-pie">Tổng nhân sự</p>
              <p className="text-bold">100</p>
              {employees.map((item) => {
                return (
                  <div className="group-analyse mt-10">
                    <div>
                      {" "}
                      <PersonOutlineOutlinedIcon
                        className="icon"
                        style={{ color: `${item.color}` }}
                      ></PersonOutlineOutlinedIcon>
                    </div>
                    <div className="d-flex dicrect-col wrap-analyse_content">
                      <span>{item.label?.toString()}</span>
                      <span className="descreption">
                        <strong style={{ color: `${item.color}` }}>
                          {item.value}
                        </strong>{" "}
                        ({getArcLabel(item.value, TOTAL_EMPLOYEE)})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </PieChartCustom>
          <PieChartCustom data={oldEmployee} heigth={300}>
            <div className="wrap-content-pie ">
              <p className="title-pie">Cơ cấu theo tuổi</p>
              <div className="mt-20">
                <h3>Độ tuổi trung bình</h3>
                <h2 style={{ marginLeft: "20%" }}>25</h2>
              </div>
            </div>
          </PieChartCustom>
        </div>

        <div className="mt-20 " style={{ marginBottom: "20px" }}>
          <div className="d-flex mt-10">
            <LineChartCustom
              title="Biến động nhân sự"
              heigth={300}
            ></LineChartCustom>

            <BarChart3DCustom
              title="Chi tiết nhân sự"
              heigth={300}
              data={detailEmployee}
              postionNote="bottom"
              children={
                <div className="mt-20">
                  {detailEmployee.map((item) => {
                    if (parseInt(item[1].toString()))
                      return (
                        <div className="group-analyse mt-10">
                          <div>
                            {" "}
                            <PersonOutlineOutlinedIcon className="icon"></PersonOutlineOutlinedIcon>
                          </div>
                          <div className="d-flex dicrect-col wrap-analyse_content">
                            <span>{item[0]}</span>
                            <span className="descreption">
                              <strong>{item[1]}</strong> (
                              {getArcLabel(parseInt(item[1].toString()), 11)})
                            </span>
                          </div>
                        </div>
                      );
                  })}
                </div>
              }
            ></BarChart3DCustom>
          </div>
        </div>
      </div>
      <ScrollButton
        title="Trở về đầu"
        chidren={
          <div style={{ height: "18px", marginBottom: "6%" }}>
            <ArrowUpwardIcon></ArrowUpwardIcon>
          </div>
        }
      ></ScrollButton>
    </div>
  );
};
export default Analyse;
