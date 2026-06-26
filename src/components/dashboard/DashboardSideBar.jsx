"use client";

import { authClient } from "@/lib/auth-client";
import { Drawer, DrawerBody, DrawerContent, DrawerHeader } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHandsHelping, FaUserCircle, FaUsers } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import { LuHandHelping } from "react-icons/lu";
import { MdDashboardCustomize } from "react-icons/md";

export function DashboardSideBar() {
  const pathname = usePathname();

  const { data, isPending } = authClient.useSession();

  if (isPending) return null;

  const role = data?.user?.role;

  const dashboardHref =
    role === "admin"
      ? "/dashboard/admin"
      : role === "volunteer"
        ? "/dashboard/volunteer"
        : "/dashboard/donor";

  const navItems = [
    {
      icon: MdDashboardCustomize,
      label: "Dashboard",
      href: dashboardHref,
    },
    {
      icon: FaUserCircle,
      label: "Profile",
      href: "/dashboard/profile",
    },
    {
      icon: HiPencil,
      label: "Add Request",
      href: "/dashboard/create-donation-request",
    },
    {
      icon: LuHandHelping,
      label: "My Requests",
      href: "/dashboard/my-donation-requests",
    },

    ...(role === "admin"
      ? [
          {
            icon: FaUsers,
            label: "All Users",
            href: "/dashboard/admin/all-users",
          },
        ]
      : []),

    ...(role === "volunteer"
      ? [
          {
            icon: FaHandsHelping,
            label: "All Public Requests",
            href: "/dashboard/volunteer/all-public-requests",
          },
        ]
      : []),
  ];

  const navContent = (
    <nav className="flex flex-col gap-2">
      {navItems.map(({ icon: Icon, label, href }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={label}
            href={href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
              isActive
                ? "bg-red-50 text-red-600 font-semibold"
                : "text-default-700 hover:bg-default-100"
            }`}
          >
            <Icon
              className={`size-5 ${
                isActive ? "text-red-600" : "text-default-500"
              }`}
            />

            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <div className="h-full p-5">{navContent}</div>

      <Drawer placement="left">
        <DrawerContent>
          <DrawerHeader>Navigation</DrawerHeader>
          <DrawerBody>{navContent}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
