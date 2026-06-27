import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { FaTint } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import MyRequestsTable from "./MyRequestsTable";

const DonorDashboard = async ({ user }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!user) {
    redirect("/login");
  }
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/my-requests-with-limit?email=${user?.email}`;
  const res = await fetch(url, {
    cache: "no-store",
  });
  const data = await res.json();

  if (data.length === 0) {
    return (
      <div className=" w-full flex min-h-87 items-center justify-center">
        <div className="max-w-full rounded-2xl border border-default-200 bg-content1 p-8 text-center shadow-lg">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <FaTint className="text-4xl text-red-500" />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-default-800 dark:text-default-100">
            No Donation Requests Found
          </h2>

          <p className="mt-3 text-default-500">
            There are currently no blood donation requests available. Please
            check back later or create a new request if you need blood.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <MyRequestsTable users={data} />
      <Link href="/dashboard/my-donation-requests">
        <div className="flex justify-center mt-3">
          <button className="bg-red-500 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full flex justify-between items-center gap-1 cursor-pointer">
            view all requests
            <FiArrowRight className="text-xl" />
          </button>
        </div>
      </Link>
    </div>
  );
};

export default DonorDashboard;
