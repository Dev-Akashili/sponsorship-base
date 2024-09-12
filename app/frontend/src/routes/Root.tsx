import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { IndexPage } from "@/pages/home/IndexPage";
import { ROUTES } from "@/pages/routes";
import { NotFound } from "@/pages/error/NotFound";
import { Contribute } from "@/pages/sponsorship-list/Contribute";
import { About } from "@/pages/about/About";
import { Contact } from "@/pages/contact/Contact";
import { AuthRedirect, AuthRoute } from "./Custom";
import { Manage, SponsorshipList } from "@/pages/sponsorship";

export const Root = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path={ROUTES.index}>
          <Route index element={<IndexPage />} />
        </Route>

        <Route path={"auth"} element={<AuthRedirect />} />

        <Route path={ROUTES.list} element={<SponsorshipList />} />

        <Route
          path={ROUTES.manage}
          element={
            <AuthRoute>
              <Manage />
            </AuthRoute>
          }
        />

        <Route
          path={ROUTES.contribute}
          element={
            <AuthRoute redirect={"add"}>
              <Contribute />
            </AuthRoute>
          }
        />

        <Route path={ROUTES.about} element={<About />} />

        <Route path={ROUTES.contact} element={<Contact />} />

        <Route path={"*"} element={<NotFound />} />
      </Route>
    </Routes>
  );
};
