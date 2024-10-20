import { createIntl } from "@formatjs/intl";
import fetcher from "@/lib/fetcher";
import { DefaultResponse } from "@/types/global";

const loadResources = async (locale: string) =>
  fetcher.get<DefaultResponse<Record<string, string>>>(
    `v1/rest/translations/paginate?lang=${locale}`,
    {
      headers: { "Access-Control-Allow-Origin": "*" },
    },
  );

export default async function getIntl(locale: string) {
  return createIntl({
    locale: locale,
    messages: await loadResources(locale).then(
      (response) => response.data.data,
    ),
  });
}
