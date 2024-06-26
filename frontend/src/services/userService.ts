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
    ProfileForm: data,
  });
}

function deleteUser(id: number) {
  return api.delete<IUser>("/user/delete/" + id);
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
interface ISearchUserResponse {
  records: IUser[];
  total_count: number;
}
function search(data?: ISearchModel) {
  return api.post<ISearchUserResponse>(
    "/user/search",
    data ? { SearchModel: data } : {}
  );
}

export const userService = {
  signup,
  completeSignup,
  update,
  delete: deleteUser,
  search,
};
