"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaHospital,
  FaMapMarkerAlt,
} from "react-icons/fa";

const DonationCard = ({ request }) => {
  if (!request) return null;
  const formattedDate = request?.requiredDate
    ? new Date(request.requiredDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Date not specified";

  return (
    <div className="h-full">
      {/* Card Container */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-white border border-red-50 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(239,68,68,0.1)] hover:border-red-100">
        {/* Top Header Section */}
        <div className="flex items-start justify-between">
          <div className="flex h-16 w-16 flex-col items-center justify-center rounded-[20px] bg-linear-to-br from-red-500 via-red-600 to-orange-500 shadow-lg shadow-red-500/25">
            <span className="text-2xl font-black text-white tracking-tight leading-none drop-shadow-md">
              {request?.bloodGroup || "N/A"}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50/80 px-3 py-1.5 border border-orange-100 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600">
              {request?.status || "URGENT"}
            </span>
          </div>
        </div>

        {/* Recipient Info Section */}
        <div className="mt-5 mb-4">
          <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
            {request?.recipientName || "Unknown Recipient"}
          </h2>
          <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Blood Recipient
          </p>
        </div>

        {/* Details Grid */}
        <div className="flex flex-col gap-3.5 grow">
          {/* Location */}
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex shrink-0 items-center justify-center text-red-500">
              <FaMapMarkerAlt size={14} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 leading-none mb-1">
                Location
              </p>
              <p className="text-sm font-medium text-gray-800 line-clamp-1 leading-tight">
                {request?.upazila}, {request?.districtName}
              </p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex shrink-0 items-center justify-center text-orange-500">
              <FaCalendarAlt size={14} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 leading-none mb-1">
                Required Date
              </p>
              <p className="text-sm font-medium text-gray-800 leading-tight">
                {formattedDate}{" "}
                {request?.requiredTime ? `| ${request.requiredTime}` : ""}
              </p>
            </div>
          </div>

          {/* Hospital */}
          {request?.hospitalName && (
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex shrink-0 items-center justify-center text-red-500">
                <FaHospital size={14} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 leading-none mb-1">
                  Hospital
                </p>
                <p className="text-sm font-medium text-gray-800 line-clamp-1 leading-tight">
                  {request.hospitalName}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Button: Fix applied here (Removed Link wrapper, used as={Link}) */}
        <div className="mt-6 pt-4 border-t border-gray-50">
          <Link
            href={`/dashboard/donation-request-details/${request?._id || ""}`}
          >
            <Button className="w-full bg-linear-to-r from-red-500 to-orange-500 hover:opacity-90 text-white font-bold h-11 rounded-4xl flex items-center justify-center gap-2 text-sm transition-all shadow-md shadow-red-500/20 active:scale-[0.98]">
              <FaArrowRight size={12} />
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
