import { ILoginForm } from "../models/ILoginForm";
import { IUser } from "../models/IUser";
import { IPasswordResetPayload } from "../models/IPasswordResetPayload";
import api from "./api";
import { IApiResponse } from "../models/IApiResponse";

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

function resetPassword(data: IPasswordResetPayload) {
  return api.post<string>("/password-reset", {
    PasswordResetForm: data
  })
}
interface IRequestPasswordChangeResponse {
  message: string;
}
function requestPasswordChange(email: String) {
  return api.post<IApiResponse<IRequestPasswordChangeResponse>>("/request-password-reset", {
    email
  })
}


export const authService = {
  login,
  requestPasswordChange,
  validateToken,
  resetPassword
};
