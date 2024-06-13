"use client";
import { useState, KeyboardEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, isValid } from "date-fns"; // Import isValid from date-fns
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { PortfolioUpdate } from "@/lib/dasboard";
import { PortfolioDataType } from "../../portfolio";
import { cn } from "@/lib/utils";

const portfolioSchema = z.object({
  company: z.string().min(1, "Company is required"),
  description: z.string().min(1, "Description is required"),
  end_date: z.union([z.date(), z.literal("present")]),
  job_type: z.string().min(1, "Job type is required"),
  location: z.string().min(1, "Location is required"),
  skills: z.array(z.string()).min(1, "Skills are required"),
  start_date: z.date({
    message: "Start date is required!",
  }),
  title: z.string().min(1, "Title is required"),
});

type PortfolioFormData = z.infer<typeof portfolioSchema>;

type ExperienceFormProps = {
  data: PortfolioDataType["data"];
  experience?: {
    id: number;
    title: string;
    skills: string[];
    job_type: string;
    company: string;
    end_date: string | "present";
    location: string;
    start_date: string;
  }; // type for editing existing experience
  updatePortfolioData: any;
  closeDialog: () => void;
  isEdit: boolean;
};

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  data,
  experience,
  updatePortfolioData,
  closeDialog,
  isEdit,
}) => {
  const { toast } = useToast();
  const form = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: experience
      ? {
          ...experience,
          start_date: experience.start_date
            ? new Date(experience.start_date)
            : undefined,
          end_date:
            experience.end_date === "present"
              ? undefined
              : experience.end_date
              ? new Date(experience.end_date)
              : undefined,
        }
      : {
          company: "",
          description: "",
          end_date: new Date(),
          start_date: new Date(),
          job_type: "",
          location: "",
          skills: [],
          title: "",
        },
  });

  const [skills, setSkills] = useState<string[]>(experience?.skills || []);
  const [currentSkill, setCurrentSkill] = useState<string>("");
  const [isOngoing, setIsOngoing] = useState<boolean>(
    experience?.end_date === "present"
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (currentSkill.trim() !== "") {
        const newSkills = [...skills, currentSkill.trim()];
        setSkills(newSkills);
        setCurrentSkill("");
        form.setValue("skills", newSkills);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentSkill(e.target.value);
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleOngoingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsOngoing(e.target.checked);
    if (e.target.checked) {
      form.setValue("end_date", "present"); // Pass undefined if ongoing
    } else {
      form.setValue("end_date", new Date());
    }
  };

  const onSubmit: SubmitHandler<PortfolioFormData> = async (formData) => {
    try {
      const formattedStartDate = formData.start_date
        ? format(formData.start_date, "MMMM yyyy")
        : undefined;

      const formattedEndDate = isOngoing
        ? "present"
        : formData.end_date
        ? format(formData.end_date as Date, "MMMM yyyy")
        : undefined;

      const newExperience = {
        ...formData,
        end_date: formattedEndDate,
        start_date: formattedStartDate,
      };

      const updatedProfileData = {
        ...data,
        work_experience: experience
          ? data?.work_experience.map((exp) =>
              exp.id === experience.id ? newExperience : exp
            )
          : [...data?.work_experience, newExperience],
      };

      const newData = await PortfolioUpdate({
        work_experience: JSON.stringify(updatedProfileData.work_experience),
      });
      updatePortfolioData(newData);

      toast({
        variant: "default",
        title: "Experience updated successfully",
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

  const handleDelete = async (id: number) => {
    try {
      // Filter out the experience with the given ID
      const updatedWorkExperience = data.work_experience.filter(
        (exp) => exp.id !== id
      );
      console.log(id);

      // Update the profile data with the filtered work experience
      const updatedProfileData = {
        ...data,
        work_experience: updatedWorkExperience,
      };
      console.log(updatedProfileData);

      // Call your update function with the updated profile data
      const newData = await PortfolioUpdate({
        work_experience: JSON.stringify(updatedProfileData.work_experience),
      });
      updatePortfolioData(newData);

      toast({
        variant: "default",
        title: "Experience deleted successfully",
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
                  placeholder="Type your title"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <Input
                  className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                  placeholder="Type your company name"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <Input
                    className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                    placeholder="Type your description"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="end_date"
              render={() => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        type="checkbox"
                        checked={isOngoing}
                        onChange={handleOngoingChange}
                        className="h-4 w-4"
                      />
                      <FormLabel>This experience is ongoing</FormLabel>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value && isValid(field.value) ? ( // Ensure the value is a valid date
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      captionLayout="dropdown-buttons"
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      fromYear={1960}
                      toYear={2030}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value && isValid(field.value) ? ( // Ensure the value is a valid date
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      captionLayout="dropdown-buttons"
                      mode="single"
                      selected={field.value as Date | undefined} // Ensure the value is a valid date
                      disabled={isOngoing}
                      onSelect={field.onChange}
                      initialFocus
                      fromYear={1960}
                      toYear={2030}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <Input
                  className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                  placeholder="Type your location"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="job_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={experience?.job_type || ""}
                >
                  <FormControl>
                    <SelectTrigger className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6">
                      <SelectValue placeholder="Select a job type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="Volunteer">Volunteer</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="skills"
              render={() => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap items-center gap-2">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-[#07C553]/10 text-[#07C553] rounded-sm px-2 py-1 flex items-center gap-2"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(index)}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </span>
                      ))}
                      <Input
                        className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                        placeholder="Type your skill and press enter"
                        value={currentSkill}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Press enter to add a skill. Press backspace to delete.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-2 flex gap-4">
            {isEdit && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleDelete(experience?.id!)}
                className="w-full"
              >
                Delete project
              </Button>
            )}

            <Button type="submit" className="w-full">
              {isEdit ? "Update experience" : "Add new experience"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ExperienceForm;
