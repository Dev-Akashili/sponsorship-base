import { z } from "zod";
import { useState } from "react";
import { PageTitle } from "@/components/core/PageTitle";
import { FormLayout } from "@/layout/FormLayout";
import { contactFormSchema } from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/forms/FormInput";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/core/Loader";

export const Contact = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: ""
    }
  });

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    setIsLoading(true);
    console.log(values);
    setIsLoading(false);
  }

  const content = (
    <div className="flex flex-col space-y-2 font-semibold text-sm mt-3 mb-6 text-slate-500 p-3 bg-white rounded-lg">
      <p>Need to get in touch?</p>
      <p>Fill the form below or</p>
      <p>
        send an email to{" "}
        <span>
          <a className="text-blue-600 underline">example@email.com</a>
        </span>
      </p>
    </div>
  );

  return (
    <>
      <PageTitle title={"Contact Us"} />
      <FormLayout size="lg" title="Get In Touch" content={content}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {" "}
            <div className="flex justify-between">
              <FormInput
                form={form}
                name="firstName"
                label="First name (optional)"
                width={"49%"}
              />
              <FormInput
                form={form}
                name="lastName"
                label="Last name (optional)"
                width={"49%"}
              />
            </div>
            <FormInput form={form} name="email" label="Email" />
            <FormInput
              form={form}
              type="textarea"
              name="message"
              label="Message"
              placeholder="Leave a message for us."
            />
            <Button
              className="sponsorship-base w-full mt-6 mb-4"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Send"}
            </Button>
            <p className="text-sm text-slate-500 text-center">
              We'll be in touch shortly.
            </p>
          </form>
        </Form>
      </FormLayout>
    </>
  );
};
