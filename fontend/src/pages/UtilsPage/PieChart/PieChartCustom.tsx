import { PieChart } from "@mui/x-charts/PieChart";
import { ReactElement } from "react";

import "./pie.css";

import { MakeOptional } from "@mui/x-charts/internals";
import { PieValueType } from "@mui/x-charts";

type props = {
  children: ReactElement;
  data: MakeOptional<PieValueType, "id">[];
  heigth?: number;
  width?: number;
};

const PieChartCustom = ({ children, heigth, width, data }: props) => {
  return (
    <div className="d-flex wrap-card">
      <div className="flex-1">{children}</div>
      <div className="flex-1">
        <PieChart
          margin={{ top: 10, bottom: 70, right: 10 }}
          series={[
            {
              data: data,
              highlightScope: { fade: "global", highlight: "item" },
            },
          ]}
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "bottom", horizontal: "middle" },
              itemMarkHeight: 10,
              itemMarkWidth: 10,
              itemGap: 8,

              labelStyle: {
                fontSize: 12,
                fill: "black",
              },
            },
          }}
          height={heigth}
          width={width}
        />
      </div>
    </div>
  );
};

export default PieChartCustom;
