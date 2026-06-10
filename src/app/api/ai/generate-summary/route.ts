import { generateAiContent } from "@/lib/gemin";
import { GenerateSummaryBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateSummaryBody = await req.json();

    const { experienceLevel, skills, jobTitle } = body;

    if (!experienceLevel || !skills || !jobTitle) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Please fill all the fields",
        },
        { status: 400 },
      );
    }

    const prompt = `
You are an expert ATS resume writer and professional career coach.

Generate a highly professional, ATS-friendly resume summary based on the information provided.

Job Title: ${jobTitle}
Experience Level: ${experienceLevel}
Skills: ${skills}

Rules:
1. Return ONLY the resume summary text.
2. Do NOT include headings, titles, labels, bullet points, markdown, or explanations.
3. Write in a professional and confident tone.
4. Optimize for ATS (Applicant Tracking Systems) by naturally incorporating the provided job title and skills.
5. Highlight relevant expertise, strengths, achievements potential, and value to employers.
6. Use industry-standard keywords related to the role.
7. Keep the summary between 50-80 words.
8. Write in third-person professional resume style without using "I", "me", or "my".
9. Make the summary concise, impactful, and suitable for direct placement in a resume.
10. If experience level is "Fresher" or "Entry Level", focus on skills, projects, learning ability, and career potential rather than work experience.

Output:
Return only the final resume summary.
`;

    const result = await generateAiContent(prompt);

    const summary = result;

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Summary generated successfully",
        data: { summary },
      },
      { status: 201 },
    )
  } catch (error) {
    console.log("error in Generate Summary api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
