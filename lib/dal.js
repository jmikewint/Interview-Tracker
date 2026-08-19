import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const session = await decrypt(cookieStore.get("session")?.value);

  if (!session?.userId) {
    return null;
  }

  return { isAuth: true, userId: session.userId };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    return await prisma.user.findUnique({
      where: { id: session.userId },
      select: { id: true, email: true, createdAt: true },
    });
  } catch {
    return null;
  }
});

// For pages that require auth: redirects to /login instead of returning
// null. verifySession()/getUser() stay non-redirecting so callers like the
// home page can render differently for signed-out visitors.
export async function requireUser() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export const getApplications = cache(async () => {
  const session = await verifySession();
  if (!session) return [];

  return prisma.application.findMany({
    where: { userId: session.userId },
    orderBy: { dateApplied: "desc" },
  });
});
