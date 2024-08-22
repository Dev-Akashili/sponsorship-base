import { LoadingPage } from "@/components/core/Loader";
import { AuthContext } from "@/context/Auth";
import { Auth } from "@/pages/auth/Auth";
import { NotFound } from "@/pages/error/NotFound";
import { AUTH_ROUTES } from "@/pages/routes";
import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";

export const AuthRoute = ({
  children
}: {
  children: ReactNode | ReactNode[];
}) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated === undefined) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to={AUTH_ROUTES.login} replace />;
  }

  return children;
};

export const AuthRedirect = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated === undefined) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <Auth />;
  }

  return <NotFound />;
};
