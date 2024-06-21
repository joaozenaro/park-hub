import { ILoginForm } from "../models/ILoginForm";
import api from "./api";

interface ILoginResponse {
  user: any;
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

export const authService = {
  login,
  validateToken,
};
