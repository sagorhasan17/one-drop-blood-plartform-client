import { requestRole } from "@/lib/session";

const AdminLayout = async ({ children }) => {
  await requestRole("admin");
  return children;
};

export default AdminLayout;
