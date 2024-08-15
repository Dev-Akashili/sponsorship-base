import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { IndexPage } from "@/pages/home/IndexPage";
import { ROUTES } from "@/pages/routes";
import { Auth } from "@/pages/auth/Auth";

export const Root = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path={ROUTES.index}>
          <Route index element={<IndexPage />} />
        </Route>
        <Route path={"auth"} element={<Auth />} />
      </Route>
    </Routes>
  );
};
