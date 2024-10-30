import type { NextRequest } from "next/server";
import { i18nRouter } from "next-i18n-router";
import { languageService } from "@/services/language";

export const loadConfig = async () =>
  languageService.getActiveLanguages().then(({ data }) => {
    const languages = data.data.map((lang) => lang.locale);
    return {
      locales: languages,
      defaultLocale:
        data.data.find((lang) => lang.default)?.locale || languages[0],
    };
  });

// export async function middleware(request: NextRequest) {
//   return i18nRouter(request, await loadConfig());
// }

export async function middleware(request: NextRequest) {
  return i18nRouter(request, {
    locales: ["uz", "en"],
    defaultLocale: "en",
  });
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
