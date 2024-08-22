import { TriangleAlert } from "lucide-react";

export const ErrorFallback = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="m-auto text-center">
        <TriangleAlert className="text-red-500 m-auto" size={"180px"} />
        <p className="text-slate-600 text-xl mt-4">
          OOPS! It seems there is something wrong with this page
        </p>
      </div>
    </div>
  );
};
