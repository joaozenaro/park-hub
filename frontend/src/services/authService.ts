import { ILoginForm } from "../models/ILoginForm";
import api from "./api";

interface ILoginResponse {
  user: any,
  token: string
}
function login(data: ILoginForm) {
  return api.post<ILoginResponse>("/login", {
    LoginForm: data
  })
}

export const authService = {
  login
}