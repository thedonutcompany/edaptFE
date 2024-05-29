"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpworkIcon from "@/public/assets/svgs/upwork-icon";
import { socialsUpdate } from "@/lib/dasboard";

// Define a type for the social platforms
type SocialPlatforms = string;

type Props = {
  data: {
    [key in SocialPlatforms]: string | null;
  };
};

const Socials = ({ data }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [socials, setSocials] = useState(data);

  useEffect(() => {
    setSocials(data);
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    platform: SocialPlatforms
  ) => {
    setSocials({
      ...socials,
      [platform]: e.target.value,
    });
  };

  const handleSubmit = (socials: Props["data"]) => {
    console.log(socials);
    // if the socials is an empty string then pass it as null
    for (const key in socials) {
      if (socials[key as SocialPlatforms] === "") {
        socials[key as SocialPlatforms] = null;
      }
    }
    socialsUpdate(socials);
  };

  return (
    <>
      <div className="p-0 flex justify-between">
        <h2>Connect your Socials</h2>
        <p
          className="cursor-pointer p-0 h-8 w-8 flex items-center justify-center bg-[#B9A7FF]/20 text-[#6648D6] rounded-md"
          onClick={() => {
            if (edit) handleSubmit(socials);
            setEdit(!edit);
          }}
        >
          <i className={`fi ${!edit ? "fi-bs-pencil" : "fi-br-check"}`}></i>
        </p>
      </div>
      <div className="flex w-full gap-4 mt-4">
        <Tabs defaultValue="linkedin" className="">
          <TabsList className="bg-transparent w-full h-auto flex flex-wrap justify-start">
            {Object.keys(socials)
              .filter((platform) => edit || socials[platform])
              .map((platform) => (
                <TabsTrigger key={platform} value={platform} className="p-0">
                  <div className="flex items-center justify-center h-12 w-12 bg-gray-200/10 text-[#585EFB] rounded-md text-3xl leading-none">
                    {platform === "upwork" ? (
                      <UpworkIcon />
                    ) : (
                      <i className={`fi fi-brands-${platform}`}></i>
                    )}
                  </div>
                </TabsTrigger>
              ))}
          </TabsList>
          {edit && (
            <>
              {Object.keys(socials).map((platform) => (
                <TabsContent key={platform} value={platform}>
                  <Input
                    key={platform}
                    type="url"
                    placeholder={`www.${platform}.com/`}
                    className="w-full mt-4"
                    value={socials[platform] || ""}
                    onChange={(e) => handleInputChange(e, platform)}
                  />
                </TabsContent>
              ))}
            </>
          )}
        </Tabs>
      </div>
    </>
  );
};

export default Socials;
