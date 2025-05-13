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
import { useEffect, useState } from "react";
import React from 'react';
import toast, { Toaster } from "react-hot-toast";
import { supabaseClient } from "@/config/dbConfig";
import { Provider } from "@supabase/auth-js";
import { ProviderIcon } from "@/components/provider-icon";
import { useAppMetadata } from "@/context/AppMetadataContext";
const LoginForm: React.FC = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { OAUTH_PROVIDERS } = useAppMetadata();
  const providers = OAUTH_PROVIDERS
  const [isValidData, setIsValidData] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Handle Email Login Requests
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);


    const loginRequest = async () => {
      const response = await axios.post("/api/users/login", user);
      if (response.status === 200) {
        console.log("Response data:", response.data);
        return "Valid Credentials.";
      } else {
        throw new Error("Unexpected response. Please try again.");
      }
    };


    toast.promise(loginRequest(), {
      loading: 'Logging in...',
      success: <b>Successfully logged in!</b>,
      error: (err: unknown) => {
        if (
          err && 
          typeof err === "object" &&
          "response" in err &&
          err.response &&
          typeof err.response === "object" &&
          "data" in err.response &&
          typeof err.response.data === "object" &&
          err?.response?.data && "error" in err.response.data
        ) {
          const error = (err as { response: { data: { error: string } } }).response.data.error;
          return <b>{error}</b>;
        }
    
        return <b>Failed to login</b>;
      },
    })
      .then(() => {
        router.push("/"); // Navigate on success
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle OAuth Authentication Requests
  const handleOAuthLogin = async (provider: Provider) => {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.PUBLIC_BASE_URI}`,
      },
    });
    if (error) {
      toast.error(`An error occurred during ${provider} login. Please try again.`);
    }


  }
  useEffect(() => {
    setIsValidData(user.email.length > 0 && user.password.length > 6);
  }, [user]);


  return (
    <div className={"flex flex-col gap-6"}>
      <Toaster />
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                {providers.map((provider) => (
                  <Button
                    key={provider}
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      handleOAuthLogin(provider as Provider);
                    }}
                  >
                    <ProviderIcon provider={provider as Provider} />
                    {`Login with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
                  </Button>
                ))}

              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, email: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="/forget-password"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, password: e.target.value }))
                    } />
                </div>
                <Button type="submit" className="w-full" disabled={!isValidData || loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="underline underline-offset-4">
                  Sign up
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

export default LoginForm;