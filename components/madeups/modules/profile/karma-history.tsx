import { PieChart } from "@mui/x-charts/PieChart";
import React from "react";

type Props = {};

const KarmaPieChart = (props: Props) => {
  return (
    <>
      <div className="p-0">
        <h2>Karma Distribution</h2>
      </div>
      <div className="flex gap-4 mt-4 h-80">
        <PieChart
          series={[
            {
              data: [
                { value: 50, color: "#8892E8", label: "Label 1" },
                { value: 20, color: "#81D4E6", label: "Label 2" },
                { value: 30, color: "#FF6D6D", label: "Label 3" },
              ],
              // arcLabel: "value",
              innerRadius: 30,
              outerRadius: "80%",
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: 0,
              endAngle: 360,
              // cx: 150,
              // cy: 150,
            },
          ]}
          slotProps={{
            legend: {
              itemMarkHeight: 10,
              itemMarkWidth: 10,
              labelStyle: {
                fontSize: "14px",
                borderRadius: "50%",
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default KarmaPieChart;
