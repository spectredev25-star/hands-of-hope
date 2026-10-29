import {
  LayoutDashboard,
  Compass,
  ClipboardList,
  QrCode,
  History,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
};

export const beneficiaryNavigation: DashboardNavItem[] = [
  {
    label: "Overview",
    href: "/beneficiary/dashboard",
    icon: LayoutDashboard,
    description: "Your assistance overview",
  },
  {
    label: "Discover",
    href: "/beneficiary/resources",
    icon: Compass,
    description: "Explore available resources",
  },
  {
    label: "My Requests",
    href: "/beneficiary/requests",
    icon: ClipboardList,
    description: "Track your assistance requests",
  },
  {
    label: "Collection",
    href: "/beneficiary/collection",
    icon: QrCode,
    description: "View collection authorizations",
  },
  {
    label: "History",
    href: "/beneficiary/history",
    icon: History,
    description: "Review previous distributions",
  },
  {
    label: "My Profile",
    href: "/beneficiary/profile",
    icon: UserRound,
    description: "Manage your profile",
  },
];