"use client";

import RootLoadingPage from "@/app/loading";
import { authClient } from "@/lib/auth-client";

const DonorPage = () => {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;
  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <RootLoadingPage />
      </div>
    );
  }
  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <RootLoadingPage />
      </div>
    );
  }
  return (
    <section className="space-y-8">
      {/* Welcome Banner */}
      <h1>Donor Page dashboard page</h1>
    </section>
  );
};

export default DonorPage;
