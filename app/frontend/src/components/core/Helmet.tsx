import { Link } from "react-router-dom";

export const Helmet = ({ sidebar = false }: { sidebar?: boolean }) => {
  return (
    <Link to={"/"}>
      <div className="flex gap-2 items-center hover:cursor-pointer">
        <img
          className={`${sidebar ? "h-8 w-8" : "h-12 w-12}"} rounded-md`}
          src="././sb-logo.png"
          alt="sb"
        />
        <h1
          className={`${sidebar ? "text-blue-600" : "text-gray-800"} ${
            sidebar ? "text-xl" : "text-2xl"
          } font-semibold ${sidebar ? "block" : "hidden sm:block"}`}
        >
          SponsorshipBase
        </h1>
      </div>
    </Link>
  );
};
