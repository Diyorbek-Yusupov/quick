export interface DefaultResponse<T> {
  data: T;
  message: string;
  status: boolean;
  timestamp: string;
}

export interface LanguageConfig {
  active: number;
  backward: number;
  default: number;
  id: number;
  img: string;
  locale: string;
  title: string;
}

export enum Dirs {
  LTR = "ltr",
  RTL = "rtl",
}

export enum SignUpViews {
  SIGNUP = "SIGNUP",
  VERIFY = "VERIFY",
  COMPLETE = "COMPLETE",
}
