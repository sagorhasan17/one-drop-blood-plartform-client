import MyRequestsTable from "@/components/dashboard/MyRequestsTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyRequestsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/donor/request-donor/my-requests?email=${user?.email}`,
    {
      cache: "no-store",
    },
  );

  const data = await res.json();
  console.log("data from my requests", data);

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
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

export default MyRequestsPage;
