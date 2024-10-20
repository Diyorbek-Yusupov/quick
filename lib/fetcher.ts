import xior, { XiorInterceptorRequestConfig } from "xior";
import { getCookie } from "cookies-next";
import { BASE_URL } from "@/config/global";

const fetcher = xior.create({
  baseURL: BASE_URL,
  cache: "no-cache",
});

fetcher.interceptors.request.use((config: XiorInterceptorRequestConfig) => {
  config.headers.Authorization = getCookie("token");
  return config;
});

export default fetcher;
