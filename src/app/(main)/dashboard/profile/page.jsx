'use client';

import { authClient } from '@/lib/auth-client';
import { Avatar, Button } from '@heroui/react';
import { useEffect, useState } from 'react';
import { FiDroplet, FiEdit, FiMail, FiMapPin, FiPhone, FiSave, FiUser } from 'react-icons/fi';

const ProfilePage = () => {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;
const formattedDate = user?.updatedAt && !isNaN(new Date(user.updatedAt))
    ? new Date(user.updatedAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Date not specified";
    console.log('formattedDate', formattedDate);
  // States
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    district: '',
    upazila: '',
    bloodGroup: '',
    lastDonation: '',
    totalDonations: 0,
    location: '',
    status: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || 'Male',
        district: user.district || 'Dhaka',
        upazila: user.upazila || 'Sadar',
        bloodGroup: user.bloodGroup || 'A+',
        lastDonation: user.lastDonation || 'N/A',
        totalDonations: user.donationCount || 0,
        location: user.location || 'Bangladesh',
        status: user.status || 'Active',
        lastDonate: user.donatedAt,
      });
    }
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || 'Male',
        district: user.district || 'Dhaka',
        upazila: user.upazila || 'Sadar',
        bloodGroup: user.bloodGroup || 'A+',
        lastDonation: user.lastDonation || 'N/A',
        totalDonations: user.donationCount || 0,
        location: user.location || 'Bangladesh',
        status: user.status || 'Active',
        lastDonate: user.donatedAt,
      });
    }
    setIsEditing(false);
  };

  const handleSave = () => {
    console.log('Updated Data to save:', formData);
    setIsEditing(false);
  };

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-pulse rounded-full bg-default-200" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-xl font-semibold text-default-500">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <section className="container mx-auto max-w-7xl px-4 py-10">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-black">
            Profile <span className="text-red-500">Settings</span>
          </h1>

          <p className="mt-2 text-default-500">
            Manage your personal information and donor credentials.
          </p>
        </div>

        <div className="flex gap-3">
          {!isEditing ? (
            <Button
              color="danger"
              variant="flat"
              startContent={<FiEdit />}
              className="font-semibold"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          ) : (
            <>
              <Button variant="bordered" onClick={handleCancel}>
                Cancel
              </Button>

              <Button
                color="danger"
                startContent={<FiSave />}
                className="font-semibold"
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Profile Banner */}
      <div className="relative mt-8 overflow-hidden rounded-3xl border border-default-200 bg-content1 shadow-xl">
        <div className="h-52 bg-linear-to-r from-red-950 via-red-800 to-red-600" />

        <div className="relative px-6 pb-8 md:px-10">
          <div className="-mt-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-5 md:flex-row md:items-end">
              <Avatar className="h-32 w-32 rounded-md border-4 border-white bg-default-100">
                <Avatar.Image
                  alt={user.name || 'User Avatar'}
                  src={user?.profilePhoto}
                  referrerPolicy="no-referrer"
                />
                <Avatar.Fallback>{user.name?.charAt(0) || 'U'}</Avatar.Fallback>
              </Avatar>

              <div>
                <h2 className="text-4xl font-black">{formData.name || 'Unknown User'}</h2>

                <div className="mt-2 flex flex-wrap gap-3">
                  <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
                    {formData.status}
                  </span>

                  <span className="text-default-500">
                    📍 {formData.upazila}, {formData.district}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-red-200 bg-red-50 px-8 py-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-red-400">
                Blood Group
              </p>

              <h3 className="mt-2 text-5xl font-black text-red-600">
                {formData.bloodGroup || 'N/A'}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Left Side */}
        <div className="space-y-6 lg:col-span-2">
          {/* Personal Info */}
          <div className="rounded-3xl border border-default-200 bg-content1 p-6 shadow-sm">
            <h3 className="mb-6 flex items-center gap-3 text-xl font-bold">
              <FiUser className="text-red-500" />
              Personal Information
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="h-14 w-full rounded-xl border border-default-200 px-4 outline-none focus:border-red-500 disabled:cursor-not-allowed disabled:bg-default-100 disabled:opacity-70"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Email Address</label>

                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="h-14 w-full rounded-xl border border-default-200 bg-default-100 pl-12 pr-4 disabled:cursor-not-allowed disabled:opacity-70"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Phone Number</label>

                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter your phone number"
                    className="h-14 w-full rounded-xl border border-default-200 pl-12 pr-4 outline-none focus:border-red-500 disabled:cursor-not-allowed disabled:bg-default-100 disabled:opacity-70"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Gender</label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="h-14 w-full rounded-xl border border-default-200 px-4 outline-none focus:border-red-500 disabled:cursor-not-allowed disabled:bg-default-100 disabled:opacity-70"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="rounded-3xl border border-default-200 bg-content1 p-6 shadow-sm">
            <h3 className="mb-6 flex items-center gap-3 text-xl font-bold">
              <FiMapPin className="text-red-500" />
              Address Information
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">District</label>

                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="h-14 w-full rounded-xl border border-default-200 px-4 outline-none focus:border-red-500 disabled:cursor-not-allowed disabled:bg-default-100 disabled:opacity-70"
                >
                  <option value="Dhaka">Dhaka</option>
                  <option value="Gazipur">Gazipur</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Rajshahi">Rajshahi</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Upazila</label>

                <select
                  name="upazila"
                  value={formData.upazila}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="h-14 w-full rounded-xl border border-default-200 px-4 outline-none focus:border-red-500 disabled:cursor-not-allowed disabled:bg-default-100 disabled:opacity-70"
                >
                  <option value="Sadar">Sadar</option>
                  <option value="Kaliganj">Kaliganj</option>
                  <option value="Tongi">Tongi</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-default-200 bg-content1 p-6 shadow-sm">
            <h3 className="mb-5 flex items-center gap-3 text-xl font-bold">
              <FiDroplet className="text-red-500" />
              Medical Profile
            </h3>

            <div className="space-y-5">
              <div>
                <p className="text-sm text-default-500">Blood Group</p>

                {isEditing ? (
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="mt-2 h-14 w-full rounded-xl border border-red-200 bg-red-50 px-4 text-center text-xl font-black text-red-600 outline-none focus:border-red-500"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                ) : (
                  <div className="mt-2 rounded-xl border border-red-200 bg-red-50 p-4 text-center">
                    <span className="text-3xl font-black text-red-600">
                      {formData.bloodGroup || 'N/A'}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm text-default-500">Last Donation</p>
                <p className="mt-1 font-semibold">{formattedDate}</p>
              </div>

              <div>
                <p className="text-sm text-default-500">Total Donations</p>
                <p className="mt-1 text-2xl font-black text-red-500">{user?.donationCount}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-green-700">Eligible to Donate</h3>

            <p className="mt-3 text-sm text-green-600">
              Your account is active and eligible for blood donation. Thank you for helping save
              lives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
