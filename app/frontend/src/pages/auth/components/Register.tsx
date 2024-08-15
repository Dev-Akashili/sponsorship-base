import { z } from "zod";
import { useForm } from "react-hook-form";
import { registerFormSchema } from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormLayout } from "@/layout/FormLayout";
import { Link } from "react-router-dom";
import { AUTH_ROUTES } from "@/pages/routes";
import { FormInput } from "@/components/forms/FormInput";

export const Register = () => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    console.log(values);
  }

  return (
    <FormLayout title="Create a new account">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput form={form} name="email" label="Email" />
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
            className="bg-blue-600 hover:bg-blue-500 mt-4 w-full"
          >
            Submit
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
