"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useIntl } from "react-intl";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { setCookie } from "cookies-next";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authService } from "@/services/auth";
import { SignInCredentials } from "@/types/user";
import useUserStore from "@/global-store/user";

import SocialLogin from "@/app/[locale]/(auth)/components/social-login";

const formSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

type FormType = z.infer<typeof formSchema>;

function Login() {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const localSignIn = useUserStore((state) => state.signIn);

  const { mutate: signIn, isPending: isSigningIn } = useMutation({
    mutationFn: (body: SignInCredentials) => authService.login(body),
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  function onSubmit(values: FormType) {
    const body: SignInCredentials = {
      password: values.password,
    };
    if (values.username.includes("@")) {
      body.email = values.username;
    } else {
      body.phone = values.username.replace(/[^0-9]/g, "");
    }

    signIn(body, {
      onSuccess: (res) => {
        toast.success(formatMessage({ id: "successfully.logged.in" }));
        setCookie(
          "token",
          `${res.data.data.token_type} ${res.data.data.access_token}`,
        );
        localSignIn(res.data.data.user);
        router.replace("/");
      },
    });
  }

  return (
    <>
      <h1 className="font-semibold text-[30px] mb-10 text-start">
        {formatMessage({ id: "login" })}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {formatMessage({ id: "email.or.phone.number" })}
                </FormLabel>
                <FormControl>
                  <Input placeholder="Type here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Type here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-end mt-2">
              <Link className="" href="/">
                {formatMessage({ id: "forgot.password" })}
              </Link>
            </div>
          </div>
          <Button
            loading={isSigningIn}
            size="lg"
            type="submit"
            className="w-full"
          >
            {formatMessage({ id: "sign.up" })}
          </Button>
        </form>
      </Form>
      <SocialLogin />
    </>
  );
}

export default Login;
