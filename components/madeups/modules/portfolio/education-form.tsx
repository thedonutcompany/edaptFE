"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, isValid } from "date-fns"; // Import isValid from date-fns
import {
  Form,
  FormControl,
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
import { useToast } from "@/components/ui/use-toast";
import { PortfolioUpdate } from "@/lib/dasboard";
import { PortfolioDataType } from "../../portfolio";
import { cn } from "@/lib/utils";
import { ChangeEvent, useState } from "react";

const portfolioSchema = z.object({
  degree: z.string().min(1, "Company is required"),
  description: z.string().min(1, "Description is required"),
  end_date: z.union([z.date(), z.literal("present")]),
  institution: z.string().min(1, "Job type is required"),
  start_date: z.date({
    message: "Start date is required!",
  }),
});

type PortfolioFormData = z.infer<typeof portfolioSchema>;

type ExperienceFormProps = {
  data: PortfolioDataType["data"];
  education?: {
    id: number;
    degree: string;
    description: string;
    end_date: string | "present";
    start_date: string;
    institution: string;
  }; // type for editing existing experience
  updatePortfolioData: any;
  closeDialog: () => void;
  isEdit: boolean;
};

const EducationForm: React.FC<ExperienceFormProps> = ({
  data,
  education,
  updatePortfolioData,
  closeDialog,
  isEdit,
}) => {
  const { toast } = useToast();
  const [isOngoing, setIsOngoing] = useState<boolean>(
    education?.end_date === "present"
  );

  const form = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: education
      ? {
          ...education,
          start_date: education.start_date
            ? new Date(education.start_date)
            : undefined,
          end_date:
            education.end_date === "present"
              ? undefined
              : education.end_date
              ? new Date(education.end_date)
              : undefined,
        }
      : {
          degree: "",
          description: "",
          end_date: new Date(),
          start_date: new Date(),
          institution: "",
        },
  });
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

      const newEducation = {
        ...formData,
        end_date: formattedEndDate,
        start_date: formattedStartDate,
      };

      const updatedProfileData = {
        ...data,
        education: education
          ? data?.education.map((edu) =>
              edu.id === education.id ? newEducation : edu
            )
          : [...data?.education, newEducation],
      };
      const newData = await PortfolioUpdate({
        education: JSON.stringify(updatedProfileData.education),
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
      const updatedWorkExperience = data.education.filter(
        (exp) => exp.id !== id
      );
      console.log(id);

      // Update the profile data with the filtered work experience
      const updatedProfileData = {
        ...data,
        education: updatedWorkExperience,
      };
      const newData = await PortfolioUpdate({
        education: JSON.stringify(updatedProfileData.education),
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
            name="degree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree</FormLabel>
                <Input
                  className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                  placeholder="Type your degree"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution</FormLabel>
                <Input
                  className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                  placeholder="Type your institution"
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

          <div className="col-span-2 flex gap-4">
            {isEdit && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleDelete(education?.id!)}
                className="w-full"
              >
                Delete project
              </Button>
            )}

            <Button type="submit" className="w-full">
              {isEdit ? "Update Education" : "Add new Education"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EducationForm;
