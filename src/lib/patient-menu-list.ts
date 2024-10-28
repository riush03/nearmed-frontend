import {
    Settings,
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
            href: "/patient/appointment",
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
            label: "Patients Info",
            icon: UserRoundCheck ,
            submenus: [
              {
                href: "/patient",
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
                href: "/patient/patienthistory",
                label: "Medical history"
              }
            ]
          },
          {
            href: "/Patient/shop",
            label: "Shop",
            icon: Store
          },
          {
            href: "/patient/chat",
            label: "Chat",
            icon: MessageCircleMore
          },
          {
            href: "/patient/ai",
            label: "Ask AI",
            icon: Bot
          }
        ]
      },
      {
        groupLabel: "Settings",
        menus: [
          {
            href: "/patient",
            label: "Account",
            icon: Settings
          }
        ]
      }
    ];
  }
  