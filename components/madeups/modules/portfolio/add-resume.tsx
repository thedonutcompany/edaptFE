"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useToast } from "@/components/ui/use-toast";
import { PortfolioDataType } from "../../portfolio";
import { PortfolioUpdate } from "@/lib/dasboard";

const portfolioSchema = z.object({
  resume: z.any().optional(),
});

type PortfolioFormData = z.infer<typeof portfolioSchema>;

type AddResumeProps = {
  data: PortfolioDataType["data"];
  updatePortfolioData: any;
  closeDialog: () => void; // Add closeDialog prop
};

const AddResume: React.FC<AddResumeProps> = ({
  data,
  updatePortfolioData,
  closeDialog,
}) => {
  const { toast } = useToast();
  const form = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      resume: data?.resume_url || "",
    },
  });

  const onSubmit: SubmitHandler<PortfolioFormData> = async (formData) => {
    try {
      const updatedProfileData = await PortfolioUpdate(formData);
      updatePortfolioData(updatedProfileData);
      toast({
        variant: "default",
        title: "Portfolio updated successfully",
      });
      closeDialog();
    } catch (error: any) {
      console.error(error);
      let errorMessage = error.message;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Too large file max 1MB allowed",
      });

      try {
        const parsedError = JSON.parse(error.message);
        if (typeof parsedError === "object" && parsedError !== null) {
          errorMessage = JSON.stringify(parsedError, null, 2);
        }
      } catch (e) {
        // Do nothing if parsing fails
      }
      console.log(JSON.parse(errorMessage));

      if (errorMessage) {
        const serverErrors = JSON.parse(errorMessage);
        Object.keys(serverErrors).forEach((field) => {
          form.setError("resume", {
            type: "manual",
            message: "too large file Max 1MB",
          });
          // form.setError(field as keyof PortfolioFormData, {
          //   type: "manual",
          //   message: serverErrors[field],
          // });
        });
      }
    }
  };
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
    // formKey: any,
    // progressHandler: (progress: number) => void
  ) => {
    // setUpdateButtonDisable(true);
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      //   try {
      // const compressedFile = await imageCompression(file, {
      //   maxSizeMB: 1,
      //   maxWidthOrHeight: 1024,
      //   useWebWorker: true,
      //   fileType: file.type,
      //   onProgress: progressHandler,
      // });

      // const compressedFileWithOriginalName = new File(
      //   [compressedFile],
      //   file.name,
      //   {
      //     type: file.type,
      //   }
      // );
      // form.setValue(formKey, compressedFileWithOriginalName);
      // console.log(compressedFileWithOriginalName, compressedFile);
      // } catch (error) {
      //     console.error("Image compression error:", error);
      // }
      form.setValue("resume", file);
    } else {
      form.setValue("resume", "");
      //   setUpdateButtonDisable(false);
    }
  };
  if (!data) {
    return <div>Loading...</div>; // or any other fallback UI for when data is not available
  }
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
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Resume</FormLabel>
                  <FormControl>
                    <>
                      <input
                        type="file"
                        multiple={false}
                        accept="pdf/*"
                        onChange={handleImageUpload}
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-0 file:px-0 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        placeholder="resume"
                      />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <div>
            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume URL</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                      placeholder="Type your url"
                      {...field}
                      value={field.value || ""} // Ensure value is not null
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}

          <div className="col-span-2">
            <Button type="submit" className="w-full">
              Update Resume
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddResume;
