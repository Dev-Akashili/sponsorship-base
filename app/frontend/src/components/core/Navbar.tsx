import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Helmet } from "./Helmet";
import { AUTH_ROUTES, ROUTES } from "@/pages/routes";
import { User } from "@/types";
import { UserMenu } from "./UserMenu";

export const Navbar = ({ user }: { user: User | null }) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-20 px-8 shadow-md flex justify-between items-center z-10 bg-white">
      <Helmet />
      <div className="flex lg:space-x-10 md:space-x-4">
        {navLinks.map((navLink, index) => (
          <NavLink key={index} text={navLink.text} link={navLink.link} />
        ))}
      </div>
      {user ? (
        <UserMenu user={user} />
      ) : (
        <Link to={AUTH_ROUTES.login}>
          <Button className="bg-blue-600 hover:bg-blue-500">
            Login/Register
          </Button>
        </Link>
      )}
    </div>
  );
};

const navLinks = [
  { text: "Sponsorship List", link: ROUTES.sponsorshipList },
  { text: "Contribute", link: ROUTES.contribute },
  { text: "Contact", link: ROUTES.contact },
  { text: "About", link: ROUTES.about }
];

const NavLink = ({ text, link }: { text: string; link: string }) => {
  return (
    <Link to={link}>
      <p className="text-md font-bold font-mono hover:text-blue-600 hover:underline hover:cursor-pointer">
        {text}
      </p>
    </Link>
  );
};
