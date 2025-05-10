'use client';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

import React from 'react';
import toast, { Toaster } from "react-hot-toast";

const VerifyEmailForm: React.FC = () => {
  const [isValidData, setIsValidData] = useState(false);
   const [loading, setLoading] = useState(false);
  const [OTP, setOTP] = useState('');
  const router = useRouter();

  const handleOTPVerification = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/verify-email", OTP);
      if (response.status === 200) {
        console.log("Response data:", response.data);
        toast.success("Logged in successfully.");
        router.push("/verify-email");
      } else {
        toast.error("Unexpected response. Please try again.");
      }
    } catch (error: any) {
      toast.error("Failed to verify OTP");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setIsValidData(OTP.length == 6);
  }, [OTP]);

  return (
    <div className={"flex flex-col gap-6"}>
      <Toaster />
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Email Verification
          </CardTitle>
          <CardDescription>
            Enter the OTP sent to your inbox.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleOTPVerification}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="OTP">One Time Verificiation Code</Label>
                  <Input
                    id="OTP"
                    type="text"
                    placeholder="Enter OTP"
                    onChange={(e) =>
                      setOTP(e.target.value)
                    }
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={!isValidData}>
                    {loading ? "Loading..." : "Continue"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Go Back
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default VerifyEmailForm;