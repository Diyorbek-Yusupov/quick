"use client";

import { useIntl } from "react-intl";

interface TranslationProps {
  translationKey: string;
}

function Translation({ translationKey }: TranslationProps) {
  const { formatMessage } = useIntl();
  return formatMessage({ id: translationKey });
}

export default Translation;
