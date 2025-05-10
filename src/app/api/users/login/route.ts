import { NextRequest, NextResponse } from "next/server";
import { supabaseClient } from "@/config/dbConfig";

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

    // Return successful login response
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
