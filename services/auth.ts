import {
  SignInCredentials,
  SignInResponse,
  SocialLoginCredentials,
} from "@/types/user";
import fetcher from "@/lib/fetcher";
import { DefaultResponse } from "@/types/global";

export const authService = {
  login: async (body: SignInCredentials) =>
    fetcher.post<DefaultResponse<SignInResponse>>("v1/auth/login", body),
  socialLogin: async (body: SocialLoginCredentials) =>
    fetcher.post<DefaultResponse<SignInResponse>>(
      `v1/auth/${body.type}/callback`,
      body.data,
    ),
};
