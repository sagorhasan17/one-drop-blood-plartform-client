import { FundingModel } from "@/components/shared/modal/FundingModel";
import { getFundingHistory } from "@/lib/api/funding";
import FundHistoryTable from "./FundHistoryTable";

const FundingPage = async () => {
  const fundingHistory = await getFundingHistory();
  const data = fundingHistory?.data;
  return (
    <section className="flex flex-col gap-4">
      <div className="container mx-auto">
        <div className=" text-center py-5">
          <h1 className="text-4xl font-bold text-white">
            Founding <span className="text-red-500">History</span>
          </h1>
          <p className="text-gray-300 text-md py-2">
            manage and track you contributions to the community
          </p>
        </div>

        <div className="flex justify-between items-center gap-4 py-10">
          <div></div>
          <div>
            <FundingModel />
          </div>
        </div>

        <div>
          <FundHistoryTable data={data} />
        </div>
      </div>
    </section>
  );
};

export default FundingPage;
