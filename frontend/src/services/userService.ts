import { IUpdateUserForm } from "../models/IUpdateUserForm";
import { ISearchModel } from "../models/ISearchModel";
import { IUser } from "../models/IUser";
import api from "./api";

interface ICompleteSignupResponse {
  message: string;
}
interface ICompleteSignupPayload {
  id: number;
  token: string;
  name: string;
  username: string;
  password: string;
}
function completeSignup(data: ICompleteSignupPayload) {
  return api.post<ICompleteSignupResponse>("/complete-signup", {
    CompleteSignupForm: data,
  });
}

function update(id: number, data: Partial<IUpdateUserForm>) {
  return api.patch<IUser>("/user/update/" + id, {
    Profile: data,
  });
}

interface ISignupResponse {
  message: string;
}
interface ISignupPayload {
  email: string;
  role: string;
}
function signup(data: ISignupPayload) {
  return api.post<ISignupResponse>("/signup", {
    SignupForm: data,
  });
}

function search(data?: ISearchModel) {
  return api.post<IUser[]>(
    "/user/search",
    data ? { SearchModel: data } : {}
  );
}

export const userService = {
  signup,
  completeSignup,
  update,
  search,
};
