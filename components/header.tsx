"use client";
import { useIntl } from "react-intl";
import Link from "next/link";
import Logo from "@/assets/icons/logo";
import { Button } from "@/components/ui/button";
import LoginIcon from "@/assets/icons/login-icon";

function Header() {
  const { formatMessage } = useIntl();
  return (
    <header className="container-box py-4 flex justify-between items-center sticky top-0">
      <Link href="/">
        <Logo />
      </Link>
      <nav className="flex items-center">
        <Button variant="muted">
          <LoginIcon /> {formatMessage({ id: "login" })}
        </Button>
      </nav>
    </header>
  );
}

export default Header;
