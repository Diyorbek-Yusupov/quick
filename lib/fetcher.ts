import xior, {
  XiorInterceptorRequestConfig,
  XiorResponseInterceptorConfig,
} from "xior";
import { deleteCookie, getCookie } from "cookies-next";
import { BASE_URL } from "@/config/global";
import { userActionOutsideOfComponent } from "@/global-store/user";
import { redirect } from "next/navigation";

const fetcher = xior.create({
  baseURL: BASE_URL,
  cache: "no-cache",
});

fetcher.interceptors.request.use((config: XiorInterceptorRequestConfig) => {
  config.headers.Authorization = getCookie("token");
  return config;
});

fetcher.interceptors.response.use(
  (result) => result,
  async (error) => {
    const errorResponse = error.response?.data;
    let errorMessage = errorResponse.message;
    if (errorResponse?.params) {
      errorMessage = Object.values(
        errorResponse.params as Record<string, string[]>,
      )?.[0]?.[0];
    }
    if (error.response?.status === 401) {
      userActionOutsideOfComponent({ user: null });
      deleteCookie("token");
      return redirect("/");
    }

    throw new Error(errorMessage);
  },
);

export default fetcher;
