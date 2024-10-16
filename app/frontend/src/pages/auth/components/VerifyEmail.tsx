import { sendEmail, verifyEmail } from "@/api/custom-auth";
import { LoadingPage } from "@/components/core/Loader";
import { FormAlert } from "@/components/forms/FormAlert";
import { AUTH_ROUTES } from "@/pages/routes";
import { ResponseMessage } from "@/types";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState<string | null>("");
  const [alert, setAlert] = useState<boolean>(false);
  const [response, setResponse] = useState<ResponseMessage>({
    name: "",
    message: ""
  });

  useEffect(() => {
    const verify = async () => {
      // When the page loads, the verification should happen
      setEmail(searchParams.get("email"));
      const codeId = searchParams.get("codeId");
      const code = searchParams.get("code");
      const email = searchParams.get("email");

      if (codeId && code && email) {
        try {
          const response = await verifyEmail({
            codeId: parseInt(codeId, 10),
            code: code,
            email: email
          });
          if (response.ok) {
            navigate(AUTH_ROUTES.login);
            toast.success("Email successfully verified!");
          } else {
            const result = await response.text();
            if (result === "expired") {
              setError("expired");
            } else {
              setError("error");
            }
          }
        } catch {
          console.warn("Email verification failed!");
          setError("error");
        }
      } else {
        setError("error");
      }
    };

    verify();
  }, [navigate, searchParams]);

  const setError = (type: string) => {
    setResponse({
      name: "error",
      message:
        type === "expired" ? "This link has expired!" : "Something went wrong!"
    });
    setAlert(true);
  };

  const sendEmailVerificationLink = (
    <div
      className="mt-2 underline cursor-pointer hover:text-blue-500 dark:hover:text-white inline-block"
      onClick={async () => {
        setAlert(false);
        try {
          const send = await sendEmail(email ?? "", "register");
          if (send.ok) {
            navigate(AUTH_ROUTES.login);
            toast.success(
              "Email verification link successfully sent! Please check your email to confirm your account"
            );
          } else {
            const msg = await send.text();
            if (msg === "User Email is already confirmed") {
              setResponse({
                name: "success",
                message: msg
              });
              setAlert(true);
            } else {
              setError("error");
            }
          }
        } catch {
          console.warn("Sending email verification link failed!");
          setError("error");
          setAlert(true);
        }
      }}
    >
      Click here to send a new email verification link.
    </div>
  );

  const homeLink = (
    <Link to={AUTH_ROUTES.login}>
      <div className="mt-2 underline cursor-pointer hover:text-blue-500 dark:hover:text-white inline-block">
        Click here to go back to login.
      </div>
    </Link>
  );

  return (
    <>
      {alert ? (
        <div className="my-80 w-96 m-auto">
          <FormAlert
            type={response.name}
            title={response.message}
            link={
              response.message === "Something went wrong!" ||
              response.message === "User Email is already confirmed"
                ? homeLink
                : sendEmailVerificationLink
            }
            closeButton={<></>}
          />
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};
