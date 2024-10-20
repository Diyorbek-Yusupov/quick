"use client";
import { useIntl } from "react-intl";

function Compo() {
  const { formatMessage } = useIntl();
  return (
    <div>
      <h1>Testing</h1>
      <p>{formatMessage({ id: "cant_find_the_answer" })}</p>
    </div>
  );
}

export default Compo;
