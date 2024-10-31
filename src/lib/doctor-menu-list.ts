import {
    Tag,
    Users,
    Settings,
    Bookmark,
    SquarePen,
    LayoutGrid,
    LucideIcon,
    Bot,
    MessageCircleMore,
    Store,
    UserRoundCheck ,
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
            href: "/doctor/dashboard",
            label: "Dashboard",
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
            label: "Profile",
            icon: UserRoundCheck,
            submenus: [
              {
                href: "/doctor",
                label: "Profile"
              },
              {
                href: "/doctor/appointments",
                label: "Your Appointments"
              },
              {
                href: "/doctor/notifications",
                label: "Notifications"
              }
            ]
          },
          {
            href: "/admin/shop",
            label: "Shop",
            icon: Store
          },
          {
            href: "/doctor/chat",
            label: "Chat",
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
            href: "/doctor/",
            label: "Account",
            icon: Settings
          }
        ]
      }
    ];
  }
  