"use client";

import { useState, useTransition } from "react";
import {
  PencilSimple,
  Check,
  X,
  Trash,
  WarningCircle,
  CircleNotch,
} from "@phosphor-icons/react";
import {
  updateApplicationStatus,
  updateApplicationNotes,
  deleteApplication,
} from "@/app/actions/applications";
import { STATUS_ORDER, STATUS_LABELS } from "@/lib/definitions";
import { STATUS_STYLES } from "@/lib/status-styles";

export default function ApplicationRow({ application, dateAppliedLabel }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesDraft, setNotesDraft] = useState(application.notes ?? "");

  function handleStatusChange(event) {
    const status = event.target.value;
    setError(null);
    startTransition(async () => {
      const result = await updateApplicationStatus(application.id, status);
      if (result?.message) setError(result.message);
    });
  }

  function handleSaveNotes() {
    setError(null);
    startTransition(async () => {
      const result = await updateApplicationNotes(application.id, notesDraft);
      if (result?.message) {
        setError(result.message);
      } else {
        setEditingNotes(false);
      }
    });
  }

  function handleDelete() {
    if (!window.confirm(`Delete the application for ${application.companyName}?`)) {
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await deleteApplication(application.id);
      if (result?.message) setError(result.message);
    });
  }

  return (
    <>
      <tr className="group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40">
        <td className="px-4 py-3 font-medium text-foreground">{application.companyName}</td>
        <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{application.roleTitle}</td>
        <td className="px-4 py-3 whitespace-nowrap text-zinc-500 dark:text-zinc-400">
          {dateAppliedLabel}
        </td>
        <td className="px-4 py-3">
          <select
            value={application.status}
            onChange={handleStatusChange}
            disabled={isPending}
            className={`rounded-full border-0 py-1 pl-2.5 pr-7 text-xs font-medium outline-none transition-colors focus:ring-2 focus:ring-accent/30 disabled:opacity-60 ${STATUS_STYLES[application.status].select}`}
          >
            {STATUS_ORDER.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </td>
        <td className="min-w-[16rem] px-4 py-3">
          {editingNotes ? (
            <div className="flex flex-col gap-2">
              <textarea
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                rows={2}
                autoFocus
                className="w-full rounded-lg border border-zinc-200 bg-background px-2.5 py-1.5 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-zinc-800"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={isPending}
                  className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground disabled:opacity-60"
                >
                  {isPending ? (
                    <CircleNotch size={12} className="animate-spin" />
                  ) : (
                    <Check size={12} weight="bold" />
                  )}
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNotesDraft(application.notes ?? "");
                    setEditingNotes(false);
                  }}
                  className="inline-flex items-center gap-1 rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
                >
                  <X size={12} />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setEditingNotes(true)}
              className="group/notes flex max-w-xs items-center gap-1.5 text-left text-sm text-zinc-500 dark:text-zinc-400"
            >
              <span
                className={
                  application.notes
                    ? "truncate group-hover/notes:text-foreground"
                    : "italic text-zinc-400 group-hover/notes:text-zinc-500 dark:text-zinc-500"
                }
              >
                {application.notes ? application.notes : "Add notes"}
              </span>
              <PencilSimple
                size={12}
                className="shrink-0 opacity-0 transition-opacity group-hover/notes:opacity-100"
              />
            </button>
          )}
        </td>
        <td className="px-4 py-3 text-right">
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            aria-label={`Delete application for ${application.companyName}`}
            className="inline-flex size-7 items-center justify-center rounded-lg text-zinc-400 opacity-0 transition-all hover:bg-rose-50 hover:text-rose-600 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-accent group-hover:opacity-100 disabled:opacity-60 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
          >
            <Trash size={15} />
          </button>
        </td>
      </tr>
      {error && (
        <tr>
          <td colSpan={6} className="px-4 pb-3">
            <p className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400">
              <WarningCircle size={13} weight="fill" />
              {error}
            </p>
          </td>
        </tr>
      )}
    </>
  );
}
