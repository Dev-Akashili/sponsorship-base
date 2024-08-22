import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes";

export const IndexPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="m-auto w-9/12">
        <h1 className="text-8xl text-center text-slate-800 font-semibold">
          A <span className="text-blue-600 hover:mb-4">directory</span> of{" "}
          <span className="text-blue-600 hover:mb-4">visa sponsorsed</span> jobs
        </h1>
        <p className="mx-auto my-10 text-center text-slate-600 text-xl w-[70%]">
          Looking for a job that offers visa sponsorship can be dauntiing! This
          platform is built to help provide information from people that have
          pulled it off and serve as a guide.
        </p>
        <div className="text-center">
          <Link to={ROUTES.sponsorshipList}>
            <Button className="mx-2 bg-blue-600 hover:bg-blue-500 font-mono">
              View Sponsorship list
            </Button>
          </Link>
          <Link to={ROUTES.contribute}>
            <Button className="mx-2 bg-blue-600 hover:bg-blue-500 font-mono">
              Add Your Sponsored Job
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
