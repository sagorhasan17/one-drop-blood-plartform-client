import { DashboardSideBar } from "@/components/dashboard/DashboardSideBar";

const DashboardHomeLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen container mx-auto gap-6 px-4">
      <div className="sticky top-0 h-full">
        <DashboardSideBar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashboardHomeLayout;
