import { ILoginForm } from "../models/ILoginForm";
import { IUser } from "../models/IUser";
import { IPasswordResetPayload } from "../models/IPasswordResetPayload";
import api from "./api";

interface ILoginResponse {
  user: IUser;
  token: string;
}

function login(data: ILoginForm) {
  return api.post<ILoginResponse>("/login", {
    LoginForm: data,
  });
}

function validateToken() {
  return api.get<string>("/user/validate-token");
}

interface IPasswordResetResponse {
  user: any,
  token: string
}

function resetPassword(data: IPasswordResetPayload) {
  return api.post<IPasswordResetResponse>("/password-reset", {
    PasswordResetForm: data
  })
}

export const authService = {
  login,
  validateToken,
  resetPassword
};
