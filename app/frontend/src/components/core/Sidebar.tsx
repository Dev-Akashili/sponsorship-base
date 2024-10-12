import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../ui/sheet";
import { Helmet } from "./Helmet";
import { ReactNode, useContext } from "react";
import { Button } from "../ui/button";
import { LogoutButton } from "./UserMenu";
import { Separator } from "../ui/separator";
import { Link, useLocation } from "react-router-dom";
import {
  SIDEBAR_ITEMS,
  SIDEBAR_USERMENU_ITEMS,
  MenuItems as SidebarItemProps
} from "@/constants/Menu.constants";
import { AUTH_ROUTES } from "@/pages/routes";
import { AuthContext } from "@/context/Auth";

interface SidebarProps {
  menuButton: ReactNode;
}

export const Sidebar = ({ menuButton }: SidebarProps) => {
  const { user } = useContext(AuthContext);

  return (
    <Sheet>
      <SheetTrigger asChild>{menuButton}</SheetTrigger>
      <SheetContent side={"left"} className="w-[330px]">
        <SheetHeader>
          <SheetTitle>
            <Helmet sidebar />
          </SheetTitle>
        </SheetHeader>
        <Separator className="my-4 border-t-2" />
        <div className="flex flex-col h-5/6 justify-between">
          <div className="flex flex-col space-y-2">
            {SIDEBAR_ITEMS.map((item, index) => (
              <SidebarItem
                key={index}
                path={item.path}
                text={item.text}
                link={item.link}
                icon={item.icon}
              />
            ))}
          </div>
          {user ? (
            <SidebarUserMenu email={user?.email} />
          ) : (
            <div className="flex justify-between space-x-2">
              <Link to={AUTH_ROUTES.login} className="w-[48%]">
                <SheetClose asChild>
                  <Button
                    className="text-blue-600 hover:text-blue-500 border border-blue-600 w-full"
                    variant={"ghost"}
                  >
                    Login
                  </Button>
                </SheetClose>
              </Link>
              <Link to={AUTH_ROUTES.register} className="w-[48%]">
                <SheetClose asChild>
                  <Button className="sponsorship-base w-full">Register</Button>
                </SheetClose>
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const SidebarItem = ({ path, text, link, icon }: SidebarItemProps) => {
  const location = useLocation();
  const isCurrentPath = location.pathname.includes(path);

  return (
    <Link to={link} className="w-full">
      <SheetClose asChild className="w-full">
        <Button
          variant={"ghost"}
          className={`w-full hover:text-blue-600 dark:text-white ${
            isCurrentPath ? "bg-slate-100 dark:bg-slate-700 text-blue-600" : ""
          }`}
        >
          <div className="mr-auto flex justify-center items-center">
            {icon}
            <p className="ml-4">{text}</p>
          </div>
        </Button>
      </SheetClose>
    </Link>
  );
};

const SidebarUserMenu = ({ email }: { email: string }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center">
        <img src="../../user.png" alt="user" className="h-12 w-12" />
        <p className="ml-4 text-slate-600 dark:text-slate-300 font-semibold">
          {email.length > 20 ? email?.substring(0, 20) + "..." : email}
        </p>
      </div>
      <Separator className="border-t-2" />
      <div className="flex flex-col space-y-2">
        {SIDEBAR_USERMENU_ITEMS.map((item, index) => (
          <SidebarItem
            key={index}
            path={item.path}
            text={item.text}
            link={item.link}
            icon={item.icon}
          />
        ))}
        <LogoutButton sidebar />
      </div>
    </div>
  );
};
