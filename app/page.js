import Link from "next/link";
import { Briefcase, ArrowRight, SignOut } from "@phosphor-icons/react/ssr";
import { getUser } from "@/lib/dal";
import { logout } from "@/app/actions/auth";

export default async function Home() {
  const user = await getUser();

  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-background px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[.07] blur-3xl dark:bg-accent/[.10]"
      />

      <main className="relative flex w-full max-w-sm flex-col items-center gap-8 py-24 text-center">
        <div className="flex flex-col items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-[0_1px_2px_rgb(0_0_0_/_0.06),0_8px_20px_-4px_rgb(36_81_196_/_0.35)]">
            <Briefcase size={22} weight="fill" />
          </span>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Interview Tracker
          </h1>
        </div>

        {user ? (
          <div className="flex w-full flex-col items-center gap-5">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Signed in as <span className="text-foreground">{user.email}</span>
            </p>
            <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-sm transition-all hover:brightness-110 active:scale-[0.98]"
              >
                Go to dashboard
                <ArrowRight size={16} weight="bold" />
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-100 active:scale-[0.98] dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                >
                  <SignOut size={16} />
                  Log out
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-3">
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Keep every internship application, and where it stands, in one place.
            </p>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex flex-1 items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-sm transition-all hover:brightness-110 active:scale-[0.98]"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="inline-flex flex-1 items-center justify-center rounded-lg border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-100 active:scale-[0.98] dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
              >
                Sign up
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
