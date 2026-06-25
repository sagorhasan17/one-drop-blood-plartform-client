"use client";

import { Drawer, DrawerBody, DrawerContent, DrawerHeader } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHandsHelping, FaUserCircle } from "react-icons/fa";
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
    {
      icon: FaUserCircle,
      label: "Profile",
      href: "/dashboard/profile",
    },
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
    {
      icon: FaHandsHelping,
      label: "All Public Requests",
      href: "/dashboard/volunteer",
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
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
              isActive
                ? "bg-red-50 font-semibold text-red-600"
                : "text-default-700 hover:bg-default-100"
            }`}
          >
            <item.icon
              className={`size-5 ${
                isActive ? "text-red-600" : "text-default-500"
              }`}
            />

            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar - Removed overflow-y-auto to keep it completely fixed */}
      <div className="h-full p-5">{navContent}</div>
      {/* Mobile Drawer */}
      <Drawer placement="left">
        <DrawerContent>
          <DrawerHeader>Navigation</DrawerHeader>
          <DrawerBody>{navContent}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
