import { generateAiContent } from "@/lib/gemin";
import { GenerateProjectDescriptionBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateProjectDescriptionBody = await req.json();

    const { experienceLevel, jobTitle, techStack } = body;

    if (!experienceLevel || !jobTitle || !techStack) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Please fill all the fields",
        },
        { status: 400 },
      );
    }

    const prompt = `
You are an expert technical resume writer and software engineering recruiter.

Generate professional, ATS-friendly resume project entries based on the provided information.

Job Title: ${jobTitle}
Experience Level: ${experienceLevel}
Tech Stack: ${techStack}

Rules:
1. Generate 3 realistic and industry-relevant software projects.
2. Projects must be appropriate for the specified job title and experience level.
3. Use the provided tech stack naturally in each project.
4. Each project should sound like a real portfolio or professional project.
5. Focus on technical implementation, features, architecture, performance, APIs, databases, authentication, integrations, deployment, or automation where applicable.
6. Use strong action verbs and ATS-friendly technical keywords.
7. Do NOT generate fake company names, fake employment history, or unrealistic achievements.
8. Keep project descriptions concise and professional.
9. Each project must include:
   - Project Name
   - Tech Stack
   - Description
10. Description should be 2-4 resume-style bullet points highlighting technical accomplishments.
11. Avoid generic descriptions such as "built a website" or "created an app."
12. Make projects unique from one another.
13. Tailor complexity according to experience level:
    - Fresher/Entry Level: portfolio-worthy projects with practical features.
    - Mid Level: production-style applications with scalability and integrations.
    - Senior Level: complex systems, architecture, optimization, cloud, and distributed systems.
14. Return ONLY valid JSON.
15. Do NOT wrap the response in markdown or code blocks.

Output Format:
{
  "projects": [
    {
      "title": "Project Name",
      "description": "Project description",
      "techStack": ["React", "Node.js"],
      "githubLink": "",
      "liveLink": ""
    }
  ]
}
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

    const projects = JSON.parse(result);

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Project description generated successfully",
        data: projects,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("error in Generate Project Description api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
