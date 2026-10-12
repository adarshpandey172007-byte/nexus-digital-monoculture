export const graphNodes = [
  {
    id: "platform-core",
    type: "intelligence",
    position: { x: 80, y: 180 },
    data: {
      label: "Platform Core",
      category: "Platform",
      risk: "high",
      score: 86,
      connections: 42,
    },
  },
  {
    id: "social-network",
    type: "intelligence",
    position: { x: 360, y: 70 },
    data: {
      label: "Social Network",
      category: "Social",
      risk: "high",
      score: 82,
      connections: 38,
    },
  },
  {
    id: "news-network",
    type: "intelligence",
    position: { x: 360, y: 290 },
    data: {
      label: "News Network",
      category: "News",
      risk: "medium",
      score: 67,
      connections: 27,
    },
  },
  {
    id: "creator-cluster",
    type: "intelligence",
    position: { x: 660, y: 20 },
    data: {
      label: "Creator Cluster",
      category: "Community",
      risk: "medium",
      score: 61,
      connections: 19,
    },
  },
  {
    id: "community-cluster",
    type: "intelligence",
    position: { x: 660, y: 180 },
    data: {
      label: "Community Cluster",
      category: "Community",
      risk: "low",
      score: 42,
      connections: 16,
    },
  },
  {
    id: "information-flow",
    type: "intelligence",
    position: { x: 660, y: 340 },
    data: {
      label: "Information Flow",
      category: "Network",
      risk: "medium",
      score: 58,
      connections: 31,
    },
  },
];

export const graphEdges = [
  {
    id: "platform-social",
    source: "platform-core",
    target: "social-network",
    animated: true,
  },
  {
    id: "platform-news",
    source: "platform-core",
    target: "news-network",
    animated: true,
  },
  {
    id: "social-creators",
    source: "social-network",
    target: "creator-cluster",
  },
  {
    id: "social-community",
    source: "social-network",
    target: "community-cluster",
  },
  {
    id: "news-community",
    source: "news-network",
    target: "community-cluster",
  },
  {
    id: "news-information",
    source: "news-network",
    target: "information-flow",
  },
  {
    id: "community-information",
    source: "community-cluster",
    target: "information-flow",
  },
];

export const graphFilters = [
  "All",
  "Platform",
  "Social",
  "News",
  "Community",
  "Network",
];

export const graphSummary = {
  totalNodes: 156,
  activeConnections: 1284,
  highRiskNodes: 28,
  networkDensity: "74.6%",
};