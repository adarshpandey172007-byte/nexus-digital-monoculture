import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Activity,
  AlertTriangle,
  Filter,
  Maximize2,
  Network,
  Search,
  ShieldAlert,
  SlidersHorizontal,
  Target,
  Users,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import Panel from "../components/Panel";
import { useTheme } from "../context/ThemeContext";

import {
  graphSummary,
  graphNodes,
  graphEdges,
} from "../data/graphData";

const riskStyles = {
  High: {
    border: "border-red-300 dark:border-red-800",
    bg: "bg-red-50 dark:bg-red-950/40",
    text: "text-red-600 dark:text-red-400",
    dot: "bg-red-500",
  },
  Medium: {
    border: "border-amber-300 dark:border-amber-800",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    text: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  Low: {
    border: "border-emerald-300 dark:border-emerald-800",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    text: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
};

const nodeColors = {
  platform: "#4f46e5",
  community: "#0891b2",
  source: "#16a34a",
  network: "#ea580c",
};

function NodeIcon({ type, size = 16 }) {
  if (type === "community") {
    return <Users size={size} />;
  }

  if (type === "source") {
    return <Activity size={size} />;
  }

  if (type === "network") {
    return <Network size={size} />;
  }

  return <Target size={size} />;
}

function IntelligenceNode({ data }) {
  const style = riskStyles[data.risk] || riskStyles.Low;

  return (
    <div
      className={`min-w-[175px] rounded-2xl border-2 bg-white p-3 shadow-lg shadow-slate-900/10 transition-shadow duration-200 hover:shadow-xl dark:bg-slate-900 dark:shadow-black/30 ${style.border}`}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
          style={{
            backgroundColor:
              nodeColors[data.type] || nodeColors.platform,
          }}
        >
          <NodeIcon type={data.type} size={16} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-xs font-bold text-slate-900 dark:text-slate-100">
            {data.label}
          </p>

          <p className="mt-0.5 text-[10px] capitalize text-slate-400">
            {data.type}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${style.bg} ${style.text}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
          />

          {data.risk}
        </span>

        <span className="text-[10px] font-bold text-slate-400">
          {data.score}%
        </span>
      </div>
    </div>
  );
}

const nodeTypes = {
  intelligence: IntelligenceNode,
};

function GraphToolbar({
  search,
  setSearch,
  riskFilter,
  setRiskFilter,
}) {
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  return (
    <div className="absolute left-4 right-4 top-4 z-10 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/95 dark:shadow-black/20">
        <Search
          size={16}
          className="ml-2 shrink-0 text-slate-400"
        />

        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search nodes..."
          className="min-w-0 flex-1 bg-transparent px-2 py-2 text-xs text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200 dark:placeholder:text-slate-500"
          aria-label="Search graph nodes"
        />

        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 active:scale-95 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}

        <select
          value={riskFilter}
          onChange={(event) => setRiskFilter(event.target.value)}
          className="hidden rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-indigo-700 dark:focus:bg-slate-800 sm:block"
          aria-label="Filter graph by risk"
        >
          <option value="All">All risk</option>
          <option value="High">High risk</option>
          <option value="Medium">Medium risk</option>
          <option value="Low">Low risk</option>
        </select>
      </div>

      <div className="flex items-center gap-2 self-end rounded-2xl border border-slate-200 bg-white/95 p-1.5 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/95 dark:shadow-black/20">
        <button
          type="button"
          onClick={() => zoomOut()}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 active:scale-95 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          aria-label="Zoom out"
        >
          <ZoomOut size={16} />
        </button>

        <button
          type="button"
          onClick={() => zoomIn()}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 active:scale-95 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          aria-label="Zoom in"
        >
          <ZoomIn size={16} />
        </button>

        <button
          type="button"
          onClick={() =>
            fitView({
              padding: 0.2,
              duration: 500,
            })
          }
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 active:scale-95 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          aria-label="Fit graph"
        >
          <Maximize2 size={15} />
        </button>
      </div>
    </div>
  );
}

function GraphCanvas({
  nodes,
  edges,
  search,
  setSearch,
  riskFilter,
  setRiskFilter,
  onNodeSelect,
}) {
  const { theme } = useTheme();

  const [flowNodes, setFlowNodes, onNodesChange] =
    useNodesState(nodes);

  const [flowEdges, setFlowEdges, onEdgesChange] =
    useEdgesState(edges);

  const handleNodeClick = useCallback(
    (_, node) => {
      onNodeSelect(node);
    },
    [onNodeSelect]
  );

  useEffect(() => {
    setFlowNodes(nodes);
    setFlowEdges(edges);
  }, [nodes, edges, setFlowNodes, setFlowEdges]);

  const isDark = theme === "dark";

  return (
    <div className="relative h-[620px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          padding: 0.2,
        }}
        minZoom={0.25}
        maxZoom={2}
        proOptions={{
          hideAttribution: true,
        }}
      >
        <Background
          gap={24}
          size={1}
          color={isDark ? "#334155" : "#cbd5e1"}
        />

        <MiniMap
          nodeColor={(node) =>
            nodeColors[node.data?.type] ||
            nodeColors.platform
          }
          maskColor={
            isDark
              ? "rgba(2,6,23,0.75)"
              : "rgba(248,250,252,0.75)"
          }
          className={`!bottom-4 !left-4 !m-0 !rounded-xl !border !border-slate-200 !bg-white dark:!border-slate-700 dark:!bg-slate-900`}
        />

        <Controls
          showInteractive={false}
          className="!bottom-4 !right-4 !left-auto"
        />

        <GraphToolbar
          search={search}
          setSearch={setSearch}
          riskFilter={riskFilter}
          setRiskFilter={setRiskFilter}
        />
      </ReactFlow>
    </div>
  );
}

