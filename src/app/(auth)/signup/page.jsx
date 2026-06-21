"use client";

import { districts } from "@/data/districts";
import { upazilas } from "@/data/upazilas";
import { authClient } from "@/lib/auth-client";
import { Button, toast } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiCamera,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiUser,
} from "react-icons/fi";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SignUpPage = () => {
  const [preview, setPreview] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

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
    const formData = new FormData(e.currentTarget);
    if (!selectedBloodGroup) {
      alert("Please select a blood group.");
      return;
    }
    if (formData.get("password") !== formData.get("confirmPassword")) {
      alert("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      let profilePhotoUrl = "";
      const imageFile = formData.get("profilePhoto");
      //size check for image file (max 3MB)
      if (imageFile && imageFile.size > 3 * 1024 * 1024) {
        alert("Profile photo must be less than 3MB.");
        setIsLoading(false);
        return;
      }
      if (imageFile && imageFile.size > 0) {
        const imageFormData = new FormData();
        imageFormData.append("image", imageFile);
        const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          {
            method: "POST",
            body: imageFormData,
          },
        );
        const imgData = await response.json();
        if (imgData.success) {
          profilePhotoUrl = imgData.data.display_url;
          console.log("Image uploaded successfully:", profilePhotoUrl);
        } else {
          alert("Failed to upload profile photo. Please try again.");
          setIsLoading(false);
          return;
        }
      }

      const { data, error } = await authClient.signUp.email({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        gender: formData.get("gender"),
        district: selectedDistrict,
        upazila: formData.get("upazila"),
        bloodGroup: selectedBloodGroup,
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
        profilePhoto: profilePhotoUrl,
        role: "donor", // default role
        status: "pending", // default status
      });

      if (!error) {
        toast.success(
          "Registration successful! Please check your email to verify your account.",
        );

        console.log("Registration successful:", data);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      redirect("/");
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl rounded-3xl border border-default-200 bg-content1 p-6 shadow-xl md:p-10">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-black text-red-500">
              Join the Lifesaving Community
            </h1>
            <p className="mt-3 text-default-500">
              Create an account and become a blood donor today.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image */}
            <div className="mb-10 flex justify-center">
              <div className="relative">
                <label className="cursor-pointer">
                  <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-4 border-red-100 bg-red-50">
                    {preview ? (
                      <Image
                        src={preview}
                        alt="Profile Preview"
                        width={144}
                        height={144}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FiUser className="text-6xl text-red-300" />
                    )}
                  </div>

                  <div className="absolute bottom-12 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white">
                    <FiCamera />
                  </div>

                  <input
                    type="file"
                    name="profilePhoto"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </label>

                <p className="mt-3 text-center font-medium">
                  Upload Profile Photo
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    className="h-14 w-full rounded-xl border border-default-200 pl-12 pr-4 outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    className="h-14 w-full rounded-xl border border-default-200 pl-12 pr-4 outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Phone Number
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+8801XXXXXXXXX"
                    className="h-14 w-full rounded-xl border border-default-200 pl-12 pr-4 outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Gender
                </label>
                <select
                  name="gender"
                  required
                  className="h-14 w-full bg-black/40 text-white rounded-xl border border-default-200 px-4 outline-none focus:border-red-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
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
                    name="district"
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

            {/* Blood Group */}
            <div>
              <label className="mb-3 block text-sm font-semibold">
                Blood Group
              </label>

              <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
                {bloodGroups.map((group) => (
                  <button
                    type="button"
                    key={group}
                    onClick={() => setSelectedBloodGroup(group)}
                    className={`h-12 rounded-xl border font-semibold transition-all ${
                      selectedBloodGroup === group
                        ? "border-red-500 bg-red-500 text-white shadow-md"
                        : "border-default-200 hover:border-red-300"
                    }`}
                  >
                    {group}
                  </button>
                ))}
              </div>

              <input
                type="hidden"
                name="bloodGroup"
                value={selectedBloodGroup}
              />
            </div>

            {/* Password Fields */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />
                  <input
                    name="password"
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="h-14 w-full rounded-xl border border-default-200 pl-12 pr-12 outline-none focus:border-red-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-default-500 hover:text-default-800"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Confirm Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />
                  <input
                    name="confirmPassword"
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className="h-14 w-full rounded-xl border border-default-200 pl-12 pr-12 outline-none focus:border-red-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-default-500 hover:text-default-800"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              className="h-14 bg-red-600 text-lg font-semibold text-white hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Complete Registration"}
            </Button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-default-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-red-500 hover:underline"
            >
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
