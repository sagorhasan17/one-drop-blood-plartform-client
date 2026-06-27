import MyRequestsTable from "@/components/dashboard/MyRequestsTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const MyDonationRequestsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  if (!user) {
    redirect("/login");
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/my-requests?email=${user?.email}`;

  const res = await fetch(url, {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <div className="space-y-2">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-black">
            My <span className="text-red-500">Donation Requests</span>
          </h1>

          <p className="text-md text-[#ddd] mt-2">
            Manage and track your blood donation requests.
          </p>
        </div>
      </div>
      <MyRequestsTable users={data} />
    </div>
  );
};

export default MyDonationRequestsPage;
