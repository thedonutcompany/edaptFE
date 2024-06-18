import React, { useState, useEffect } from "react";
import { PortfolioDataType } from "../../portfolio";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ExperienceForm from "./ExperienceForm";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

type Props = {
  data: PortfolioDataType | undefined | null;
  isPublic: boolean;
};

const WorkExperience: React.FC<Props> = ({ data, isPublic }) => {
  const [portfolioData, setPortfolioData] = useState<
    PortfolioDataType | undefined | null
  >(data);
  const [editable, setEditable] = useState(false);
  const [isExperienceDialogOpen, setExperienceDialogOpen] = useState(false);
  const [isExperienceEditDialogOpen, setExperienceEditDialogOpen] = useState<
    number | null
  >(null);

  const closeEditDialog = () => {
    setExperienceDialogOpen(false);
    setExperienceEditDialogOpen(null);
  };

  const updateExperienceData = (newData: any) => {
    setPortfolioData(newData);
  };

  const openEditDialog = (id: number) => {
    setExperienceEditDialogOpen(id);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Work Experience</h3>
        {!isPublic && (
          <div className="flex">
            <Dialog
              open={isExperienceDialogOpen}
              onOpenChange={setExperienceDialogOpen}
            >
              <DialogTrigger>
                <i className="fi fi-br-plus p-3 leading-none rounded-full cursor-pointer hover:bg-gray-100"></i>
              </DialogTrigger>
              <DialogContent className="w-[90%] sm:max-w-[425px] rounded-md">
                <DialogHeader>
                  <DialogTitle>Add your Experience</DialogTitle>
                  <DialogDescription>
                    Fill the details of your Experience
                  </DialogDescription>
                </DialogHeader>
                {data && (
                  <ExperienceForm
                    data={data.data}
                    updatePortfolioData={updateExperienceData}
                    closeDialog={closeEditDialog}
                    isEdit={false}
                  />
                )}
              </DialogContent>
            </Dialog>
            {portfolioData?.data?.work_experience.length !== 0 && (
              <div
                onClick={() => setEditable(!editable)}
                className="h-10 w-10 flex flex-1 justify-center items-center rounded-full cursor-pointer hover:bg-zinc-100"
              >
                <i className="fi fi-bs-pencil"></i>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-4 rounded-md">
        {portfolioData?.data?.work_experience.length !== 0 ? (
          portfolioData?.data?.work_experience.map((work, i) => (
            <div
              key={i}
              className="bg-zinc-100 p-4 flex flex-col gap-4 rounded-md"
            >
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <Image
                    src="/assets/images/dp.jpg"
                    alt="Experience"
                    width={50}
                    height={50}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div>
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-semibold">{work.title}</h4>
                        <p className="font-medium">{work.company}</p>
                        <p className="text-sm text-black/60">
                          {work.start_date} - {work.end_date}
                        </p>
                        <p className="text-sm text-black/60">
                          {work.location} • {work.job_type}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {work?.skills?.map((skill, i) => (
                        <Badge key={i} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                {editable && (
                  <div className="w-fit">
                    <Dialog
                      open={isExperienceEditDialogOpen === work.id}
                      onOpenChange={() => {
                        isExperienceEditDialogOpen !== work.id
                          ? openEditDialog(work.id)
                          : openEditDialog(NaN);
                      }}
                    >
                      <DialogTrigger>
                        <div className="h-10 w-10 flex flex-1 justify-center items-center rounded-full cursor-pointer hover:bg-zinc-50">
                          <i className="fi fi-bs-pencil"></i>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="w-[90%] sm:max-w-[425px] rounded-md">
                        <DialogHeader>
                          <DialogTitle>Edit Experience</DialogTitle>
                          <DialogDescription>
                            Edit the details of your Experience
                          </DialogDescription>
                        </DialogHeader>
                        {data && (
                          <ExperienceForm
                            data={portfolioData.data}
                            experience={work}
                            updatePortfolioData={updateExperienceData}
                            closeDialog={closeEditDialog}
                            isEdit={true}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            </div>
          ))
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
                onClick={() => setExperienceDialogOpen(true)}
              >
                Add your Work Experience
                <i className="fi fi-bs-arrow-up-right"></i>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default WorkExperience;