function GraphExplorer() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [selectedNode, setSelectedNode] = useState(null);

  const filteredNodes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return graphNodes
      .filter((node) => {
        const label = node.data?.label?.toLowerCase() || "";
        const type = node.data?.type?.toLowerCase() || "";

        const matchesSearch =
          !query ||
          label.includes(query) ||
          type.includes(query);

        const matchesRisk =
          riskFilter === "All" ||
          node.data?.risk === riskFilter;

        return matchesSearch && matchesRisk;
      })
      .map((node) => ({
        ...node,
        data: {
          ...node.data,
        },
      }));
  }, [search, riskFilter]);

  const visibleNodeIds = useMemo(
    () => new Set(filteredNodes.map((node) => node.id)),
    [filteredNodes]
  );

  const filteredEdges = useMemo(
    () =>
      graphEdges.filter(
        (edge) =>
          visibleNodeIds.has(edge.source) &&
          visibleNodeIds.has(edge.target)
      ),
    [visibleNodeIds]
  );

  useEffect(() => {
    if (
      selectedNode &&
      !visibleNodeIds.has(selectedNode.id)
    ) {
      setSelectedNode(null);
    }
  }, [selectedNode, visibleNodeIds]);

  const summaryCards = [
    {
      label: "Total Nodes",
      value: graphSummary.totalNodes,
      icon: Network,
      style:
        "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400",
    },
    {
      label: "Active Connections",
      value: graphSummary.activeConnections.toLocaleString(),
      icon: Activity,
      style:
        "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-400",
    },
    {
      label: "High Risk Nodes",
      value: graphSummary.highRiskNodes,
      icon: ShieldAlert,
      style:
        "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400",
    },
    {
      label: "Network Density",
      value: `${graphSummary.networkDensity}%`,
      icon: Target,
      style:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* =========================================================
          HEADER
      ========================================================== */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-100/60 blur-3xl dark:bg-indigo-950/40" />

        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
              <Network size={13} />
              Network Intelligence
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Graph Explorer
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
              Explore relationships between platforms, communities,
              sources and digital networks through an interactive
              intelligence graph.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
              <Network size={20} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Graph Engine
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                </span>

                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SUMMARY
      ========================================================== */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-900/60 dark:hover:shadow-black/20"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.style}`}
              >
                <Icon size={18} />
              </div>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {item.label}
              </p>

              <strong className="mt-1 block text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                {item.value}
              </strong>
            </div>
          );
        })}
      </section>

      {/* =========================================================
          GRAPH
      ========================================================== */}
      <section>
        <Panel
          title="Interactive Network"
          subtitle={`${filteredNodes.length} nodes · ${filteredEdges.length} connections visible`}
          icon={Network}
          action={
            <div className="hidden items-center gap-2 text-[10px] font-semibold text-slate-400 sm:flex">
              <SlidersHorizontal size={13} />
              Drag nodes to explore
            </div>
          }
        >
          <GraphCanvas
            nodes={filteredNodes}
            edges={filteredEdges}
            search={search}
            setSearch={setSearch}
            riskFilter={riskFilter}
            setRiskFilter={setRiskFilter}
            onNodeSelect={setSelectedNode}
          />
        </Panel>
      </section>

      {/* =========================================================
          LOWER SECTION
      ========================================================== */}
      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Panel
          title="Graph Intelligence"
          subtitle="How to interpret the network"
          icon={Filter}
        >
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-indigo-100 hover:bg-white dark:border-slate-800 dark:bg-slate-950 dark:hover:border-indigo-900/60 dark:hover:bg-slate-900">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />

                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  Platforms
                </span>
              </div>

              <p className="mt-2 text-[11px] leading-5 text-slate-400">
                Major digital platforms represented in the ecosystem.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-cyan-100 hover:bg-white dark:border-slate-800 dark:bg-slate-950 dark:hover:border-cyan-900/60 dark:hover:bg-slate-900">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-500" />

                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  Communities
                </span>
              </div>

              <p className="mt-2 text-[11px] leading-5 text-slate-400">
                Communities connected through shared digital activity.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-emerald-100 hover:bg-white dark:border-slate-800 dark:bg-slate-950 dark:hover:border-emerald-900/60 dark:hover:bg-slate-900">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  Sources
                </span>
              </div>

              <p className="mt-2 text-[11px] leading-5 text-slate-400">
                Intelligence sources contributing ecosystem signals.
              </p>
            </div>
          </div>
        </Panel>

        <Panel
          title="Selected Node"
          subtitle="Click any node in the graph"
          icon={Target}
        >
          {selectedNode ? (
            <div>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
                  style={{
                    backgroundColor:
                      nodeColors[selectedNode.data?.type] ||
                      nodeColors.platform,
                  }}
                >
                  <NodeIcon
                    type={selectedNode.data?.type}
                    size={18}
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold text-slate-900 dark:text-slate-100">
                    {selectedNode.data?.label}
                  </h3>

                  <p className="text-[10px] capitalize text-slate-400">
                    {selectedNode.data?.type}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Risk
                  </p>

                  <p
                    className={`mt-1 text-sm font-extrabold ${
                      riskStyles[selectedNode.data?.risk]?.text ||
                      "text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {selectedNode.data?.risk || "Unknown"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Score
                  </p>

                  <p className="mt-1 text-sm font-extrabold text-slate-900 dark:text-slate-100">
                    {selectedNode.data?.score ?? 0}%
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 p-3 dark:border-amber-900/50 dark:bg-amber-950/30">
                <div className="flex gap-2">
                  <AlertTriangle
                    size={15}
                    className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
                  />

                  <p className="text-[11px] leading-5 text-amber-700 dark:text-amber-300">
                    Node selection is based on the current frontend
                    intelligence simulation.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[180px] flex-col items-center justify-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                <Target size={20} />
              </div>

              <p className="mt-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
                No node selected
              </p>

              <p className="mt-1 max-w-[210px] text-[10px] leading-5 text-slate-400">
                Select a node from the graph to inspect its
                intelligence profile.
              </p>
            </div>
          )}
        </Panel>
      </section>
    </div>
  );
}

function GraphExplorerPage() {
  return (
    <ReactFlowProvider>
      <GraphExplorer />
    </ReactFlowProvider>
  );
}

export default GraphExplorerPage;