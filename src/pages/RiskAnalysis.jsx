import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  CircleAlert,
  Gauge,
  ShieldAlert,
  Target,
} from "lucide-react";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import Panel from "../components/Panel";
import { useTheme } from "../context/ThemeContext";

import {
  riskCategories,
  riskOverview,
  riskSignals,
  riskRecommendations,
} from "../data/riskData";

const severityStyles = {
  Critical: {
    badge:
      "bg-red-50 text-red-700 border-red-100 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/50",
    icon:
      "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
    dot: "bg-red-500",
  },
  High: {
    badge:
      "bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-900/50",
    icon:
      "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
    dot: "bg-orange-500",
  },
  Medium: {
    badge:
      "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50",
    icon:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  Low: {
    badge:
      "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50",
    icon:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
};

const categoryColors = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#22c55e",
  "#6366f1",
];

function RiskAnalysis() {
  const { theme } = useTheme();

  const isIncreasing = riskOverview.change > 0;

  const tooltipStyles =
    theme === "dark"
      ? {
          borderRadius: 12,
          border: "1px solid #334155",
          backgroundColor: "#0f172a",
          boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
          color: "#e2e8f0",
          fontSize: 12,
        }
      : {
          borderRadius: 12,
          border: "1px solid #e2e8f0",
          backgroundColor: "#ffffff",
          boxShadow: "0 12px 30px rgba(15,23,42,0.08)",
          color: "#0f172a",
          fontSize: 12,
        };

  const overviewCards = [
    {
      label: "Monitored Platforms",
      value: riskOverview.monitoredPlatforms,
      icon: Target,
      wrapper:
        "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950",
      iconWrapper:
        "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400",
      valueColor: "text-slate-950 dark:text-white",
    },
    {
      label: "High Risk Platforms",
      value: riskOverview.highRiskPlatforms,
      icon: AlertTriangle,
      wrapper:
        "border-red-100 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30",
      iconWrapper:
        "bg-white text-red-600 dark:bg-red-950/60 dark:text-red-400",
      valueColor: "text-red-700 dark:text-red-400",
    },
    {
      label: "Critical Signals",
      value: riskOverview.criticalSignals,
      icon: CircleAlert,
      wrapper:
        "border-amber-100 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30",
      iconWrapper:
        "bg-white text-amber-600 dark:bg-amber-950/60 dark:text-amber-400",
      valueColor: "text-amber-700 dark:text-amber-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* =========================================================
          HEADER
      ========================================================== */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-100/60 blur-3xl dark:bg-red-950/30" />

        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-red-600 dark:bg-red-950/40 dark:text-red-400">
              <ShieldAlert size={13} />
              Risk Intelligence
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Risk Analysis
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
              Evaluate digital monoculture exposure, platform concentration,
              critical signals and ecosystem vulnerabilities.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-red-100 bg-red-50/70 p-4 dark:border-red-900/50 dark:bg-red-950/30">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white shadow-lg shadow-red-600/20">
              <Gauge size={20} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                Current Risk
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-red-400 opacity-40" />
                  <span className="relative h-2 w-2 rounded-full bg-red-500" />
                </span>

                <span className="text-sm font-bold text-red-700 dark:text-red-400">
                  {riskOverview.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN SCORE
      ========================================================== */}
      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/10 dark:shadow-black/30 sm:p-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-500/10 blur-3xl" />

          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Overall Risk Score
                </p>

                <div className="mt-3 flex items-end gap-3">
                  <strong className="text-6xl font-extrabold tracking-tight">
                    {riskOverview.overallScore}
                  </strong>

                  <span className="mb-2 text-xl font-bold text-slate-500">
                    /100
                  </span>
                </div>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
                <ShieldAlert size={22} />
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-400">
                  Exposure level
                </span>

                <span className="font-bold text-red-400">
                  {riskOverview.status}
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-red-500 transition-all duration-700"
                  style={{
                    width: `${riskOverview.overallScore}%`,
                  }}
                />
              </div>

              <div className="mt-2 flex justify-between text-[9px] font-medium text-slate-600">
                <span>Low</span>
                <span>Moderate</span>
                <span>High</span>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Change
                </p>

                <div className="mt-1 flex items-center gap-1.5">
                  {isIncreasing ? (
                    <ArrowUpRight
                      size={15}
                      className="text-red-400"
                    />
                  ) : (
                    <ArrowDownRight
                      size={15}
                      className="text-emerald-400"
                    />
                  )}

                  <strong className="text-lg font-extrabold">
                    {Math.abs(riskOverview.change)}%
                  </strong>
                </div>

                <p className="mt-1 text-[9px] text-slate-600">
                  vs previous assessment
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Critical Signals
                </p>

                <strong className="mt-1 block text-lg font-extrabold">
                  {riskOverview.criticalSignals}
                </strong>

                <p className="mt-1 text-[9px] text-slate-600">
                  requiring attention
                </p>
              </div>
            </div>
          </div>
        </div>

        <Panel
          title="Risk Snapshot"
          subtitle="Current monitoring coverage"
          icon={Target}
        >
          <div className="space-y-4">
            {overviewCards.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className={`rounded-2xl border p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-sm ${item.wrapper}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {item.label}
                      </p>

                      <strong
                        className={`mt-1 block text-2xl font-extrabold ${item.valueColor}`}
                      >
                        {item.value}
                      </strong>
                    </div>

                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm ${item.iconWrapper}`}
                    >
                      <Icon size={18} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </section>

      {/* =========================================================
          RISK CATEGORIES
      ========================================================== */}
      <section className="grid gap-6 xl:grid-cols-[1.25fr_1fr]">
        <Panel
          title="Risk Categories"
          subtitle="Contribution of major risk dimensions"
          icon={ShieldAlert}
          action={
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                isIncreasing
                  ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                  : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isIncreasing ? "bg-red-500" : "bg-emerald-500"
                }`}
              />

              {isIncreasing
                ? "Increasing Exposure"
                : "Improving Exposure"}
            </span>
          }
        >
          <div className="space-y-5">
            {riskCategories.map((category, index) => {
              const color =
                categoryColors[index % categoryColors.length];

              return (
                <div key={category.name}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="h-3 w-3 shrink-0 rounded-full shadow-sm"
                        style={{
                          backgroundColor: color,
                        }}
                      />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                          {category.name}
                        </p>

                        <p className="mt-0.5 truncate text-[10px] text-slate-400">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <strong className="shrink-0 text-sm font-extrabold text-slate-900 dark:text-slate-100">
                      {category.score}%
                    </strong>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${category.score}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel
          title="Risk Composition"
          subtitle="Distribution across current risk categories"
          icon={Gauge}
        >
          <div className="flex h-[300px] items-center justify-center">
            <div className="relative h-[250px] w-full max-w-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskCategories}
                    dataKey="score"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={68}
                    outerRadius={102}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {riskCategories.map((category, index) => (
                      <Cell
                        key={category.name}
                        fill={
                          categoryColors[
                            index % categoryColors.length
                          ]
                        }
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={tooltipStyles}
                    formatter={(value) => [
                      `${value}%`,
                      "Risk contribution",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <strong className="text-3xl font-extrabold text-slate-950 dark:text-white">
                  {riskOverview.overallScore}
                </strong>

                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Risk Score
                </span>
              </div>
            </div>
          </div>
        </Panel>
      </section>

      {/* =========================================================
          RISK SIGNALS
      ========================================================== */}
      <Panel
        title="Critical Risk Signals"
        subtitle="Signals requiring attention from the intelligence layer"
        icon={AlertTriangle}
        action={
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {riskSignals.length} signals
          </span>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          {riskSignals.map((signal) => {
            const severity =
              severityStyles[signal.severity] ||
              severityStyles.Medium;

            return (
              <div
                key={signal.id}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-red-100 hover:bg-slate-50/70 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-red-900/60 dark:hover:bg-slate-800/70 dark:hover:shadow-black/20"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${severity.icon}`}
                  >
                    <AlertTriangle size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                        {signal.title}
                      </h3>

                      <span
                        className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${severity.badge}`}
                      >
                        {signal.severity}
                      </span>
                    </div>

                    <p className="mt-2 text-xs leading-5 text-slate-400">
                      {signal.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        {signal.category}
                      </span>

                      <span className="rounded-lg bg-indigo-50 px-2 py-1 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                        Score {signal.score}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* =========================================================
          RECOMMENDATIONS
      ========================================================== */}
      <Panel
        title="Risk Recommendations"
        subtitle="Suggested actions based on current intelligence"
        icon={CheckCircle2}
        action={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
            <CheckCircle2 size={11} />
            Action plan
          </span>
        }
      >
        <div className="space-y-3">
          {riskRecommendations.map((recommendation, index) => (
            <div
              key={recommendation.title}
              className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition duration-200 hover:border-indigo-100 hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:hover:border-indigo-900/60 dark:hover:bg-slate-900"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm transition group-hover:bg-indigo-50 dark:bg-slate-800 dark:text-indigo-400 dark:group-hover:bg-indigo-950/50">
                <span className="text-xs font-extrabold">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {recommendation.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  {recommendation.description}
                </p>
              </div>

              <CheckCircle2
                size={17}
                className="shrink-0 text-emerald-500 transition group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </Panel>

      {/* =========================================================
          FOOTER STATUS
      ========================================================== */}
      <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-40" />

            <span className="relative h-2.5 w-2.5 rounded-full bg-red-500" />
          </span>

          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Risk Intelligence Engine Active
            </p>

            <p className="text-[10px] text-slate-400">
              Frontend intelligence simulation · Risk monitoring operational
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400">
          <ShieldAlert size={13} />
          Continuous risk assessment
        </div>
      </div>
    </div>
  );
}

export default RiskAnalysis;