import Banner from "@/components/sections/banner/Banner";
import HowItWorks from "@/components/sections/worksSection/HowItWorks";
import { getAllDonorsRequest } from "@/lib/api/donor";
import { getFundingHistory } from "@/lib/api/funding";
import { getAllUsers } from "@/lib/api/users";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import RootLoadingPage from "../dashboard/loading";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const fundingHistory = await getFundingHistory();
  const data = fundingHistory?.data;
  const totalFundingAmount = data?.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);
  const usersRes = await getAllUsers(session?.session?.token);
  const requestsRes = await getAllDonorsRequest(session?.session?.token);

  if (!session) {
    return <RootLoadingPage></RootLoadingPage>;
  }

  const totalUsers = usersRes?.data?.length;
  const totalRequests = requestsRes?.length;

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
