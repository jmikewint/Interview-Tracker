import Link from "next/link";
import { Briefcase, SignOut, Tray } from "@phosphor-icons/react/ssr";
import { requireUser, getApplications } from "@/lib/dal";
import { STATUS_ORDER, STATUS_LABELS } from "@/lib/definitions";
import { STATUS_STYLES } from "@/lib/status-styles";
import { logout } from "@/app/actions/auth";
import AddApplicationForm from "@/app/dashboard/AddApplicationForm";
import ApplicationRow from "@/app/dashboard/ApplicationRow";

export default async function DashboardPage() {
  const user = await requireUser();
  const applications = await getApplications();

  const grouped = Object.fromEntries(STATUS_ORDER.map((status) => [status, []]));
  for (const application of applications) {
    grouped[application.status]?.push(application);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-surface/80 backdrop-blur dark:border-zinc-800">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <Briefcase size={15} weight="fill" />
            </span>
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Interview Tracker
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-zinc-500 sm:inline dark:text-zinc-400">
              {user.email}
            </span>
            <form action={logout}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
              >
                <SignOut size={15} />
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Your applications
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {applications.length === 0
              ? "Nothing tracked yet."
              : `${applications.length} application${applications.length === 1 ? "" : "s"} across your pipeline.`}
          </p>
        </div>

        <AddApplicationForm />

        {applications.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-zinc-200 py-16 text-center dark:border-zinc-800">
            <span className="flex size-11 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-900">
              <Tray size={22} />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">No applications yet</p>
              <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                Add your first one using the form above.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {STATUS_ORDER.map((status) => {
              const items = grouped[status];
              return (
                <section key={status}>
                  <div className="mb-3 flex items-center gap-2">
                    <span className={`size-2 rounded-full ${STATUS_STYLES[status].dot}`} />
                    <h2 className="text-sm font-semibold text-foreground">
                      {STATUS_LABELS[status]}
                    </h2>
                    <span className="text-sm text-zinc-400 dark:text-zinc-500">
                      {items.length}
                    </span>
                  </div>

                  {items.length === 0 ? (
                    <p className="pl-4 text-sm text-zinc-400 dark:text-zinc-500">Nothing here.</p>
                  ) : (
                    <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead>
                            <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/60">
                              <th className="px-4 py-2.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                Company
                              </th>
                              <th className="px-4 py-2.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                Role
                              </th>
                              <th className="px-4 py-2.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                Date applied
                              </th>
                              <th className="px-4 py-2.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                Status
                              </th>
                              <th className="px-4 py-2.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                Notes
                              </th>
                              <th className="px-4 py-2.5" />
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/70">
                            {items.map((application) => (
                              <ApplicationRow
                                key={application.id}
                                application={application}
                                dateAppliedLabel={application.dateApplied.toLocaleDateString(
                                  "en-US",
                                  { year: "numeric", month: "short", day: "numeric" },
                                )}
                              />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
