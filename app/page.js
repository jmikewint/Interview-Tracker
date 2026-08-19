import Link from "next/link";
import { getUser } from "@/lib/dal";
import { logout } from "@/app/actions/auth";

export default async function Home() {
  const user = await getUser();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center gap-6 py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
          Interview Tracker
        </h1>

        {user ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-zinc-600 dark:text-zinc-400">
              Signed in as {user.email}
            </p>
            <div className="flex gap-4 text-sm font-medium">
              <Link
                href="/dashboard"
                className="rounded-full bg-foreground px-5 py-2 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
              >
                Go to dashboard
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="rounded-full border border-solid border-black/[.08] px-5 py-2 font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
                >
                  Log out
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 text-sm font-medium">
            <Link
              href="/login"
              className="rounded-full bg-foreground px-5 py-2 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-full border border-solid border-black/[.08] px-5 py-2 transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            >
              Sign up
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
