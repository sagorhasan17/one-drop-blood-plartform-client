"use client";

import { FaTint } from "react-icons/fa";

const RootLoadingPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />

      <div className="relative flex flex-col items-center">
        {/* Animated Blood Drop */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-red-500/30" />

          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 backdrop-blur-md">
            <FaTint className="text-5xl text-red-500 animate-bounce" />
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="mt-8 text-3xl font-bold">
          <span className="text-red-500">One</span>
          <span>Drop Blood</span>
        </h2>

        <p className="mt-2 text-default-500">
          Connecting donors and saving lives...
        </p>

        {/* Loader Dots */}
        <div className="mt-6 flex gap-2">
          <span className="h-3 w-3 animate-bounce rounded-full bg-red-500 [animation-delay:-0.3s]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-red-500 [animation-delay:-0.15s]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-red-500" />
        </div>
      </div>
    </div>
  );
};

export default RootLoadingPage;
