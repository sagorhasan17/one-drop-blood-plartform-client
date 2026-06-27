"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";

const UserCard = ({ user }) => {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  if (isPending) {
    return (
      <div className="rounded-2xl border border-default-200 bg-content1 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 animate-pulse rounded-full bg-default-200" />

          <div className="flex-1 space-y-2">
            <div className="h-4 w-28 animate-pulse rounded bg-default-200" />
            <div className="h-3 w-40 animate-pulse rounded bg-default-200" />
          </div>
        </div>

        <div className="mt-5 h-10 animate-pulse rounded-xl bg-default-200" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-default-200 bg-content1 p-4 shadow-sm">
      {/* User */}
      <div className="flex items-center gap-3">
        <Avatar>
          <Avatar.Image
            alt={user?.name || "User Avatar"}
            src={user?.profilePhoto}
            referrerPolicy="no-referrer"
          />
          <Avatar.Fallback>{user?.name?.charAt(0) || "U"}</Avatar.Fallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold">
            {user?.name || "Unknown User"}
          </h2>

          <p className="truncate text-xs text-default-500">{user?.email}</p>
        </div>
      </div>

      {/* Logout */}
      <Button
        variant="danger"
        radius="lg"
        fullWidth
        className="mt-5"
        startContent={<FiLogOut size={16} />}
        onPress={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default UserCard;
