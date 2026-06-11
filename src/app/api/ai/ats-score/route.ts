import { generateAiContent } from "@/lib/gemin";
import { AtsScoreBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: AtsScoreBody = await req.json();

    const {resumeText } = body;

    if (!resumeText) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "resume text not provided",
        },
        { status: 400 },
      );
    }

 const prompt = `
You are an expert ATS (Applicant Tracking System) analyzer, resume reviewer, and technical recruiter.

Analyze the following resume and provide a detailed ATS evaluation.

Resume Text:
${resumeText}

Rules:
1. Evaluate the resume as if it were being screened by a modern ATS.
2. Score the resume on a scale from 0 to 100.
3. Consider:
   - Resume summary quality
   - Skills section relevance
   - Work experience quality
   - Project descriptions
   - Use of action verbs
   - ATS keyword optimization
   - Readability and formatting
   - Professional language
   - Technical relevance
   - Overall completeness
4. Provide strengths and weaknesses.
5. Provide actionable recommendations.
6. Do NOT invent information that is not present in the resume.
7. Keep feedback concise and professional.
8. Return ONLY valid JSON.
9. Do NOT wrap the response in markdown or code blocks.
10. Do NOT include explanations outside the JSON.

Output Format:
{
  "score": 85,
  "rating": "Good",
  "summary": "Brief overall assessment of the resume.",
  "strengths": [
    "Strength 1",
    "Strength 2",
    "Strength 3"
  ],
  "weaknesses": [
    "Weakness 1",
    "Weakness 2",
    "Weakness 3"
  ],
  "suggestions": [
    "Suggestion 1",
    "Suggestion 2",
    "Suggestion 3"
  ]
}
`;

    const result = await generateAiContent(prompt);

    const atsScore = result;

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "ATS score generated successfully",
        data: { atsScore },
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("error in ats score api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
