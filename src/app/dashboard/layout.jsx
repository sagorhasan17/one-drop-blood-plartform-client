import { DashboardSideBar } from "@/components/dashboard/DashboardSideBar";
import DashboardNavbar from "@/components/shared/navbar/DashboardNavbar";

const DashboardHomeLayout = ({ children }) => {
  return (
    <div className="min-h-screen container mx-auto px-4">
      <DashboardNavbar />

      <div className="flex items-start gap-6">
        {/* Sidebar */}
        <aside className="sticky top-24 w-72 self-start">
          <DashboardSideBar />
        </aside>

        {/* Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardHomeLayout;
