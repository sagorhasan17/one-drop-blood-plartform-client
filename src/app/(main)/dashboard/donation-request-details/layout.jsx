import { requestRole } from "@/lib/session";

const DonationRequestDetailsLayout = async ({ children }) => {
  await requestRole("donor");
  return children;
};

export default DonationRequestDetailsLayout;
