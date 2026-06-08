export const inspections = [
  {
    id: "pipeline-b7",
    title: "Pipeline Section B-7",
    date: "Today, 09:42 AM",
    shortDate: "Today, 09:42 AM",
    severity: "High",
    corrosionType: "Galvanic",
    confidence: 92,
    location: "Pipeline Section B-7",
    notes: "Visible rust forming along the weld seam. Needs urgent attention.",
  },
  {
    id: "tank-zone-3",
    title: "Tank Wall - Zone 3",
    date: "Today, 08:15 AM",
    shortDate: "Today, 08:15 AM",
    severity: "Moderate",
    corrosionType: "Pitting",
    confidence: 71,
    location: "Tank Wall - Zone 3",
    notes: "Small pits forming on the surface coating. Schedule maintenance review.",
  },
  {
    id: "bridge-c12",
    title: "Bridge Beam C-12",
    date: "Yesterday, 04:30 PM",
    shortDate: "Yesterday, 04:30 PM",
    severity: "Low",
    corrosionType: "Uniform",
    confidence: 64,
    location: "Bridge Beam C-12",
    notes: "Light surface corrosion detected. Continue routine monitoring.",
  },
  {
    id: "steel-d4",
    title: "Steel Column D-4",
    date: "Yesterday, 01:10 PM",
    shortDate: "Yesterday, 01:10 PM",
    severity: "High",
    corrosionType: "Crevice",
    confidence: 88,
    location: "Steel Column D-4",
    notes: "Corrosion found near a tight joint. Inspect surrounding fasteners.",
  },
];

export const severityTheme = {
  High: {
    color: "#df1208",
    soft: "#ffd7d7",
  },
  Moderate: {
    color: "#f29900",
    soft: "#ffe3ad",
  },
  Low: {
    color: "#05bd28",
    soft: "#bdf5c7",
  },
};

export const defaultInspection = inspections[0];
