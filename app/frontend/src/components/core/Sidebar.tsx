import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../ui/sheet";
import { User } from "@/types";
import { Helmet } from "./Helmet";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { LogoutButton } from "./UserMenu";
import { Separator } from "../ui/separator";
import { Link, useLocation } from "react-router-dom";
import { AUTH_ROUTES } from "@/pages/routes";
import {
  SIDEBAR_ITEMS,
  SIDEBAR_USERMENU_ITEMS,
  MenuItems as SidebarItemProps
} from "@/constants/Menu.constants";
import { ShieldAlert } from "lucide-react";

interface SidebarProps {
  user: User | null;
  menuButton: ReactNode;
}

export const Sidebar = ({ user, menuButton }: SidebarProps) => {
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
            <SidebarUserMenu user={user} />
          ) : (
            <SheetClose asChild>
              <Link to={AUTH_ROUTES.login} className="w-full">
                <Button className="sponsorship-base w-full">
                  Login/Register
                </Button>
              </Link>
            </SheetClose>
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
          className={`w-full hover:text-blue-600 ${
            isCurrentPath ? "bg-slate-100 text-blue-600" : ""
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

const SidebarUserMenu = ({ user }: { user: User }) => {
  const email = user.email;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center">
        <img src="../../user.png" alt="user" className="h-12 w-12" />
        <p className="ml-4 text-slate-600 font-semibold">
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
        {user.roles.includes("Admin") && (
          <SidebarItem
            path={"admin"}
            text={"Admin panel"}
            link={"/"}
            icon={<ShieldAlert />}
          />
        )}
        <LogoutButton sidebar />
      </div>
    </div>
  );
};
