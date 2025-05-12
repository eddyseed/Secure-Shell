'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabaseClient } from "@/config/dbConfig"
import { Provider } from "@supabase/auth-js"
import axios from "axios"
import { useRouter } from "next/navigation"

import React, { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast"

const SignupForm: React.FC = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [isValidData, setIsValidData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
            error: (err) => <b>{err.message || "Failed to signup."}</b>,
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
                                    Sign up for your Secure Shell account
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
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" className="w-full" onClick={() => { handleOAuthLogin('google') }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <span className="sr-only">Sign up with Google</span>
                                </Button>
                                <Button variant="outline" className="w-full" onClick={() => { handleOAuthLogin('github') }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.997.108-.774.418-1.305.76-1.605-2.665-.305-5.467-1.333-5.467-5.93 0-1.31.467-2.382 1.235-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.007-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.403c1.018.005 2.042.137 3.003.403 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.24 2.873.118 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.807 5.623-5.48 5.92.43.37.813 1.1.813 2.217 0 1.603-.015 2.893-.015 3.286 0 .32.19.694.8.576C20.565 21.796 24 17.303 24 12c0-6.627-5.373-12-12-12z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <span className="sr-only">Sign up with GitHub</span>
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <a href="#" className="underline underline-offset-4">
                                    Log in
                                </a>
                            </div>
                        </div>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="https://c.stocksy.com/a/T8p600/z9/1626537.jpg"
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