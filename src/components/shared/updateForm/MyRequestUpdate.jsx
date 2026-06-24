"use client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FiArrowLeft, FiMapPin, FiSave, FiUser } from "react-icons/fi";
import { LuHospital } from "react-icons/lu";

const MyRequestUpdate = ({ requestData }) => {
  const handleUpdate = (e) => {
    e.preventDefault();;
  };
  return (
    <section className="container mx-auto max-w-5xl px-4 py-12">
      {/* Header Section */}
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4 md:gap-6">
          {/* Back Button */}

          <Link href={`/dashboard/donor/request-donor/my-requests`}>
            <Button
              isIconOnly
              variant="flat"
              radius="full"
              className="h-12 w-12 bg-default-100 text-default-600 transition-transform hover:-translate-x-1"
              onClick={() => router.back()}
            >
              <FiArrowLeft className="text-xl" />
            </Button>
          </Link>

          <div>
            <h1 className="text-3xl font-black tracking-tight md:text-4xl">
              Edit <span className="text-red-500">Request</span>
            </h1>
            <p className="mt-1.5 text-sm font-medium text-default-500">
              Update the details for this blood requirement.
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex md:justify-end">
          <div className="inline-flex h-10 items-center justify-center rounded-full border border-orange-200 bg-orange-50 px-5 dark:border-orange-500/20 dark:bg-orange-500/10">
            <span className="text-[10px] font-black uppercase tracking-widest ">
              Current Status: <span className="text-red-500">Pending</span>
            </span>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="rounded-[2.5rem] border border-default-100 bg-white p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] dark:bg-content1 md:p-12">
        <form onSubmit={handleUpdate}>
          {/* Input Grid Layout */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-10 md:gap-y-8">
            {/* Recipient Name */}
            <div>
              <label className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-default-400">
                <FiUser className="text-red-400 text-sm" /> Recipient Name
              </label>
              <input
                type="text"
                defaultValue={requestData?.recipientName}
                required
                className="h-14 w-full rounded-2xl border border-transparent bg-default-50 px-5 font-bold text-default-900 outline-none transition-all placeholder:text-default-400 focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-500/10 dark:focus:bg-default-100"
              />
            </div>

            {/* District */}
            <div>
              <label className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-default-400">
                <FiMapPin className="text-red-400 text-sm" /> District
              </label>
              <input
                type="text"
                defaultValue={requestData?.districtName}
                required
                className="h-14 w-full rounded-2xl border border-transparent bg-default-50 px-5 font-bold text-default-900 outline-none transition-all placeholder:text-default-400 focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-500/10 dark:focus:bg-default-100"
              />
            </div>

            {/* Upazila */}
            <div>
              <label className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-default-400">
                <FiMapPin className="text-red-400 text-sm" /> Upazila
              </label>
              <input
                type="text"
                defaultValue={requestData?.upazila}
                required
                className="h-14 w-full rounded-2xl border border-transparent bg-default-50 px-5 font-bold text-default-900 outline-none transition-all placeholder:text-default-400 focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-500/10 dark:focus:bg-default-100"
              />
            </div>

            {/* Hospital Name */}
            <div>
              <label className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-default-400">
                <LuHospital className="text-red-400 text-sm" /> Hospital Name
              </label>
              <input
                type="text"
                defaultValue={requestData?.hospitalName}
                required
                className="h-14 w-full rounded-2xl border border-transparent bg-default-50 px-5 font-bold text-default-900 outline-none transition-all placeholder:text-default-400 focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-500/10 dark:focus:bg-default-100"
              />
            </div>

            {/* Full Detailed Address */}
            <div className="md:col-span-2">
              <label className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-default-400">
                <FiMapPin className="text-red-400 text-sm" /> Full Detailed
                Address
              </label>
              <textarea
                defaultValue={requestData?.fullAddress}
                required
                rows={4}
                className="w-full rounded-2xl border border-transparent bg-default-50 p-5 font-bold text-default-900 outline-none transition-all placeholder:text-default-400 focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-500/10 dark:focus:bg-default-100 resize-none"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="my-10 h-px w-full bg-default-100" />

          {/* Footer Actions */}
          <div className="flex flex-col-reverse justify-end gap-4 sm:flex-row sm:items-center">
            <Link href={`/dashboard/donor/request-donor/my-requests`}>
              <Button
                variant="flat"
                size="lg"
                className="h-14 bg-default-100 px-8 font-bold text-default-600 sm:w-auto w-full"
                radius="xl"
              >
                Cancel
              </Button>
            </Link>

            <Button
              type="submit"
              color="danger"
              size="lg"
              className="h-14 px-8 font-bold shadow-lg shadow-red-500/30 sm:w-auto w-full transition-transform hover:scale-[1.02]"
              radius="xl"
              startContent={<FiSave className="text-lg" />}
            >
              Update Request
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MyRequestUpdate;
