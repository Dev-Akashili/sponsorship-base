import { z } from "zod";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormLayout } from "@/layout/FormLayout";
import { Link } from "react-router-dom";
import { AUTH_ROUTES } from "@/pages/routes";
import { FormInput } from "@/components/forms/FormInput";

export const Login = () => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log(values);
  }

  return (
    <FormLayout title="Login to your account">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput form={form} name="email" label="Email" />
          <FormInput
            form={form}
            name="password"
            label="Password"
            type="password"
          />
          <p className="mt-4 text-sm text-blue-700 underline cursor-pointer">
            Forgot password?
          </p>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 mt-4 w-full"
          >
            Submit
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
