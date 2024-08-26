import { PageTitle } from "@/components/core/PageTitle";
import { PageLayout } from "@/layout/PageLayout";
import { TriangleAlert } from "lucide-react";

export const ErrorFallback = () => {
  return (
    <>
      <PageTitle title={"Page Error"} />
      <PageLayout>
        <div className="m-auto text-center">
          <TriangleAlert className="text-red-500 m-auto" size={"180px"} />
          <p className="text-slate-600 text-xl mt-4">
            OOPS! It seems there is something wrong with this page
          </p>
        </div>
      </PageLayout>
    </>
  );
};
