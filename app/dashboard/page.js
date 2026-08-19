import { requireUser, getApplications } from "@/lib/dal";
import { STATUS_ORDER, STATUS_LABELS } from "@/lib/definitions";
import AddApplicationForm from "@/app/dashboard/AddApplicationForm";
import ApplicationRow from "@/app/dashboard/ApplicationRow";

export default async function DashboardPage() {
  await requireUser();
  const applications = await getApplications();

  const grouped = Object.fromEntries(STATUS_ORDER.map((status) => [status, []]));
  for (const application of applications) {
    grouped[application.status]?.push(application);
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-16">
        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
          Your applications
        </h1>

        <AddApplicationForm />

        {applications.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">
            No applications yet. Add your first one above.
          </p>
        ) : (
          <div className="flex flex-col gap-10">
            {STATUS_ORDER.map((status) => {
              const items = grouped[status];
              return (
                <section key={status}>
                  <h2 className="mb-3 text-lg font-semibold text-black dark:text-zinc-50">
                    {STATUS_LABELS[status]}{" "}
                    <span className="text-sm font-normal text-zinc-500">({items.length})</span>
                  </h2>
                  {items.length === 0 ? (
                    <p className="text-sm text-zinc-500">Nothing here.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="border-b border-black/[.1] text-zinc-500 dark:border-white/[.15]">
                            <th className="py-2 pr-4 font-medium">Company</th>
                            <th className="py-2 pr-4 font-medium">Role</th>
                            <th className="py-2 pr-4 font-medium">Date applied</th>
                            <th className="py-2 pr-4 font-medium">Status</th>
                            <th className="py-2 pr-4 font-medium">Notes</th>
                            <th className="py-2 font-medium"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((application) => (
                            <ApplicationRow
                              key={application.id}
                              application={application}
                              dateAppliedLabel={application.dateApplied.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            />
                          ))}
                        </tbody>
                      </table>
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
