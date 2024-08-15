import { CircleUserRound, LayoutDashboard } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";

export const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="hover:bg-slate-300 border-2 border-slate-600 items-center justify-center flex"
        >
          <p>emksakashili@gmail.com</p>
          <CircleUserRound className="h-16 w-6 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <div className="flex items-center">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Personal Dashboard
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LogoutButton = () => {
  return (
    <div className="flex items-center">
      <LogOut className="h-4 w-4 mr-2" />
      Sign Out
    </div>
  );
};
