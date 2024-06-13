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
import EducationForm from "./education-form";

type Props = {
  data: PortfolioDataType | undefined;
};

const Education: React.FC<Props> = ({ data }) => {
  const [portfolioData, setPortfolioData] = useState<
    PortfolioDataType | undefined
  >(data);
  const [editable, setEditable] = useState(false);
  const [isEducationDialogOpen, setEducationDialogOpen] = useState(false);
  const [isEducationEditDialogOpen, setEducationEditDialogOpen] = useState<
    number | null
  >(null);

  const closeEditDialog = () => {
    setEducationDialogOpen(false);
    setEducationEditDialogOpen(null);
  };

  const updateEducationData = (newData: any) => {
    setPortfolioData(newData);
  };

  const openEditDialog = (id: number) => {
    setEducationEditDialogOpen(id);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Education</h3>
        <div className="flex">
          <Dialog
            open={isEducationDialogOpen}
            onOpenChange={setEducationDialogOpen}
          >
            <DialogTrigger>
              <i className="fi fi-br-plus p-3 leading-none rounded-full cursor-pointer hover:bg-gray-100"></i>
            </DialogTrigger>
            <DialogContent className="w-[90%] sm:max-w-[425px] rounded-md">
              <DialogHeader>
                <DialogTitle>Add your Education</DialogTitle>
                <DialogDescription>
                  Fill the details of your Education
                </DialogDescription>
              </DialogHeader>
              {data && (
                <EducationForm
                  data={data.data}
                  updatePortfolioData={updateEducationData}
                  closeDialog={closeEditDialog}
                  isEdit={false}
                />
              )}
            </DialogContent>
          </Dialog>
          {portfolioData?.data?.education.length !== 0 && (
            <div
              onClick={() => setEditable(!editable)}
              className="h-10 w-10 flex flex-1 justify-center items-center rounded-full cursor-pointer hover:bg-zinc-100"
            >
              <i className="fi fi-bs-pencil"></i>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4 rounded-md">
        {portfolioData?.data?.education.length !== 0 ? (
          portfolioData?.data?.education.map((education, i) => (
            <div
              key={i}
              className="bg-zinc-100 p-4 flex flex-col gap-4 rounded-md"
            >
              <div className="flex justify-between">
                <div>
                  <h4 className="font-semibold">{education.degree}</h4>
                  <p className="font-medium">{education.institution}</p>
                  <p className="text-sm text-black/60">
                    {education.start_date} - {education.end_date}
                  </p>
                </div>
                {editable && (
                  <div className="w-fit">
                    <Dialog
                      open={isEducationEditDialogOpen === education.id}
                      onOpenChange={() => {
                        isEducationEditDialogOpen !== education.id
                          ? openEditDialog(education.id)
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
                          <DialogTitle>Edit Education</DialogTitle>
                          <DialogDescription>
                            Edit the details of your Education
                          </DialogDescription>
                        </DialogHeader>
                        {data && (
                          <EducationForm
                            data={portfolioData.data}
                            education={education}
                            updatePortfolioData={updateEducationData}
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
          <div
            className="p-3 h-full w-full rounded-md bg-zinc-100 text-black flex gap-2 justify-center items-center leading-3 cursor-pointer hover:bg-zinc-200"
            onClick={() => setEducationDialogOpen(true)}
          >
            <p>Add your Education</p>
            <i className="fi fi-bs-arrow-up-right"></i>
          </div>
        )}
      </div>
    </>
  );
};

export default Education;
