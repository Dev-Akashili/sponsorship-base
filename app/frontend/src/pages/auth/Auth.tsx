import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { VerifyEmail } from "./components/VerifyEmail";
import { ResetPassword } from "./components/ResetPassword";
import { formatPageTitle } from "@/utils";
import { PageTitle } from "@/components/core/PageTitle";

export const Auth = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState<string | null>("");

  useEffect(() => {
    setPage(searchParams.get("page"));
  }, [page, searchParams]);

  const getPage = () => {
    switch (page) {
      case "login":
        return <Login />;
      case "register":
        return <Register />;
      case "verify-email":
        return <VerifyEmail />;
      case "reset-password":
        return <ResetPassword />;
      default:
        setPage("login");
        return <Login />;
    }
  };

  return (
    <>
      <PageTitle title={formatPageTitle(page ?? "")} />
      {getPage()}
    </>
  );
};
