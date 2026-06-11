export interface RegisterBody {
  name: string;
  email: string;
  password: string;
  mobile?: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  mobile?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
}