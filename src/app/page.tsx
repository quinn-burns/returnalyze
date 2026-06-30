import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-neutral-100">
      <Sidebar />

      <main className="flex-1 px-6 pb-24 pt-20 md:px-10 md:pt-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800">Overview</h1>
          <p className="mt-1 text-sm text-neutral-500">
            May 11, 2025 – May 10, 2026
          </p>
        </header>

        {/* Placeholder content — scroll to see the sidebar gain a shadow after 50px,
            and resize below 768px to see the hamburger / slide-in panel. */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-neutral-200 bg-neutral-0 p-5 shadow-sm"
            >
              <div className="text-xs uppercase tracking-wide text-neutral-500">
                Metric {i + 1}
              </div>
              <div className="mt-2 text-2xl font-bold text-neutral-800">
                {(Math.round((i + 1) * 12.5) / 10).toFixed(1)}%
              </div>
              <div className="mt-4 h-24 rounded-lg bg-neutral-100" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
