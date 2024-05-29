/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import CustomCard from "../ui/custom-card";
import HeatmapComponent from "../ui/heatmap";
import { ProfileData } from "@/lib/dasboard";
import Socials from "./modules/profile/socials";
import KarmaPieChart from "./modules/profile/point-chart";
import RecentKarma from "./modules/profile/recent-karma";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditProfile from "./modules/profile/edit-profile";
import ShareProfile from "./modules/profile/share-profile";
import moment from "moment";
import { useUserStore } from "@/lib/store/useUserStore";

// profileDataType.ts
export type profileDataType = {
  data: {
    email: string;
    name: string;
    dob: Date;
    gender: string;
    image: string;
    created_at?: string;
    socials: {
      linkedin: string | null;
      instagram: string | null;
      github: string | null;
      upwork: string | null;
      pinterest: string | null;
      twitter: string | null;
      facebook: string | null;
      youtube: string | null;
      tiktok: string | null;
    };
    point: {
      total_points: number;
      average_points_this_month: number;
      rank: number;
      percentile: number;
    };
    point_distribution: {
      title: string;
      point: number;
    }[];
    point_log: {
      created_at: string;
      point: number;
    }[];
    point_history: {
      point: number;
      created_at: string;
      title: string;
    }[];
  };
};
type ProfileProps = {
  data: profileDataType;
  isPublic: boolean;
};
const Profile = ({ data, isPublic }: ProfileProps) => {
  const { setUserName } = useUserStore();
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const closeEditDialog = () => setEditDialogOpen(false);
  const [profileList, setProfileList] = useState("basic-details");
  const [pointFormattedData, setPointFormattedData] = useState<
    {
      value: number;
      color: string;
      label: string;
    }[]
  >([]);
  const [profileData, setProfileData] = useState<profileDataType>(data);

  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //     try {
  //       const data = await ProfileData();
  //       setProfileData(data);
  //     } catch (error) {
  //       console.error(error);
  //       // Handle error
  //     }
  //   };

  //   fetchProfileData();
  // }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    setUserName(data?.data?.name);
  }, [data?.data?.name, setUserName]);
  // console.log(profileData);

  useEffect(() => {
    const colors = ["#8892E8", "#81D4E6", "#FF6D6D", "#f0f"]; // Example color array

    const formattedData = (profileData?.data?.point_distribution ?? []).map(
      (item) => ({
        value: item.point,
        color: colors[Math.floor(Math.random() * colors.length)], // Random color selection
        label: item.title.split(" ").join("\n"),
      })
    );
    setPointFormattedData(formattedData);
  }, [profileData]);
  const updateProfileData = (newData: any) => {
    setProfileData(newData);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* <!-- Left side (2 boxes) --> */}
      <div className="col-span-1 lg:col-span-2">
        <div className="grid grid-cols-1 gap-4">
          <div className="p-0">
            <div className=" flex flex-col gap-5">
              <div className="bg-white rounded-2xl p-0">
                <div className="relative h-40 w-full rounded-t-2xl bg-cover bg-bottom bg-[url('/assets/images/profile_banner.png')]">
                  <div className="absolute right-0 bottom-2 mr-1 sm:mr-7 text-right">
                    <p className="text-white text-xs sm:text-sm font-semibold">
                      edapt
                    </p>
                    <p className="text-white text-xs sm:text-sm font-medium">
                      Member since{" "}
                      {profileData?.data?.created_at?.split("-")[0]}
                    </p>
                  </div>
                </div>
                <div className="relative h-80 sm:h-52 flex flex-col gap-1 sm:flex-row justify-center sm:justify-between items-center -mt-14">
                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                    <div className="relative flex justify-end items-end">
                      <Image
                        src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
                        alt="profile_pic"
                        width={150}
                        height={150}
                        className="aspect-square rounded-full border-4 border-white sm:ml-8 mt-[-1.5rem] bg-light"
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
                    <div className="text-center sm:text-left">
                      <h1>{profileData?.data?.name}</h1>
                      <p className="mt-[-5px] text-[#7A7A7A]">
                        {profileData?.data?.email}
                      </p>
                      <p className="text-blue-600">LEVEL 1</p>
                    </div>
                  </div>
                  {!isPublic && (
                    <div className="flex space-x-4 sm:absolute right-5 top-16">
                      <Dialog
                        open={isEditDialogOpen}
                        onOpenChange={setEditDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <p
                            className="cursor-pointer p-0 h-8 w-8 flex items-center justify-center bg-[#B9A7FF]/20 text-[#6648D6] rounded-md"
                            onClick={() => setEditDialogOpen(true)}
                          >
                            <i className="fi fi-bs-pencil"></i>
                          </p>
                        </DialogTrigger>
                        <DialogContent className="w-[90%] sm:max-w-[425px] rounded-md">
                          <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                              Make changes to your profile here. Click save when
                              you're done.
                            </DialogDescription>
                          </DialogHeader>
                          <EditProfile
                            data={profileData?.data}
                            updateProfileData={updateProfileData}
                            closeDialog={closeEditDialog}
                          />
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
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
                        </DialogTrigger>
                        <DialogContent className="w-[90%] sm:max-w-[425px] rounded-md">
                          <DialogHeader>
                            <DialogTitle>Share profile</DialogTitle>
                            <DialogDescription>
                              Share your profile with others.
                            </DialogDescription>
                          </DialogHeader>
                          <ShareProfile data={profileData?.data} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
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
                </div>
                <div className="grid grid-cols-2 gap-4 m-5">
                  {[
                    {
                      title: "Karma",
                      value: profileData?.data.point?.total_points ?? "0",
                      icon: "fi fi-sr-users",
                      iconBgColor: "bg-[#8280FF]/20",
                      iconTextColor: "text-[#3D42DF]",
                    },
                    {
                      title: "Avg.Karma/Mn",
                      value:
                        profileData?.data.point.average_points_this_month ??
                        "0",
                      icon: "fi fi-rr-chart-line-up",
                      iconBgColor: "bg-[#4AD991]/20",
                      iconTextColor: "text-[#4AD991]",
                    },
                    {
                      title: "Rank",
                      value: profileData?.data.point.rank ?? "0",
                      icon: "fi fi-ss-cube",
                      iconBgColor: "bg-[#FEC53D]/20",
                      iconTextColor: "text-[#FEC53D]",
                    },
                    {
                      title: "Percentile",
                      value: profileData?.data.point.percentile + "%" || "0%",
                      icon: "fi fi-br-time-past",
                      iconBgColor: "bg-[#FF9066]/20",
                      iconTextColor: "text-[#FF9066]",
                    },
                  ].map((item, i) => {
                    return (
                      <CustomCard
                        key={i}
                        label={item.title}
                        value={item.value}
                        icon={item.icon}
                        iconBgColor={item.iconBgColor}
                        iconTextColor={item.iconTextColor}
                      />
                    );
                  })}
                </div>
              </div>
              {profileList === "basic-details" ? (
                <div className="bg-white rounded-2xl p-4">
                  <div className="flex justify-center overflow-scroll bg-white rounded-lg no-scrollbar">
                    <HeatmapComponent
                      data={profileData?.data.point_history ?? []}
                      year={parseInt(
                        profileData?.data?.created_at?.split("-")[0] ?? ""
                      )}
                    />
                  </div>
                </div>
              ) : (
                profileList === "karma-history" && (
                  <div className="flex gap-10 max-w-full overflow-scroll no-scrollbar">
                    {profileData?.data?.point_history.length > 0 ? (
                      profileData?.data?.point_history.map((data, i) => {
                        return (
                          <div
                            key={i}
                            className="bg-white flex flex-col gap-8  justify-center text-center rounded-2xl p-4 border border-[#020897] h-72 w-56 min-w-56"
                          >
                            <h1>
                              {data.point} X <br />
                              Karma
                            </h1>
                            <div>
                              <h3>Awarded for</h3>
                              <p>#{data.title}</p>
                            </div>
                            <p>
                              {moment
                                .utc(data.created_at)
                                .local()
                                .startOf("seconds")
                                .fromNow()}
                              {/* {new Date(data.created_at).toLocaleDateString()} */}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex bg-white w-full rounded-2xl p-2 flex-col m-auto justify-center items-center">
                        <Image
                          alt="nodata"
                          src="/assets/images/nodata.jpg"
                          height={500}
                          width={500}
                          className="h-52 w-52 m-auto"
                        />
                        <p className="text-slate-500">No data to show</p>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Right side (3 boxes) --> */}
      <div className="col-span-1">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-2xl p-4 mb-4 lg:mb-0">
            <Socials
              data={profileData?.data.socials ?? {}}
              isPublic={isPublic}
            />
          </div>
          <div className="bg-white rounded-2xl p-4 mb-4 lg:mb-0">
            <KarmaPieChart data={pointFormattedData} />
          </div>
          <div className="bg-white rounded-2xl p-4 mb-4 md:mb-0">
            <RecentKarma data={profileData?.data.point_history ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
