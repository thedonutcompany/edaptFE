/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
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

import { useToast } from "@/components/ui/use-toast";

const emailSchema = z.object({
  email: z.string().email().nonempty("Email is required"),
});

const otpSchema = z.object({
  email: z.string().email().nonempty("Email is required"),
  otp: z
    .string()
    .length(6, "OTP must be 6 characters")
    .nonempty("OTP is required"),
});

type EmailFormData = z.infer<typeof emailSchema>;
type OtpFormData = z.infer<typeof otpSchema>;

const SignIn = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EmailFormData | OtpFormData>({
    resolver: zodResolver(isOtpSent ? otpSchema : emailSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const onSubmit: SubmitHandler<EmailFormData | OtpFormData> = async (data) => {
    try {
      setIsLoading(true);

      if (isOtpSent) {
        const { email, otp } = data as OtpFormData;
        await verifyOtp(email, otp);
        toast({
          variant: "default",
          title: "OTP verified successfully",
          description: "You are now logged in. Redirecting to your profile.",
        });
        router.push("/dashboard/homepage");
      } else {
        const { email } = data as EmailFormData;
        setEmail(email);
        await sendOtp(email);
        toast({
          variant: "default",
          title: "OTP sent successfully",
          description: "Please check your email for the OTP.",
        });
        setIsOtpSent(true);
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);
      // update zod error in email
      if (error.message) {
        form.setError("email", {
          type: "manual",
          message: error.message,
        });
      }
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    }
  };
  const resendOtp = async () => {
    try {
      await sendOtp(email);
      toast({
        variant: "default",
        title: "OTP resent successfully",
        description: "Please check your email for the OTP.",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Failed to resend OTP",
        description: error.message,
      });
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
              {!isOtpSent && (
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                          placeholder="Type your mail"
                          type="email"
                          {...field}
                          disabled={isOtpSent}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {isOtpSent && (
                <div>
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OTP Verification</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                            placeholder="Enter the OTP sent to your email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-between mt-1 p-0 space-y-0 font-normal items-center">
                    <p>Didn't receive the OTP?</p>
                    <Button
                      type="button"
                      variant="link"
                      disabled={isLoading}
                      onClick={resendOtp}
                      className=" text-[#456FF6] text-sm font-normal place-content-end justify-end text-right p-0 "
                    >
                      Resend OTP ?
                    </Button>
                  </div>
                </div>
              )}
              <Button
                type="submit"
                className="w-full bg-[#456FF6] px-6 py-6"
                disabled={isLoading}
              >
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
          width={4000}
          height={4000}
          className="w-fit h-full sm:object-cover xl:object-contain"
        />
      </div>
    </div>
  );
};

export default SignIn;
