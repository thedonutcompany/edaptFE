// components/ShareProfile.tsx
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TooltipTrigger,
  TooltipContent,
  Tooltip,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { CopyIcon, Facebook, Twitter } from "lucide-react";
// import { FaWhatsapp, FaTwitter } from "react-icons/fa";
import Image from "next/image";

type Props = {};

const ShareProfile: React.FC<Props> = () => {
  const [tooltipMessage, setTooltipMessage] = useState("Click to copy");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText("https://example.com").then(() => {
      setTooltipMessage("Copied!");
      setPopoverOpen(true);
      setTimeout(() => {
        setTooltipMessage("Click to copy");
        setPopoverOpen(false);
      }, 2000);
    });
  };
  return (
    <div className="w-full">
      {/* <h2 className="text-xl font-bold mb-4">Share your profile</h2> */}
      <div className="flex gap-5 items-center mb-4 bg-gray-100 p-4 rounded-md">
        {/* <img
          src="https://via.placeholder.com/48"
          alt="Profile"
          className="w-12 h-12 rounded-full mr-4"
        /> */}
        <Image
          src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
          alt="Edapt"
          width={48}
          height={48}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">Aditya Raj Kundra</h3>
          <p className="text-sm text-gray-500">adityaraj2266@edapt</p>
          <p className="text-sm text-blue-600">LEVEL 07</p>
        </div>
      </div>
      <div className="relative w-full mb-4">
        <Input
          className="pr-10"
          defaultValue="https://example.com"
          type="text"
          readOnly
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <TooltipProvider>
            <Tooltip open={popoverOpen} onOpenChange={setPopoverOpen}>
              <TooltipTrigger asChild>
                <Button
                  className="hover:bg-transparent dark:hover:bg-transparent p-2 rounded-md"
                  size="icon"
                  variant="ghost"
                  onClick={handleCopy}
                >
                  <CopyIcon className="w-5 h-5" />
                  <span className="sr-only">Click to copy</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="px-4 py-2 rounded-md">
                <p>{tooltipMessage}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="flex items-center space-x-2"
          onClick={() =>
            window.open(
              "https://wa.me/?text=https://app.edapt.org/profile/abhis...",
              "_blank"
            )
          }
        >
          <Facebook className="text-green-500" />
          <span>Whatsapp</span>
        </Button>
        <Button
          variant="outline"
          className="flex items-center space-x-2"
          onClick={() =>
            window.open(
              "https://twitter.com/intent/tweet?text=Check%20out%20this%20profile:%20https://app.edapt.org/profile/abhis...",
              "_blank"
            )
          }
        >
          <Twitter className="text-blue-500" />
          <span>Twitter</span>
        </Button>
      </div>
    </div>
  );
};

export default ShareProfile;