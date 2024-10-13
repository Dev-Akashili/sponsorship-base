import { z } from "zod";
import { useContext, useState } from "react";
import { FormInput } from "@/components/forms/FormInput";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { changePasswordFormSchema } from "./validationSchema";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/core/Loader";
import { DeleteModal } from "@/components/core/DeleteModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/Messages.constants";
import { deleteUser } from "@/api/user";
import { ROUTES } from "../routes";
import { AuthContext } from "@/context/Auth";
import { PageTitle } from "@/components/core/PageTitle";
import { resetPassword } from "@/api/custom-auth";
import { X } from "lucide-react";
import { FormAlert } from "@/components/forms/FormAlert";
import { ResponseMessage } from "@/types";

export const Settings = () => {
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [response, setResponse] = useState<ResponseMessage>({
    name: "",
    message: ""
  });
  const [alert, setAlert] = useState<boolean>(false);

  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      current: "",
      new: "",
      confirm: ""
    }
  });

  const { reset } = form;

  async function onSubmit(values: z.infer<typeof changePasswordFormSchema>) {
    setIsLoading(true);

    try {
      const request = await resetPassword({
        currentPassword: values.current,
        newPassword: values.new
      });
      if (request.ok) {
        reset();
        toast.success("Password has successfully been changed");
      } else {
        const response = await request.json();
        setResponse({
          name: response.name,
          message: response.message
        });
        setAlert(true);
      }
    } catch {
      toast.error(DEFAULT_ERROR_MESSAGE);
    }

    setIsLoading(false);
  }

  async function handleDelete() {
    setDeleting(true);

    try {
      const response = await deleteUser();
      if (response.ok) {
        setAuthState({ isAuthenticated: false, user: null });
        navigate(ROUTES.list);
        toast.success("Account deleted.");
      } else {
        toast.error(DEFAULT_ERROR_MESSAGE);
      }
    } catch (error) {
      console.error(error);
      toast.error(DEFAULT_ERROR_MESSAGE);
    }

    setDeleting(false);
  }

  const closeButton = (
    <div className="cursor-pointer" onClick={() => setAlert(false)}>
      <X className="h-4 w-4" />
    </div>
  );

  return (
    <>
      <PageTitle title={"Settings"} />
      <div className="flex justify-center align-center mt-14 mb-52">
        <div className="flex flex-col mx-auto w-[400px]">
          <p className="text-2xl text-center text-slate-500 dark:text-white font-semibold">
            Profile Settings
          </p>
          <div className="mt-10 px-6 py-4 bg-white dark:bg-black rounded-lg">
            <p className="text-xl mr-auto mb-4 text-slate-500 dark:text-white font-semibold">
              Change Password
            </p>
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
                  label="Current password"
                  name="current"
                  type="password"
                />
                <FormInput
                  form={form}
                  label="New password"
                  name="new"
                  type="password"
                />
                <FormInput
                  form={form}
                  label="Confirm password"
                  name="confirm"
                  type="password"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="sponsorship-base dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white mt-6 w-32"
                >
                  {isLoading ? <Spinner /> : "Update"}
                </Button>
              </form>
            </Form>
            <p className="text-lg mr-auto mt-8 text-slate-500 dark:text-white font-semibold">
              Delete Account
            </p>
            <DeleteModal
              deleting={deleting}
              handleDelete={handleDelete}
              text={"this account"}
            >
              <Button variant={"destructive"} className="my-4 w-32 dark:bg-red-600 dark:bg-red-500">
                Delete account
              </Button>
            </DeleteModal>
          </div>
        </div>
      </div>
    </>
  );
};
