"use client";

import { IntlProvider } from "react-intl";

interface ServerIntlProviderProps {
  messages: Record<string, string>;
  locale: string;
  children: React.ReactNode;
}

export default function ServerIntlProvider({
  messages,
  locale,
  children,
}: ServerIntlProviderProps) {
  return (
    <IntlProvider
      onError={(err) => {
        if (err.code === "MISSING_TRANSLATION") return;
        throw err;
      }}
      messages={messages}
      locale={locale}
    >
      {children}
    </IntlProvider>
  );
}
