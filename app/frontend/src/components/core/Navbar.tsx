import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Helmet } from "./Helmet";
import { AUTH_ROUTES, ROUTES } from "@/pages/routes";
import { User } from "@/types";
import { UserMenu } from "./UserMenu";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";

export const Navbar = ({ user }: { user: User | null }) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-20 px-8 shadow-md flex justify-between items-center z-10 bg-white">
      <Helmet />
      <div className="hidden sm:flex lg:space-x-10 md:space-x-4">
        {navLinks.map((navLink, index) => (
          <NavLink
            key={index}
            path={navLink.path}
            text={navLink.text}
            link={navLink.link}
          />
        ))}
      </div>
      {user ? (
        <UserMenu user={user} />
      ) : (
        <Link to={AUTH_ROUTES.login} className="hidden sm:block">
          <Button className="sponsorship-base">Login/Register</Button>
        </Link>
      )}
      <Sidebar
        user={user}
        menuButton={
          <Button variant={"ghost"} size={"icon"} className="block sm:hidden">
            <Menu className=" h-8 w-8 m-auto" />
          </Button>
        }
      />
    </div>
  );
};

const navLinks = [
  {
    path: "sponsorship-list",
    text: "Sponsorship list",
    link: ROUTES.sponsorshipList
  },
  { path: "add", text: "Contribute", link: ROUTES.contribute },
  { path: "contact", text: "Contact", link: ROUTES.contact },
  { path: "about", text: "About", link: ROUTES.about }
];

interface NavLinkProps {
  path: string;
  text: string;
  link: string;
}

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
