"use client";

import { useActionState, useEffect, useRef } from "react";
import { createApplication } from "@/app/actions/applications";

const initialState = undefined;

export default function AddApplicationForm() {
  const [state, action, pending] = useActionState(createApplication, initialState);
  const formRef = useRef(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={action}
      className="grid grid-cols-1 gap-3 rounded-lg border border-black/[.08] p-4 dark:border-white/[.145] sm:grid-cols-2 sm:items-end lg:grid-cols-5"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="companyName" className="text-sm font-medium">
          Company
        </label>
        <input
          id="companyName"
          name="companyName"
          required
          className="rounded border border-black/[.15] px-2 py-1.5 dark:border-white/[.2] dark:bg-black"
        />
        {state?.errors?.companyName && (
          <p className="text-xs text-red-600">{state.errors.companyName}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="roleTitle" className="text-sm font-medium">
          Role
        </label>
        <input
          id="roleTitle"
          name="roleTitle"
          required
          className="rounded border border-black/[.15] px-2 py-1.5 dark:border-white/[.2] dark:bg-black"
        />
        {state?.errors?.roleTitle && (
          <p className="text-xs text-red-600">{state.errors.roleTitle}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="dateApplied" className="text-sm font-medium">
          Date applied
        </label>
        <input
          id="dateApplied"
          name="dateApplied"
          type="date"
          required
          defaultValue={new Date().toISOString().slice(0, 10)}
          className="rounded border border-black/[.15] px-2 py-1.5 dark:border-white/[.2] dark:bg-black"
        />
        {state?.errors?.dateApplied && (
          <p className="text-xs text-red-600">{state.errors.dateApplied}</p>
        )}
      </div>

      <div className="flex flex-col gap-1 lg:col-span-1">
        <label htmlFor="notes" className="text-sm font-medium">
          Notes
        </label>
        <input
          id="notes"
          name="notes"
          className="rounded border border-black/[.15] px-2 py-1.5 dark:border-white/[.2] dark:bg-black"
        />
      </div>

      <button
        disabled={pending}
        type="submit"
        className="h-fit rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-60 dark:hover:bg-[#ccc]"
      >
        {pending ? "Adding..." : "Add application"}
      </button>

      {state?.message && (
        <p className="text-sm text-red-600 sm:col-span-2 lg:col-span-5">{state.message}</p>
      )}
    </form>
  );
}
