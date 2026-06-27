import UsersTable from "@/components/dashboard/UsersTable";
import { getAllUsers } from "@/lib/api/users";

const AllUsersPage = async () => {
  const res = await getAllUsers();
  const users = res.data;
  if (!users) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black">
            My <span className="text-red-500">Users</span>
          </h1>

          <p className="text-md text-[#ddd] mt-2">
            Manage and track your users.
          </p>
        </div>
      </div>
      <UsersTable users={users} />
    </div>
  );
};

export default AllUsersPage;
