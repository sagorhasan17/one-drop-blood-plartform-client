import Banner from "@/components/sections/banner/Banner";
import HowItWorks from "@/components/sections/worksSection/HowItWorks";

export default async function Home() {
  // const usersRes = await getAllUsers();
  // const requestsRes = await getAllDonorsRequest();
  // const users = usersRes?.data || [];
  // const totalUsers = users.length;
  // const totalRequests = requestsRes.length;

  // const totalDonors = users.filter((user) => user.role === "donor").length;
  // const activeDonors = users.filter(
  //   (user) => user.role === "donor" && user.status === "active",
  // ).length;

  // const stats = [
  //   {
  //     title: "Total Users",
  //     value: totalUsers,
  //     icon: FaUsers,
  //     growth: "+12%",
  //     iconBg: "bg-red-100",
  //     iconColor: "text-green-600",
  //   },
  //   {
  //     title: "Blood Requests",
  //     value: totalRequests,
  //     icon: FaTint,
  //     growth: "+8%",
  //     iconBg: "bg-red-100",
  //     iconColor: "text-red-600",
  //   },
  //   {
  //     title: "Total Founding",
  //     value: totalDonors,
  //     icon: TbCoinTakaFilled,
  //     growth: "+18%",
  //     iconBg: "bg-green-100",
  //     iconColor: "text-green-600",
  //   },
  //   {
  //     title: "Active Donors",
  //     value: activeDonors,
  //     icon: FaUserCheck,
  //     growth: "+6%",
  //     iconBg: "bg-red-100",
  //     iconColor: "text-green-600",
  //   },
  // ];

  return (
    <div>
      <Banner />
      <HowItWorks />
    </div>
  );
}
