import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ROUTES } from "./routes";
import { PageTitle } from "@/components/core/PageTitle";

export const IndexPage = () => {
  return (
    <>
      <PageTitle title={"Add Description Later"} />
      <div className="flex flex-col justify-center items-center">
        <div className="mx-auto mt-20 mb-40 w-9/12">
          <h1 className="text-8xl text-center text-slate-800 dark:text-white font-semibold">
            A{" "}
            <span className="text-blue-600 dark:text-blue-700">directory</span>{" "}
            of{" "}
            <span className="text-blue-600 dark:text-blue-700">
              visa sponsorsed
            </span>{" "}
            jobs
          </h1>
          <p className="mx-auto my-10 text-center text-slate-600 dark:text-white text-xl w-[70%]">
            Looking for a job that offers visa sponsorship can be daunting! This
            platform is built to help provide information from people that have
            pulled it off and serve as a guide.
          </p>
          <div className="text-center">
            <Link to={ROUTES.list}>
              <Button
                size={"lg"}
                className="mx-2 sponsorship-base dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white"
              >
                View Sponsorship list
              </Button>
            </Link>
            <Link to={ROUTES.add}>
              <Button
                size={"lg"}
                className="mx-2 sponsorship-base dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white"
              >
                Add Your Sponsored Job
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
