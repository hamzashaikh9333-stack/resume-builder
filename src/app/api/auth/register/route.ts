import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { RegisterBody } from "@/types/user.types";
import { ApiResponse } from "@/types/api.types";
import userModel from "@/models/user.model";
import { generateToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body: RegisterBody = await req.json();

    const { name, email, password, mobile } = body;

    if (!name || !email || !password) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Please fill all the fields",
        },
        { status: 400 },
      );
    }

    const isExisted = await userModel.findOne({ email });

    if (isExisted) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 },
      );
    }

    const newUser = await userModel.create({
      name,
      email,
      password,
      mobile,
    });

    const token = generateToken({ userId: newUser._id.toString() });

    const response = NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "User registered successfully",
        data: {
          user: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            mobile: newUser.mobile,
          },
        },
      },
      { status: 201 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
        error:{error}
      },
      { status: 500 },
    );
  }
}
