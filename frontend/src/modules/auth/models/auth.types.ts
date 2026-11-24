export interface LoginRequest {
    identifier: string;
    password: string;
  }
  
  export interface LoginResponseData {
    username?: string;
    email?: string;
    phone?: string;
    role?: string;
    status?: string;
    loginMethod?: "USERNAME" | "PHONE" | "EMAIL" | "GOOGLE" | string;
    accessToken?: string;
    expiresAt?: string;
  }
  
  /** Hỗ trợ cả trường hợp Spring Boot trả thẳng LoginResponse hoặc bọc trong { data: LoginResponse } */
  export type LoginResponse = LoginResponseData & {
    data?: LoginResponseData;
    message?: string;
  };
  
  export interface AuthSessionUser {
    username?: string;
    email?: string;
    phone?: string;
    role?: string;
    status?: string;
    loginMethod?: string;
    expiresAt?: string;
  }