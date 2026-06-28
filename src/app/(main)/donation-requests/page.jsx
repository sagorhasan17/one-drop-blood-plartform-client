import DonationCard from "@/components/shared/card/DonationCard";
import { getAllDonorsRequest } from "@/lib/api/donor";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { FaHeartbeat, FaTint } from "react-icons/fa";

const DonationRequestsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const token = session?.session?.token;
  const requests = await getAllDonorsRequest(token);

  return (
    <section className="relative overflow-hidden py-4 lg:py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-red-50/60 via-white to-orange-50/60" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-200/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/30 blur-[120px] rounded-full" />
      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-red-100 shadow-sm text-red-500 font-medium">
            <FaTint />
            Blood Donation Requests
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
            Save a Life With Your{" "}
            <span className="bg-linear-to-r from-red-500 via-red-600 to-orange-500 bg-clip-text text-transparent">
              Blood Donation
            </span>
          </h1>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 mb-6">
            <div className="px-6 py-3 rounded-2xl bg-white/70 backdrop-blur-xl border border-default-100 shadow-sm">
              <p className="text-2xl font-bold text-danger">
                {requests?.length || 0}
              </p>
              <p className="text-sm text-default-500">Active Requests</p>
            </div>

            <div className="px-6 py-3 rounded-2xl bg-white/70 backdrop-blur-xl border border-default-100 shadow-sm">
              <p className="text-2xl font-bold text-orange-500">24/7</p>
              <p className="text-sm text-default-500">Emergency Support</p>
            </div>

            <div className="px-6 py-3 rounded-2xl bg-white/70 backdrop-blur-xl border border-default-100 shadow-sm">
              <p className="text-2xl font-bold text-red-500">
                <FaHeartbeat className="inline" />
              </p>
              <p className="text-sm text-default-500">Save Lives</p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-16">
          {requests?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
              {requests.map((request) => (
                <DonationCard key={request._id} request={request} />
              ))}
            </div>
          ) : (
            <div className="max-w-md mx-auto text-center py-20">
              <div className="w-24 h-24 mx-auto rounded-full bg-red-50 flex items-center justify-center">
                <FaTint className="text-4xl text-red-500" />
              </div>

              <h3 className="mt-6 text-2xl font-bold">No Requests Found</h3>

              <p className="mt-2 text-default-500">
                Currently there are no active blood donation requests.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DonationRequestsPage;
