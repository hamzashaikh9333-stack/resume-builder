import { generateAiContent } from "@/lib/gemin";
import { ImproveContentBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: ImproveContentBody = await req.json();

    const { content } = body;

    if (!content) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "No content provided",
        },
        { status: 400 },
      );
    }

    const prompt = `
You are an expert ATS resume writer, recruiter, and career coach.

Improve the following resume content to make it more professional, impactful, and ATS-friendly.

Content:
${content}

Rules:
1. Return ONLY the improved content.
2. Do NOT include explanations, notes, suggestions, headings, or markdown.
3. Preserve the original meaning and intent of the content.
4. Improve grammar, clarity, readability, and professionalism.
5. Use strong action verbs where appropriate.
6. Optimize the content for Applicant Tracking Systems (ATS).
7. Incorporate industry-standard resume language and keywords naturally.
8. Remove unnecessary words, repetition, and weak phrases.
9. Make achievements and responsibilities sound more impactful without inventing false information.
10. Keep the content concise and resume-friendly.
11. Maintain the same perspective as the original content.
12. If the content contains bullet points, return improved bullet points.
13. If the content is a paragraph, return an improved paragraph.
14. Do NOT add skills, technologies, certifications, experience, achievements, or qualifications that are not explicitly mentioned in the original content.
15. Do NOT fabricate metrics, percentages, company names, job titles, or accomplishments.
16. Ensure the final content is suitable for direct placement in a professional resume.

Output:
Return only the improved ATS-friendly content.
`;

    const result = await generateAiContent(prompt);

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Content improved successfully",
        data: {
          content: result,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("error in Improve content api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
