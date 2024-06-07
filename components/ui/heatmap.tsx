import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import moment from "moment";

type Props = {
  data: { title: string; point: number; created_at: string }[];
  year: any;
};

const HeatmapComponent = (props: Props) => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const startDate = moment(`${year}-01-01`);
  const endDate = moment(`${year}-12-31`);
  const totalDays = endDate.diff(startDate, "days") + 1;
  const content: JSX.Element[] = [];

  const dataYearFiltered = props.data
    ? props.data.filter(
        (item) =>
          item.created_at && item.created_at.slice(0, 4) === year.toString()
      )
    : [];

  const dataDayFiltered: {
    date: string;
    totalKarma: number;
    taskCount: number;
  }[] = dataYearFiltered.reduce(
    (acc: { date: string; totalKarma: number; taskCount: number }[], item) => {
      const date = item.created_at.slice(0, 10);
      const existingItem = acc.find((el) => el.date === date);
      if (existingItem) {
        existingItem.totalKarma += parseInt(item.point.toString());
        existingItem.taskCount += 1;
      } else {
        acc.push({
          date,
          totalKarma: parseInt(item.point.toString()),
          taskCount: 1,
        });
      }
      return acc;
    },
    []
  );

  const renderSquares = () => {
    let currentDate = moment(startDate);
    let currentWeekday = currentDate.isoWeekday(); // Get the ISO weekday (1-7, Monday-Sunday) of the start date
    let emptySquaresCount = currentWeekday - 7;

    // Render empty squares for the first week
    for (let i = 0; i < emptySquaresCount; i++) {
      content.push(<p key={`empty_${i}`}></p>);
    }

    for (let i = 0; i < totalDays; i++) {
      const dateString = currentDate.format("YYYY-MM-DD");
      const existingItem = dataDayFiltered.find(
        (item) => item.date === dateString
      );
      const totalKarma = existingItem?.totalKarma ?? 0; // Use nullish coalescing operator to provide a default value
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
          : "";
      const tooltipContent = existingItem
        ? `Total Task: ${
            existingItem.taskCount
          }, Total Karma: ${totalKarma}, ${moment(existingItem.date).format(
            "ll"
          )}`
        : "";
      content.push(
        <TooltipProvider key={`tooltip_${i}`}>
          <Tooltip>
            <TooltipTrigger>
              <p
                className="h-3.5 aspect-square m-0.5 text-center text-[9px] rounded-[2px] bg-[#2dce891f] border border-solid"
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
    for (let y = props.year; y <= currentYear; y++) {
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
      <div className="flex flex-col justify-between h-[195px] pb-16 pt-11 absolute text-[11px] text-center bg-white ml-[-23px] w-8">
        <p>Mon</p>
        <p>Wed</p>
        <p>Fri</p>
      </div>
      <div className="flex gap-7 ml-5 justify-between w-[56rem]">
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

      <div className="flex flex-wrap h-[130px] w-[10px] content-between flex-col ml-4">
        {content}
      </div>
      <div className="flex justify-center gap-2.5 mt-2.5 absolute w-full left-0">
        {renderYearButtons()}
      </div>
    </div>
  );
};

export default HeatmapComponent;
