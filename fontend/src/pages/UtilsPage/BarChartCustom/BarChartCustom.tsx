
import { BarChart } from "@mui/x-charts/BarChart";
import { Colors } from "../../../model/utils/color.utils";
import "./bar.css";

const uData = [40, 30, 20, 27, 18, 23, 34, 23, 34];
const pData = [24, 13, 98, 39, 48, 38, 43, 39, 48];

const cData = [24, 13, 98, 39, 48, 38, 43, 39, 48];

const xLabels = [
  "01/08/2024",
  "08/08/2024",
  "16/08/2024",
  "24/08/2024",
  "25/08/2024",
  "26/08/2024",
  "27/08/2024",
  "28/08/2024",
  "31/08/2024",
];

type props = {
  title: string;
  width?: number;
  heigth?: number;
};

const BarChartCustom = ({ title, heigth, width }: props) => {
  return (
    <div className="wrap-card">
      <span className="title-bar">{title}</span>
      <BarChart
        height={heigth}
        width={width}
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
            data: pData,
            label: "Khách hàng mới",
            id: "pvId",
            stack: "total",
            color: Colors.New,
          },
          {
            data: uData,
            label: "Khách hàng cũ",
            id: "uvId",
            stack: "total",
            color: Colors.Old,
          },
          {
            data: cData,
            label: "Khách hàng lẻ",
            id: "cvId",
            stack: "total",
            color: Colors.Standard,
          },
        ]}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
      />
    </div>
  );
};

export default BarChartCustom;
