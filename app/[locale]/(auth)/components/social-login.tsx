import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useIntl } from "react-intl";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/assets/icons/google-icon";
import FacebookIcon from "@/assets/icons/facebook-icon";
import AppleIcon from "@/assets/icons/apple-icon";
import { useAuth } from "@/hooks/use-auth";
import { authService } from "@/services/auth";
import { DefaultResponse } from "@/types/global";
import useUserStore from "@/global-store/user";
import type { SignInResponse, SocialLoginCredentials } from "@/types/user";

function SocialLogin() {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const { googleSignIn, facebookSignIn, appleSignIn } = useAuth();
  const localSingIn = useUserStore((state) => state.signIn);

  const { mutate } = useMutation({
    mutationFn: (body: SocialLoginCredentials) => authService.socialLogin(body),
  });

  const providers = {
    google: googleSignIn,
    facebook: facebookSignIn,
    apple: appleSignIn,
  };

  const onAuthSuccess = (res: DefaultResponse<SignInResponse>) => {
    setCookie("token", `${res.data.token_type} ${res.data.access_token}`);
    localSingIn(res.data.user);
    setLoading(false);
    router.replace("/");
    toast.success(formatMessage({ id: "successfully.logged.in" }));
  };

  const onAuthError = (e: Error) => {
    toast.error(e.message);
    setLoading(false);
  };

  const handleSocialLogin = async (type: keyof typeof providers) => {
    setLoading(true);
    try {
      await providers[type]().then(async (res) => {
        const id = await res.user.getIdToken();
        mutate(
          {
            type,
            data: {
              avatar: res.user?.photoURL,
              email:
                res.user.email ||
                `${res.user.displayName?.toLowerCase() || "temp"}@mail.com`,
              id,
              name: res.user.displayName,
            },
          },
          {
            onSuccess: (data) => onAuthSuccess(data.data),
            onError: onAuthError,
          },
        );
      });
    } catch (e) {
      toast.error(
        formatMessage({
          id: `could.not.login.with.${type}.account`,
        }),
      );
      setLoading(false);
      console.error(e);
    }
  };

  return (
    <div className="flex mt-auto gap-2">
      <Button
        disabled={loading}
        onClick={() => handleSocialLogin("google")}
        size="lg"
        variant="outline"
        className="flex-1"
      >
        <GoogleIcon />
      </Button>
      <Button
        disabled={loading}
        onClick={() => handleSocialLogin("facebook")}
        size="lg"
        variant="outline"
        className="flex-1"
      >
        <FacebookIcon />
      </Button>
      <Button
        disabled={loading}
        onClick={() => handleSocialLogin("apple")}
        size="lg"
        variant="outline"
        className="flex-1"
      >
        <AppleIcon />
      </Button>
    </div>
  );
}

export default SocialLogin;
