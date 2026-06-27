"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
const DashboardNavbar = () => {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;

  // if (isPending) {
  //   return (
  //     <div className="h-10 w-10 animate-pulse rounded-full bg-default-200" />
  //   );
  // }

  return (
    <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link href="/">
              <div className="flex items-center">
                <Image
                  src="/oneDropLogo.png"
                  alt="One Drop Blood"
                  width={50}
                  height={50}
                  className="h-10 w-10 object-contain"
                  priority
                />

                <h1 className="text-xl lg:text-2xl font-bold">
                  <span className="text-red-500">One</span>
                  <span>Drop</span>
                  {/* <span className="text-white"> Blood</span> */}
                </h1>
              </div>
            </Link>
            <div>
              <h2 className="text-md font-bold">Dashboard</h2>
              <h3 className="text-sm font-medium text-black/30">
                Welcome back , {user?.role || "donor"}
              </h3>
            </div>
          </div>
          <Avatar>
            <Avatar.Image
              alt={user?.name || "User Avatar"}
              src={user?.profilePhoto}
              referrerPolicy="no-referrer"
            />
            <Avatar.Fallback>{user?.name?.charAt(0) || "U"}</Avatar.Fallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
