import { Link } from "react-router-dom";

export const Helmet = () => {
  return (
    <Link to={"/"}>
      <div className="flex gap-2 items-center hover:cursor-pointer">
        <img className="h-12 w-12" src="././globe.png" alt="globe" />
        <h1 className="text-gray-800 text-2xl font-semibold">
          SponsorshipBase
        </h1>
      </div>
    </Link>
  );
};
