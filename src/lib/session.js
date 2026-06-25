import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { user } = session;
  return user || null;
};

// role: donor, volunteer
export const requestRole = async (role) => {
  const user = await getSession();
  if (user.role !== role) {
    return redirect("/unauthorized");
  }
};
