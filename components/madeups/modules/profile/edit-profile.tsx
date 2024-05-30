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
import { profileDataType } from "../../profile";
import { ProfileUpdate } from "@/lib/dasboard";
import { useToast } from "@/components/ui/use-toast";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  gender: z.string().optional(),
  dob: z.date().optional(),
  image: z.any().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

type EditProfileProps = {
  data: profileDataType["data"];
  updateProfileData: any;
  closeDialog: () => void; // Add closeDialog prop
};

const EditProfile: React.FC<EditProfileProps> = ({
  data,
  updateProfileData,
  closeDialog,
}) => {
  const { toast } = useToast();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      image: data.image_url || "",
      gender: data.gender || "Prefer not to say",
      dob: data.dob ? new Date(data.dob) : undefined, // Ensure dob is correctly initialized
    },
  });

  const onSubmit: SubmitHandler<ProfileFormData> = async (formData) => {
    try {
      // Format dob to 'YYYY-MM-DD' before sending to backend
      const formattedDob = formData.dob
        ? format(formData.dob, "yyyy-MM-dd")
        : undefined;

      const profileUpdateData = { ...formData, dob: formattedDob };
      if (formData.image === data.image_url) {
        delete profileUpdateData.image;
      }

      const updatedProfileData = await ProfileUpdate(profileUpdateData);
      updateProfileData(updatedProfileData);
      toast({
        variant: "default",
        title: "Profile updated successfully",
      });
      closeDialog();
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.data) {
        const serverErrors = error.response.data.data;
        Object.keys(serverErrors).forEach((field) => {
          form.setError(field as keyof ProfileFormData, {
            type: "server",
            message: serverErrors[field].join(" "),
          });
        });
      }
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
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
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                      placeholder="Type your name"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                      placeholder="example@gmail.com"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>phone</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                      placeholder="Type your phone number"
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
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="M">Male</SelectItem>
                      <SelectItem value="F">Female</SelectItem>
                      <SelectItem value="O">Other</SelectItem>
                      <SelectItem value="Prefer not to say">
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
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
          </div>
          <div>
            {/* <FormField
              control={form.control}
              name="image"
              render={({ field }) => ( */}
            <FormItem className="flex flex-col">
              <FormLabel>Image</FormLabel>
              <FormControl>
                <input
                  type="file"
                  multiple={false}
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    form.setValue("image", file ?? "");
                  }}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-0 file:px-0 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                  placeholder="image"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            {/* )}
            /> */}
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

export default EditProfile;
