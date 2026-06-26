import AllRequestTable from "@/components/dashboard/AllRequestTable";
import { getAllDonorsRequest } from "@/lib/api/donor";

const AllPublicRequests = async () => {
  const requests = await getAllDonorsRequest();
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
