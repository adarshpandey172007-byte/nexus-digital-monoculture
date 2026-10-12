export const riskOverview = {
  overallScore: 68,
  status: "Elevated",
  change: "+6.4%",
  monitoredPlatforms: 42,
  highRiskPlatforms: 12,
  criticalSignals: 8,
};

export const riskCategories = [
  {
    id: "platform-dependency",
    name: "Platform Dependency",
    score: 82,
    level: "High",
    description:
      "Concentration of activity and information around a limited number of platforms.",
  },
  {
    id: "information-concentration",
    name: "Information Concentration",
    score: 74,
    level: "High",
    description:
      "Large volumes of information are concentrated within a small set of digital sources.",
  },
  {
    id: "network-centralization",
    name: "Network Centralization",
    score: 61,
    level: "Medium",
    description:
      "Network relationships show increasing dependence on central digital nodes.",
  },
  {
    id: "community-dependency",
    name: "Community Dependency",
    score: 53,
    level: "Medium",
    description:
      "Several communities demonstrate strong dependency on specific platforms.",
  },
  {
    id: "ecosystem-diversity",
    name: "Ecosystem Diversity",
    score: 39,
    level: "Low",
    description:
      "The ecosystem retains a relatively healthy level of platform and network diversity.",
  },
];

export const platformRiskData = [
  {
    platform: "Social",
    exposure: 82,
    dependency: 76,
    resilience: 34,
  },
  {
    platform: "News",
    exposure: 67,
    dependency: 71,
    resilience: 42,
  },
  {
    platform: "Finance",
    exposure: 61,
    dependency: 64,
    resilience: 51,
  },
  {
    platform: "Gaming",
    exposure: 48,
    dependency: 52,
    resilience: 63,
  },
  {
    platform: "Education",
    exposure: 39,
    dependency: 44,
    resilience: 72,
  },
];

export const riskSignals = [
  {
    id: 1,
    title: "High platform concentration detected",
    category: "Platform Dependency",
    severity: "high",
    score: 91,
    time: "8 min ago",
    status: "Investigating",
  },
  {
    id: 2,
    title: "Cross-platform information dependency",
    category: "Information",
    severity: "high",
    score: 84,
    time: "19 min ago",
    status: "Monitoring",
  },
  {
    id: 3,
    title: "Central network node expanding",
    category: "Network",
    severity: "medium",
    score: 69,
    time: "32 min ago",
    status: "Monitoring",
  },
  {
    id: 4,
    title: "Community migration pattern detected",
    category: "Community",
    severity: "medium",
    score: 57,
    time: "47 min ago",
    status: "Review",
  },
  {
    id: 5,
    title: "Ecosystem diversity improving",
    category: "Resilience",
    severity: "low",
    score: 31,
    time: "1 hr ago",
    status: "Positive",
  },
];

export const riskRecommendations = [
  {
    priority: "High",
    title: "Diversify platform dependencies",
    description:
      "Reduce exposure to highly concentrated digital platforms by monitoring alternative ecosystems.",
  },
  {
    priority: "High",
    title: "Monitor information concentration",
    description:
      "Track information flows across major sources to identify emerging monoculture patterns.",
  },
  {
    priority: "Medium",
    title: "Investigate central network nodes",
    description:
      "Review highly connected nodes that may significantly influence ecosystem behavior.",
  },
  {
    priority: "Low",
    title: "Maintain ecosystem diversity",
    description:
      "Continue monitoring emerging platforms and communities to preserve network resilience.",
  },
];