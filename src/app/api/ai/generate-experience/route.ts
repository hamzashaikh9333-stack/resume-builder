import { generateAiContent } from "@/lib/gemin";
import { GenerateExperienceBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateExperienceBody = await req.json();

    const { experienceLevel, yearOfExperience, techStack ,jobRole} = body;

    if (!experienceLevel || !yearOfExperience || !techStack || !jobRole) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Please fill all the fields",
        },
        { status: 400 },
      );
    }

const prompt = `
You are an expert ATS resume writer, technical recruiter, and career consultant.

Generate professional, ATS-friendly work experience entries based on the provided information.

Job Role: ${jobRole}
Experience Level: ${experienceLevel}
Years of Experience: ${yearOfExperience}
Tech Stack: ${techStack}

Rules:
1. Generate 2-3 realistic work experience entries.
2. Experience must align with the specified job role, experience level, and years of experience.
3. Use the provided tech stack naturally throughout the experience descriptions.
4. Focus on responsibilities, technical contributions, achievements, and business impact relevant to the job role.
5. Use strong action verbs and ATS-friendly keywords.
6. Include measurable achievements whenever appropriate.
7. Do NOT generate unrealistic accomplishments.
8. Do NOT use fake company names.
9. Instead of company names, use company types such as:
   - Technology Startup
   - SaaS Company
   - E-commerce Platform
   - FinTech Company
   - Enterprise Software Company
   - Digital Agency
10. Keep descriptions concise and professional.
11. Each experience entry must contain:
    - Job Title
    - Company Type
    - Employment Type
    - Duration
    - Description
12. Description must contain 3-5 resume-style bullet points.
13. Tailor the experience based on the experience level:
    - Fresher:
      * Internships
      * Freelance work
      * Academic projects
      * Open-source contributions
      * Practical training
    - Junior:
      * Feature development
      * Bug fixing
      * API integration
      * Testing and maintenance
    - Mid-Level:
      * Ownership of modules
      * Performance optimization
      * System integration
      * Mentoring juniors
    - Senior:
      * Architecture design
      * Technical leadership
      * Scalability improvements
      * Team collaboration
      * Strategic technical decisions
14. Ensure all descriptions are relevant to the provided job role.
15. Return ONLY valid JSON.
16. Do NOT wrap the response in markdown or code blocks.
17. Do NOT include explanations, notes, or extra text.

Output Format:
{
  "experience": [
    {
      "jobTitle": "Job Title",
      "companyType": "Technology Startup",
      "employmentType": "Full-Time",
      "duration": "2023 - Present",
      "description": [
        "Achievement or responsibility 1",
        "Achievement or responsibility 2",
        "Achievement or responsibility 3",
        "Achievement or responsibility 4"
      ]
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

    const experience = JSON.parse(result);

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "experience generated successfully",
        data: experience,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("error in Generate experience api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
