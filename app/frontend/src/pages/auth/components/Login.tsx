import { z } from "zod";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormLayout } from "@/layout/FormLayout";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AUTH_ROUTES, basePath, ROUTES } from "@/pages/routes";
import { FormInput } from "@/components/forms/FormInput";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "@/components/core/Loader";
import { login } from "@/api/identity";
import { login as custom, sendEmail } from "@/api/custom-auth";
import { getUser } from "@/api/user";
import { AuthContext } from "@/context/Auth";
import { FormAlert } from "@/components/forms/FormAlert";
import { X } from "lucide-react";
import { ResponseMessage } from "@/types";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuthState } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [redirect, setRedirect] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ResponseMessage>({
    name: "",
    message: ""
  });
  const [alert, setAlert] = useState<boolean>(false);

  useEffect(() => {
    setRedirect(searchParams.get("redirect"));
  }, [redirect, searchParams]);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setEmail(values.email);
    setIsLoading(true);

    try {
      const result = await login(values);
      if (result.ok) {
        const response = await getUser();
        const user = await response.json();
        if (user) {
          setAuthState({ isAuthenticated: true, user: user });
          if (redirect) {
            navigate(`${basePath}/${redirect}`);
          } else {
            navigate(ROUTES.sponsorshipList);
          }
          toast.success("Logged in successfully!");
        }
      } else {
        const request = await custom(values);
        const result: ResponseMessage = await request.json();
        setResponse(result);
        setAlert(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.warn("Login failed!");
      console.error(error);
      setIsLoading(false);
      toast.error("Something went wrong! Please try again later");
    }
  }

  const closeButton = (
    <div className="cursor-pointer" onClick={() => setAlert(false)}>
      <X className="h-4 w-4" />
    </div>
  );

  const sendEmailVerificationLink = (
    <div
      className="mt-2 underline cursor-pointer hover:text-blue-500 inline-block"
      onClick={async () => {
        setIsLoading(true);
        try {
          const send = await sendEmail(email ?? "", "register");
          if (send.ok) {
            setResponse({
              name: "success",
              message: "Email verification link successfully sent!"
            });
          } else {
            const msg = await send.text();
            setResponse({
              name: "error",
              message: msg
            });
          }
        } catch {
          console.warn("Sending email verification link failed!");
          toast.error("Something went wrong! Please try again later");
        }
        setIsLoading(false);
      }}
    >
      Click here to send a new verification link.
    </div>
  );

  return (
    <FormLayout title="Login to your account">
      {alert && (
        <FormAlert
          title={response.message}
          type={response.name}
          link={response.name === "info" ? sendEmailVerificationLink : <></>}
          closeButton={closeButton}
        />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput form={form} name="email" label="Email" />
          <FormInput
            form={form}
            name="password"
            label="Password"
            type="password"
          />
          <Link to={AUTH_ROUTES.resetPassword}>
            <p className="mt-4 text-sm text-blue-700 underline cursor-pointer">
              Forgot password?
            </p>
          </Link>
          <Button
            type="submit"
            disabled={isLoading}
            className="sponsorship-base mt-4 w-full"
          >
            {isLoading ? <Spinner /> : "Submit"}
          </Button>
          <div className="flex mt-4 justify-center">
            <p className="text-sm text-slate-600">Don't have an account?</p>
            <Link to={AUTH_ROUTES.register}>
              <p className="ml-2 text-sm text-blue-700 underline cursor-pointer">
                Register
              </p>
            </Link>
          </div>
        </form>
      </Form>
    </FormLayout>
  );
};
