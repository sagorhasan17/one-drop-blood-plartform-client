import RootLoadingPage from "@/app/loading";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import DonorDashboard from "@/components/dashboard/DonorDashboard";
import VolunteerDashboard from "@/components/dashboard/VolunteerDashboard";
import { auth } from "@/lib/auth";
import { Avatar } from "@heroui/react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardHomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return redirect("/login");
  }
  const { user, isPending } = session;
  const token = session?.session?.token;
  const role = user?.role;
  if (!user) {
    return redirect("/login");
  }
  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <RootLoadingPage />
      </div>
    );
  }
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/my-requests-with-limit?email=${user?.email}`;
  const res = await fetch(url, {
    cache: "no-store",
  });
  const data = await res.json();
  return (
    <section className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-red-950 via-red-800 to-red-600 p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black md:text-5xl">
              Hello, {user?.name || "Donor"} 👋
            </h1>

            <p className="mt-3 max-w-xl text-white/80">
              Thank you for being part of our lifesaving community. Every
              donation can save up to 3 lives.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Avatar className="h-40 w-40 rounded-md border-4 border-white bg-default-100">
              <Avatar.Image
                alt={user?.name || "User Avatar"}
                src={user?.profilePhoto}
                referrerPolicy="no-referrer"
              />
              <Avatar.Fallback>{user?.name?.charAt(0) || "U"}</Avatar.Fallback>
            </Avatar>
            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
              <p className="text-sm text-white/70">Blood Group</p>
              <h2 className="mt-2 text-6xl font-black">
                {user?.bloodGroup || "O+"}
              </h2>
              <div className=" rounded-full bg-black/30 px-4 py-2 text-sm font-semibold text-green-200">
                <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-green-500" />
                <span>{user?.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {role === "admin" ? (
          <AdminDashboard token={token} />
        ) : role === "volunteer" ? (
          <VolunteerDashboard />
        ) : (
          <DonorDashboard user={user} />
        )}
      </div>
    </section>
  );
};

export default DashboardHomePage;
