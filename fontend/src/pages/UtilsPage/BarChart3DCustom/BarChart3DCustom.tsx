import  { ReactElement } from "react";
import { Chart } from "react-google-charts";
import "../BarChartCustom/bar.css";

type props = {
  title: string;
  heigth?: number;
  width?: number;
  children?: ReactElement;
  data?: (string | number)[][];
  postionNote?: "left" | "bottom" | "top" | "right" | "none";
  alignmentNote?: "start" | "center" | "end";
};
const BarChart3DCustom = ({
  title,
  heigth,
  width,
  children,
  data,
  postionNote = "right",
  alignmentNote = "center",
}: props) => {
  const options = {
    is3D: true,
    legend: {
      position: postionNote, // Vị trí chú thích: right, left, top, bottom, none
      alignment: alignmentNote, // Căn giữa chú thích theo chiều dọc
    },
  };
  //   const data = [
  //     ["Task", "Hours per Day"],
  //     ["Temp", 11],
  //     ["Danh thiếp", 2],
  //     ["Temp bảo hành", 2],
  //     ["Catalog", 2],
  //     ["Khác", 7],
  //   ];

  return (
    <div className="wrap-card">
      <span className="title-bar">{title}</span>
      <div>
        {children ? (
          <div className="d-flex">
            <div style={{ flex: 3 }}>{children}</div>
            <div style={{ flex: 8 }}>
              <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={width}
                height={heigth}
              />
            </div>
          </div>
        ) : (
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={width}
            height={heigth}
          /> // Hiển thị nếu không có children
        )}
      </div>
    </div>
  );
};

export default BarChart3DCustom;
{
  /* <Chart
  chartType="PieChart"
  data={data}
  options={options}
  width={width}
  height={heigth}
/>; */
}
