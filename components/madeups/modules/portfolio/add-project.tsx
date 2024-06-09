"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import imageCompression from "browser-image-compression";
import { Progress } from "@/components/ui/progress";
import { PortfolioProjectCreate } from "@/lib/dasboard";
import { Checkbox } from "@/components/ui/checkbox";
import { PortfolioDataType } from "../../portfolio";

const portfolioSchema = z.object({
  main_project: z.boolean(),
  title: z.string().min(1, "Title is required"),
  url: z.string().url(),
  banner: z.any().optional(),
});

type PortfolioFormData = z.infer<typeof portfolioSchema>;

type AddProjectProps = {
  data: PortfolioDataType["data"];
  updatePortfolioData: any;
  closeDialog: () => void;
};

const AddProject: React.FC<AddProjectProps> = ({
  data,
  updatePortfolioData,
  closeDialog,
}) => {
  const { toast } = useToast();
  const [compressionProgressBanner, setCompressionProgressBanner] =
    useState<number>(0);
  const [updateButtonDisable, setUpdateButtonDisable] =
    useState<boolean>(false);
  const form = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      main_project: false,
      title: "",
      banner: "",
      url: "",
    },
  });

  const onSubmit: SubmitHandler<PortfolioFormData> = async (formData) => {
    try {
      const updatedProjectData = await PortfolioProjectCreate({
        title: formData.title,
        url: formData.url,
        main_project: formData.main_project,
        banner: formData.banner ?? null,
      });

      updatePortfolioData({
        data: {
          ...data,
          projects: [...data.projects, updatedProjectData.data],
        },
      });
      toast({
        variant: "default",
        title: "Project updated successfully",
      });
      closeDialog();
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    }
  };

  const handleBannerImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUpdateButtonDisable(true);
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
          fileType: file.type,
          onProgress: (progress: number) => {
            setCompressionProgressBanner(progress);
            if (progress === 100) {
              setUpdateButtonDisable(false);
            }
          },
        });

        const compressedFileWithOriginalName = new File(
          [compressedFile],
          file.name,
          {
            type: file.type,
          }
        );
        form.setValue("banner", compressedFileWithOriginalName);
      } catch (error) {
        console.error("Image compression error:", error);
      }
    } else {
      form.setValue("banner", "");
      setUpdateButtonDisable(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <Input
                  className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                  placeholder="Type your project title"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project URL</FormLabel>
                <Input
                  className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                  placeholder="Type your project URL"
                  type="url"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="main_project"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <div className="space-y-1 leading-none">
                  <FormLabel>Main Project?</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormItem className="flex flex-col">
            <FormLabel>Upload Banner</FormLabel>
            <>
              <input
                type="file"
                multiple={false}
                accept="image/*"
                onChange={handleBannerImageUpload}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-0 file:px-0 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                placeholder="image"
              />
              <Progress value={compressionProgressBanner} />
            </>
            <FormMessage />
          </FormItem>
          <div className="col-span-2">
            <Button
              type="submit"
              disabled={updateButtonDisable}
              className="w-full"
            >
              Update profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddProject;
