import { requestRole } from "@/lib/session";

const DonorLayout = async ({ children }) => {
  await requestRole("donor");
  return children;
};

export default DonorLayout;
