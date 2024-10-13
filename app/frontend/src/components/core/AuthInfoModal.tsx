import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import { CircleCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { AUTH_ROUTES } from "@/pages/routes";
import { Button } from "../ui/button";

interface AuthInfoModalProps {
  children: React.ReactNode;
}

export const AuthInfoModal = ({ children }: AuthInfoModalProps) => {
  const texts = [
    "Add and manage favourites",
    "Make a contribution",
    "Be the first to know about updates"
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[350px]">
        <DialogHeader>
          <DialogTitle className="text-blue-600">
            Make the most with an account!
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Register an account or log into your existing account to:
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-2">
          {texts.map((text) => (
            <InfoTile key={text} text={text} />
          ))}
        </div>
        <DialogFooter>
          <Link to={AUTH_ROUTES.login} className="w-[50%]">
            <Button
              variant={"ghost"}
              className="text-blue-600 dark:text-blue-800 hover:text-blue-500 border border-blue-600 dark:border-blue-800 w-full"
            >
              Login
            </Button>
          </Link>
          <Link to={AUTH_ROUTES.register} className="w-[50%]">
            <Button className="sponsorship-base dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white w-full">
              Register
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const InfoTile = ({ text }: { text: string }) => (
  <div className="flex items-center space-x-2">
    <CircleCheck className="size-4 text-white bg-blue-600 rounded-full" />
    <p className="text-sm dark:text-white">{text}</p>
  </div>
);
