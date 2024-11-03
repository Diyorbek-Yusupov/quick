import { useIntl } from "react-intl";
import { toast } from "sonner";
import { ConfirmationResult } from "@firebase/auth";
import { SignUpViews } from "@/types/global";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTimer } from "@/hooks/use-timer";
import { authService } from "@/services/auth";
import { useAuth } from "@/hooks/use-auth";

interface OtpVerifyProps {
  username?: string;
  confirmationResult?: ConfirmationResult;
  onSuccess: (value: string) => void;
  onChangeView: (view: SignUpViews) => void;
}

function OtpVerify({ username, onChangeView, onSuccess, confirmationResult }: OtpVerifyProps) {
  const { formatMessage } = useIntl();
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formatTime, start: startTimer, reset: resetTimer, isRunning } = useTimer(60);
  const { phoneNumberSignIn } = useAuth();

  useEffect(startTimer, [startTimer]);

  const handleVerify = async () => {
    if (!username) return;
    setIsSubmitting(true);
    try {
      if (username?.includes("@")) {
        const res = await authService.signUpVerifyEmail({ otp: code });
        onSuccess(res.data.data.token);
        onChangeView(SignUpViews.COMPLETE);
      } else {
        const res = await confirmationResult?.confirm(code);
        const idToken = await res?.user.getIdToken();
        onSuccess(idToken as string);
        onChangeView(SignUpViews.COMPLETE);
      }
    } catch (e) {
      toast.error((e as Error).message);
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    if (!username) return;
    try {
      if (username.includes("@")) {
        await authService.signUp({ email: username });
        resetTimer();
        toast.success(formatMessage({ id: "verify.send" }));
      } else {
        await phoneNumberSignIn(username);
        resetTimer();
        toast.success(formatMessage({ id: "verify.send" }));
      }
    } catch (e) {
      toast.error((e as Error).message);
      console.error(e);
    }
  };

  return (
    <>
      <div className="mb-10">
        <h1 className="font-semibold text-[30px] text-start">
          {formatMessage({ id: "enter.verify.code" })}
        </h1>
        <p className="text-foreground/50">
          {formatMessage({ id: "we.have.sent.code.to" })} {username}
        </p>
      </div>
      <InputOTP maxLength={6} value={code} onChange={setCode}>
        <InputOTPGroup className="w-full gap-3">
          {new Array(6).fill(1).map((_, index) => (
            <InputOTPSlot
              index={index}
              key={index}
              className="!border-2 flex-1 h-14 !rounded-lg text-xl"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <div className="flex mt-10 gap-3">
        <Button
          disabled={isRunning}
          onClick={handleResendCode}
          size="lg"
          className="basis-1/4 !bg-blue-600 text-white !opacity-100"
        >
          {isRunning ? formatTime() : formatMessage({ id: "resend" })}
        </Button>
        <Button
          loading={isSubmitting}
          onClick={handleVerify}
          disabled={code.length < 6}
          size="lg"
          className="basis-3/4"
        >
          {formatMessage({ id: "confirm" })}
        </Button>
      </div>
    </>
  );
}

export default OtpVerify;
