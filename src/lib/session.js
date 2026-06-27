import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  if (!user) {
    return redirect("/login");
  }
  return user;
};

// role: donor, volunteer
export const requestRole = async (role) => {
  const user = await getSession();
  console.log("user in requestRole", user.role);
  console.log("role in requestRole", role);
  if (!user) {
    return redirect("/login");
  }
  if (user.role !== role) {
    return redirect("/unauthorized");
  }
};
