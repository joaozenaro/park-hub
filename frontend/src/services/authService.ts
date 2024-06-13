import { ILoginForm } from "../models/ILoginForm";
import api from "./api";

function login(data: ILoginForm) {
  return api.post("/user/login", {
    LoginForm: data
  })
}

export const authService = {
  login
}