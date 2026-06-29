import Banner from "@/components/sections/banner/Banner";
import HowItWorks from "@/components/sections/worksSection/HowItWorks";
import { getFundingHistory } from "@/lib/api/funding";
import { getAllStats } from "@/lib/api/stats";

export default async function Home() {
  const fundingHistory = await getFundingHistory();
  const statsData = await getAllStats();
  const totalUsers = statsData?.data?.totalUsers;
  const totalRequests = statsData?.data?.totalDonorRequests;
  const fundingData = fundingHistory?.data;
  const totalFundingAmount = fundingData?.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  return (
    <div>
      <Banner
        totalUsers={totalUsers}
        totalRequests={totalRequests}
        totalFundingAmount={totalFundingAmount}
      />
      <HowItWorks />
    </div>
  );
}
