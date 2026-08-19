"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signup } from "@/app/actions/auth";

export default function SignupPage() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <main style={{ maxWidth: 360, margin: "4rem auto", padding: "0 1rem" }}>
      <h1>Sign up</h1>
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
        {state?.errors?.password && (
          <div style={{ color: "crimson" }}>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {state?.message && <p style={{ color: "crimson" }}>{state.message}</p>}

        <button disabled={pending} type="submit">
          {pending ? "Signing up..." : "Sign up"}
        </button>
      </form>
      <p>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </main>
  );
}
