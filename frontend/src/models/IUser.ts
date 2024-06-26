import { IRole } from "./IRole";

export interface IUser {
  id: number;
  username: string;
  name: string;
  avatar: string;
  access_token_expired_at: string | null;
  email: string;
  unconfirmed_email: string | null;
  confirmed_at: string | null;
  registration_ip: string | null;
  last_login_at: string | null;
  last_login_ip: string | null;
  blocked_at: string | null;
  status: number;
  role: IRole;
  created_at: string;
  updated_at: string;
}
