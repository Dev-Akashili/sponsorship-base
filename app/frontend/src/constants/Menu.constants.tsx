import {
  List,
  Mail,
  Star,
  Table,
  UserCog,
  CopyPlus,
  CircleHelp
} from "lucide-react";
import { ROUTES } from "@/pages/routes";

export interface NavLink {
  path: string;
  text: string;
  link: string;
}

export const NAV_LINKS: NavLink[] = [
  {
    path: "list",
    text: "Sponsorship list",
    link: ROUTES.list
  },
  { path: "add", text: "Contribute", link: ROUTES.contribute },
  { path: "contact", text: "Contact", link: ROUTES.contact },
  { path: "about", text: "About", link: ROUTES.about }
];

export interface MenuItems {
  path: string;
  text: string;
  link: string;
  icon: JSX.Element;
}

export const SIDEBAR_ITEMS: MenuItems[] = [
  {
    path: "list",
    text: "Sponsorsip list",
    link: ROUTES.list,
    icon: <List />
  },
  {
    path: "add",
    text: "Add your sponsored job",
    link: ROUTES.contribute,
    icon: <CopyPlus />
  },
  { path: "contact", text: "Contact", link: ROUTES.contact, icon: <Mail /> },
  {
    path: "about",
    text: "About",
    link: ROUTES.about,
    icon: <CircleHelp />
  }
];

export const SIDEBAR_USERMENU_ITEMS: MenuItems[] = [
  {
    path: "manage",
    text: "Manage contributions",
    link: ROUTES.manage,
    icon: <Table />
  },
  {
    path: "favourite",
    text: "View favourites",
    link: ROUTES.favourite,
    icon: <Star />
  },
  {
    path: "settings",
    text: "Profile settings",
    link: "/",
    icon: <UserCog />
  }
];

export const NAVBAR_USERMENU_ITEMS: MenuItems[] = [
  {
    path: "manage",
    text: "Manage contributions",
    link: ROUTES.manage,
    icon: <Table className="h-4 w-4 mr-2" />
  },
  {
    path: "favourite",
    text: "View favourites",
    link: ROUTES.favourite,
    icon: <Star className="h-4 w-4 mr-2" />
  },
  {
    path: "settings",
    text: "Profile settings",
    link: "/",
    icon: <UserCog className="h-4 w-4 mr-2" />
  }
];
