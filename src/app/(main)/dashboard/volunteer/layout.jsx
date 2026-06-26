import { requestRole } from "@/lib/session";

const VolunteerLayout = async ({ children }) => {
  await requestRole("volunteer");
  return children;
};

export default VolunteerLayout;
