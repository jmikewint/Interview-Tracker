"use client";

import { useActionState, useEffect, useRef } from "react";
import { Plus, CircleNotch, WarningCircle } from "@phosphor-icons/react";
import { createApplication } from "@/app/actions/applications";

const initialState = undefined;

const inputClasses =
  "w-full rounded-lg border border-zinc-200 bg-background px-3 py-2 text-sm text-foreground placeholder:text-zinc-400 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-zinc-800";

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
      className="grid grid-cols-1 gap-3 rounded-2xl border border-zinc-200 bg-surface p-5 shadow-[0_1px_2px_rgb(0_0_0_/_0.04)] sm:grid-cols-2 sm:items-end lg:grid-cols-5 dark:border-zinc-800"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="companyName" className="text-sm font-medium text-foreground">
          Company
        </label>
        <input id="companyName" name="companyName" required className={inputClasses} />
        {state?.errors?.companyName && (
          <p className="flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
            <WarningCircle size={12} weight="fill" />
            {state.errors.companyName}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="roleTitle" className="text-sm font-medium text-foreground">
          Role
        </label>
        <input id="roleTitle" name="roleTitle" required className={inputClasses} />
        {state?.errors?.roleTitle && (
          <p className="flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
            <WarningCircle size={12} weight="fill" />
            {state.errors.roleTitle}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="dateApplied" className="text-sm font-medium text-foreground">
          Date applied
        </label>
        <input
          id="dateApplied"
          name="dateApplied"
          type="date"
          required
          defaultValue={new Date().toISOString().slice(0, 10)}
          className={`${inputClasses} [color-scheme:light] dark:[color-scheme:dark]`}
        />
        {state?.errors?.dateApplied && (
          <p className="flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
            <WarningCircle size={12} weight="fill" />
            {state.errors.dateApplied}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5 lg:col-span-1">
        <label htmlFor="notes" className="text-sm font-medium text-foreground">
          Notes
        </label>
        <input id="notes" name="notes" className={inputClasses} />
      </div>

      <button
        disabled={pending}
        type="submit"
        className="inline-flex h-fit items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100"
      >
        {pending ? <CircleNotch size={15} className="animate-spin" /> : <Plus size={15} weight="bold" />}
        {pending ? "Adding..." : "Add application"}
      </button>

      {state?.message && (
        <p className="flex items-center gap-1.5 text-sm text-rose-600 sm:col-span-2 lg:col-span-5 dark:text-rose-400">
          <WarningCircle size={14} weight="fill" />
          {state.message}
        </p>
      )}
    </form>
  );
}
