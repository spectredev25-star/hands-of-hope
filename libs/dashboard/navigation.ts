
import {
  LayoutDashboard,
  Compass,
  ClipboardList,
  QrCode,
  History,
  UserRound,
  Package,
  FilePlus,
  Truck,
  Building2,
  Users,
  Warehouse,
  ChartNoAxesCombined,
  Settings,
  ClipboardCheck,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
};

/* --------------------------------
   BENEFICIARY NAVIGATION
--------------------------------- */

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

/* --------------------------------
   ORGANIZATION NAVIGATION
--------------------------------- */

export const organizationNavigation: DashboardNavItem[] = [
  {
    label: "Overview",
    href: "/organization/dashboard",
    icon: LayoutDashboard,
    description: "Your organization overview",
  },
  {
    label: "My Contributions",
    href: "/organization/contributions",
    icon: Package,
    description: "Track your submitted contributions",
  },
  {
    label: "New Contribution",
    href: "/organization/contributions/new",
    icon: FilePlus,
    description: "Submit resources for donation",
  },
  {
    label: "Collection",
    href: "/organization/collection",
    icon: Truck,
    description: "Track resource collection",
  },
  {
    label: "My Profile",
    href: "/organization/profile",
    icon: Building2,
    description: "Manage organization details",
  },
];

/* --------------------------------
   ADMIN NAVIGATION
--------------------------------- */

export const adminNavigation: DashboardNavItem[] = [
  {
    label: "Overview",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    description: "Platform overview",
  },
  {
    label: "Beneficiaries",
    href: "/admin/beneficiaries",
    icon: Users,
    description: "Manage beneficiary accounts",
  },
  {
    label: "Organizations",
    href: "/admin/organizations",
    icon: Building2,
    description: "Manage partner organizations",
  },
  {
    label: "Contributions",
    href: "/admin/contributions",
    icon: ClipboardCheck,
    description: "Review submitted contributions",
  },
  {
    label: "Inventory",
    href: "/admin/inventory",
    icon: Warehouse,
    description: "Manage available resources",
  },
  {
    label: "Requests",
    href: "/admin/requests",
    icon: ClipboardList,
    description: "Review assistance requests",
  },
  {
    label: "Distributions",
    href: "/admin/distributions",
    icon: HeartHandshake,
    description: "Manage resource distribution",
  },
  {
    label: "Reports",
    href: "/admin/reports",
    icon: ChartNoAxesCombined,
    description: "View platform reports",
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    description: "Manage platform settings",
  },
];
