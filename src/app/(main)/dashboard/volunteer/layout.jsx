import { requestRole } from "@/lib/session";


const VolunteerLayout = async({ children }) => {
  await requestRole("donor");
  return children;
};

export default VolunteerLayout;
