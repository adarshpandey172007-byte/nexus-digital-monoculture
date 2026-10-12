import { useMemo, useState } from "react";
import {
  Activity,
  CheckCircle2,
  Database,
  Globe2,
  RefreshCw,
  Search,
  ShieldCheck,
  Wifi,
  X,
} from "lucide-react";

import Panel from "../components/Panel";

import {
  dataSources,
  sourceActivity,
  sourceHealth,
  sourceOverview,
  sourceTypes,
} from "../data/sourceData";

const statusStyles = {
  Active: {
    badge:
      "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/60",
    dot: "bg-emerald-500",
  },
  Monitoring: {
    badge:
      "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/60",
    dot: "bg-amber-500",
  },
  Offline: {
    badge:
      "bg-red-50 text-red-700 border-red-100 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/60",
    dot: "bg-red-500",
  },
};

const statusIcons = {
  Active: CheckCircle2,
  Monitoring: Activity,
  Offline: Wifi,
};

function OverviewCard({
  icon: Icon,
  label,
  value,
  description,
  iconStyle,
}) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-900/60 dark:hover:shadow-black/20">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconStyle}`}
        >
          <Icon size={19} />
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-400 dark:bg-slate-800 dark:text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live
        </span>
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <strong className="mt-1 block text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
        {typeof value === "number" ? value.toLocaleString() : value}
      </strong>

      <p className="mt-2 min-h-[40px] text-xs leading-5 text-slate-500 dark:text-slate-400">
        {description}
      </p>

      <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div className="h-full w-2/3 rounded-full bg-indigo-500 transition-all duration-500 group-hover:w-4/5" />
      </div>
    </article>
  );
}

