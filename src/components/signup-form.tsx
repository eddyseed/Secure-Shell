'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabaseClient } from "@/config/dbConfig"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Provider } from "@supabase/auth-js";
import { ProviderIcon } from "@/components/provider-icon";
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast"
import { useAppMetadata } from "@/context/AppMetadataContext"

const SignupForm: React.FC = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const {APP_NAME, OAUTH_PROVIDERS, SIGNUP_IMG_LINK} = useAppMetadata();
    const providers = OAUTH_PROVIDERS
    const [isValidData, setIsValidData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmedPassword, setConfirmedPassword] = useState('');
    // const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);


        const signupRequest = async () => {
            const response = await axios.post("/api/users/signup", user);
            if (response.status === 200) {
                console.log("Response data:", response.data);
                return "Valid Credentials.";
            } else {
                throw new Error("Unexpected response. Please try again.");
            }

        };
        toast.promise(signupRequest(), {
            loading: 'Taking you there...',
            success: <b>Please check the inbox of {user.email} for further instructions.</b>,
            error: (err: unknown) => {
                if (
                  typeof err === "object" &&
                  err !== null &&
                  "response" in err &&
                  typeof (err as any).response === "object" &&
                  "data" in (err as any).response &&
                  typeof (err as any).response.data === "object" &&
                  "error" in (err as any).response.data
                ) {
                  return <b>{(err as any).response.data.error}</b>;
                }
        
                return <b>Failed to signup</b>;
              },
            })
            .then(() => {
                router.push("/verify-email");
            })
            .finally(() => {
                setLoading(false);
            });
    }
    const handleOAuthLogin = async (provider: Provider) => {
        setLoading(true);
        const { error } = await supabaseClient.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${process.env.PUBLIC_BASE_URI}`,
            },
        });
        if (error) {
            toast.error("GitHub OAuth error");
        }


    }
    useEffect(() => {
        setIsValidData(user.email.length > 0 && user.password.length > 0 && user.password == confirmedPassword);
    }, [user, confirmedPassword]);


    return (
        <div className={"flex flex-col gap-6"}>
            <Toaster />
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" onSubmit={handleSignup}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Create an account</h1>
                                <p className="text-balance text-muted-foreground">
                                    Sign up for your {APP_NAME} account
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    onChange={(e) =>
                                        setUser((prev) => ({ ...prev, email: e.target.value }))
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" required
                                    onChange={(e) =>
                                        setUser((prev) => ({ ...prev, password: e.target.value }))
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input id="confirm-password" type="password" required
                                    onChange={(e) =>
                                        setConfirmedPassword(e.target.value)
                                    } />
                            </div>
                            <Button type="submit" className="w-full" disabled={!isValidData || loading}>
                                {loading ? "Signing Up..." : "Sign Up"}
                            </Button>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                    Or sign up with
                                </span>
                            </div>
                            <div className="grid grid-rows-2 gap-4">
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
                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <a href="/login" className="underline underline-offset-4">
                                    Log in
                                </a>
                            </div>
                        </div>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src={SIGNUP_IMG_LINK}
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking sign up, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
};

export default SignupForm;