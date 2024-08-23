import { Button } from "@/components/ui/button";
import { PageLayout } from "@/layout/PageLayout";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <PageLayout>
      <div className="m-auto text-center">
        <h1 className="text-9xl text-blue-600">404</h1>
        <p className="text-slate-600 text-xl mt-4">
          Sorry, the page you're looking for cannot be found
        </p>
        <Link to={"/"}>
          <Button className="sponsorship-base mt-6">
            Go back to homepage
          </Button>
        </Link>
      </div>
    </PageLayout>
  );
};
