import { PieChart } from "@mui/x-charts/PieChart";
import Image from "next/image";
import React from "react";

type Props = {
  data: {
    value: number;
    color: string;
    label: string;
  }[];
};
const KarmaPieChart = (props: Props) => {
  return (
    <>
      <div className="p-0">
        <h2>Karma Distribution</h2>
      </div>
      {props.data.length === 0 ? (
        <div className="flex flex-col m-auto justify-center items-center">
          <Image
            alt="nodata"
            src="/assets/images/nodata.jpg"
            height={200}
            width={200}
            className=" m-auto"
          />
          <p className="text-slate-500">No data to show</p>
        </div>
      ) : (
        <div className="flex gap-4 mt-4 h-80">
          <PieChart
            series={[
              {
                data: props.data,
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
      )}
    </>
  );
};

export default KarmaPieChart;
