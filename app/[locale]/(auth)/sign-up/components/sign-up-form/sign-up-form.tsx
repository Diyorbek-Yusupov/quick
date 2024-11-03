import { useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SignUpViews } from "@/types/global";
import { ConfirmationResult } from "@firebase/auth";
import SocialLogin from "@/app/[locale]/(auth)/components/social-login";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { authService } from "@/services/auth";

const formSchema = z.object({
  username: z.string().min(3),
});

type FormType = z.infer<typeof formSchema>;

interface SignUpFormProps {
  onChangeView: (view: SignUpViews) => void;
  onSuccess: (data: { username: string; callback?: ConfirmationResult }) => void;
}

function SignUpForm({ onSuccess, onChangeView }: SignUpFormProps) {
  const { formatMessage } = useIntl();
  const { phoneNumberSignIn } = useAuth();
  const [destroyerToggle, setDestroyerToggle] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (values: FormType) => {
    setIsSubmitting(true);
    try {
      if (values.username.includes("@")) {
        await authService.signUp({ email: values.username });
        onSuccess({
          username: values.username,
        });
        onChangeView(SignUpViews.VERIFY);
      } else {
        console.log("isSubmitting", values.username);
        const confirmationResult = await phoneNumberSignIn(values.username);
        onSuccess({
          username: values.username,
          callback: confirmationResult,
        });
        onChangeView(SignUpViews.VERIFY);
      }
    } catch (error: unknown) {
      toast.error((error as Error).message);
      console.error(error);
      setDestroyerToggle((prev) => !prev);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="font-semibold text-[30px] mb-10 text-start">
        {formatMessage({ id: "sign.up" })}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formatMessage({ id: "email.or.phone.number" })}</FormLabel>
                <FormControl>
                  <Input placeholder="Type here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            id="sign-in-button"
            loading={isSubmitting}
            size="lg"
            type="submit"
            className="w-full"
            key={String(destroyerToggle)}
          >
            {formatMessage({ id: "sign.up" })}
          </Button>
        </form>
      </Form>
      <SocialLogin />
    </>
  );
}

export default SignUpForm;
