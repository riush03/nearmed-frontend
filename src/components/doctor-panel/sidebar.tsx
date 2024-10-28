"use client";
import { Menu } from "@dapp/components/doctor-panel/menu";
import { SidebarToggle } from "@dapp/components/admin-panel/sidebar-toggle";
import { Button } from "@dapp/components/ui/button";
import { useSidebar } from "@dapp/hooks/use-sidebar";
import { useStore } from "@dapp/hooks/use-store";
import { cn } from "@dapp/lib/utils";
import { PanelsTopLeft } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  return (
    <div className=" bg-gray-100">
    <aside
      className={cn(
        "fixed flex flex-col gap-2  left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !getOpenState() ? "w-[90px]" : "w-72",
        settings.disabled && "hidden"
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800"
      >
        
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
    </div>
  );
}
