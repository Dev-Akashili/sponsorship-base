import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { logout } from "@/api/identity";
import { useContext } from "react";
import { AuthContext } from "@/context/Auth";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/pages/routes";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { CircleUserRound } from "lucide-react";
import { NAVBAR_USERMENU_ITEMS } from "@/constants/Menu.constants";

export const UserMenu = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email ?? "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="hover:bg-slate-300 border-2 dark:border border-slate-600 dark:border-white dark:text-white hidden sm:flex items-center justify-center"
        >
          <p>{email.length > 25 ? email?.substring(0, 25) + "..." : email}</p>
          <CircleUserRound className="h-16 w-6 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {NAVBAR_USERMENU_ITEMS.map((item) => (
          <div key={item.text}>
            <Link to={item.link}>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex items-center">
                  {item.icon}
                  {item.text}
                </div>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
          </div>
        ))}
        <DropdownMenuItem className="cursor-pointer">
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const LogoutButton = ({ sidebar = false }: { sidebar?: boolean }) => {
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      const request = await logout();

      if (request.ok) {
        setAuthState({ isAuthenticated: false, user: null });
        navigate(ROUTES.index);
        toast.success("Signed out!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.warn("Sign Out failed!");
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return sidebar ? (
    <Button
      variant={"ghost"}
      className="w-full hover:text-blue-600 dark:text-white"
      onClick={handleSignOut}
    >
      <div className="mr-auto flex justify-center items-center">
        <LogOut />
        <p className="ml-4">Sign out</p>
      </div>
    </Button>
  ) : (
    <div className="flex items-center w-full" onClick={handleSignOut}>
      <LogOut className="h-4 w-4 mr-2" />
      Sign out
    </div>
  );
};
