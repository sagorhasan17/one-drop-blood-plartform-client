"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ children, href, classList }) => {
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <Link
      href={href}
      className={`${classList} ${isActive ? "text-red-500 border-b border-red-500 pb-0.5" : ""}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
