import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="m-auto text-center">
        <h1 className="text-9xl text-blue-600">404</h1>
        <p className="text-slate-600 text-xl mt-4">
          Sorry, the page you're looking for cannot be found
        </p>
        <Link to={"/"}>
          <Button className="bg-blue-600 hover:bg-blue-500 mt-6">
            Go back to homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};
