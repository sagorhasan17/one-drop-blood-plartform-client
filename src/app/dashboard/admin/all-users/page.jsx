import UsersTable from "@/components/dashboard/UsersTable";
import { getAllUsers } from "@/lib/api/users";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const AllUsersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const token = session?.session?.token;
  const res = await getAllUsers(token);
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
