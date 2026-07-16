export interface Domain {
  id: string;
  name: string;
  focus: string;
  description: string;
  responsibilities: string[];
  tools?: string[];
}

export const domains: Domain[] = [
  {
    id: "aerodynamics-design",
    name: "Aerodynamics & Design",
    focus: "Wing/airfoil design, CFD",
    description: "Responsible for defining the aerodynamic shape, analyzing stability, and simulating flight characteristics using advanced Computational Fluid Dynamics (CFD).",
    responsibilities: [
      "Airfoil optimization for high lift and low drag",
      "Static and dynamic aircraft stability analysis",
      "CFD simulations and physical wind tunnel validation",
      "UAV flight envelope and performance estimation"
    ],
    tools: ["ANSYS Fluent", "XFLR5", "OpenFOAM", "MATLAB"]
  },
  {
    id: "structures-fabrication",
    name: "Structures & Fabrication",
    focus: "Airframe engineering, composites",
    description: "Engineers the internal structural layout and manufactures the airframe using composites, 3D printing, and advanced aerospace materials.",
    responsibilities: [
      "Finite Element Analysis (FEA) of structural elements",
      "Composite layups (carbon fiber, fiberglass, Kevlar)",
      "Spar, rib, and fuselage load path design",
      "Weight estimation and Center of Gravity (CG) tracking"
    ],
    tools: ["SolidWorks", "ANSYS Mechanical", "Fusion 360", "Autodesk Inventor"]
  },
  {
    id: "avionics-controls",
    name: "Avionics & Controls",
    focus: "Flight computer & sensors",
    description: "Develops custom flight controller boards, integrates navigation sensors, programs control laws, and manages telemetry feeds.",
    responsibilities: [
      "Autopilot firmware configuration (ArduPilot/PX4)",
      "Telemetry, GPS, IMU, Pitot, and LiDAR sensor integration",
      "Custom PCB design for power distribution and payload trigger systems",
      "Hardware-in-the-Loop (HIL) and Software-in-the-Loop (SIL) simulation testing"
    ],
    tools: ["Altium Designer", "QGroundControl", "Mission Planner", "ROS", "C++", "Python"]
  },
  {
    id: "propulsion-power",
    name: "Propulsion & Power",
    focus: "Motors, batteries, ESCs",
    description: "Evaluates and calibrates the electric propulsion system, ensuring high-efficiency conversion of battery power into physical thrust.",
    responsibilities: [
      "Static thrust stand characterization of motor-propeller combinations",
      "Lithium-Polymer (LiPo) battery capacity and C-rate management",
      "ESC selection, cooling, and thermal dissipation management",
      "Propeller matching for speed, flight endurance, and structural limits"
    ],
    tools: ["RCbenchmark Flight Test Software", "eCalc", "Thermal Imagers", "Data Loggers"]
  },
  {
    id: "business-sponsorship",
    name: "Business & Sponsorship",
    focus: "Funding, branding, operations",
    description: "Manages AARG's external affairs, including corporate outreach, fundraising, media, logistics, and competition rule compliance tracking.",
    responsibilities: [
      "Drafting and presenting industry sponsorship proposals",
      "Budget planning, expense auditing, and inventory tracking",
      "Social media presence, videography, and graphic design",
      "Competition travel, UAV shipping logistics, and team operations"
    ],
    tools: ["Adobe Creative Suite", "Slack", "Excel", "Trello", "Figma"]
  }
];
