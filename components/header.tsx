"use client";
import { useIntl } from "react-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/assets/icons/logo";
import { Button } from "@/components/ui/button";
import LoginIcon from "@/assets/icons/login-icon";
import useUserStore from "@/global-store/user";
import ProfileMenu from "@/components/profile-menu";

function Header() {
  const { formatMessage } = useIntl();
  const pathname = usePathname();
  const currentUser = useUserStore((state) => state.user);
  const isLoginPage = pathname.includes("/login");
  return (
    <header className="container-box py-4 flex justify-between items-center sticky top-0">
      <Link href="/">
        <Logo />
      </Link>
      <nav className="flex items-center">
        {currentUser ? (
          <ProfileMenu user={currentUser} />
        ) : (
          <Button asChild variant="muted">
            <Link href={isLoginPage ? "/sign-up" : "/login"}>
              <LoginIcon />{" "}
              {formatMessage({ id: isLoginPage ? "sign.up" : "login" })}
            </Link>
          </Button>
        )}
      </nav>
    </header>
  );
}

export default Header;
