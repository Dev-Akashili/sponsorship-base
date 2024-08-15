import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Helmet } from "./Helmet";
import { AUTH_ROUTES } from "@/pages/routes";
// import { UserMenu } from "./UserMenu";

export const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 h-20 px-8 shadow-md flex justify-between items-center z-10 bg-white">
      <Helmet />
      <div></div>
      <Link to={AUTH_ROUTES.login}>
        <Button className="bg-blue-600 hover:bg-blue-500">
          Login/Register
        </Button>
      </Link>
      {/* <UserMenu /> */}
    </div>
  );
};
