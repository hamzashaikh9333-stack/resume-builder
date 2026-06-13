import { api } from "@/api/axios";
import { ApiResponse } from "@/interfaces/api.interface";
import { ENDPOINTS } from "@/api/endpoints";
import {
  AuthResponse,
  LoginBody,
  RegisterBody,
} from "@/interfaces/auth.interface";

export const authService = {
  register: async (body: RegisterBody) => {
    const { data } = await api.post<ApiResponse<AuthResponse>>(
      ENDPOINTS.REGISTER,
      body,
    );

    return data;
  },

  login: async (body: LoginBody) => {
    const { data } = await api.post<ApiResponse<AuthResponse>>(
      ENDPOINTS.LOGIN,
      body,
    );

    return data;
  },
  logout: async () => {
    const { data } = await api.post(ENDPOINTS.LOGOUT);

    return data;
  },
};
