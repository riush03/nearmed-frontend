import {
    Tag,
    Users,
    Settings,
    Bookmark,
    SquarePen,
    LayoutGrid,
    LucideIcon
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
            href: "/admin/appointment",
            label: "Appointment",
            icon: LayoutGrid,
            submenus: []
          }
        ]
      },
      {
        groupLabel: "Contents",
        menus: [
          {
            href: "",
            label: "Posts",
            icon: SquarePen,
            submenus: [
              {
                href: "/patient/profile",
                label: "Profile"
              },
              {
                href: "/patient/orders",
                label: "Orders"
              },
              {
                href: "/patient/prescriptions",
                label: "Prescriptions"
              },
              {
                href: "/patient/history",
                label: "Medical history"
              }
            ]
          },
          {
            href: "/shop",
            label: "Shop",
            icon: Bookmark
          },
          {
            href: "/chat",
            label: "Chat",
            icon: Tag
          },
          {
            href: "/ai",
            label: "Ask AI",
            icon: Tag
          }
        ]
      },
      {
        groupLabel: "Settings",
        menus: [
          {
            href: "/admin/account",
            label: "Account",
            icon: Settings
          }
        ]
      }
    ];
  }
  