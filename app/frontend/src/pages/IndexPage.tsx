import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ROUTES } from "./routes";
import { PageTitle } from "@/components/core/PageTitle";
import { FaGithub } from "react-icons/fa";
import { DataTable } from "@/components/data-table";
import { columns } from "./sponsorship/components/columns";
import { DUMMY_DATA } from "@/constants/Home.constants";
import { ScrollArea } from "@/components/ui/scroll-area";

export const IndexPage = () => {
  return (
    <>
      <PageTitle title={"Add Description Later"} />
      <div className="flex flex-col justify-center items-center mb-40">
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
        <h1 className="text-4xl text-blue-600 font-semibold">
          Get Empowered With Information
        </h1>
        <p className="mx-auto mt-4 mb-20 text-center text-slate-600 dark:text-white text-xl w-[70%]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
        <ScrollArea className="h-[450px] border rounded-md">
          <DataTable
            data={DUMMY_DATA}
            columns={columns}
            paginated={false}
            count={0}
          />
        </ScrollArea>
        <div className="flex space-x-4 mt-20">
          <a href={ROUTES.about}>
            <Button
              size={"lg"}
              className="sponsorship-base dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white"
            >
              Learn more about
            </Button>
          </a>
          <a
            target="_blank"
            href={"https://github.com/Dev-Akashili/sponsorship-base"}
          >
            <Button
              size={"lg"}
              variant={"outline"}
              className="bg-gray-100 hover:bg-slate-200 border-2 border-black dark:border-white dark:text-white"
            >
              Suggest changes on{" "}
              <span className="font-semibold ml-1">GitHub</span>{" "}
              <FaGithub className="ml-2 size-5 dark:text-white" />
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};
