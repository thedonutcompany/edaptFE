/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { toast } from "@/components/ui/use-toast";
const FormSchema = z.object({
  email: z.string().email().nonempty("Email is required"),
});
type Props = {};

const SignIn = (props: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      console.log(data);

      //   console.log("Signing up user:", user);

      //   await api.signup(user);
      // router.push("/auth/signin");
    } catch (error: any) {
      console.error(error);
      return;
    }
  };

  return (
    <div className="flex justify-center h-screen w-screen">
      <div className="flex-1 flex flex-col gap-10 justify-center align-middle items-center">
        <div className="flex flex-col items-center gap-5">
          <h1 className="font-bold text-3xl">Welcome to Edapt</h1>
          <p className="font-normal">
            Seamless learning with Edapt's intuitive platform
          </p>
        </div>
        <div className="w-[400px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" space-y-6 w-full"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus:ring-none focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                        placeholder="Type your mail"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-[#456FF6] px-6 py-6">
                Send OTP
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="flex-1 flex justify-end">
        <Image
          src="/assets/images/signin.png"
          alt="Sign in"
          width={500}
          height={500}
          className="w-fit h-full object-contain"
        />
      </div>
    </div>
  );
};

export default SignIn;
