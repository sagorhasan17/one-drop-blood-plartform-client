"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { FaHandHoldingHeart, FaHeart, FaTint, FaUsers } from "react-icons/fa";

const Banner = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Hero Section */}
      <div
        className="relative min-h-[85vh] rounded-b-[40px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Gradient Glow */}
        <div className="absolute inset-0 bg-linear-to-r from-red-950/40 via-transparent to-red-950/20" />

        <div className="relative z-10 container mx-auto flex min-h-[85vh] flex-col items-center justify-center px-4 text-center">
          {/* Badge */}
          <div className="mb-6 flex items-center gap-2 rounded-full border border-red-500/30 bg-white/10 px-5 py-2 backdrop-blur-md">
            <FaHeart className="text-red-500" />
            <span className="text-sm font-medium text-white">
              Trusted by 500+ Blood Donors
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-5xl text-5xl font-black leading-tight text-white md:text-7xl">
            Give Blood,
            <span className="block text-red-500">Save a Life Today</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-3xl text-lg text-gray-300 md:text-xl">
            Join our community of heroes. Connect donors with patients, respond
            to urgent blood requests, and help save lives across Bangladesh.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/signup">
              <Button
                size="lg"
                radius="full"
                className="bg-red-600 px-8 text-white hover:bg-red-700"
              >
                Become a Donor
              </Button>
            </Link>

            <Link href="/donors">
              <Button
                size="lg"
                radius="full"
                variant="bordered"
                className="border-white text-white"
              >
                Find Donors
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Stats */}
      <div className="container relative z-20 mx-auto -mt-20 px-4">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-3xl border border-white/10 bg-white/20 p-8 text-center shadow-xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">
              <FaUsers className="text-2xl text-red-500" />
            </div>

            <h3 className="text-4xl font-bold text-white/40">500+</h3>

            <p className="mt-2 text-gray-500">Active Donors</p>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-white/10 bg-white/20 p-8 text-center shadow-xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">
              <FaHandHoldingHeart className="text-2xl text-red-500" />
            </div>

            <h3 className="text-4xl font-bold text-white/40">1,200+</h3>

            <p className="mt-2 text-gray-500">Lives Helped</p>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl border border-white/10 bg-white/20 p-8 text-center shadow-xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">
              <FaTint className="text-2xl text-red-500" />
            </div>

            <h3 className="text-4xl font-bold text-white/40">150+</h3>

            <p className="mt-2 text-gray-500">Blood Requests</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
