"use client";

import { Drawer, DrawerBody, DrawerContent, DrawerHeader } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import { LuHandHelping } from "react-icons/lu";
import { MdDashboardCustomize } from "react-icons/md";

export function DashboardSideBar() {
  const pathname = usePathname();

  const navItems = [
    {
      icon: MdDashboardCustomize,
      label: "Dashboard",
      href: "/dashboard/donor",
    },
    { icon: FaUserCircle, label: "Profile", href: "/dashboard/profile" },
    {
      icon: HiPencil,
      label: "Add Request",
      href: "/dashboard/donor/request-donor/new",
    },
    {
      icon: LuHandHelping,
      label: "My Requests",
      href: "/dashboard/donor/request-donor/my-requests",
    },
  ];

  const navContent = (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
              isActive
                ? "bg-red-50 font-bold text-red-600"
                : "font-medium text-default-700 hover:bg-default-100"
            }`}
          >
            <item.icon
              className={`size-5 ${
                isActive ? "text-red-600" : "text-default-500"
              }`}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden h-screen w-64 shrink-0 border-r border-default-200 bg-content1 p-5 lg:block">
        {navContent}
      </aside>
      {/* Mobile */}
      <Drawer placement="left">
        <DrawerContent>
          <DrawerHeader>Navigation</DrawerHeader>
          <DrawerBody>{navContent}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
