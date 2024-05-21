/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import React, { useState } from "react";

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
import { useRouter } from "next/navigation";
import { sendOtp, verifyOtp } from "@/lib/auth";

const emailSchema = z.object({
  email: z.string().email().nonempty("Email is required"),
});

const otpSchema = z.object({
  email: z.string().email().nonempty("Email is required"),
  otp: z
    .string()
    .min(6, "OTP must be 6 characters")
    .max(6, "OTP must be 6 characters")
    .nonempty("OTP is required"),
});

type Props = {};

const SignIn = (props: Props) => {
  const router = useRouter();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [email, setEmail] = useState("");

  const form = useForm<z.infer<typeof emailSchema | typeof otpSchema>>({
    resolver: zodResolver(isOtpSent ? otpSchema : emailSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const onSubmit = async (
    data: z.infer<typeof emailSchema | typeof otpSchema>
  ) => {
    try {
      if (isOtpSent) {
        // Verify OTP
        await verifyOtp(data.email, data.otp);
        router.push("/dashboard/profile");
      } else {
        // Send OTP
        setEmail(data.email);
        await sendOtp(data.email);
        setIsOtpSent(true);
      }
    } catch (error: any) {
      console.error(error);
      return;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      <div className="flex-1 flex flex-col gap-10 justify-center items-center px-4 md:px-0">
        <div className="flex flex-col items-center gap-5">
          <h1 className="font-bold text-3xl">Welcome to Edapt</h1>
          <p className="font-normal text-center md:text-left">
            Seamless learning with Edapt's intuitive platform
          </p>
        </div>
        <div className="w-full sm:w-[400px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full"
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
                        disabled={isOtpSent}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isOtpSent && (
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OTP</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus:ring-none focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                          placeholder="Enter OTP"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button type="submit" className="w-full bg-[#456FF6] px-6 py-6">
                {isOtpSent ? "Verify OTP" : "Send OTP"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="flex-1 hidden md:flex justify-end">
        <Image
          src="/assets/images/signin.png"
          alt="Sign in"
          width={500}
          height={500}
          className="w-fit h-full sm:object-cover lg:object-contain"
        />
      </div>
    </div>
  );
};

export default SignIn;
