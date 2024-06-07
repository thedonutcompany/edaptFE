"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import imageCompression from "browser-image-compression";
import { Progress } from "@/components/ui/progress";
import { PortfolioDataType } from "../../portfolio";
import { PortfolioUpdate } from "@/lib/dasboard";
import { Checkbox } from "@/components/ui/checkbox";

const portfolioSchema = z.object({
  main_project: z.boolean(),
  title: z.string().min(1, "title is required"),
  url: z.string().url(),
  banner: z.any().optional(),
});

type PortfolioFormData = z.infer<typeof portfolioSchema>;

type AddProjectProps = {
  data: PortfolioDataType["data"];
  updatePortfolioData: any;
  closeDialog: () => void; // Add closeDialog prop
};

const AddProject: React.FC<AddProjectProps> = ({
  data,
  updatePortfolioData,
  closeDialog,
}) => {
  const { toast } = useToast();
  const [compressionProgressProfile, setCompressionProgressProfile] =
    useState<number>(0);
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
      const updatedData = {
        projects: [
          ...data.projects,
          {
            title: formData.title,
            url: formData.url,
            main_project: formData.main_project,
            banner_url: formData.banner ? formData.banner.url : null,
          },
        ],
      };

      console.log("Updated Data:", JSON.stringify(updatedData, null, 2));

      const updatedProfileData = await PortfolioUpdate(updatedData);

      updatePortfolioData(updatedProfileData);

      toast({
        variant: "default",
        title: "Project updated successfully",
      });
      closeDialog();
    } catch (error: any) {
      console.error(error);
      let errorMessage = error.message;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });

      try {
        const parsedError = JSON.parse(error.message);
        if (typeof parsedError === "object" && parsedError !== null) {
          errorMessage = JSON.stringify(parsedError, null, 2);
        }
      } catch (e) {
        // Do nothing if parsing fails
      }
      console.log("Error Message:", errorMessage);

      if (errorMessage) {
        const serverErrors = JSON.parse(errorMessage);
        Object.keys(serverErrors).forEach((field) => {
          form.setError(field as keyof PortfolioFormData, {
            type: "manual",
            message: serverErrors[field]?.join(" "),
          });
        });
      }
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    formKey: any,
    progressHandler: (progress: number) => void
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
          onProgress: progressHandler,
        });

        const compressedFileWithOriginalName = new File(
          [compressedFile],
          file.name,
          {
            type: file.type,
          }
        );
        form.setValue(formKey, compressedFileWithOriginalName);
      } catch (error) {
        console.error("Image compression error:", error);
      }
    } else {
      form.setValue(formKey, "");
      setUpdateButtonDisable(false);
    }
  };

  const imageLoaderProfile = (progress: number) => {
    setCompressionProgressProfile(progress);
    if (progress === 100) {
      setUpdateButtonDisable(false);
    }
  };

  const imageLoaderBanner = (progress: number) => {
    setCompressionProgressBanner(progress);
    if (progress === 100) {
      setUpdateButtonDisable(false);
    }
  };

  const handleProfileImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleImageUpload(event, "image", imageLoaderProfile);
  };

  const handleBannerImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleImageUpload(event, "banner", imageLoaderBanner);
  };

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                      placeholder="Type your project title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project url</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                      placeholder="Type your project url"
                      type="url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="main_project"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Main Project?</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormItem className="flex flex-col">
              <FormLabel>Upload Banner</FormLabel>
              <FormControl>
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
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
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
