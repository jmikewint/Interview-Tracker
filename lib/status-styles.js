import { ApplicationStatus } from "@/app/generated/prisma/enums";

// Presentation-only metadata (colors) for each application status.
// Kept separate from lib/definitions.js, which is validation logic.
export const STATUS_STYLES = {
  [ApplicationStatus.APPLIED]: {
    dot: "bg-zinc-400",
    select:
      "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  },
  [ApplicationStatus.OA]: {
    dot: "bg-amber-500",
    select:
      "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  },
  [ApplicationStatus.INTERVIEW]: {
    dot: "bg-violet-500",
    select:
      "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400",
  },
  [ApplicationStatus.OFFER]: {
    dot: "bg-emerald-500",
    select:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  },
  [ApplicationStatus.REJECTED]: {
    dot: "bg-rose-500",
    select:
      "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400",
  },
};
