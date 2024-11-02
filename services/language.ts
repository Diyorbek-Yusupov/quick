import fetcher from "@/lib/fetcher";
import { DefaultResponse, LanguageConfig } from "@/types/global";

export const languageService = {
  getActiveLanguages: () =>
    fetcher.get<DefaultResponse<LanguageConfig[]>>("v1/rest/languages/active", {
      next: { revalidate: 10 },
    }),
};
