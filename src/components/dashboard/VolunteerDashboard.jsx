import { getAllUsers } from "@/lib/api/users";
import { FaTint, FaUserCheck, FaUsers } from "react-icons/fa";

import { getAllDonorsRequest } from "@/lib/api/donor";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { TbCoinTakaFilled } from "react-icons/tb";
import DashboardStatCard from "./DashboardStatCard";

const VolunteerDashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const token = session?.session?.token;
  const usersRes = await getAllUsers(token);
  const requestsRes = await getAllDonorsRequest();
  const users = usersRes?.data || [];
  const totalUsers = users.length;
  const totalRequests = requestsRes.length;

  const totalDonors = users.filter((user) => user.role === "donor").length;
  const activeDonors = users.filter(
    (user) => user.role === "donor" && user.status === "active",
  ).length;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: FaUsers,
      growth: "+12%",
      iconBg: "bg-red-100",
      iconColor: "text-green-600",
    },
    {
      title: "Blood Requests",
      value: totalRequests,
      icon: FaTint,
      growth: "+8%",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Total Founding",
      value: totalDonors,
      icon: TbCoinTakaFilled,
      growth: "+18%",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Active Donors",
      value: activeDonors,
      icon: FaUserCheck,
      growth: "+6%",
      iconBg: "bg-red-100",
      iconColor: "text-green-600",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <DashboardStatCard key={item.title} {...item} />
      ))}
    </section>
  );
};

export default VolunteerDashboard;
