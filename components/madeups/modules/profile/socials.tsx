"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpworkIcon from "@/public/assets/svgs/upwork-icon";
import { socialsUpdate } from "@/lib/dasboard";
import { toast } from "@/components/ui/use-toast";

// Define a type for the social platforms
type SocialPlatforms = string;

type Props = {
  data: {
    [key in SocialPlatforms]: string | null;
  };
  isPublic: boolean;
};

const Socials = ({ data, isPublic }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [socials, setSocials] = useState(data);
  const [errors, setErrors] = useState<{ [key in SocialPlatforms]?: string[] }>(
    {}
  );

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

  const handleSubmit = async (socials: Props["data"]) => {
    // console.log(socials);
    // if the socials is an empty string then pass it as null
    if (edit) {
      for (const key in socials) {
        if (socials[key as SocialPlatforms] === "") {
          socials[key as SocialPlatforms] = null;
        }
      }
      new Promise<void>((resolve, reject) => {
        socialsUpdate(socials)
          .then(() => resolve())
          .catch((error) => reject(error));
      })
        .then(() => {
          setEdit(!edit);
          toast({
            variant: "default",
            title: "Socials updated",
          });
        })
        .catch((error: any) => {
          let errorMessage = error.message;
          const parsedError = JSON.parse(errorMessage);
          if (errorMessage) {
            const serverErrors = JSON.parse(errorMessage);
            console.log(serverErrors);
            setErrors(serverErrors);
            const errorDescriptions = Object.keys(serverErrors).map(
              (field) => `${field}: ${serverErrors[field].join(", ")}`
            );
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: errorDescriptions.join(" | "),
            });
          } else {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "Invalid URL not updated",
            });
          }
        });
    } else {
      setEdit(!edit);
    }
  };

  return (
    <>
      <div className="p-0 flex justify-between">
        <h2>Connect your Socials</h2>
        {!isPublic && (
          <p
            className="cursor-pointer p-0 h-8 w-8 flex items-center justify-center bg-[#B9A7FF]/20 text-[#6648D6] rounded-md"
            onClick={() => {
              handleSubmit(socials);
            }}
          >
            <i className={`fi ${!edit ? "fi-bs-pencil" : "fi-br-check"}`}></i>
          </p>
        )}
      </div>
      <div className="flex w-full gap-4 mt-4">
        {Object.keys(socials).filter((platform) => socials[platform]).length ===
          0 && !edit ? (
          <i className="p-2 m-auto">Add your socials</i>
        ) : (
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
                    {errors[platform] && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors[platform]?.join(", ")}
                      </div>
                    )}
                  </TabsContent>
                ))}
              </>
            )}
          </Tabs>
        )}
      </div>
    </>
  );
};

export default Socials;
