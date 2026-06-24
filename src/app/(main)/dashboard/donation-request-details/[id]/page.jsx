import { DonateModal } from "@/components/shared/modal/DonateModal";
import { getDonorById } from "@/lib/api/donor";
import { auth } from "@/lib/auth";
import { Chip } from "@heroui/react";
import { headers } from "next/headers";

import {
  FaArrowRight,
  FaCalendarAlt,
  FaClock,
  FaHandHoldingHeart,
  FaHospital,
  FaMapMarkerAlt,
  FaTint,
  FaUser,
} from "react-icons/fa";
import { FaFilePen } from "react-icons/fa6";

const DonationRequestDetailsPage = async ({ params }) => {
  const { id } = await params;
  const donorDetails = await getDonorById(id);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session.user;

  const {
    recipientName,
    bloodGroup,
    hospitalName,
    districtName,
    fullAddress,
    requiredDate,
    requiredTime,
    requestMessage,
    status,
  } = donorDetails;

  return (
    <section className="min-h-screen bg-linear-to-b from-white via-red-50/30 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="uppercase text-xs tracking-[4px] text-gray-400 mb-2">
            Request ID #{id}
          </p>

          <h1 className="text-4xl md:text-5xl font-black">
            Request <span className="text-red-500">Details</span>
          </h1>

          <p className="text-gray-500 mt-3">
            View urgency, location and donation requirements.
          </p>
        </div>

        {/* Status */}
        <div className="flex justify-center mb-6">
          <Chip
            color={
              status === "done"
                ? "success"
                : status === "inprogress"
                  ? "warning"
                  : "danger"
            }
            variant="flat"
            size="lg"
          >
            {status || "Pending"}
          </Chip>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[32px] border border-red-100 shadow-xl overflow-hidden">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 p-8">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 rounded-3xl bg-red-50 border border-red-100 flex items-center justify-center shadow">
                <FaUser className="text-red-500 text-3xl" />
              </div>

              <div>
                <h2 className="text-3xl font-bold">{recipientName}</h2>

                <p className="uppercase text-xs tracking-[3px] text-gray-400 mt-1">
                  Recipient • Patient
                </p>
              </div>
            </div>

            {/* Blood Group */}
            <div className="bg-red-50 border border-red-100 rounded-3xl px-5 py-4 flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-red-500  flex items-center justify-center font-extrabold text-4xl">
                {bloodGroup}
              </div>

              <div>
                <p className="uppercase text-[11px] tracking-[2px] text-red-500 font-bold">
                  Required
                </p>

                <h3 className="font-bold text-lg text-red-500">Blood Group</h3>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Content */}
          <div className="grid md:grid-cols-2">
            {/* Left */}
            <div className="p-8 border-r border-gray-100">
              <h3 className="uppercase tracking-[4px] text-xs text-gray-400 font-bold mb-8">
                Location Details
              </h3>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-green-50 flex items-center justify-center">
                    <FaHospital className="text-green-600 text-xl" />
                  </div>

                  <div>
                    <p className="uppercase text-xs text-gray-400">Hospital</p>

                    <h4 className="font-bold text-xl">{hospitalName}</h4>

                    <p className="text-gray-500">{districtName}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-red-500 text-xl" />
                  </div>

                  <div>
                    <p className="uppercase text-xs text-gray-400">
                      Full Address
                    </p>

                    <h4 className="font-semibold">{fullAddress}</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="p-8">
              <h3 className="uppercase tracking-[4px] text-xs text-gray-400 font-bold mb-8">
                Timing & Urgency
              </h3>

              <div className="flex flex-wrap gap-8 mb-8">
                <div className="flex gap-3 items-center">
                  <div className="w-20 h-20 rounded-xl bg-red-50 flex items-center justify-center">
                    <FaCalendarAlt className="text-red-500" />
                  </div>
                  <div>
                    <p className="uppercase text-xs text-gray-400">
                      Required Date
                    </p>
                    <h4 className="font-bold">{requiredDate}</h4>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                    <FaClock />
                  </div>
                  <div>
                    <p className="uppercase text-xs text-gray-400">Time</p>
                    <h4 className="font-bold">{requiredTime}</h4>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-20 rounded-2xl bg-red-50 flex items-center justify-center">
                  <FaFilePen className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="uppercase text-xs text-gray-400">
                    Note (Optional)
                  </p>
                  <h4 className="font-semibold">{requestMessage}</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 p-6">
            <DonateModal user={user} requestId={id} status={status} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-5 mt-8">
          <div className="bg-white rounded-3xl shadow border border-gray-100 p-6 text-center">
            <FaTint className="text-red-500 text-3xl mx-auto mb-3" />
            <h3 className="font-bold text-2xl">{bloodGroup}</h3>
            <p className="text-gray-500">Required Blood</p>
          </div>

          <div className="bg-white rounded-3xl shadow border border-gray-100 p-6 text-center">
            <FaHospital className="text-green-600 text-3xl mx-auto mb-3" />
            <h3 className="font-bold">{hospitalName}</h3>
            <p className="text-gray-500">Hospital</p>
          </div>

          <div className="bg-white rounded-3xl shadow border border-gray-100 p-6 text-center">
            <FaMapMarkerAlt className="text-red-500 text-3xl mx-auto mb-3" />
            <h3 className="font-bold">{districtName}</h3>
            <p className="text-gray-500">Location</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationRequestDetailsPage;
