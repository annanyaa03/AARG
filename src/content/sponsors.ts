export interface Sponsor {
  id: string;
  name: string;
  tier: string;
  role: string;
  logo: string;
  website?: string;
  summary: string;
  hardwareProvided: {
    name: string;
    category: string;
  }[];
}

export interface SponsorsData {
  sponsors: Sponsor[];
  whySponsor: {
    iconName: "Award" | "Users" | "Cpu" | "Briefcase";
    title: string;
    desc: string;
  }[];
  fundingItems: string[];
  benefitsItems: string[];
}

export const sponsorsData: SponsorsData = {
  sponsors: [
    {
      id: "yari-robotics",
      name: "YARI Robotics",
      tier: "Official Hardware & Avionics Partner",
      role: "Flight Control & Propulsion",
      logo: "/images/sponsors/yari_robotics_logo.jpeg",
      website: "https://yarirobotics.com",
      summary:
        "YARI Robotics equips AARG with next-generation YARI V6X flight controllers, M9N multi-constellation GNSS, and AM32 ESCs to power our ArduPilot multirotor platforms and the RescueSwarm initiative for NIDAR.",
      hardwareProvided: [
        { name: "YARI V6X Autopilot Standard Set", category: "Flight Management" },
        { name: "M9N Multi-Constellation GNSS", category: "Navigation & Compass" },
        { name: "AM32 32-Bit Brushless ESCs", category: "Motor Propulsion" },
        { name: "Precision Power Module & Bus Adapters", category: "Power & Telemetry" },
        { name: "YARI Atlas Ecosystem Access", category: "Log Analytics" },
      ],
    },
    {
      id: "artemon-aerospace",
      name: "Artemon Aerospace",
      tier: "Official Prototyping Partner",
      role: "3D Printing & Prototyping",
      logo: "/images/sponsors/artemon_aerospace_logo.jpg",
      summary:
        "Artemon Aerospace supports AARG with advanced 3D printing and rapid prototyping solutions, enabling precise fabrication of custom airframe mounts, sensor housings, and structural components for our aerial platforms.",
      hardwareProvided: [
        { name: "Rapid 3D Printing & Prototyping", category: "Additive Manufacturing" },
        { name: "Custom Sensor & Payload Mounts", category: "Component Fabrication" },
        { name: "Structural Airframe Enclosures", category: "Prototyping & Tooling" },
      ],
    },
    {
      id: "ansys",
      name: "ANSYS",
      tier: "Official Simulation Partner",
      role: "CFD Licences & Aerodynamics",
      logo: "/images/sponsors/ansys_logo.jpg",
      website: "https://www.ansys.com",
      summary:
        "ANSYS provides AARG with high-performance CFD and engineering simulation licences, empowering our team to execute advanced fluid dynamics and structural analyses to optimize aerodynamic efficiency across all competition platforms.",
      hardwareProvided: [
        { name: "ANSYS Fluent CFD Suite", category: "Aerodynamic Simulation" },
        { name: "Academic Engineering Licences", category: "Software & Compute" },
        { name: "Structural FEA & Thermal Analysis", category: "Design Validation" },
      ],
    },
  ],
  whySponsor: [
    {
      iconName: "Award",
      title: "Brand Visibility",
      desc: "Prominent placement on competition aircraft, team apparel, event banners, and digital platforms.",
    },
    {
      iconName: "Users",
      title: "Engineering Talent",
      desc: "Direct access to students working on autonomous flight control, embedded avionics, and computer vision.",
    },
    {
      iconName: "Cpu",
      title: "Hardware Validation",
      desc: "Field testing and telemetry logging under rigorous competition flight profiles.",
    },
    {
      iconName: "Briefcase",
      title: "Technical Collaboration",
      desc: "Joint workshops, technical demonstrations, and open-source aerospace research.",
    },
  ],
  fundingItems: [
    "Industrial flight controllers and precision avionics",
    "High-discharge battery packs and ground power systems",
    "Carbon-composite airframe materials and rapid tooling",
    "Participation in national aerospace competitions (NIDAR, IROC-U)",
  ],
  benefitsItems: [
    "Logo placement on competition UAVs and team gear",
    "Featured recognition across website and technical papers",
    "Real-world flight test telemetry and integration feedback",
    "Direct recruiting pipeline for aerospace and robotics engineering",
  ],
};
