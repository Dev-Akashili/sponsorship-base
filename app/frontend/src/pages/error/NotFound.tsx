import { PageTitle } from "@/components/core/PageTitle";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/layout/PageLayout";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <>
      <PageTitle title={"Not Found"} />
      <PageLayout>
        <div className="m-auto text-center">
          <h1 className="text-9xl text-blue-600 dark:text-blue-800">404</h1>
          <p className="text-slate-600 dark:text-white text-xl mt-4">
            Sorry, the page you're looking for cannot be found
          </p>
          <Link to={"/"}>
            <Button
              size={"lg"}
              className="sponsorship-base dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white mt-6"
            >
              Go back to homepage
            </Button>
          </Link>
        </div>
      </PageLayout>
    </>
  );
};
