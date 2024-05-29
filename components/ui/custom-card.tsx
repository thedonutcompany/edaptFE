import React from "react";

interface CardProps {
  label: string;
  value: number | string;
  icon: string;
  iconBgColor: string;
  iconTextColor: string;
}

const CustomCard: React.FC<CardProps> = ({
  label,
  value,
  icon,
  iconBgColor,
  iconTextColor,
}) => {
  return (
    <div className="flex justify-between bg-white shadow-[6px_6px_54px_rgba(0,0,0,0.05)] rounded-2xl p-5">
      <div>
        <span className="text-[#202224]/70 text-sm sm:text-base font-medium">
          {label}
        </span>
        <h1>{value}</h1>
      </div>
      <div
        className={`p-3 h-12 w-12 rounded-xl  items-center justify-center hidden md:flex ${iconBgColor} ${iconTextColor}`}
      >
        <i className={icon}></i>
      </div>
    </div>
  );
};

export default CustomCard;
