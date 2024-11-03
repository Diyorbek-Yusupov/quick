import {
  SignInCredentials,
  SignInResponse,
  SignUpCredentials,
  SignUpVerifyResponse,
  SocialLoginCredentials,
} from "@/types/user";
import fetcher from "@/lib/fetcher";
import { DefaultResponse } from "@/types/global";

export const authService = {
  signUp: async (body: { email: string }) =>
    fetcher.post<DefaultResponse<SignInResponse>>("v1/auth/register", body),
  signUpVerifyEmail: async (body: { otp: string }) =>
    fetcher.get<DefaultResponse<SignUpVerifyResponse>>(`v1/auth/verify/${body.otp}`),
  signUpComplete: async (body: SignUpCredentials) =>
    fetcher.post<DefaultResponse<SignInResponse>>("v1/auth/after-verify", body),
  login: async (body: SignInCredentials) =>
    fetcher.post<DefaultResponse<SignInResponse>>("v1/auth/login", body),
  socialLogin: async (body: SocialLoginCredentials) =>
    fetcher.post<DefaultResponse<SignInResponse>>(`v1/auth/${body.type}/callback`, body.data),
  phoneSignUpComplete: async (body: SignUpCredentials) =>
    fetcher.post<DefaultResponse<SignInResponse>>("v1/auth/verify/phone", body),
};