function DataSources() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredSources = useMemo(() => {
    const query = search.trim().toLowerCase();

    return dataSources.filter((source) => {
      const matchesSearch =
        !query ||
        source.name.toLowerCase().includes(query) ||
        source.type.toLowerCase().includes(query) ||
        source.status.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || source.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const handleRefresh = () => {
    if (isRefreshing) return;

    setIsRefreshing(true);

    window.setTimeout(() => {
      setIsRefreshing(false);
    }, 900);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
  };

  const totalActivityRecords = sourceActivity.reduce(
    (total, item) => total + item.records,
    0
  );

  const maxActivityRecords = Math.max(
    ...sourceActivity.map((item) => item.records),
    1
  );

  return (
    <section className="space-y-6">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-7 text-white shadow-xl sm:px-8 sm:py-9">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-300">
              <Database size={13} />
              Data Intelligence
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Intelligence Data Sources
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Monitor the health, freshness, reliability and coverage of the
              intelligence sources powering the NEXUS ecosystem.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500 shadow-lg shadow-indigo-500/20">
              <span className="absolute inset-0 animate-ping rounded-xl bg-indigo-400/20" />
              <Database size={20} className="relative" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Source Infrastructure
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>

                <span className="text-sm font-bold text-white">
                  Operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          OVERVIEW
      ========================================================== */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewCard
          icon={Database}
          label="Total Sources"
          value={sourceOverview.totalSources}
          description="Sources currently registered"
          iconStyle="bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400"
        />

        <OverviewCard
          icon={Wifi}
          label="Active Sources"
          value={sourceOverview.activeSources}
          description="Sources currently delivering data"
          iconStyle="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
        />

        <OverviewCard
          icon={ShieldCheck}
          label="Verified Sources"
          value={sourceOverview.verifiedSources}
          description="Sources passing verification checks"
          iconStyle="bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-400"
        />

        <OverviewCard
          icon={Activity}
          label="Data Freshness"
          value={sourceOverview.dataFreshness}
          description="Current freshness across the network"
          iconStyle="bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
        />
      </section>

      {/* =========================================================
          SOURCE TABLE
      ========================================================== */}
      <Panel
        title="Intelligence Sources"
        subtitle="Current status of monitored data sources"
        icon={Database}
        action={
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <RefreshCw
              size={14}
              className={isRefreshing ? "animate-spin" : ""}
            />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
        }
      >
        {/* Filters */}
        <div className="mb-5 flex flex-col gap-3 lg:flex-row">
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/5 dark:border-slate-700 dark:bg-slate-950 dark:focus-within:border-indigo-700 dark:focus-within:bg-slate-950">
            <Search size={16} className="shrink-0 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search sources, types or status..."
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200 dark:placeholder:text-slate-500"
              aria-label="Search data sources"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 active:scale-95 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {["All", "Active", "Monitoring", "Offline"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                aria-pressed={statusFilter === status}
                className={`shrink-0 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                  statusFilter === status
                    ? "bg-slate-950 text-white shadow-sm dark:bg-white dark:text-slate-950"
                    : "border border-slate-200 bg-white text-slate-500 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Result summary */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-400">
            Showing{" "}
            <span className="font-bold text-slate-700 dark:text-slate-200">
              {filteredSources.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-700 dark:text-slate-200">
              {dataSources.length}
            </span>{" "}
            sources
          </p>

          {(search || statusFilter !== "All") && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50 hover:text-indigo-700 dark:text-indigo-400 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300"
            >
              <X size={12} />
              Clear filters
            </button>
          )}
        </div>

        {/* Table */}
        {filteredSources.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full min-w-[980px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-left dark:border-slate-800 dark:bg-slate-950/80">
                  {[
                    "Source",
                    "Type",
                    "Status",
                    "Coverage",
                    "Records",
                    "Freshness",
                    "Reliability",
                    "Updated",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredSources.map((source) => {
                  const StatusIcon =
                    statusIcons[source.status] || Activity;

                  const status =
                    statusStyles[source.status] ||
                    statusStyles.Monitoring;

                  return (
                    <tr
                      key={source.id}
                      className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50/70 dark:border-slate-800 dark:hover:bg-slate-800/40"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                            <Database size={16} />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-slate-800 dark:text-slate-200">
                              {source.name}
                            </p>

                            <p className="mt-0.5 text-[10px] text-slate-400">
                              ID #
                              {source.id.toString().padStart(3, "0")}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {source.type}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${status.badge}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                          />
                          <StatusIcon size={12} />
                          {source.status}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                          <Globe2 size={13} className="text-slate-400" />
                          {source.coverage}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          {source.records}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                            <div
                              className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                              style={{
                                width: source.freshness,
                              }}
                            />
                          </div>

                          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                            {source.freshness}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-bold ${
                              source.reliability >= 90
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-amber-600 dark:text-amber-400"
                            }`}
                          >
                            {source.reliability}%
                          </span>

                          {source.reliability >= 90 ? (
                            <CheckCircle2
                              size={13}
                              className="text-emerald-500"
                            />
                          ) : (
                            <Activity
                              size={13}
                              className="text-amber-500"
                            />
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-4 text-xs text-slate-400">
                        {source.lastUpdated}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center dark:border-slate-700 dark:bg-slate-950">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm dark:bg-slate-900">
              <Search size={20} />
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-800 dark:text-slate-200">
              No sources found
            </h3>

            <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
              Try another search term or select a different source status.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 rounded-xl bg-slate-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 active:scale-95 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              Reset filters
            </button>
          </div>
        )}
      </Panel>

      {/* =========================================================
          DISTRIBUTION + HEALTH
      ========================================================== */}
      <section className="grid gap-6 xl:grid-cols-2">
        <Panel
          title="Source Distribution"
          subtitle="Breakdown of monitored intelligence sources"
          icon={Globe2}
        >
          <div className="space-y-5">
            {sourceTypes.map((source) => (
              <div key={source.name}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-indigo-500" />

                    <span className="truncate text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {source.name}
                    </span>
                  </div>

                  <span className="shrink-0 text-xs font-bold text-slate-600 dark:text-slate-300">
                    {source.count} · {source.percentage}%
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-indigo-500 transition-all duration-700"
                    style={{
                      width: `${source.percentage}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/30">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400">
                <Database size={16} />
              </div>

              <div>
                <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400">
                  Source Coverage
                </p>

                <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                  {sourceOverview.verifiedSources} verified sources are
                  currently contributing intelligence.
                </p>
              </div>
            </div>
          </div>
        </Panel>

        <Panel
          title="Source Health"
          subtitle="Current quality and reliability indicators"
          icon={ShieldCheck}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {sourceHealth.map((item) => {
              const healthy = item.score >= 90;

              return (
                <div
                  key={item.name}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {item.name}
                    </span>

                    {healthy ? (
                      <CheckCircle2
                        size={16}
                        className="text-emerald-500"
                      />
                    ) : (
                      <Activity
                        size={16}
                        className="text-amber-500"
                      />
                    )}
                  </div>

                  <strong className="mt-2 block text-2xl font-extrabold text-slate-950 dark:text-white">
                    {item.score}%
                  </strong>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        healthy ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                      style={{
                        width: `${item.score}%`,
                      }}
                    />
                  </div>

                  <div className="mt-2 flex items-center gap-1.5">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        healthy ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                    />

                    <p className="text-[10px] font-medium text-slate-400">
                      {healthy
                        ? "Healthy indicator"
                        : "Requires monitoring"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </section>

      {/* =========================================================
          ACTIVITY
      ========================================================== */}
      <Panel
        title="Source Activity"
        subtitle="Records processed during the current monitoring cycle"
        icon={Activity}
        action={
          <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
            {totalActivityRecords.toLocaleString()} Total
          </span>
        }
      >
        <div className="grid grid-cols-7 items-end gap-2 sm:gap-4">
          {sourceActivity.map((item) => {
            const height = Math.max(
              15,
              (item.records / maxActivityRecords) * 100
            );

            return (
              <div
                key={item.time}
                className="group flex min-w-0 flex-col items-center gap-2"
              >
                <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 sm:text-[10px]">
                  {item.records}
                </span>

                <div className="flex h-36 w-full max-w-14 items-end rounded-xl bg-slate-100 p-1 transition group-hover:bg-indigo-50 dark:bg-slate-800 dark:group-hover:bg-indigo-950/40">
                  <div
                    className="w-full rounded-lg bg-indigo-500 transition-all duration-500 group-hover:bg-indigo-600"
                    style={{
                      height: `${height}%`,
                    }}
                  />
                </div>

                <span className="text-[9px] font-medium text-slate-400 sm:text-[10px]">
                  {item.time}
                </span>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* =========================================================
          FOOTER
      ========================================================== */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>

          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Data source infrastructure operational
            </p>

            <p className="text-[11px] text-slate-400">
              Frontend intelligence simulation · No external API
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-slate-400">
          NEXUS Data Intelligence
        </span>
      </div>
    </section>
  );
}

export default DataSources;