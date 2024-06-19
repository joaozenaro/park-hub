import { IApiResponse } from "../models/IApiResponse";
import { ILoginForm } from "../models/ILoginForm";
import api from "./api";

interface ILoginResponse {
  id: number,
  access_token: string
}
function login(data: ILoginForm) {
  return api.post<IApiResponse<ILoginResponse>>("/login", {
    LoginForm: data
  })
}

export const authService = {
  login
}