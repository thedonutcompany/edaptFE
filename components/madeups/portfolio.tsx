"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Adjust the import based on your setup
import { Badge } from "@/components/ui/badge"; // Adjust the import based on your setup
import { Pencil, Plus } from "lucide-react";
import Image from "next/image";
import Verified from "@/public/assets/svgs/verified";
import { Progress } from "../ui/progress";
import { PortfolioData } from "@/lib/dasboard";
import moment from "moment";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddResume from "./modules/portfolio/add-resume";
import AddProject from "./modules/portfolio/add-project";
import React from "react";
import WorkExperience from "./modules/portfolio/work-experience";
import Education from "./modules/portfolio/education";

interface Course {
  name: string;
  joined_at: string;
}

interface WorkExperience {
  id: number;
  title: string;
  skills: string[];
  job_type: string;
  company: string;
  end_date: string;
  location: string;
  start_date: string;
}

interface Education {
  id: number;
  degree: string;
  description: string;
  end_date: string;
  start_date: string;
  institution: string;
}
interface Skills {
  title: string;
  percentage: number;
}
export interface Projects {
  id: string;
  banner_url: string | null;
  title: string;
  main_project: boolean;
  url: string;
}

export type PortfolioDataType = {
  data: {
    name: string;
    image_url: string;
    course: Course;
    linkedin: string;
    projects: Projects[]; // Assuming projects can be any type of data
    resume_url: string | null;
    primary_badge: string;
    badges: string[];
    skills: Skills[]; // Assuming skills can be any type of data
    work_experience: WorkExperience[];
    education: Education[];
  };
};
type PortfolioProps = {
  data: PortfolioDataType | null;
  isPublic: boolean;
};
const Portfolio = ({ data, isPublic }: PortfolioProps) => {
  const [portfolioData, setPortfolioData] = useState<
    PortfolioDataType | undefined | null
  >(data);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isProjectDialogOpen, setProjectDialogOpen] = useState(false);

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setProjectDialogOpen(false);
  };
  // useEffect(() => {
  //   const fetchPortfolioData = async () => {
  //     try {
  //       const data = await PortfolioData();
  //       // console.log(data);
  //       setPortfolioData(data);
  //     } catch (error) {
  //       console.error(error);
  //       // Handle error
  //     }
  //   };

  //   fetchPortfolioData();
  // }, []);
  // console.log(portfolioData);
  const updatePortfolioData = (newData: any) => {
    setPortfolioData(newData);
    console.log(newData);
  };

  return (
    <div className="relative p-4 md:p-14 bg-white rounded-2xl">
      <div className="flex flex-col md:flex-row items-start justify-start">
        <div className="flex-1">
          <h1 className="text-5xl font-semibold">
            {portfolioData?.data?.name}
          </h1>
          {/* <p className="mt-2">Product @ Media.net | ICICI | IIT Roorkee</p> */}
          <div className="flex items-center gap-3 space-x-2 mt-2">
            <div className="flex gap-1">
              <i className="fi fi-rr-file mt-1"></i>
              <a
                href={portfolioData?.data?.resume_url ?? "#"}
                className="underline hover:font-semibold"
                target="_blank"
              >
                Resume
              </a>
            </div>
            <div className="flex gap-1">
              <i className="fi fi-brands-linkedin mt-1 text-sky-700"></i>
              <a
                href={portfolioData?.data?.linkedin ?? "#"}
                className="underline  hover:font-semibold"
                target="_blank"
              >
                LinkedIn
              </a>
            </div>
          </div>
          {!isPublic && (
            <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
              <DialogTrigger>
                <p
                  className="mt-5 py-3  rounded-md px-4 bg-zinc-100 text-black flex gap-2 justify-center items-center leading-3 hover:bg-zinc-200"
                  onClick={() => setEditDialogOpen(true)}
                >
                  <i className="fi fi-rr-pencil"></i> Edit
                </p>
              </DialogTrigger>
              <DialogContent className="w-[90%] sm:max-w-[425px] rounded-md">
                <DialogHeader>
                  <DialogTitle>Upload Your Resume</DialogTitle>
                  <DialogDescription>
                    Select your PDF and Upload and save it .... any content here
                  </DialogDescription>
                </DialogHeader>
                {portfolioData && (
                  <AddResume
                    data={portfolioData.data}
                    updatePortfolioData={updatePortfolioData}
                    closeDialog={closeEditDialog}
                  />
                )}
              </DialogContent>
            </Dialog>
          )}
        </div>
        <div className="relative md:ml-8 mt-4 md:mt-0">
          <Image
            src={portfolioData?.data?.image_url ?? "/assets/images/dp.jpg"}
            alt="Profile"
            className="w-60 h-60 rounded-lg object-cover"
            width={300}
            height={300}
          />
          {/* badge */}
          {/* <span className="absolute -right-4 -top-4 text-white flex justify-center">
            <Image
              src="/assets/images/badge.png"
              alt="shield"
              width={70}
              height={70}
            />
          </span> */}
        </div>
      </div>

      <hr className="w-full my-8" />

      <div className="mt-8 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-normal underline">
            {portfolioData?.data?.course?.name}
          </h2>
          <p className="text-black/60">
            {portfolioData?.data?.course?.joined_at
              ? new Date(
                  portfolioData.data.course.joined_at
                ).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              : ""}
          </p>
        </div>
        <div className="relative flex flex-col justify-center items-center">
          <Image
            src="/assets/images/portfolio_badge.png"
            alt="badge"
            width={300}
            height={300}
            className="w-20 h-20 before:content-['Top_Fellow']"
          />
          <span className="absolute inset-0 flex items-center text-xs w-14 text-center m-auto leading-3 justify-center font-semibold">
            {portfolioData?.data?.primary_badge}
          </span>
        </div>
      </div>

      <hr className="w-full my-8" />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="mt-4 border border-black p-4 rounded-md">
          <div className="flex gap-1 items-center">
            <h3 className="text-lg font-semibold">Top Skills</h3>
            <Verified />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-black/60 text-sm">
              Validated & evaluated by our mentors:
            </p>
            <a className="font-semibold">Learn more</a>
          </div>
          <div>
            <div className="mt-3 flex gap-1 overflow-scroll no-scrollbar">
              {portfolioData?.data?.badges?.map((tag, i) => (
                <div key={i} className="border border-black rounded-md p-2">
                  <p className="font-semibold w-max">{tag}</p>
                  {/* <p className="font-medium text-sm w-max">PhonePe</p> */}
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {portfolioData?.data?.skills.length !== 0 ? (
                portfolioData?.data?.skills.map((skill, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 justify-between rounded-sm bg-zinc-100 p-3"
                  >
                    <span className="font-semibold">{skill.title}</span>
                    <div className="flex gap-2 items-center">
                      <Progress
                        value={skill.percentage}
                        className="h-2.5 rounded-none bg-black/30"
                      />
                      <span>{skill.percentage}</span>
                    </div>
                  </div>
                ))
              ) : (
                <a
                  href="#"
                  className="p-3 rounded-md bg-zinc-100 text-black flex gap-2 justify-center items-center leading-3 hover:bg-zinc-200"
                >
                  Add Skill <i className="fi fi-bs-arrow-up-right"></i>
                </a>
              )}
            </div>
          </div>
        </div>
        {!isPublic && portfolioData?.data?.projects.length === 0 && (
          <div className="mt-4">
            <div className="h-full flex flex-col">
              {portfolioData?.data?.projects.length !== 0 ? (
                <>
                  {portfolioData?.data.projects.some(
                    (project) => project.main_project
                  ) ? (
                    portfolioData?.data?.projects.map((project, index) => (
                      <React.Fragment key={index}>
                        {project.main_project ? (
                          <>
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg font-bold">
                                Graduation Project
                              </h3>
                              <a
                                href={project?.url}
                                className="p-3 rounded-md bg-zinc-100 text-black flex gap-2 justify-center items-center leading-3 hover:bg-zinc-200"
                                target="_blank"
                              >
                                Open in new tab{" "}
                                <i className="fi fi-bs-arrow-up-right"></i>
                              </a>
                            </div>
                            <div className="mt-4 h-full">
                              <Image
                                src={
                                  project.banner_url ??
                                  "/assets/images/pj_banner.png"
                                }
                                alt={project.title}
                                priority={true}
                                width={600}
                                height={600}
                                className="w-full h-full rounded-md object-cover"
                              />
                            </div>
                          </>
                        ) : null}
                      </React.Fragment>
                    ))
                  ) : (
                    <div className="h-full">
                      <a
                        href="#"
                        className="p-3 h-full rounded-md bg-zinc-100 text-black flex gap-2 justify-center items-center leading-3 hover:bg-zinc-200"
                      >
                        Add your Main Project{" "}
                        <i className="fi fi-bs-arrow-up-right"></i>
                      </a>
                    </div>
                  )}
                </>
              ) : (
                <div
                  className="p-3 mt-4 h-full w-fit md:w-full mx-auto rounded-md bg-zinc-100 text-black flex gap-2 justify-center items-center leading-3 hover:bg-zinc-200 cursor-pointer"
                  onClick={() => setProjectDialogOpen(true)}
                >
                  <p>Add your Graduation Project</p>
                  <i className="fi fi-bs-arrow-up-right"></i>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <hr className="w-full my-8" />

      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Projects</h3>

          {!isPublic && (
            <div className="flex">
              <Dialog
                open={isProjectDialogOpen}
                onOpenChange={setProjectDialogOpen}
              >
                <DialogTrigger>
                  <i className="fi fi-br-plus p-3 leading-none rounded-full cursor-pointer hover:bg-gray-100"></i>
                </DialogTrigger>
                <DialogContent className="w-[90%] sm:max-w-[425px] rounded-md">
                  <DialogHeader>
                    <DialogTitle>Add your Project</DialogTitle>
                    <DialogDescription>
                      Fill the details of yor project
                    </DialogDescription>
                  </DialogHeader>
                  {portfolioData && (
                    <AddProject
                      data={portfolioData.data}
                      updatePortfolioData={updatePortfolioData}
                      closeDialog={closeEditDialog}
                    />
                  )}
                </DialogContent>
              </Dialog>
              {portfolioData?.data.projects.length !== 0 && (
                <Link
                  href="/dashboard/portfolio/details/projects"
                  scroll={false}
                  shallow
                >
                  <i className="fi fi-bs-pencil p-3 leading-none rounded-full cursor-pointer hover:bg-gray-100"></i>
                </Link>
              )}
            </div>
          )}
        </div>
        {portfolioData?.data.projects.length !== 0 ? (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {portfolioData?.data.projects.slice(0, 4).map((project, i) => (
              <a key={i} href={project.url}>
                <Image
                  src={project.banner_url ?? "/assets/images/pj_banner.png"} // Replace with your project image path
                  alt="project_banner"
                  priority={true}
                  width={300}
                  height={300}
                  className="w-full h-32 object-cover rounded-md"
                />
                <h4 className="mt-2">{project.title}</h4>
              </a>
            ))}
          </div>
        ) : (
          <>
            <Image
              alt="nodata"
              src="/assets/images/nodata.jpg"
              height={200}
              width={200}
              className="md:hidden m-auto"
            />
            {!isPublic && (
              <div
                className="p-3 mt-4 h-full w-fit md:w-full mx-auto rounded-md bg-zinc-100 text-black flex gap-2 justify-center items-center leading-3 hover:bg-zinc-200 cursor-pointer"
                onClick={() => setProjectDialogOpen(true)}
              >
                <p>Add your projects</p>
                <i className="fi fi-bs-arrow-up-right"></i>
              </div>
            )}
          </>
        )}
        {/* {portfolioData?.data.projects.length !== 0 && (
          <Link
            href="/dashboard/portfolio/details/projects"
            className="mt-5 font-medium flex items-center gap-1"
          >
            View All {portfolioData?.data?.projects?.length ?? 4 - 4} projects
            <i className="fi fi-rr-arrow-small-right leading-3"></i>
          </Link>
        )} */}
      </div>

      <hr className="w-full my-8" />

      <div className="mt-8">
        <WorkExperience data={portfolioData} isPublic={isPublic} />
      </div>

      <hr className="w-full my-8" />

      <div className="mt-8 ">
        <Education data={portfolioData} isPublic={isPublic} />
      </div>
    </div>
  );
};

export default Portfolio;
