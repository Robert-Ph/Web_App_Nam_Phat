
import { LineChart } from "@mui/x-charts/LineChart";
import { Colors } from "../../../model/utils/color.utils";
// import { axisClasses } from "@mui/x-charts/ChartsAxis";
import {
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts/LineChart";
import "../BarChartCustom/bar.css";

type props = {
  title: string;
  labelY?: string;
  width?: number;
  heigth?: number;
};
const LineChartCustom = ({ title, width, heigth, labelY }: props) => {
  const data = [1, 2, 3, 5, 8, 10, 4];
  const xData = [
    "24/12/2024",
    "25/12/2024",
    "26/12/2024",
    "27/12/2024",
    "28/12/2024",
    "29/12/2024",
    "30/12/2024",
  ];

  const otherSetting = {
    yAxis: [{ label: labelY }],
    grid: { horizontal: true },
    // sx: {
    //   [`& .${axisClasses.left} .${axisClasses.label}`]: {
    //     transform: "translateX(-10px)",
    //   },
    // },
  };

  return (
    <div className="wrap-card" style={{ paddingBottom: "20px" }}>
      <span className="title-bar">{title}</span>
      <LineChart
        xAxis={[{ data: xData, scaleType: "point" }]}
        series={[{ data, connectNulls: true, color: Colors.Standard }]}
        {...otherSetting}
        height={heigth}
        margin={{ top: 20, bottom: 20 }}
        grid={{ vertical: true, horizontal: true }}
        sx={{
          [`& .${lineElementClasses.root}`]: {
            stroke: "#0000ff",
            strokeWidth: 2,
          },
          [`& .${markElementClasses.root}`]: {
            stroke: "#8884d8",
            scale: "0.8",
            fill: "#fb3737",
            strokeWidth: 2,
          },
        }}
      />
    </div>
  );
};

export default LineChartCustom;
