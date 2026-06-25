import { DashboardSideBar } from "@/components/dashboard/DashboardSideBar";

const DashboardHomeLayout = ({ children }) => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="container mx-auto flex h-full">
        {/* Sidebar - Fixed and Non-scrollable */}
        <aside className="hidden h-full w-64 shrink-0 border-r border-default-200 bg-content1 lg:block">
          <DashboardSideBar />
        </aside>

        {/* Main Content - Scrollable */}
        <main className="flex-1 h-full overflow-y-auto">
          <div className="min-h-full p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardHomeLayout;
