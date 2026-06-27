import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
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
  console.log(data);

  if (data.length === 0) {
    return (
      <div className="flex w-full justify-center">
        No Donation Requests Found...
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
