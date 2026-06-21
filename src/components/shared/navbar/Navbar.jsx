"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";

import ProfileModal from "@/components/modal/ProfileModal";
import { authClient } from "@/lib/auth-client";
import NavLink from "./NavLink";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Donation Requests",
    href: "/requests",
  },
  {
    label: "Search Donors",
    href: "/donors",
  },
  {
    label: "About",
    href: "/about",
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userInfo = authClient.useSession();
  const user = userInfo.data?.user;
  console.log("User info in Navbar:", user);

  return (
    <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-6 py-4">
          {/* Logo */}
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
                <span className="text-white"> Blood</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                classList="text-gray-300 hover:text-white transition-all duration-300"
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Login */}
          <div className="hidden lg:flex items-center">
            {user ? (
              <>
                <ProfileModal user={user} />
              </>
            ) : (
              <Link href="/login">
                <Button
                  radius="full"
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold"
                >
                  <FiLogIn className="mr-1" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-xl lg:hidden"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-3 rounded-2xl border border-white/10 bg-black/90 p-5 lg:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  classList="text-gray-300 hover:text-white transition-all duration-300"
                >
                  <span onClick={() => setIsMenuOpen(false)}>{link.label}</span>
                </NavLink>
              ))}

              {user ? (
                <>
                  <ProfileModal user={user} />
                </>
              ) : (
                <Link href="/login">
                  <Button
                    radius="full"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold w-full mt-2"
                    onPress={() => setIsMenuOpen(false)}
                  >
                    <FiLogIn className="mr-1" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
