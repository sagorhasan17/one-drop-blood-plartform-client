import MyRequestUpdate from "@/components/shared/updateForm/MyRequestUpdate";
import { getMyRequestsById } from "@/lib/api/request";

const ManageDonationRequestPage = async ({ params }) => {
  const { id } = await params;
  const requestData = await getMyRequestsById(id);
  return <MyRequestUpdate requestData={requestData} />;
};

export default ManageDonationRequestPage;
