import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import resumeModel from "@/models/resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> },
) {
  try {
    await connectDB();
    const userId = await getCurrentUser();

    const { resumeId } = await params;

    const resume = await resumeModel.findOne({
      user_id: userId,
      _id: resumeId,
    });

    if (!resume) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Resume not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resume fetched successfully",
        data: resume,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("error in get resume", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Error in getting resume",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> },
) {
  try {
    await connectDB();
    const userId = await getCurrentUser();

    const { resumeId } = await params;

    const resume = await resumeModel.findOne({
      user_id: userId,
      _id: resumeId,
    });

    if (!resume) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Resume not found",
        },
        { status: 404 },
      );
    }

    const body = await req.json();
    const updatedResume = await resumeModel.findOneAndUpdate(
      {
        user_id: userId,
        _id: resumeId,
      },
      {
        $set: body,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resume updated successfully",
        data: {updatedResume},
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("error in update resume", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Error in updating resume",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    await connectDB();

    const userId = await getCurrentUser();

    const { resumeId } = await params;

    const resume =
      await resumeModel.findOneAndDelete({
        user_id: userId,
        _id: resumeId,
      });

    if (!resume) {
      return NextResponse.json(
        {
          success: false,
          message: "Resume not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Resume deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error deleting resume",
      },
      { status: 500 }
    );
  }
}