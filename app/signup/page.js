"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  Briefcase,
  EnvelopeSimple,
  LockKey,
  WarningCircle,
  CircleNotch,
} from "@phosphor-icons/react";
import { signup } from "@/app/actions/auth";

export default function SignupPage() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-background px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[.07] blur-3xl dark:bg-accent/[.10]"
      />

      <main className="relative w-full max-w-sm">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Briefcase size={17} weight="fill" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Interview Tracker
          </span>
        </Link>

        <div className="rounded-2xl border border-zinc-200 bg-surface p-7 shadow-[0_1px_2px_rgb(0_0_0_/_0.04),0_12px_32px_-12px_rgb(0_0_0_/_0.10)] dark:border-zinc-800">
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Start tracking your internship applications.
          </p>

          <form action={action} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <div className="relative">
                <EnvelopeSimple
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-zinc-200 bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-zinc-400 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-zinc-800"
                />
              </div>
              {state?.errors?.email && (
                <p className="flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
                  <WarningCircle size={13} weight="fill" />
                  {state.errors.email}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <LockKey
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-zinc-200 bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-zinc-400 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-zinc-800"
                />
              </div>
              {state?.errors?.password && (
                <div className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                  <p className="flex items-center gap-1 font-medium">
                    <WarningCircle size={13} weight="fill" />
                    Password must:
                  </p>
                  <ul className="mt-1 list-disc space-y-0.5 pl-5">
                    {state.errors.password.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {state?.message && (
              <p className="flex items-center gap-1.5 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                <WarningCircle size={14} weight="fill" />
                {state.message}
              </p>
            )}

            <button
              disabled={pending}
              type="submit"
              className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground shadow-sm transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100"
            >
              {pending && <CircleNotch size={15} className="animate-spin" />}
              {pending ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-accent hover:underline">
            Log in
          </Link>
        </p>
      </main>
    </div>
  );
}
