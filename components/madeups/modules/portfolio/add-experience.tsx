"use client";
import { useState, KeyboardEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
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
import imageCompression from "browser-image-compression";
import { Progress } from "@/components/ui/progress";
import { PortfolioProjectCreate, PortfolioUpdate } from "@/lib/dasboard";
import { Checkbox } from "@/components/ui/checkbox";
import { PortfolioDataType } from "../../portfolio";
import { cn } from "@/lib/utils";

const portfolioSchema = z.object({
  company: z.string().min(1, "company is required"),
  description: z.string().min(1, "description is required"),
  end_date: z.date(),
  job_type: z.string().min(1, "job_type is required"),
  location: z.string().min(1, "location is required"),
  skills: z.array(z.string()).min(1, "skills is required"),
  start_date: z.date({
    message: "date is required!",
  }),
  title: z.string().min(1, "Title is required"),
});

type PortfolioFormData = z.infer<typeof portfolioSchema>;

type AddExperienceProps = {
  data: PortfolioDataType["data"];
  updatePortfolioData: any;
  closeDialog: () => void;
};

const AddExperience: React.FC<AddExperienceProps> = ({
  data,
  updatePortfolioData,
  closeDialog,
}) => {
  const { toast } = useToast();
  const form = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
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
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState<string>("");

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

  // const handleAddSkill = () => {
  //   if (currentSkill.trim() !== "") {
  //     setSkills([...skills, currentSkill.trim()]);
  //     setCurrentSkill("");
  //   }
  // };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };
  const onSubmit: SubmitHandler<PortfolioFormData> = async (formData) => {
    try {
      const formattedStartDate = formData.start_date
        ? format(formData.start_date, "yyyy-MM-dd")
        : undefined;
      const formattedEndDate = formData.end_date
        ? format(formData.end_date, "yyyy-MM-dd")
        : undefined;

      const newExperience = {
        ...formData,
        end_date: formattedEndDate,
        start_date: formattedStartDate,
      };

      const updatedProfileData = {
        ...data,
        work_experience: [...data.work_experience, newExperience],
      };

      await PortfolioUpdate(updatedProfileData);
      updatePortfolioData(updatedProfileData);

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
                        {field.value ? (
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
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
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
                        {field.value ? (
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
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
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
            name="job_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your Job Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Full Time">Full Time</SelectItem>
                    <SelectItem value="Part Time">Part Time</SelectItem>
                  </SelectContent>
                </Select>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your Location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="On site">On site</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4 col-span-2">
            <div className="space-x-2">
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter a skill"
                      value={currentSkill}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      className="flex-1"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-wrap items-center space-x-2 bg-white">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center px-3 py-1 mr-2 mb-2 bg-green-300 rounded-full text-green-900"
                >
                  <span className="mr-2">{skill}</span>
                  <X
                    className="cursor-pointer"
                    size={16}
                    onClick={() => handleRemoveSkill(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2">
            <Button type="submit" className="w-full">
              Update profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddExperience;
