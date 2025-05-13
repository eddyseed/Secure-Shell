import { NextRequest, NextResponse } from "next/server";
import { supabaseClient } from "@/config/dbConfig";
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${process.env.PUBLIC_BASE_URI}/` || "https://secureshell.vercel.app"
            }
        });

        if (error) {
            console.error(error)
            return NextResponse.json(
                { error: error.message || "Authentication failed" },
                { status: 401 }
            );
        }

        const user = data?.user;

        if (!user) {
            return NextResponse.json(
                { error: "User does not exist" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Signup successful", success: true, data: user },
            { status: 200 }
        );

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: "An error occurred" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 500 }
        );
    }
}