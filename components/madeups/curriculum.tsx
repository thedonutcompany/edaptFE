/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Ensure lucide-react is installed
import { Button } from "@/components/ui/button"; // Adjust the import based on your setup
import { Badge } from "@/components/ui/badge"; // Adjust the import based on your setup
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Curriculum = () => {
  const [openWeeks, setOpenWeeks] = useState<number[]>([]);

  const toggleWeek = (week: number) => {
    setOpenWeeks((prev) =>
      prev.includes(week) ? prev.filter((w) => w !== week) : [...prev, week]
    );
  };

  return (
    <div className="p-6 bg-white rounded-xl">
      <h1 className="text-1xl font-semibold mb-4">TLP foundation course</h1>
      <div className=" rounded-md mb-6 flex flex-col md:flex-row">
        <div>
          <Image
            src="/assets/images/cr.png" // Replace with your image path
            alt="Programming Language Training"
            width={1000}
            height={1000}
            className="rounded-md h-[220px] w-[700px] object-cover"
          />
        </div>
        <div className="md:w-2/3 md:pl-6">
          <p className="text-lg leading-6 font-medium mb-4">
            This course would introduce you to the fundamentals of programming
            using ternary logic, which expands on traditional binary logic
            (true/false) by adding a third state, often representing "unknown"
            or "undefined."
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge>Programming</Badge>
            <Badge>Logic</Badge>
            <Badge>Computer Science</Badge>
          </div>
          <p className="text-sm bg-[#F2F2F2] w-fit font-medium p-3 rounded-md">
            Duration: 4 weeks
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Accordion key={i} type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex flex-col text-left justify-start gap-4 items-start">
                  <h1>Week 01 : Mapping Business Outcome to Product Outcome</h1>
                  <p className="text-sm text-gray-600">
                    Explore the world of product design in this dynamic course.
                    Learn to ideate, prototype, and bring innovative ideas to
                    life through hands-on projects and expert guidance.
                  </p>
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
// pages/index.tsx
