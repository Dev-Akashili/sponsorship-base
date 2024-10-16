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
      name: "",
      email: "",
      message: ""
    }
  });

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    setIsLoading(true);
    console.log(values);
    setIsLoading(false);
  }

  return (
    <>
      <PageTitle title={"Contact Us"} />
      <FormLayout size="lg" title="Contact Us">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput form={form} name="name" label="Name" width={"380px"} />
            <FormInput form={form} name="email" label="Email" />
            <FormInput
              form={form}
              type="textarea"
              name="message"
              label="Message"
              placeholder="Leave a message for us."
            />
            <Button
              className="sponsorship-base dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white w-full mt-6 mb-4"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Send"}
            </Button>
            <p className="text-sm text-slate-500 dark:text-white text-center">
              We'll be in touch shortly.
            </p>
          </form>
        </Form>
      </FormLayout>
    </>
  );
};
