import React, { useEffect, useState, useMemo } from "react";

import "./analyse.css";
import PieChartCustom from "../../UtilsPage/PieChart/PieChartCustom";
import DateRangePicker from "../../UtilsPage/DateRangePicker/DateRangePicker";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import { MakeOptional } from "@mui/x-charts/internals";
import { PieValueType } from "@mui/x-charts";
import { Colors } from "../../../model/utils/color.utils";
import { DefaultizedPieValueType } from "@mui/x-charts/models";

const Analyse = () => {
  const [data, setData] = useState<MakeOptional<PieValueType, "id">[] | []>([]);

  useEffect(() => {
    setData([
      { id: 1, label: "Khách hàng cũ", value: 400, color: Colors.Old },
      { id: 2, label: "Khách hàng mới", value: 300, color: Colors.New },
      { id: 3, label: "Khách hàng lẻ", value: 0, color: Colors.Standard },
    ]);
  }, []);

  const TOTAL = useMemo(() => {
    const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
    return TOTAL;
  }, [data]);
  const getArcLabel = (value: number) => {
    const percent = value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  console.log(TOTAL);

  return (
    <div>
      <div className="mt-10 ">
        <div className="d-flex justify-end" style={{ marginRight: "5%" }}>
          <DateRangePicker></DateRangePicker>
        </div>
        <h3 style={{ marginLeft: "1%" }}>Phân tích khách hàng</h3>
        {/* Phân tích khách hàng */}
        <div className="d-flex mt-10">
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
                        ({getArcLabel(item.value)})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </PieChartCustom>
          <PieChartCustom data={data}>
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
                        ({getArcLabel(item.value)})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </PieChartCustom>
        </div>
      </div>

      <div className="mt-20 " style={{ marginBottom: "20px" }}>
        <div className="d-flex mt-10">
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
                        ({getArcLabel(item.value)})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </PieChartCustom>

          <PieChartCustom data={data}>
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
                        ({getArcLabel(item.value)})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </PieChartCustom>
        </div>
      </div>
    </div>
  );
};
export default Analyse;
