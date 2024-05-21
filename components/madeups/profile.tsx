"use client";
import Image from "next/image";
import React, { useState } from "react";
import CustomCard from "../ui/custom-card";
import { PieChart } from "@mui/x-charts/PieChart";
import KarmaRecent from "@/public/assets/svgs/karma-recent";
import HeatmapComponent from "../ui/heatmap";
import { ProfileData } from "@/lib/dasboard";

type Props = {};

const Profile = (props: Props) => {
  const [profileList, setProfileList] = useState("basic-details");
  const data = ProfileData();
  console.log(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* <!-- Left side (2 boxes) --> */}
      <div className="col-span-1 md:col-span-2">
        <div className="grid grid-cols-1 gap-4">
          <div className="p-0">
            <div className=" flex flex-col gap-5">
              <div className="bg-white rounded-2xl p-0">
                <div className="relative h-40 w-full rounded-t-2xl bg-cover bg-bottom bg-[url('/assets/images/profile_banner.png')]">
                  <div className="absolute right-0 bottom-2 mr-7 text-right">
                    <p className="text-white text-sm font-semibold">edapt</p>
                    <p className="text-white text-sm font-medium">
                      Member since 2021
                    </p>
                  </div>
                </div>
                <div className="relative h-52 flex justify-between items-center -mt-14">
                  <div className="flex items-center gap-4 mt-4">
                    <div className="relative flex justify-end items-end">
                      <Image
                        src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
                        alt="profile_pic"
                        width={150}
                        height={150}
                        className="aspect-square rounded-full border-4 border-white ml-8 mt-[-1.5rem] bg-light"
                      />
                      <span className="absolute mr-2 mb-2 text-white flex justify-center">
                        {/* <i className="fi fi-sr-shield-check bg-blue-600 p-2 rounded-full"></i>
                <div className="absolute text-xs bg-gray-400 bg-opacity-50 backdrop-blur-sm p-1 rounded mt-8 hidden group-hover:block">
                  Private profile
                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full border-6 border-transparent border-t-gray-400 border-opacity-50"></div>
                </div> */}
                        <Image
                          src="/assets/images/badge.png"
                          alt="shield"
                          width={50}
                          height={50}
                        />
                      </span>
                    </div>
                    <div className="">
                      <h1>Full name (sjc)</h1>
                      <p className="mt-[-5px] text-[#7A7A7A]">fullname@edapt</p>
                      <p className="text-blue-600">LEVEL 1</p>
                    </div>
                  </div>
                  <div className="flex space-x-4 absolute right-5 top-16">
                    <p className="cursor-pointer p-0 h-8 w-8 flex items-center justify-center bg-[#B9A7FF]/20 text-[#6648D6] rounded-md">
                      <i className="fi fi-bs-pencil"></i>
                    </p>
                    <p className="cursor-pointer p-0 h-8 w-8 flex items-center justify-center bg-[#B9A7FF]/20 text-[#6648D6] rounded-md">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.5935 8.45565C14.7766 8.29872 14.8682 8.22025 14.9017 8.12687C14.9311 8.04492 14.9311 7.95527 14.9017 7.87332C14.8682 7.77995 14.7766 7.70148 14.5935 7.54454L8.24047 2.09908C7.9253 1.82893 7.76772 1.69385 7.6343 1.69055C7.51835 1.68767 7.40759 1.73861 7.33432 1.82852C7.25 1.93197 7.25 2.13952 7.25 2.55463V5.77607C5.64899 6.05616 4.1837 6.86741 3.09478 8.0855C1.90762 9.41348 1.25093 11.1321 1.25 12.9133V13.3723C2.03701 12.4242 3.01963 11.6575 4.13057 11.1245C5.11002 10.6547 6.16881 10.3763 7.25 10.303V13.4456C7.25 13.8607 7.25 14.0682 7.33432 14.1717C7.40759 14.2616 7.51835 14.3125 7.6343 14.3096C7.76772 14.3063 7.9253 14.1713 8.24047 13.9011L14.5935 8.45565Z"
                          stroke="#6648D6"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-4 list-none h-8 justify-start mt-[-1rem] px-4 overflow-scroll no-scrollbar">
                  <p
                    className={`absolute bottom-0 h-1 bg-blue-600 transition-all ${
                      profileList === "basic-details"
                        ? "ml-0 w-24"
                        : profileList === "karma-history"
                        ? "ml-[125px] w-28"
                        : "ml-[250px] w-20"
                    }`}
                  ></p>
                  <li
                    onClick={() => setProfileList("basic-details")}
                    className={`cursor-pointer min-w-[110px] ${
                      profileList === "basic-details"
                        ? "font-semibold text-black"
                        : "text-gray-700"
                    }`}
                  >
                    Basic Details
                  </li>
                  <li
                    onClick={() => setProfileList("karma-history")}
                    className={`cursor-pointer min-w-[110px] ${
                      profileList === "karma-history"
                        ? "font-semibold text-black"
                        : "text-gray-700"
                    }`}
                  >
                    Karma History
                  </li>
                  <li
                    onClick={() => setProfileList("mu-voyage")}
                    className={`cursor-pointer min-w-[110px] ${
                      profileList === "mu-voyage"
                        ? "font-semibold text-black"
                        : "text-gray-700"
                    }`}
                  >
                    Join Edapt
                  </li>
                </div>
                <div className="grid grid-cols-2 gap-4 m-5">
                  <CustomCard
                    label="Karma"
                    value="1000K"
                    icon="fi fi-sr-users"
                    iconBgColor="bg-[#8280FF]/20"
                    iconTextColor="text-[#3D42DF]"
                  />
                  <CustomCard
                    label="Avg.Karma/Month"
                    value="10K"
                    icon="fi fi-rr-chart-line-up"
                    iconBgColor="bg-[#4AD991]/20"
                    iconTextColor="text-[#4AD991]"
                  />
                  <CustomCard
                    label="Rank"
                    value="45"
                    icon="fi fi-ss-cube"
                    iconBgColor="bg-[#FEC53D]/20"
                    iconTextColor="text-[#FEC53D]"
                  />
                  <CustomCard
                    label="Percentile"
                    value="100K"
                    icon="fi fi-br-time-past"
                    iconBgColor="bg-[#FF9066]/20"
                    iconTextColor="text-[#FF9066]"
                  />
                </div>
              </div>
              {profileList === "basic-details" ? (
                <div></div>
              ) : profileList === "karma-history" ? (
                <div></div>
              ) : (
                profileList === "mu-voyage" && <div></div>
              )}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4">
            <div className="flex justify-center overflow-scroll bg-white rounded-lg no-scrollbar">
              <HeatmapComponent data={[]} year={2021} />
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Right side (3 boxes) --> */}
      <div className="col-span-1">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-2xl p-4 mb-4 md:mb-0">
            <div className="p-0">
              <h2>Connect your Socials</h2>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="flex items-center justify-center h-12 w-12 bg-[#3B5998]/10 rounded-md text-[#3B5998] text-3xl leading-none">
                <i className="fi fi-brands-facebook"></i>
              </div>
              <div className="flex items-center justify-center h-12 w-12 bg-[#1DA1F2]/10 rounded-md">
                <i className="fi fi-sr-twitter"></i>
              </div>
              <div className="flex items-center justify-center h-12 w-12 bg-[#0077B5]/10 rounded-md">
                <i className="fi fi-sr-linkedin"></i>
              </div>
              <div className="flex items-center justify-center h-12 w-12 bg-[#FF0000]/10 rounded-md">
                <i className="fi fi-sr-youtube"></i>
              </div>
              <div className="flex items-center justify-center h-12 w-12 bg-[#FF0000]/10 rounded-md">
                <i className="fi fi-sr-instagram"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 mb-4 md:mb-0">
            <div className="p-0">
              <h2>Karma Distribution</h2>
            </div>
            <div className="flex gap-4 mt-4 h-80">
              <PieChart
                series={[
                  {
                    data: [
                      { value: 10, color: "orange", label: "Label 1" },
                      { value: 20, color: "blue", label: "Label 2" },
                      { value: 30, color: "green", label: "Label 3" },
                      { value: 40, color: "red", label: "Label 4" },
                      { value: 50, color: "yellow", label: "Label 5" },
                    ],
                    // arcLabel: "value",
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: 0,
                    endAngle: 360,
                    cx: 150,
                    cy: 150,
                  },
                ]}
                slotProps={{
                  legend: {
                    itemMarkHeight: 10,
                    itemMarkWidth: 10,
                    labelStyle: {
                      fontSize: 10,
                      borderRadius: "50%",
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 mb-4 md:mb-0">
            <div className="p-0">
              <h2>Recent Activities</h2>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-4 mt-4">
                <div className="flex items-center justify-center h-12 w-12 bg-custom-gradient rounded-full text-[#3B5998] text-3xl leading-none">
                  <KarmaRecent />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="text-blue-600 font-semibold">
                      50 Karma
                    </span>{" "}
                    awarded for task completion.
                  </p>
                  <p className="text-sm text-gray-400">5 seconds ago</p>
                </div>
              </div>
              <div className="flex flex-row gap-4 mt-4">
                <div className="flex items-center justify-center h-12 w-12 bg-custom-gradient rounded-full text-[#3B5998] text-3xl leading-none">
                  <KarmaRecent />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="text-blue-600 font-semibold">
                      50 Karma
                    </span>{" "}
                    awarded for task completion.
                  </p>
                  <p className="text-sm text-gray-400">5 seconds ago</p>
                </div>
              </div>
              <div className="flex flex-row gap-4 mt-4">
                <div className="flex items-center justify-center h-12 w-12 bg-custom-gradient rounded-full text-[#3B5998] text-3xl leading-none">
                  <KarmaRecent />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="text-blue-600 font-semibold">
                      50 Karma
                    </span>{" "}
                    awarded for task completion.
                  </p>
                  <p className="text-sm text-gray-400">5 seconds ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
