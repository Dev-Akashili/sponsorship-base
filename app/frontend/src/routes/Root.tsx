import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { IndexPage } from "@/pages/home/IndexPage";
import { ROUTES } from "@/pages/routes";
import { NotFound } from "@/pages/error/NotFound";
import { AddOrEdit } from "@/pages/contribution/AddOrEdit";
import { About } from "@/pages/about/About";
import { Contact } from "@/pages/contact/Contact";
import { AuthRedirect, AuthRoute } from "./Custom";
import { Manage, SponsorshipList, Favourite } from "@/pages/sponsorship";
import { Settings } from "@/pages/settings/Settings";

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
            <AuthRoute redirect={ROUTES.manage}>
              <Manage />
            </AuthRoute>
          }
        />

        <Route
          path={ROUTES.favourite}
          element={
            <AuthRoute redirect={ROUTES.favourite}>
              <Favourite />
            </AuthRoute>
          }
        />

        <Route
          path={ROUTES.add}
          element={
            <AuthRoute redirect={ROUTES.add}>
              <AddOrEdit />
            </AuthRoute>
          }
        />

        <Route
          path={ROUTES.edit}
          element={
            <AuthRoute redirect={ROUTES.edit}>
              <AddOrEdit />
            </AuthRoute>
          }
        />

        <Route
          path={ROUTES.settings}
          element={
            <AuthRoute redirect={ROUTES.settings}>
              <Settings />
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
