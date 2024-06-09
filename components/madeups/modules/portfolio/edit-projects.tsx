import Image from "next/image";
import React, { useState, useEffect } from "react";
import { PortfolioDataType, Projects } from "../../portfolio";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import imageCompression from "browser-image-compression";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ProjectUpdate, ProjectDelete } from "@/lib/dasboard";

type Props = {
  data: PortfolioDataType["data"]["projects"] | undefined;
};

const projectSchema = z.object({
  id: z.string(),
  main_project: z.boolean(),
  title: z.string().min(1, "Title is required"),
  url: z.string().url(),
  banner: z.any().optional(),
});
type ProjectFormData = z.infer<typeof projectSchema>;

const mergeProjectData = (
  projects: PortfolioDataType["data"]["projects"] | undefined,
  updatedProject: Projects
) => {
  const updatedProjects = projects?.map((project) =>
    project.id === updatedProject.id ? updatedProject : project
  );

  if (!projects?.some((project) => project.id === updatedProject.id)) {
    updatedProjects?.push(updatedProject);
  }

  return updatedProjects;
};

const EditProjects = ({ data }: Props) => {
  const { toast } = useToast();
  const [updatedProjectData, setUpdatedProjectData] = useState<
    PortfolioDataType["data"]["projects"] | undefined
  >(data);
  const [isProjectDialogOpen, setProjectDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<ProjectFormData | null>(null);
  const [updateButtonDisable, setUpdateButtonDisable] =
    useState<boolean>(false);
  const [compressionProgressBanner, setCompressionProgressBanner] =
    useState<number>(0);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      id: "",
      main_project: false,
      title: "",
      banner: "",
      url: "",
    },
  });

  useEffect(() => {
    if (selectedProject) {
      form.reset(selectedProject);
    }
  }, [selectedProject, form]);

  const openEditDialog = (project: ProjectFormData) => {
    setSelectedProject(project);
    setProjectDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedProject(null);
    setProjectDialogOpen(false);
  };

  const onSubmit: SubmitHandler<ProjectFormData> = async (formData) => {
    try {
      const updatedProjectResponse = await ProjectUpdate(formData.id, formData);
      const updatedProject = updatedProjectResponse.data;

      setUpdatedProjectData((prevData) =>
        mergeProjectData(prevData, updatedProject)
      );

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

  const handleDelete = async (projectId: string) => {
    try {
      await ProjectDelete(projectId);

      // Remove the deleted project from the list
      setUpdatedProjectData((prevData) =>
        prevData?.filter((project) => project.id !== projectId)
      );

      toast({
        variant: "default",
        title: "Project deleted successfully",
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

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {updatedProjectData?.map((project) => (
        <div
          key={project.id}
          className="flex bg-white border border-gray-200 rounded-xl shadow dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <Image
            src={project.banner_url ?? "/assets/images/pj_banner.png"}
            width={500}
            height={500}
            alt=""
            className="object-cover h-full p-3 rounded-3xl md:w-48"
          />
          <div className="flex flex-1 flex-col justify-center p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {project.title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {project.url}
            </p>
            {project.main_project && (
              <Badge className="w-fit">Main Project</Badge>
            )}
          </div>
          <div
            onClick={() =>
              openEditDialog({
                id: project.id,
                main_project: project.main_project,
                title: project.title,
                url: project.url,
              })
            }
            className="m-2 h-10 w-10 flex justify-center items-center rounded-full cursor-pointer hover:bg-zinc-100"
          >
            <i className="fi fi-bs-pencil"></i>
          </div>
        </div>
      ))}
      <Dialog open={isProjectDialogOpen} onOpenChange={setProjectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit your Project</DialogTitle>
            <DialogDescription>
              Fill in the details of your project
            </DialogDescription>
          </DialogHeader>
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
                        className="focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                        placeholder="Enter title"
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
                        className="focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
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
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleDelete(selectedProject?.id!)}
                  className="w-full"
                >
                  Delete project
                </Button>
                <Button
                  type="submit"
                  disabled={updateButtonDisable}
                  className="w-full"
                >
                  Update project
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProjects;
