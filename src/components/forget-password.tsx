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
import { useEffect, useState } from "react"

import React from 'react';
import toast, { Toaster } from "react-hot-toast";

const ForgetPasswordForm: React.FC = () => {
    const [isValidData, setIsValidData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const sendLoginLink = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
    
        // Wrap the axios request in a Promise to use with toast.promise
        const sendRequest = async () => {
            const response = await axios.post("/api/users/forget-password", { email: email });
            if (response.status === 200) {
                return "Successfully sent a login link to your inbox.";
            } else {
                throw new Error("Unexpected response. Please try again.");
            }
        };
    
        // Use toast.promise with the sendRequest function
        toast.promise(sendRequest(), {
            loading: 'Sending login link...',
            success: <b>Login link sent successfully!</b>,
            error: (err) => <b>{err.message || "Failed to send the login link."}</b>,
        })
        .finally(() => {
            setLoading(false);
        });
    };
    useEffect(() => {
        setIsValidData(email.length > 0);
    }, [email]);

    return (
        <div className={"flex flex-col gap-6"}>
            <Toaster />
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">
                        Password Recovery
                    </CardTitle>
                    <CardDescription>
                        Enter your email to send login link
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={sendLoginLink}>
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="eddy@example.com"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={!isValidData}>
                                    {loading ? "Loading..." : "Continue"}
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                <a href="/login" className="underline underline-offset-4">
                                    Go Back
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ForgetPasswordForm;