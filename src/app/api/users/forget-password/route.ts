import { supabaseClient } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
async function sendMagicLink(email: string) {
    const { data, error } = await supabaseClient.auth.signInWithOtp({
        email: email,
        options: {
            shouldCreateUser: true,
        },
    });

    return { data, error };
}
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return NextResponse.json(
                { error: "A valid email is required." },
                { status: 400 }
            );
        }

        const { data, error } = await sendMagicLink(email);

        if (error) {
            throw new Error(error.message || "Failed to send magic link.");
        }

        return NextResponse.json(
            { message: "Sent Login Link to Inbox.", success: true },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Magic link error:", error);
        return NextResponse.json(
            { error: error.message || "An error occurred." },
            { status: 500 }
        );
    }
}
