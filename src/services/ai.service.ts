import { api } from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import { ApiResponse } from "@/interfaces/api.interface";

import {
  AtsScoreBody,
  AtsScoreResponse,
  ExperienceResponse,
  GenerateExperienceBody,
  GenerateProjectDescriptionBody,
  GenerateSkillsBody,
  GenerateSummaryBody,
  ImproveContentBody,
  ImproveContentResponse,
  ProjectDescriptionResponse,
  SkillsResponse,
  SummaryResponse,
} from "@/interfaces/ai.interface";

export const aiService = {
  generateSummary: async (body: GenerateSummaryBody) => {
    const { data } =
      await api.post<ApiResponse<SummaryResponse>>(
        ENDPOINTS.GENERATE_SUMMARY,
        body
      );

    return data;
  },

  generateSkills: async (body: GenerateSkillsBody) => {
    const { data } =
      await api.post<ApiResponse<SkillsResponse>>(
        ENDPOINTS.GENERATE_SKILLS,
        body
      );

    return data;
  },

  generateProjectDescription: async (
    body: GenerateProjectDescriptionBody
  ) => {
    const { data } =
      await api.post<ApiResponse<ProjectDescriptionResponse>>(
        ENDPOINTS.GENERATE_PROJECT_DESCRIPTION,
        body
      );

    return data;
  },

  generateExperience: async (
    body: GenerateExperienceBody
  ) => {
    const { data } =
      await api.post<ApiResponse<ExperienceResponse>>(
        ENDPOINTS.GENERATE_EXPERIENCE,
        body
      );

    return data;
  },

  improveContent: async (
    body: ImproveContentBody
  ) => {
    const { data } =
      await api.post<ApiResponse<ImproveContentResponse>>(
        ENDPOINTS.IMPROVE_CONTENT,
        body
      );

    return data;
  },

  atsScore: async (body: AtsScoreBody) => {
    const { data } =
      await api.post<ApiResponse<AtsScoreResponse>>(
        ENDPOINTS.ATS_SCORE,
        body
      );

    return data;
  },
};