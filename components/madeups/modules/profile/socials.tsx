"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

type Props = {};

const Socials = (props: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  return (
    <>
      <div className="p-0 flex justify-between">
        <h2>Connect your Socials</h2>{" "}
        <p className="cursor-pointer p-0 h-8 w-8 flex items-center justify-center bg-[#B9A7FF]/20 text-[#6648D6] rounded-md">
          <i
            onClick={() => {
              setEdit(!edit);
            }}
            className={`fi ${!edit ? "fi-bs-pencil" : "fi-br-check"}`}
          ></i>
        </p>
      </div>
      <div className="flex gap-4 mt-4">
        <Tabs defaultValue="facebook" className="">
          <TabsList className="bg-transparent">
            <TabsTrigger value="facebook">
              <div className="flex items-center justify-center h-12 w-12 bg-[#3B5998]/10 rounded-md text-[#3B5998] text-3xl leading-none">
                <i className="fi fi-brands-facebook"></i>
              </div>
            </TabsTrigger>
            <TabsTrigger value="instagram">
              <div className="flex items-center justify-center h-12 w-12 bg-[#FF0000]/10 rounded-md text-[#3B5998] text-3xl leading-none">
                <i className="fi fi-brands-instagram"></i>
              </div>
            </TabsTrigger>
          </TabsList>
          {edit && (
            <>
              <TabsContent value="facebook">
                <Input
                  type="url"
                  placeholder="www.facebook.com/"
                  className="w-full mt-4"
                />
              </TabsContent>
              <TabsContent value="instagram">
                <Input
                  type="url"
                  placeholder="www.instagram.com/"
                  className="w-full mt-4"
                />{" "}
              </TabsContent>
            </>
          )}
        </Tabs>

        {/* <div className="flex items-center justify-center h-12 w-12 bg-[#1DA1F2]/10 rounded-md">
          <i className="fi fi-brands-twitter"></i>
        </div>
        <div className="flex items-center justify-center h-12 w-12 bg-[#0077B5]/10 rounded-md">
          <i className="fi fi-brands-linkedin"></i>
        </div>
        <div className="flex items-center justify-center h-12 w-12 bg-[#FF0000]/10 rounded-md">
          <i className="fi fi-brands-youtube"></i>
        </div> */}
      </div>
    </>
  );
};

export default Socials;
