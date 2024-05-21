import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import moment from "moment";

type Props = {
  data: { task_name: string; karma: string; created_date: string }[];
  year: number;
};

const HeatmapComponent = ({ data, year: initialYear }: Props) => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(initialYear);
  const startDate = moment(`${year}-01-01`);
  const endDate = moment(`${year}-12-31`);
  const totalDays = endDate.diff(startDate, "days") + 1;
  const content: JSX.Element[] = [];

  const dataYearFiltered = ["2021", "2022"];

  const dataDayFiltered: {
    date: string;
    totalKarma: number;
    taskCount: number;
  }[] = dataYearFiltered.reduce(
    (acc: { date: string; totalKarma: number; taskCount: number }[], item) => {
      const date = "2021-01-01";
      const existingItem = acc.find((el) => el.date === date);
      if (existingItem) {
        existingItem.totalKarma += parseInt("200");
        existingItem.taskCount += 1;
      } else {
        acc.push({
          date,
          totalKarma: parseInt("1000"),
          taskCount: 1,
        });
      }
      return acc;
    },
    []
  );

  const renderSquares = () => {
    let currentDate = moment(startDate);
    let currentWeekday = currentDate.isoWeekday();
    let emptySquaresCount = currentWeekday - 7;

    for (let i = 0; i < emptySquaresCount; i++) {
      content.push(<p key={`empty_${i}`}></p>);
    }

    for (let i = 0; i < totalDays; i++) {
      const dateString = currentDate.format("YYYY-MM-DD");
      const existingItem = dataDayFiltered.find(
        (item) => item.date === dateString
      );
      const totalKarma = existingItem?.totalKarma ?? 0;
      const backgroundColor =
        totalKarma >= 500
          ? "#00814a"
          : totalKarma >= 100
          ? "#27b176"
          : totalKarma >= 50
          ? "#2dce89ba"
          : totalKarma >= 10
          ? "#2dce899e"
          : totalKarma > 0
          ? "#2dce897d"
          : "#EEEEEE";
      const tooltipContent = existingItem
        ? `Total Task: ${
            existingItem.taskCount
          }, Total Karma: ${totalKarma}, ${moment(existingItem.date).format(
            "ll"
          )}`
        : "";
      content.push(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p
                className="h-2.5 w-2.5 m-0.5 text-center text-[9px] rounded-[2px] bg-[#2dce891f] border border-solid"
                style={{ backgroundColor }}
              ></p>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipContent}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      currentWeekday++;
      if (currentWeekday > 7) {
        currentWeekday = 1;
        content.push(<div key={`week_${i}`} className="w-full h-0"></div>);
      }

      currentDate.add(1, "day");
    }
  };

  const renderYearButtons = () => {
    const years = [];
    for (let y = initialYear; y <= currentYear; y++) {
      years.push(
        <p
          key={y}
          className={`cursor-pointer px-3 py-1 rounded transition-all duration-300 ${
            year === y ? "bg-[#2DCE89] text-white" : "text-[#2DCE89]"
          }`}
          onClick={() => setYear(y)}
        >
          {y}
        </p>
      );
    }
    return years;
  };

  renderSquares();

  return (
    <div className="w-full max-w-[95%]">
      <div className="flex gap-8 ml-6 justify-between w-[92%]">
        <p>Jan</p>
        <p>Feb</p>
        <p>Mar</p>
        <p>Apr</p>
        <p>May</p>
        <p>Jun</p>
        <p>Jul</p>
        <p>Aug</p>
        <p>Sep</p>
        <p>Oct</p>
        <p>Nov</p>
        <p>Dec</p>
      </div>
      <div className="flex flex-col justify-between h-[101px] p-2  absolute text-[9.5px] bg-white ml-[-18px]">
        <p>Mon</p>
        <p>Wed</p>
        <p>Fri</p>
      </div>
      <div className="flex flex-wrap h-[110px] w-[10px] content-between flex-col ml-5">
        {content}
      </div>
      <div className="flex justify-center gap-2.5 mt-2.5">
        {renderYearButtons()}
      </div>
    </div>
  );
};

export default HeatmapComponent;