import AllRequestTable from "@/components/dashboard/AllRequestTable";
import RequestFilter from "@/components/shared/filter/RequestFilter";
import { getFilteredDonorsRequest } from "@/lib/api/donor";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const AllPublicRequests = async ({ searchParams }) => {
  const filters = await searchParams;

  const querySearch = new URLSearchParams(filters);
  const queryString = querySearch.toString();

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const token = session?.session?.token;
  const requests = await getFilteredDonorsRequest(queryString);

  const user = session?.user;
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-4xl xl:text-5xl">
            My Donation<span className="text-red-500"> Requests</span>
          </h1>

          <p className="max-w-xl text-sm leading-6 text-default-500 sm:text-base">
            Manage, monitor, and keep track of all your blood donation requests
            in one place.
          </p>
        </div>

        {/* Filter */}
      </div>
      <div className="flex justify-between gap-5 lg:gap-10">
        <div className="flex-1"></div>
        <div className="flex items-center gap-5">
          <RequestFilter filters={filters} />
        </div>
      </div>

      {/* Table */}
      <AllRequestTable requests={requests} />
    </div>
  );
};

export default AllPublicRequests;
