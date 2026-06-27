import AllRequestTable from "@/components/dashboard/AllRequestTable";
import { getAllDonorsRequest } from "@/lib/api/donor";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const AllPublicRequests = async () => {
  const requests = await getAllDonorsRequest();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  if (!user) {
    redirect("/login");
  }
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
      <AllRequestTable requests={requests} />
    </div>
  );
};

export default AllPublicRequests;
