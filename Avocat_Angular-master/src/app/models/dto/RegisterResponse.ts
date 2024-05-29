import { User } from "../user";

export interface RegisterResponse {
    user: User;
    token: string;
  }
  