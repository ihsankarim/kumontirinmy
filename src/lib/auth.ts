import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";
import { redirect } from "next/navigation";

export async function requireRole(allowedRoles: string[]) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  if (!session) {
    return redirect("/login");
  }

  if (!allowedRoles.includes(role as string)) {
    return redirect("/forbidden");
  }

  return session;
}
