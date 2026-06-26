"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { MdDashboardCustomize } from "react-icons/md";

const ProfileModal = ({ user }) => {
  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <Popover placement="bottom-end" showArrow>
      <PopoverTrigger>
        <button className="outline-none cursor-pointer rounded-full border border-red-500 p-1 transition-all duration-200 hover:bg-red-500/10">
          <Avatar>
            <Avatar.Image
              alt={user.name || "User Avatar"}
              src={user?.profilePhoto}
              referrerPolicy="no-referrer"
            />
            <Avatar.Fallback>{user.name?.charAt(0) || "U"}</Avatar.Fallback>
          </Avatar>
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-72 rounded-3xl border border-default-200 bg-content1 p-0 shadow-2xl mt-2 transition-all duration-200 mr-45">
        <div className="w-full p-5">
          {/* User Info */}
          <div className="border-b border-default-200 pb-4">
            <h3 className="text-xl font-bold text-foreground">{user?.name}</h3>

            <p className="mt-1 truncate text-sm text-default-500">
              {user?.email}
            </p>
          </div>

          {/* Menu */}
          <div className="mt-4 space-y-2">
            <Link href="/dashboard">
              <button
                slot="close"
                className="flex h-12 w-full cursor-pointer items-center gap-3 rounded-xl px-4 text-default-700 transition-all duration-200 hover:bg-white/20 hover:text-red-500"
              >
                <MdDashboardCustomize size={20} />
                Dashboard
              </button>
            </Link>
            <button
              slot="close "
              onClick={handleLogout}
              className="flex h-12 w-full cursor-pointer items-center gap-3 rounded-xl px-4 text-red-500 transition-all duration-200 hover:bg-white/20 hover:text-red-700"
            >
              <FiLogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileModal;
