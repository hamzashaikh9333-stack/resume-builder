import { api } from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import type { ResumeFormData } from "@/schemas/resume.schema";
import { ApiResponse } from "@/interfaces/api.interface";

import {
  
  ResumeResponse,
} from "@/interfaces/resume.interface";

export const resumeService = {
  createResume: async (
    body: ResumeFormData
  ) => {
    const { data } =
      await api.post<ApiResponse<ResumeResponse>>(
        ENDPOINTS.CREATE_RESUME,
        body
      );

    return data;
  },

  getResume: async (resumeId: string) => {
    const { data } =
      await api.get<ApiResponse<ResumeResponse>>(
        ENDPOINTS.GET_RESUME(resumeId)
      );

    return data;
  },
};