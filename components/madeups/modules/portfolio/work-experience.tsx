import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { PortfolioDataType } from "../../portfolio";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddExperience from "./add-experience";

type Props = {
  data: PortfolioDataType | undefined;
};

const WorkExperience = ({ data }: Props) => {
  const [experienceData, setExperienceData] = useState<
    PortfolioDataType | undefined
  >();
  useEffect(() => {
    setExperienceData(data);
  }, [setExperienceData, data]);
  // console.log(data, experienceData);

  const [isExperienceDialogOpen, setExperienceDialogOpen] = useState(false);
  const closeEditDialog = () => {
    setExperienceDialogOpen(false);
  };
  const updateExperienceData = (newData: any) => {
    setExperienceData((prevData) => {
      if (!prevData) return newData;
      const prevWorkExperience = prevData.data.work_experience || [];
      const newWorkExperience = newData?.data?.work_experience || [];

      return {
        ...prevData,
        data: {
          ...prevData.data,
          work_experience: [...prevWorkExperience, ...newWorkExperience],
        },
      };
    });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Work Experience</h3>
        <div className="flex">
          <Dialog
            open={isExperienceDialogOpen}
            onOpenChange={setExperienceDialogOpen}
          >
            <DialogTrigger>
              <i className="fi fi-br-plus p-3 leading-none rounded-full cursor-pointer hover:bg-gray-100"></i>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add your Experience</DialogTitle>
                <DialogDescription>
                  Fill the details of yor Experience
                </DialogDescription>
              </DialogHeader>
              {data && (
                <AddExperience
                  data={data.data}
                  updatePortfolioData={updateExperienceData}
                  closeDialog={closeEditDialog}
                />
              )}
            </DialogContent>
          </Dialog>
          <Link
            href="/dashboard/portfolio/details/Experiences"
            scroll={false}
            shallow
          >
            <i className="fi fi-bs-pencil p-3 leading-none rounded-full cursor-pointer hover:bg-gray-100"></i>
          </Link>
        </div>
      </div>
      <div className="mt-4 bg-zinc-100 p-4 flex flex-col gap-4 rounded-md">
        {experienceData?.data?.work_experience.length !== 0 ? (
          experienceData?.data?.work_experience.map((work, i) => (
            <div key={i} className="flex justify-between">
              <div className="flex gap-4">
                <Image
                  src="/assets/images/dp.jpg" // Replace with your Experience image path
                  alt="Experience"
                  width={50}
                  height={50}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div>
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-semibold">{work.title}</h4>
                      <p className="font-medium">{work.company}k</p>
                      <p className="text-sm text-black/60">
                        {work.start_date} - {work.end_date}
                      </p>
                      <p className="text-sm text-black/60">
                        {work.location} • Full-Time
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {work?.skills?.map((skill, i) => {
                      return (
                        <Badge key={i} variant="secondary">
                          {skill}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="w-fit">
                <div
                  // onClick={() =>
                  //   openEditDialog({
                  //     id: project.id,
                  //     main_project: project.main_project,
                  //     title: project.title,
                  //     url: project.url,
                  //   })
                  // }
                  className="h-10 w-10 flex flex-1 justify-center items-center rounded-full cursor-pointer hover:bg-zinc-50"
                >
                  <i className="fi fi-bs-pencil"></i>
                </div>
              </div>
            </div>
          ))
        ) : (
          <a
            href="#"
            className="p-3 h-full w-full rounded-md bg-zinc-100 text-black flex gap-2 justify-center items-center leading-3 hover:bg-zinc-200"
          >
            Add your Work Experience
            <i className="fi fi-bs-arrow-up-right"></i>
          </a>
        )}
      </div>
    </>
  );
};

export default WorkExperience;
