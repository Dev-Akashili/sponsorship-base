import { FormLayout } from "@/layout/FormLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  resetPasswordFormSchema,
  verifyEmailFormSchema
} from "./validationSchema";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/forms/FormInput";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/core/Loader";
import { useEffect, useState } from "react";
import { resetPassword, sendEmail } from "@/api/custom-auth";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AUTH_ROUTES } from "@/pages/routes";
import { ResponseMessage } from "@/types";
import { FormAlert } from "@/components/forms/FormAlert";
import { X } from "lucide-react";
import { toast } from "react-toastify";

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");
  const [code, setCode] = useState<string | null>("");
  const [codeId, setCodeId] = useState<string | null>("");

  useEffect(() => {
    setEmail(searchParams.get("email"));
    setCode(searchParams.get("code"));
    setCodeId(searchParams.get("codeId"));

    if (email && code && codeId) {
      setForm("reset");
    } else {
      setForm("verify");
    }
  }, [email, code, codeId, searchParams]);

  const getForm = () => {
    switch (form) {
      case "reset":
        return (
          <ResetPasswordForm
            code={code ?? ""}
            codeId={Number(codeId)}
            email={email ?? ""}
          />
        );
      case "verify":
        return <VerifyEmailForm />;
      default:
        return (
          <div className="m-auto">
            <Spinner size="lg" />
          </div>
        );
    }
  };

  return <>{getForm()}</>;
};

const VerifyEmailForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof verifyEmailFormSchema>>({
    resolver: zodResolver(verifyEmailFormSchema),
    defaultValues: {
      email: ""
    }
  });

  const { reset } = form;

  async function onSubmit(values: z.infer<typeof verifyEmailFormSchema>) {
    setIsLoading(true);

    try {
      const send = await sendEmail(values.email, "reset");
      if (send.ok) {
        reset();
        toast.success("Password reset link has been sent to your email");
      } else {
        toast.error("Something went wrong! Please try again later");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Please try again later");
    }

    setIsLoading(false);
  }

  return (
    <FormLayout title="Verify email to reset password">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput form={form} name="email" label="Email" />
          <Button
            type="submit"
            disabled={isLoading}
            className="sponsorship-base mt-4 w-full"
          >
            {isLoading ? <Spinner /> : "Submit"}
          </Button>
          <div className="flex mt-4 justify-center">
            <p className="text-sm text-slate-600">Return back to</p>
            <Link to={AUTH_ROUTES.login}>
              <p className="ml-2 text-sm text-blue-700 underline cursor-pointer">
                Login
              </p>
            </Link>
          </div>
        </form>
      </Form>
    </FormLayout>
  );
};

interface ResetPasswordFormProps {
  codeId: number;
  code: string;
  email: string;
}

const ResetPasswordForm = ({ codeId, code, email }: ResetPasswordFormProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ResponseMessage>({
    name: "",
    message: ""
  });
  const [alert, setAlert] = useState<boolean>(false);

  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirm: ""
    }
  });

  async function onSubmit(values: z.infer<typeof resetPasswordFormSchema>) {
    setIsLoading(true);

    try {
      const request = await resetPassword({
        codeId: codeId,
        code: code,
        email: email,
        newPassword: values.password
      });
      if (request.ok) {
        navigate(AUTH_ROUTES.login);
        toast.success("Password has successfully been changed");
      } else {
        const response = await request.json();
        setResponse({
          name: response.name,
          message:
            response.message === "expired"
              ? "Link has expired"
              : Array.isArray(response.message)
              ? ""
              : "Something went wrong! Please try again later",
          errors: Array.isArray(response.message) ? response.message : []
        });
        setAlert(true);
      }
    } catch (error) {
      console.error(error);
      setResponse({
        name: "error",
        message: "Something went wrong! Please try again later"
      });
    }

    setIsLoading(false);
  }

  const closeButton = (
    <div className="cursor-pointer" onClick={() => setAlert(false)}>
      <X className="h-4 w-4" />
    </div>
  );

  return (
    <FormLayout title="Reset password">
      {alert && (
        <FormAlert
          title={response.message}
          type={response.name}
          closeButton={closeButton}
        />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput
            form={form}
            name="password"
            label="Password"
            type="password"
          />
          <FormInput
            form={form}
            name="confirm"
            label="Confirm Password"
            type="password"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="sponsorship-base mt-4 w-full"
          >
            {isLoading ? <Spinner /> : "Reset password"}
          </Button>
        </form>
      </Form>
    </FormLayout>
  );
};
