import { api } from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import type { ResumeFormData } from "@/schemas/resume.schema";
import { ApiResponse } from "@/interfaces/api.interface";

import { Resume, ResumeResponse } from "@/interfaces/resume.interface";

export const resumeService = {
  createResume: async (body: ResumeFormData) => {
    const { data } = await api.post<ApiResponse<ResumeResponse>>(
      ENDPOINTS.CREATE_RESUME,
      body,
    );

    return data;
  },

  getResume: async (resumeId: string) => {
    const { data } = await api.get<ApiResponse<ResumeResponse>>(
      ENDPOINTS.GET_RESUME(resumeId),
    );

    return data;
  },
  getResumes: async () => {
    const { data } = await api.get<ApiResponse<Resume[]>>(
      ENDPOINTS.GET_RESUMES,
    );

    return data;
  },
  updateResume: async (resumeId: string, body: ResumeFormData) => {
    const { data } = await api.patch<ApiResponse<ResumeResponse>>(
      ENDPOINTS.UPDATE_RESUME(resumeId),
      body,
    );

    return data;
  },
  deleteResume: async (resumeId: string) => {
    const { data } = await api.delete(ENDPOINTS.DELETE_RESUME(resumeId));

    return data;
  },
};
