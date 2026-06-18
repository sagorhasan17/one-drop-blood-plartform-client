"use client";

import Link from "next/link";
import { FaHome, FaTint } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        {/* Blood Drop Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-500/10 p-6">
            <FaTint className="text-6xl text-red-500" />
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-7xl font-extrabold text-red-500 md:text-9xl">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-3xl font-bold text-white">
          Oops! Blood Route Not Found
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-lg text-gray-400">
          {` The page you are looking for does not exist or has been moved. Let's
          take you back to the home page and continue saving lives.`}
        </p>

        {/* Button */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700"
          >
            <FaHome />
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
