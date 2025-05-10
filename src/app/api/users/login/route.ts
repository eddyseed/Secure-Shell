import { NextRequest, NextResponse } from "next/server";
import { supabaseClient } from "@/config/dbConfig";
import { Resend } from 'resend';



async function sendVerificationCode(email: string) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'randomboiii069@gmail.com',
            subject: 'Secure Shell - OTP Verification',
            html: `<h1>Your OTP Code for Secure Shell ${otp}</h1>`,
            text: `Your OTP is ${otp}`
        });
    } catch (error) {
        console.error("Failed to send email:", error);
        throw new Error("Failed to send verification code to the email.");
    }

}

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
        const { email, password } = reqBody;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required." },
                { status: 400 }
            );
        }

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });

        // Handle Supabase error
        if (error) {
            return NextResponse.json(
                { error: error.message || "Authentication failed." },
                { status: 401 }
            );
        }

        const user = data?.user;

        if (!user) {
            return NextResponse.json(
                { error: "User does not exist." },
                { status: 404 }
            );
        }

        const token = data?.session?.access_token;
        if (!token) {
            return NextResponse.json(
                { error: "Failed to get token." },
                { status: 500 }
            );
        }

        // To send OTP to the user's email
        await sendVerificationCode(email).then(() => {
            console.log("Verification code sent to email:", email);
        }
        ).catch((error) => {
            console.error("Error sending verification code:", error);
            return NextResponse.json(
                { error: "Failed to send verification code." },
                { status: 500 }
            );
        }
        );

        




        return NextResponse.json(
            { message: "Logged In successfully.", success: true, data: user },
            { status: 200 }
        );

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "An error occurred." },
            { status: 500 }
        );
    }
}
