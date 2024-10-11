import { z } from "zod";
import { useForm } from "react-hook-form";
import { registerFormSchema } from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormLayout } from "@/layout/FormLayout";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_ROUTES, ROUTES } from "@/pages/routes";
import { FormInput } from "@/components/forms/FormInput";
import { useState } from "react";
import { ResponseMessage } from "@/types";
import { X } from "lucide-react";
import { register } from "@/api/identity";
import { register as custom } from "@/api/custom-auth";
import { getResponseErrors } from "@/utils";
import { FormAlert } from "@/components/forms/FormAlert";
import { Spinner } from "@/components/core/Loader";
import { sendEmail } from "@/api/custom-auth";
import { FormSelect } from "@/components/forms/FormSelect";
import { toast } from "react-toastify";
import { COUNTRIES, SEX } from "@/constants/Forms.constants";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/Messages.constants";
import { FormCheckbox } from "@/components/forms/FormCheckbox";

export const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ResponseMessage>({
    name: "",
    message: "",
    errors: []
  });
  const [alert, setAlert] = useState<boolean>(false);

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
      accept: false
    }
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    setIsLoading(true);

    try {
      const reg = await register({
        email: values.email,
        password: values.password
      });
      if (reg.ok) {
        const req = await custom({
          email: values.email,
          sex: values.sex,
          nationality: values.nationality
        });
        if (req.ok) {
          const send = await sendEmail(values.email, "register");
          if (send.ok) {
            navigate(AUTH_ROUTES.login);
            toast.success(
              "Registration Successful! Please check your email to confirm your account"
            );
          } else {
            setResponse({
              name: "error",
              message: DEFAULT_ERROR_MESSAGE
            });
            setAlert(true);
          }
        } else {
          setResponse({
            name: "error",
            message: DEFAULT_ERROR_MESSAGE
          });
          setAlert(true);
        }
      } else {
        const response = await reg.json();
        const errors = getResponseErrors(response.errors);
        setResponse({ name: "error", message: response.title, errors: errors });
        setAlert(true);
      }
    } catch (error) {
      console.warn("Registration failed!");
      console.error(error);
      toast.error(DEFAULT_ERROR_MESSAGE);
    }

    setIsLoading(false);
  }

  const closeButton = (
    <div className="cursor-pointer" onClick={() => setAlert(false)}>
      <X className="h-4 w-4" />
    </div>
  );

  const acceptance = (
    <p>
      I accept the{" "}
      <span>
        <a
          href={ROUTES.privacy}
          target="_blank"
          className="text-blue-600 underline"
        >
          privacy policy
        </a>
      </span>{" "}
      and{" "}
      <span>
        <a
          href={ROUTES.terms}
          target="_blank"
          className="text-blue-600 underline"
        >
          terms and conditions
        </a>
      </span>
    </p>
  );

  return (
    <FormLayout title="Create a new account">
      {alert && (
        <FormAlert
          title={response.message}
          type={response.name}
          errors={response.errors}
          closeButton={closeButton}
        />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput form={form} name="email" label="Email" />
          <div className="flex justify-between">
            <FormSelect
              form={form}
              name="sex"
              label="Sex"
              options={SEX}
              width={"48%"}
            />
            <FormSelect
              form={form}
              name="nationality"
              label="Nationality"
              options={COUNTRIES}
              width={"48%"}
            />
          </div>
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
          <FormCheckbox form={form} name="accept" label={acceptance} />
          <Button type="submit" className="sponsorship-base mt-4 w-full">
            {isLoading ? <Spinner /> : "Submit"}
          </Button>
          <div className="flex mt-4 justify-center">
            <p className="text-sm text-slate-600">Already have an account?</p>
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
