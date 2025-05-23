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

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return NextResponse.json(
                { error: "Invalid User Credentials" },
                { status: 401 }
            );
        }

        const user = data?.user;
        const token = data?.session?.access_token;

        if (!user) {
            return NextResponse.json(
                { error: "User does not exist" },
                { status: 404 }
            );
        }

        if (!token) {
            return NextResponse.json(
                { error: "Failed to fetch token" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Logged In successfully", success: true, data: user },
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
