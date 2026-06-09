import { generateToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import userModel from "@/models/user.model";
import { ApiResponse } from "@/types/api.types";
import { LoginBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body: LoginBody = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Please fill all the fields",
        },
        { status: 400 },
      );
    }

    const isExisted = await userModel.findOne({ email });

    if (!isExisted) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "User does not exist",
        },
        { status: 404 },
      );
    }
    const matchePass = isExisted.comparePassword(password);

    if (!matchePass) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 },
      );
    }

    const token = generateToken({ userId: isExisted._id.toString() });

    const response = NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Login successful",
        data: {
          user: {
            _id: isExisted._id,
            name: isExisted.name,
            email: isExisted.email,
            mobile: isExisted.mobile,
          },
        },
      },
      { status: 200 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    return response;
  } catch (error) {
    console.error("Error in Login:", error);
  }
}
