"use client";

import { useState, useTransition } from "react";
import {
  updateApplicationStatus,
  updateApplicationNotes,
  deleteApplication,
} from "@/app/actions/applications";
import { STATUS_ORDER, STATUS_LABELS } from "@/lib/definitions";

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
    <tr className="border-b border-black/[.06] align-top last:border-0 dark:border-white/[.1]">
      <td className="py-3 pr-4 font-medium">{application.companyName}</td>
      <td className="py-3 pr-4">{application.roleTitle}</td>
      <td className="py-3 pr-4 whitespace-nowrap text-zinc-600 dark:text-zinc-400">
        {dateAppliedLabel}
      </td>
      <td className="py-3 pr-4">
        <select
          value={application.status}
          onChange={handleStatusChange}
          disabled={isPending}
          className="rounded border border-black/[.15] bg-white px-2 py-1 text-sm dark:border-white/[.2] dark:bg-black"
        >
          {STATUS_ORDER.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </td>
      <td className="min-w-[16rem] py-3 pr-4">
        {editingNotes ? (
          <div className="flex flex-col gap-2">
            <textarea
              value={notesDraft}
              onChange={(e) => setNotesDraft(e.target.value)}
              rows={2}
              className="w-full rounded border border-black/[.15] px-2 py-1 text-sm dark:border-white/[.2] dark:bg-black"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={isPending}
                className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background disabled:opacity-60"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setNotesDraft(application.notes ?? "");
                  setEditingNotes(false);
                }}
                className="rounded-full border border-black/[.15] px-3 py-1 text-xs dark:border-white/[.2]"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditingNotes(true)}
            className="block max-w-xs text-left text-sm text-zinc-600 hover:underline dark:text-zinc-400"
          >
            {application.notes ? application.notes : "Add notes"}
          </button>
        )}
      </td>
      <td className="py-3">
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="text-sm text-red-600 hover:underline disabled:opacity-60"
        >
          Delete
        </button>
      </td>
    </tr>
    {error && (
      <tr>
        <td colSpan={6} className="pb-2 text-xs text-red-600">
          {error}
        </td>
      </tr>
    )}
    </>
  );
}
