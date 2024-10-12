import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Helmet } from "./Helmet";
import { UserMenu } from "./UserMenu";
import { Sidebar } from "./Sidebar";
import { Menu, Moon, Sun } from "lucide-react";
import { NAV_LINKS, NavLink as NavLinkProps } from "@/constants/Menu.constants";
import { AUTH_ROUTES } from "@/pages/routes";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/Auth";

export const Navbar = () => {
  const { user } = useContext(AuthContext);

  // Handle dark mode
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-20 px-8 shadow-md dark:shadow-none dark:border-b dark:border-b-slate-600 flex justify-between items-center z-10 bg-white dark:bg-black">
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
        <div className="flex space-x-2">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="border border-black dark:border-white dark:text-white mr-2"
            onClick={() => toggleDarkMode()}
          >
            {darkMode ? <Moon /> : <Sun />}
          </Button>
          <UserMenu />
        </div>
      ) : (
        <div className="flex space-x-2">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="border border-blue-600 dark:border-white text-blue-600 dark:text-white hover:text-blue-500 mr-2"
            onClick={() => toggleDarkMode()}
          >
            {darkMode ? <Moon /> : <Sun />}
          </Button>
          <Link to={AUTH_ROUTES.login} className="hidden sm:block">
            <Button
              className="text-blue-600 dark:text-white hover:text-blue-500 border border-blue-600 dark:border-white "
              variant={"ghost"}
            >
              Login
            </Button>
          </Link>
          <Link to={AUTH_ROUTES.register} className="hidden sm:block">
            <Button className="sponsorship-base dark:bg-blue-700 dark:hover:bg-blue-600 dark:text-white">Register</Button>
          </Link>
        </div>
      )}
      <Sidebar
        menuButton={
          <Button
            variant={"ghost"}
            size={"icon"}
            className="block sm:hidden bg-slate-100 dark:border dark:border-white dark:bg-black dark:text-white"
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
        className={`text-md font-semibold dark:text-white hover:text-blue-600 dark:hover:text-blue-600 hover:underline hover:cursor-pointer ${
          isCurrentPath ? "text-blue-600 dark:text-blue-600 underline" : ""
        }`}
      >
        {text}
      </p>
    </Link>
  );
};
