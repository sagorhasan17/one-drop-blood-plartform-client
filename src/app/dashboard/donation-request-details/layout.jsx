import { requestRole } from "@/lib/session";

const DonationRequestDetailsLayout = async ({ children }) => {
  await requestRole("admin");
  return children;
};

export default DonationRequestDetailsLayout;
