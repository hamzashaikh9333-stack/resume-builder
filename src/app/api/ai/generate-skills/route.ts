import { generateAiContent } from "@/lib/gemin";
import { GenerateSkillsBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateSkillsBody = await req.json();

    const { experienceLevel, jobTitle } = body;

    if (!experienceLevel || !jobTitle) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Please fill all the fields",
        },
        { status: 400 },
      );
    }

    const prompt = `
You are an expert resume writer and technical recruiter.

Generate a list of relevant technical skills based on the provided job title and experience level.

Job Title: ${jobTitle}
Experience Level: ${experienceLevel}

Rules:
1. Return ONLY technical skills.
2. Do NOT include soft skills such as communication, teamwork, leadership, problem-solving, adaptability, etc.
3. Include programming languages, frameworks, libraries, databases, cloud technologies, development tools, testing tools, and other job-related technical skills.
4. Prioritize skills that are currently in demand and ATS-friendly.
5. Return between 10 and 20 skills.
6. Do NOT include any explanations, headings, categories, numbering, or bullet points.
7. Return the skills as a comma-separated list.
8. Ensure all skills are relevant to the specified job title and experience level.
9. Avoid duplicate skills.
10. Use industry-standard skill names.

Output:
Return only the comma-separated technical skills.
`;
    const result = await generateAiContent(prompt);

    if (!result) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "No response received from AI",
        },
        { status: 500 },
      );
    }

    const skills = result
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Skills generated successfully",
        data: { skills },
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("error in Generate Skills api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
