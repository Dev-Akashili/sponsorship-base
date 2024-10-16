import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ROUTES } from "./routes";
import { PageTitle } from "@/components/core/PageTitle";
import { DataTable } from "@/components/data-table";
import { columns } from "./sponsorship/components/columns";
import { DUMMY_DATA } from "@/constants/Home.constants";
import { ScrollArea } from "@/components/ui/scroll-area";

export const IndexPage = () => {
  return (
    <>
      <PageTitle title={"Add Description Later"} />
      <div className="flex flex-col justify-center items-center mb-32">
        <div className=" flex flex-col mx-auto mt-20 mb-40">
          <h1 className="text-8xl text-center text-slate-800 dark:text-white font-semibold">
            <span className="text-blue-600 dark:text-blue-700">Navigating</span>{" "}
            your
          </h1>
          <h1 className="text-8xl text-center text-slate-800 dark:text-white font-semibold">
            <span className="text-blue-600 dark:text-blue-700">
              visa sponsored job
            </span>
          </h1>
          <h1 className="text-8xl text-center text-slate-800 dark:text-white font-semibold">
            journey
          </h1>
          <p className="mx-auto my-10 text-center text-slate-600 dark:text-white text-xl">
            Share and receive insight on companies that offer visa sponsorship
            and jobs they sponsor for
          </p>
          <div className="flex items-center mx-auto">
            <Link to={ROUTES.list}>
              <Button className="mx-2 sponsorship-base dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white">
                View Sponsorship list
              </Button>
            </Link>
            <Link to={ROUTES.add}>
              <Button className="mx-2 sponsorship-base dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white">
                Add Your Sponsored Job
              </Button>
            </Link>
          </div>
        </div>

        <h1 className="text-4xl text-blue-600 font-semibold">
          Better Guide In Your Search for Opportunities
        </h1>
        <p className="mx-auto mt-4 mb-20 text-center text-slate-600 dark:text-white text-xl w-[70%]">
          Looking for a job that offers visa sponsorship can be daunting!{" "}
          <span className="font-semibold">SponsorshipBase</span> is a platform
          built to provide information from people that have pulled it off and
          serve as a guide.
        </p>
        <ScrollArea className="h-[450px] border rounded-md">
          <DataTable
            data={DUMMY_DATA}
            columns={columns}
            paginated={false}
            count={0}
          />
        </ScrollArea>
        <a href={ROUTES.about} className="mt-16">
          <Button
            size={"lg"}
            className="sponsorship-base dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white"
          >
            Learn more about
          </Button>
        </a>
      </div>
    </>
  );
};
