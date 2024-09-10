import * as React from "react";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import "../BarChartCustom/bar.css";
import { Colors } from "../../../model/utils/color.utils";

type props = {
  title: string;
  width?: number;
  heigth?: number;
};

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const amtData = [2400, 2210, 0, 2000, 2181, 2500, 2100];
const xLabels = [
  "20/11/2024",
  "21/11/2024",
  "22/11/2024",
  "23/11/2024",
  "24/11/2024",
  "25/11/2024",
  "26/11/2024",
];

const AreaChartCustom = ({ title, heigth, width }: props) => {
  return (
    <div className="wrap-card">
      <span className="title-bar">{title}</span>

      <LineChart
        width={width}
        height={heigth}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "bottom", horizontal: "middle" },
            itemMarkHeight: 10,
            itemMarkWidth: 10,
            itemGap: 10,
            labelStyle: {
              fontSize: 12,
              fill: "black",
            },
            padding: 0,
          },
        }}
        series={[
          {
            data: uData,
            label: "Khách hàng cũ",
            area: true,
            stack: "total",
            showMark: false,
            color: Colors.Old,
          },
          {
            data: pData,
            label: "Khách hàng mới",
            area: true,
            stack: "total",
            showMark: false,
            color: Colors.New,
          },
          {
            data: amtData,
            label: "Khách hàng lẻ",
            area: true,
            stack: "total",
            showMark: false,
            color: Colors.Standard,
          },
        ]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        // sx={{
        //   [`& .${lineElementClasses.root}`]: {
        //     display: "none",
        //   },
        // }}
      />
    </div>
  );
};

export default AreaChartCustom;
