"use client";

import { districts } from "@/data/districts";
import { upazilas } from "@/data/upazilas";
import { createDonor } from "@/lib/api/donor";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import {
  FiCalendar,
  FiDroplet,
  FiInfo,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiUser,
} from "react-icons/fi";
import { LuHospital } from "react-icons/lu";
import { toast } from "react-toastify";
import RootLoadingPage from "../loading";

const CreateDonationRequestPage = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const session = authClient.useSession();
  const user = session?.data?.user;
  const isPending = session?.isPending;
  const token = session?.data?.session?.token;

  if (isPending) {
    return <RootLoadingPage />;
  }

  if (user?.status !== "active") {
    return (
      <div className="mx-auto max-w-3xl rounded-2xl border border-warning-300 bg-warning-50 p-8 text-center shadow-sm dark:border-warning-700 dark:bg-warning-900/20">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-warning-100 dark:bg-warning-800">
          <FaInfoCircle className="text-3xl text-red-600 dark:text-warning-400" />
        </div>

        <h2 className="text-2xl font-bold text-warning-700 dark:text-warning-300">
          Donation Status {user?.status}
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-default-600 dark:text-default-400">
          you need to be active to request blood donation.
        </p>
      </div>
    );
  }

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    if (!districtId) {
      setSelectedDistrict("");
      setFilteredUpazilas([]);
      return;
    }
    const districtName = e.target.options[e.target.selectedIndex].text;
    setSelectedDistrict(districtName);
    const matchedUpazilas = upazilas.filter(
      (upazila) => String(upazila.district_id) === String(districtId),
    );

    setFilteredUpazilas(matchedUpazilas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    try {
      const formData = new FormData(e.currentTarget);
      const formValues = Object.fromEntries(formData.entries());
      const finalSubmissionData = {
        requesterName: user?.name,
        requesterEmail: user?.email,
        districtName: selectedDistrict,
        createdAt: new Date().toISOString(),
        ...formValues,
      };
      const payload = await createDonor(finalSubmissionData, token);
      if (payload.insertedId) {
        toast.success("Donor Request Created Successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setIsSubmit(false);
        console.log("Form Submitted Successfully :)", payload);
        redirect("/dashboard/donor/request-donor");
      }
    } catch (error) {
      console.error("Create Donor Error:", error);
    }
  };

  return (
    <section className="container mx-auto max-w-4xl px-4 py-10">
      {/* Header section */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-black md:text-4xl">
          Create New <span className="text-red-500">Donor Request</span>
        </h1>
        <p className="mt-2 text-default-500">
          Fill out the details below to request blood for a patient.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* 1. Requester Info Section */}
        <div className="rounded-3xl border border-default-200 bg-content1 p-6 shadow-sm md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500">
              <FiInfo className="text-xl" />
            </div>
            <h2 className="text-xl font-bold">Requester Info</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-default-500">
                Your Name
              </label>
              <div className="relative">
                {/* 100% Perfect Centered Icon */}
                <FiUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-default-400" />
                <input
                  type="text"
                  name="requesterName"
                  defaultValue={user?.name}
                  disabled
                  className="h-14 w-full rounded-xl border border-default-200 bg-default-50 pl-12 pr-4 text-default-900 outline-none disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-default-500">
                Your Email
              </label>
              <div className="relative">
                <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-default-400" />
                <input
                  type="email"
                  name="requesterEmail"
                  defaultValue={user?.email}
                  disabled
                  className="h-14 w-full rounded-xl border border-default-200 bg-default-50 pl-12 pr-4 text-default-900 outline-none disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Patient Details Section */}
        <div className="rounded-3xl border border-default-200 bg-content1 p-6 shadow-sm md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500">
              <FiDroplet className="text-xl" />
            </div>
            <h2 className="text-xl font-bold">Patient Details</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-default-500">
                Recipient Name
              </label>
              <input
                type="text"
                name="recipientName"
                placeholder="Enter full name"
                required
                className="h-14 w-full rounded-xl border border-default-200 bg-transparent px-4 text-default-900 placeholder:text-default-400 outline-none transition-colors focus:border-red-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-default-500">
                Blood Group Needed
              </label>
              <select
                name="bloodGroup"
                required
                defaultValue=""
                className="h-14 w-full rounded-xl border border-default-200 bg-transparent px-4 font-semibold text-red-600 outline-none transition-colors focus:border-red-500"
              >
                <option value="" disabled>
                  Select Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* District */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                District
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-red-400" />
                <select
                  name="districtId"
                  required
                  onChange={handleDistrictChange}
                  className="h-14 w-full rounded-xl border border-default-200 bg-black/40 pl-12 pr-4 text-white outline-none transition-all focus:border-red-500"
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Upazila */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Upazila
              </label>
              <select
                name="upazila"
                required
                disabled={filteredUpazilas.length === 0}
                className="h-14 w-full rounded-xl bg-black/40 text-white border border-default-200 px-4 outline-none focus:border-red-500 disabled:opacity-50"
              >
                <option value="">Select Upazila</option>
                {filteredUpazilas.map((upazila) => (
                  <option key={upazila.id} value={upazila.name}>
                    {upazila.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 3. Hospital & Timing Section */}
        <div className="rounded-3xl border border-default-200 bg-content1 p-6 shadow-sm md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500">
              <FiCalendar className="text-xl" />
            </div>
            <h2 className="text-xl font-bold">Hospital & Timing</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-default-500">
                Hospital Name
              </label>
              <div className="relative">
                <LuHospital className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-default-400" />
                <input
                  type="text"
                  name="hospitalName"
                  placeholder="Enter hospital name"
                  required
                  className="h-14 w-full rounded-xl border border-default-200 bg-transparent pl-12 pr-4 text-default-900 placeholder:text-default-400 outline-none transition-colors focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-default-500">
                Full Address
              </label>
              <div className="relative">
                <FiMapPin className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-default-400" />
                <input
                  type="text"
                  name="fullAddress"
                  placeholder="Street / Ward / Area"
                  required
                  className="h-14 w-full rounded-xl border border-default-200 bg-transparent pl-12 pr-4 text-default-900 placeholder:text-default-400 outline-none transition-colors focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-default-500">
                Required Date
              </label>
              <input
                type="date"
                name="requiredDate"
                required
                className="h-14 w-full rounded-xl border border-default-200 bg-transparent px-4 text-default-900 outline-none transition-colors focus:border-red-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-default-500">
                Required Time
              </label>
              <input
                type="time"
                name="requiredTime"
                required
                className="h-14 w-full rounded-xl border border-default-200 bg-transparent px-4 text-default-900 outline-none transition-colors focus:border-red-500"
              />
            </div>

            <div className="md:col-span-2 ">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-default-500">
                Request Message (Optional)
              </label>
              <div className="relative">
                {/* Textarea icon optically aligned with the first line of text */}
                <FiMessageSquare className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-default-400" />
                <textarea
                  name="requestMessage"
                  placeholder="Any specific instructions or details for the donor..."
                  rows={4}
                  className="w-full rounded-xl border border-default-200 bg-transparent py-4 pl-12 pr-4 text-default-900 placeholder:text-default-400 outline-none transition-colors focus:border-red-500 md:text-left"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4 flex justify-end">
          <Button
            type="submit"
            color="danger"
            size="lg"
            isDisabled={isSubmit}
            className="w-full font-bold md:w-auto md:px-10"
            startContent={<FiDroplet />}
          >
            {isSubmit ? "Submitting..." : "Request Blood Donation"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CreateDonationRequestPage;
