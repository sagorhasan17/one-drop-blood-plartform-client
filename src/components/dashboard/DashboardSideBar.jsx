"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHandsHelping, FaUserCircle, FaUsers } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import { LuHandHelping } from "react-icons/lu";
import { MdDashboardCustomize } from "react-icons/md";
import UserCard from "./UserCard";

export function DashboardSideBar() {
  const pathname = usePathname();

  const { data, isPending } = authClient.useSession();

  if (isPending) return null;
  const user = data?.user;

  const role = data?.user?.role;

  // const dashboardHref =
  //   role === "admin"
  //     ? "/dashboard/admin"
  //     : role === "volunteer"
  //       ? "/dashboard/volunteer"
  //       : "/dashboard/donor";

  const navItems = [
    {
      icon: MdDashboardCustomize,
      label: "Dashboard",
      href: "/dashboard",
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

    ...(role === "volunteer" || role === "admin"
      ? [
          {
            icon: FaHandsHelping,
            label: "All Public Requests",
            href: "/dashboard/all-public-requests",
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
    <div className="flex h-[calc(100vh-110px)] flex-col rounded-2xl border border-default-200 bg-content1 shadow-sm">
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="space-y-2">{navContent}</div>
      </div>

      {/* User Card */}
      <div className="border-t border-default-200 p-5">
        <UserCard user={user} />
      </div>
    </div>
  );
}
