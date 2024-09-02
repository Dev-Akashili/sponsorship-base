import { LoadingPage } from "@/components/core/Loader";
import { AuthContext } from "@/context/Auth";
import { Auth } from "@/pages/auth/Auth";
import { NotFound } from "@/pages/error/NotFound";
import { AUTH_ROUTES } from "@/pages/routes";
import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";

interface AuthRouteProps {
  redirect?: string;
  children: ReactNode | ReactNode[];
}

export const AuthRoute = ({ redirect, children }: AuthRouteProps) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated === undefined) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate to={`${AUTH_ROUTES.login}&redirect=${redirect}`} replace />
    );
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
