"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button"; // Adjust the import based on your setup
import { Badge } from "@/components/ui/badge"; // Adjust the import based on your setup
import { Pencil, Plus } from "lucide-react";
import Image from "next/image";
import Verified from "@/public/assets/svgs/verified";
import { Progress } from "../ui/progress";

const Portfolio = () => {
  return (
    <div className="relative p-14 bg-white rounded-2xl">
      <div className="flex flex-col md:flex-row items-start justify-start">
        <div className="flex-1">
          <h1 className="text-5xl font-semibold">Aditya Raj Kundra</h1>
          <p className="mt-2">Product @ Media.net | ICICI | IIT Roorkee</p>
          <div className="flex items-center gap-3 space-x-2 mt-2">
            <div className="flex gap-1">
              <i className="fi fi-rr-file mt-1"></i>
              <a href="#" className="underline hover:font-semibold">
                Resume
              </a>
            </div>
            <div className="flex gap-1">
              <i className="fi fi-brands-linkedin mt-1 text-sky-700"></i>
              <a href="#" className="underline  hover:font-semibold">
                LinkedIn
              </a>
            </div>
          </div>
          <Button className="mt-5 bg-zinc-100 text-black flex gap-2 justify-center items-center leading-3 hover:bg-zinc-200">
            <i className="fi fi-rr-pencil"></i> Edit
          </Button>
        </div>
        <div className="relative md:ml-8 mt-4 md:mt-0">
          <Image
            src="/assets/images/pf.png" // Replace with your project image path
            alt="Profile"
            className="w-60 h-60 rounded-lg object-cover"
            width={300}
            height={300}
          />

          <span className="absolute -right-4 -top-4 text-white flex justify-center">
            <Image
              src="/assets/images/badge.png"
              alt="shield"
              width={70}
              height={70}
            />
          </span>
        </div>
      </div>

      <hr className="w-full my-8" />

      <div className="mt-8 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-normal underline">
            Product Manager Fellowship
          </h2>
          <p className="text-black/60">Oct 2022</p>
        </div>
        <div className="relative">
          <Image
            src="/assets/images/portfolio_badge.png"
            alt="badge"
            width={80}
            height={80}
            className="before:content-['Top_Fellow']"
          />
          <span className="absolute inset-0 flex items-center text-xs w-14 text-center m-auto leading-3 justify-center font-bold">
            Top Fellow
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
              <div className="border border-black rounded-md p-2">
                <p className="font-semibold w-max">Founding Team</p>
                <p className="font-medium text-sm w-max">
                  DSLR Technologies Pvt. Ltd.
                </p>
              </div>
              <div className="border border-black rounded-md p-2">
                <p className="font-semibold w-max">Product Manager</p>
                <p className="font-medium text-sm w-max">PhonePe</p>
              </div>
              <div className="border border-black rounded-md p-2">
                <p className="font-semibold w-max">Product Manager</p>
                <p className="font-medium text-sm w-max">Flipkart</p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <div className="flex flex-col gap-2 justify-between rounded-sm bg-zinc-100 p-3">
                <span className="font-semibold">Creativity of Solution</span>
                <div className="flex gap-2 items-center">
                  <Progress
                    value={85}
                    className="h-2.5 rounded-none bg-black/30"
                  />
                  <span>85%</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-between rounded-sm bg-zinc-100 p-3">
                <span className="font-semibold">
                  Data & Metrics Orientation
                </span>
                <div className="flex gap-2 items-center">
                  <Progress
                    value={81}
                    className="h-2.5 rounded-none bg-black/30"
                  />
                  <span>81%</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-between rounded-sm bg-zinc-100 p-3">
                <span className="font-semibold">
                  Presentation & Communication Skills
                </span>
                <div className="flex gap-2 items-center">
                  <Progress
                    value={77}
                    className="h-2.5 rounded-none bg-black/30"
                  />
                  <span>77%</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-between rounded-sm bg-zinc-100 p-3">
                <span className="font-semibold">
                  Clarity and Depth of Thought
                </span>
                <div className="flex gap-2 items-center">
                  <Progress
                    value={69}
                    className="h-2.5 rounded-none bg-black/30"
                  />
                  <span>69%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Graduation Project</h3>
              <a
                href="#"
                className="p-3 rounded-md bg-zinc-100 text-black flex gap-2 justify-center items-center leading-3 hover:bg-zinc-200"
              >
                Open in new tab <i className="fi fi-bs-arrow-up-right"></i>
              </a>
            </div>
            <div className="mt-4 h-full">
              <Image
                src="/assets/images/pfc0.png" // Replace with your project image path
                alt="Graduation Project"
                width={600}
                height={600}
                className="w-full h-full rounded-md object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="w-full my-8" />

      <div className="mt-8">
        <h3 className="text-lg font-bold">Projects</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Repeat for each project */}

          {Array.from({ length: 6 }, (_, i) => (
            <div key={i}>
              <Image
                src={`/assets/images/pfc${i}.png`} // Replace with your project image path
                alt="Project"
                width={300}
                height={300}
                className="w-full h-32 object-cover rounded-md"
              />
              <h4 className="mt-2">Nykaa - Product Teardown</h4>
            </div>
          ))}
          {/* Add more project items as needed */}
        </div>
        <a className="mt-5 font-medium flex items-center gap-1">
          View All <i className="fi fi-rr-arrow-small-right leading-3"></i>
        </a>
      </div>

      <hr className="w-full my-8" />

      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Work Experience</h3>
          <div className="flex gap-3">
            <i className="fi fi-br-plus"></i>
            <i className="fi fi-bs-pencil"></i>
          </div>
        </div>
        <div className="mt-4 bg-zinc-100 p-4 flex gap-4 rounded-md">
          <Image
            src="/assets/images/pf.png" // Replace with your project image path
            alt="Project"
            width={50}
            height={50}
            className="w-12 h-12 object-cover rounded-md"
          />
          <div>
            <div className="flex justify-between">
              <div>
                <h4 className="font-semibold">Product Manager</h4>
                <p className="font-medium">ICICI Bank</p>
                <p className="text-sm text-black/60">July 2021 - May 2023</p>
                <p className="text-sm text-black/60">
                  Mumbai, Maharashtra • Full-Time
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {/* Repeat for each skill */}
              <Badge variant="secondary">B2B</Badge>
              <Badge variant="secondary">New Business Development</Badge>
              <Badge variant="secondary">Process Improvement</Badge>
              <Badge variant="secondary">Product Development</Badge>
              <Badge variant="secondary">Product Road Mapping</Badge>
              <Badge variant="secondary">Product Ideation</Badge>
              <Badge variant="secondary">Analytical Skills</Badge>
              <Badge variant="secondary">Wireframing</Badge>
              <Badge variant="secondary">Business Requirements</Badge>
              {/* Add more badges as needed */}
            </div>
          </div>
        </div>
      </div>

      <hr className="w-full my-8" />

      <div className="mt-8 ">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Education</h3>
          <div className="flex gap-3">
            <i className="fi fi-br-plus"></i>
            <i className="fi fi-bs-pencil"></i>
          </div>
        </div>
        <div className="mt-4 bg-zinc-100 p-4 rounded-md">
          <div className="flex justify-between">
            <div>
              <h4>
                Bachelor of Technology in Electronics and Communication
                Engineering
              </h4>
              <p>Indian Institute of Technology, Roorkee</p>
              <p>July 2017 - April 2021</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

// pages/index.tsx
