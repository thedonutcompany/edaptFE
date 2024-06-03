/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge"; // Adjust the import based on your setup
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CurriculumData } from "@/lib/dasboard";
type CurriculumItem = {
  id: number;
  title: string;
  description: string;
};

type curriculumDataType = {
  data: {
    name: string;
    description: string;
    duration: string;
    banner: string;
    curriculum: CurriculumItem[];
    tags: string[];
  };
};

// type Props = {
//   data: curriculumDataType;
// };

const Curriculum = () => {
  const [curriculumData, setCurriculumData] = useState<curriculumDataType>();

  useEffect(() => {
    const fetchCurriculumData = async () => {
      try {
        const data = await CurriculumData();
        console.log(data);

        setCurriculumData(data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchCurriculumData();
  }, []);
  return (
    <div className="p-6 bg-white rounded-2xl">
      <h1 className="text-1xl font-semibold mb-4">
        {curriculumData?.data?.name}
      </h1>
      <div className="rounded-md mb-6 flex flex-col md:flex-row">
        <div>
          <Image
            src={
              curriculumData?.data?.banner
                ? curriculumData?.data?.banner
                : "/assets/images/cr.png"
            }
            alt="Programming Language Training"
            width={500}
            height={500}
            className="rounded-md h-[220px] w-[700px] object-left object-cover"
          />
        </div>
        <div className="md:w-2/3 md:pl-6">
          <p className="text-lg leading-6 font-medium mb-4">
            {curriculumData?.data?.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {curriculumData?.data?.tags?.length !== 0 &&
              curriculumData?.data?.tags?.map((tag, i) => (
                <Badge key={i}>{tag}</Badge>
              ))}
          </div>
          <p className="text-sm bg-[#F2F2F2] w-fit font-medium p-3 rounded-md">
            Duration: {curriculumData?.data?.duration}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {curriculumData?.data?.curriculum.map((item, i) => (
          <Accordion key={i} type="single" collapsible>
            <AccordionItem value={`item-${item.id}`}>
              <AccordionTrigger>
                <div className="flex flex-col text-left justify-start gap-4 items-start">
                  <h1>{item.title}</h1>
                  <div
                    className="text-sm text-gray-600"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                  <p className="text-sm bg-[#F2F2F2] w-fit font-medium p-3 rounded-md">
                    Watch hours : 12 hours
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Curriculum;
