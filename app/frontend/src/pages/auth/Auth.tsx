import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

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
      default:
        return <Login />;
    }
  };

  return <>{getPage()}</>;
};
