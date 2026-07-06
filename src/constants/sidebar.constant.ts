import { BookmarkCheckIcon, SearchIcon } from "@animateicons/react/huge";
import { UserCheckIcon } from "@animateicons/react/lucide";
import {
  LayoutDashboard,
  Rocket,
  Users,
  Briefcase,
  ShieldCheck,
  FileText,
  HeartHandshake,
  BriefcaseBusiness,
} from "lucide-react";

export const founderMenu = [
  {
    title: "Dashboard",
    url: "/founder/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Startup",
    url: "/founder/startups",
    icon: Rocket,
  },
  {
  title: "Pitch Deck",
  url: "/founder/pitch-deck",
  icon: FileText,
}
];

export const mentorMenu = [
  {
    title: "Dashboard",
    url: "/mentor/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Requests",
    url: "/mentor/requests",
    icon: Users,
  },
];

export const investorMenu = [
  {
    title: "Dashboard",
    url: "/investor/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Browse Startups",
    url: "/investor/startups",
    icon: SearchIcon,
  },
  {
    title: "Investments",
    url: "/investor/investments",
    icon: BriefcaseBusiness,
  },
  {
    title: "Saved Startups",
    url: "/investor/saved",
    icon: BookmarkCheckIcon,
  },
  {
    title: "My Interests",
    url: "/investor/interests",
    icon: HeartHandshake,
  },
  {
    title: "Profile",
    url: "/investor/profile",
    icon: UserCheckIcon,
  },
];

export const adminMenu = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Startup Review",
    url: "/admin/startups",
    icon: Rocket,
  },
  {
    title: "Founders",
    url: "/admin/founders",
    icon: Users,
  },
  {
    title: "Investors",
    url: "/admin/investors",
    icon: Briefcase,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: ShieldCheck,
  },
];

export const sidebarMenus = {
  founder: founderMenu,
  mentor: mentorMenu,
  investor: investorMenu,
  admin: adminMenu,
};