"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <main style={{ maxWidth: 360, margin: "4rem auto", padding: "0 1rem" }}>
      <h1>Log in</h1>
      <form action={action} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input id="email" name="email" type="email" required />
        </div>
        {state?.errors?.email && <p style={{ color: "crimson" }}>{state.errors.email}</p>}

        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input id="password" name="password" type="password" required />
        </div>
        {state?.errors?.password && <p style={{ color: "crimson" }}>{state.errors.password}</p>}

        {state?.message && <p style={{ color: "crimson" }}>{state.message}</p>}

        <button disabled={pending} type="submit">
          {pending ? "Logging in..." : "Log in"}
        </button>
      </form>
      <p>
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
      </p>
    </main>
  );
}
