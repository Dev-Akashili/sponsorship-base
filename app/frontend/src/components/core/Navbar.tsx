import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Helmet } from "./Helmet";
import { UserMenu } from "./UserMenu";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";
import { NAV_LINKS, NavLink as NavLinkProps } from "@/constants/Menu.constants";
import { AUTH_ROUTES } from "@/pages/routes";
import { useContext } from "react";
import { AuthContext } from "@/context/Auth";

export const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="fixed top-0 left-0 right-0 h-20 px-8 shadow-md flex justify-between items-center z-10 bg-white">
      <Helmet />
      <div className="hidden sm:flex lg:space-x-10 md:space-x-4">
        {NAV_LINKS.map((item) => (
          <NavLink
            key={item.path}
            path={item.path}
            text={item.text}
            link={item.link}
          />
        ))}
      </div>
      {user ? (
        <UserMenu />
      ) : (
        <div className="flex space-x-2">
          <Link to={AUTH_ROUTES.login} className="hidden sm:block">
            <Button
              className="text-blue-600 hover:text-blue-500 border border-blue-600 "
              variant={"ghost"}
            >
              Login
            </Button>
          </Link>
          <Link to={AUTH_ROUTES.register} className="hidden sm:block">
            <Button className="sponsorship-base">Register</Button>
          </Link>
        </div>
      )}
      <Sidebar
        menuButton={
          <Button
            variant={"ghost"}
            size={"icon"}
            className="block sm:hidden bg-slate-100"
          >
            <Menu className=" h-8 w-8 m-auto" />
          </Button>
        }
      />
    </div>
  );
};

const NavLink = ({ path, text, link }: NavLinkProps) => {
  const location = useLocation();
  const isCurrentPath = location.pathname.includes(path);

  return (
    <Link to={link}>
      <p
        className={`text-md font-semibold hover:text-blue-600 hover:underline hover:cursor-pointer ${
          isCurrentPath ? "text-blue-600 underline" : ""
        }`}
      >
        {text}
      </p>
    </Link>
  );
};
