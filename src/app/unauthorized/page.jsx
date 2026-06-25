"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { FaLock, FaArrowLeft, FaHome } from "react-icons/fa";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-white to-red-50 px-6">
      <div className="w-full max-w-lg rounded-3xl p-10 text-center shadow-2xl">
        {/* Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
          <FaLock className="text-5xl text-red-600" />
        </div>

        {/* Status */}
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-red-600">
          Error 403
        </p>

        {/* Title */}
        <h1 className="mt-3 text-4xl font-bold text-gray-900">Access Denied</h1>

        {/* Description */}
        <p className="mt-4 text-gray-600 leading-relaxed">
          {`You don't have permission to access this page.
          <br />
          Please sign in with an authorized account or return to the homepage.`}
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition hover:bg-red-50 hover:text-red-600"
          >
            <FaHome className="size-5 text-red-600" />
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
