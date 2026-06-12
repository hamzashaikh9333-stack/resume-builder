import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import resumeModel from "@/models/resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const userId = await getCurrentUser();

    const resumes = await resumeModel
      .find({
        user_id: userId,
      })
      .sort({ updatedAt: -1 });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resumes fetched successfully",
        data: resumes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in get resumes", error);

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Error fetching resumes",
      },
      { status: 500 }
    );
  }
}