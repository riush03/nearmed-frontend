import {
  Settings,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  Bot,
  MessageCircleMore,
  Store,
  UserRoundCheck ,
  UsersRound 
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [
            {
              href: "/admin/patients",
              label: "All Patients"
            },
            {
              href: "/admin/doctors",
              label: "All Doctors"
            },
            {
              href: "/admin/medicine",
              label: "Medicine"
            },
            {
              href: "/admin/update",
              label: "Update"
            },
          ]
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Admin info",
          icon: UserRoundCheck,
          submenus: [
            {
              href: "/admin/profile",
              label: "Profile"
            },
            {
              href: "/admin/notifications",
              label: "Notifications"
            },
            {
              href: "/admin/appointments",
              label: "Your appointments"
            },
          ]
        },
        {
          href: "/admin/shp",
          label: "Shop",
          icon: Store
        },
        {
          href: "/admin/chat",
          label: "Tags",
          icon: MessageCircleMore
        },
        {
          href: "/admin/ai",
          label: "AI",
          icon: Bot
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/admin/users",
          label: "Users",
          icon: UsersRound
        },
        {
          href: "/admin/account",
          label: "Account",
          icon: Settings
        }
      ]
    }
  ];
}
