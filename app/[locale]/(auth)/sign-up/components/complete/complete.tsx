import { useState } from "react";
import { useIntl } from "react-intl";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { SignInResponse, SignUpCredentials } from "@/types/user";
import { authService } from "@/services/auth";
import { setCookie } from "cookies-next";
import useUserStore from "@/global-store/user";
import { useRouter } from "next/navigation";

const schemaFields = {
  firstname: z.string().min(3).max(255),
  lastname: z.string().min(3).max(255),
  password: z.string().min(3),
  password_confirmation: z.string().min(3).nullable(),
};

const schema = z
  .object(schemaFields)
  .refine(
    (data) => data.password_confirmation === null || data.password_confirmation === data.password,
    {
      message: "Passwords don't match",
      path: ["password_confirmation"],
    }
  );

type FormType = z.infer<typeof schema>;

interface CompleteProps {
  username?: string;
  idToken?: string;
}

function Complete({ idToken, username }: CompleteProps) {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const localSignIn = useUserStore((state) => state.signIn);
  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: "",
      lastname: "",
      password: "",
      password_confirmation: "",
    },
  });

  const handleSuccessSignUp = (res: SignInResponse) => {
    toast.success(formatMessage({ id: "successfully.signed.up" }));
    setCookie("token", `${res.token_type} ${res.access_token}`);
    localSignIn(res.user);
    router.replace("/");
  };

  const onSubmit = async (values: FormType) => {
    setIsSubmitting(true);
    try {
      const body: SignUpCredentials = values;
      if (username?.includes("@")) {
        body.email = username;
        const { data } = await authService.signUpComplete(body);
        handleSuccessSignUp(data.data);
      } else {
        body.phone = username?.replace(/[^0-9]/g, "");
        body.type = "firebase";
        body.id = idToken;

        const { data } = await authService.phoneSignUpComplete(body);
        handleSuccessSignUp(data.data);
      }
    } catch (error) {
      toast.error((error as Error).message);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="font-semibold text-[30px] mb-10 text-start">
        {formatMessage({ id: "complete" })}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formatMessage({ id: "firstname" })}</FormLabel>
                <FormControl>
                  <Input placeholder="Type here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formatMessage({ id: "lastname" })}</FormLabel>
                <FormControl>
                  <Input placeholder="Type here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Type here"
                    {...field}
                    value={field.value ?? ""}
                  />
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
          >
            {formatMessage({ id: "complete" })}
          </Button>
        </form>
      </Form>
    </>
  );
}

export default Complete;
